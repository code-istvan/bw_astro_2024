import type { APIRoute } from 'astro';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export const GET: APIRoute = async ({ request }) => {
  console.log('🔍 Backup API called');

  try {
    // Dátum + időpont
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    const filename = `bandhaworks_backup_${timestamp}.sql`;

    console.log('🔍 Timestamp:', timestamp);

    let sqlDump = '';

    // Próbáljuk lokálisan (dev)
    try {
      console.log('🔍 Trying local Turso CLI...');
      const { stdout } = await execAsync('turso db shell bandhaworks .dump');
      sqlDump = stdout;
      console.log('✅ Local Turso CLI backup successful');
    } catch (localError) {
      // Production: használjuk a HTTP API-t
      console.log('ℹ️ Local Turso CLI not available, using HTTP API');
      console.log('🔍 TURSO_DATABASE_URL:', import.meta.env.TURSO_DATABASE_URL ? 'SET' : 'MISSING');
      console.log('🔍 TURSO_AUTH_TOKEN:', import.meta.env.TURSO_AUTH_TOKEN ? 'SET' : 'MISSING');

      const dbUrl = import.meta.env.TURSO_DATABASE_URL;
      const authToken = import.meta.env.TURSO_AUTH_TOKEN;

      if (!dbUrl || !authToken) {
        throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN');
      }

      // Lekérjük a táblákat
      console.log('🔍 Fetching tables...');
      const tablesResponse = await fetch(dbUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statements: ["SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"],
        }),
      });

      if (!tablesResponse.ok) {
        const errorText = await tablesResponse.text();
        console.error('❌ Tables fetch failed:', errorText);
        throw new Error(`Tables fetch failed: ${tablesResponse.status}`);
      }

      const tablesData = await tablesResponse.json();
      console.log('🔍 Tables data:', tablesData);

      const tables = tablesData[0].results.rows;

      sqlDump = '-- Bandha Works Database Backup\n';
      sqlDump += `-- Date: ${timestamp}\n\n`;
      sqlDump += 'PRAGMA foreign_keys=OFF;\n';
      sqlDump += 'BEGIN TRANSACTION;\n\n';

      // Minden táblához
      for (const tableRow of tables) {
        const tableName = tableRow[0];
        console.log(`🔍 Processing table: ${tableName}`);

        // CREATE TABLE
        const createResponse = await fetch(dbUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            statements: [`SELECT sql FROM sqlite_master WHERE type='table' AND name='${tableName}'`],
          }),
        });

        const createData = await createResponse.json();
        sqlDump += `${createData[0].results.rows[0]?.[0]};\n`;

        // INSERT data
        const dataResponse = await fetch(dbUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            statements: [`SELECT * FROM ${tableName}`],
          }),
        });

        const rowsData = await dataResponse.json();
        const rows = rowsData[0].results.rows;

        for (const row of rows) {
          const values = row.map((val: any) => {
            if (val === null) return 'NULL';
            if (typeof val === 'number') return val;
            return `'${String(val).replace(/'/g, "''")}'`;
          });

          sqlDump += `INSERT INTO ${tableName} VALUES(${values.join(',')});\n`;
        }
        sqlDump += '\n';
      }

      sqlDump += 'COMMIT;\n';
    }

    console.log('🔍 SQL dump size:', sqlDump.length);

    // Mentés fájlba (csak development-ben)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Saving to file...');
      const backupsDir = path.join(process.cwd(), 'backups');
      await fs.mkdir(backupsDir, { recursive: true });
      const filepath = path.join(backupsDir, filename);

      await fs.writeFile(filepath, sqlDump, 'utf-8');
      console.log(`✅ Backup saved: ${filename}`);

      // Git commit és push
      try {
        await execAsync(`
          cd ${process.cwd()} &&
          git config user.name "Backup Bot" &&
          git config user.email "backup@bandhaworks.com" &&
          git add backups/${filename} &&
          git commit -m "chore: automated backup ${timestamp}" &&
          git push origin main
        `);
        console.log('✅ Backup pushed to GitHub');
      } catch (gitError) {
        console.log('ℹ️ Git push failed:', gitError);
      }
    } else {
      console.log('ℹ️ Production: File save skipped (no writable filesystem)');
    }

    console.log('✅ Backup completed successfully');

    // JSON válasz
    return new Response(
      JSON.stringify({
        success: true,
        filename,
        message: 'Backup completed',
        size: sqlDump.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Backup error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

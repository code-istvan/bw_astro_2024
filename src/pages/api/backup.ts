import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  console.log('🔍 Backup API called');

  try {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
    const filename = `bandhaworks_backup_${timestamp}.sql`;

    const dbUrl = import.meta.env.TURSO_DATABASE_URL;
    const authToken = import.meta.env.TURSO_AUTH_TOKEN;

    console.log('🔍 DB URL:', dbUrl);
    console.log('🔍 Auth token exists:', !!authToken);

    if (!dbUrl || !authToken) {
      throw new Error('Missing environment variables');
    }

    // Turso libSQL HTTP endpoint - JAVÍTOTT FORMÁTUM
    // Ha libsql:// akkor átalakítjuk https://-re
    const httpUrl = dbUrl.replace('libsql://', 'https://');
    console.log('🔍 HTTP URL:', httpUrl);

    // Lekérjük a táblákat
    console.log('🔍 Fetching tables...');
    const tablesResponse = await fetch(httpUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            type: 'execute',
            stmt: {
              sql: "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
            },
          },
        ],
      }),
    });

    if (!tablesResponse.ok) {
      const errorText = await tablesResponse.text();
      console.error('❌ Tables fetch failed:', tablesResponse.status, errorText);
      throw new Error(`Tables fetch failed: ${tablesResponse.status} - ${errorText}`);
    }

    const tablesData = await tablesResponse.json();
    console.log('🔍 Tables response:', JSON.stringify(tablesData).slice(0, 200));

    const tables = tablesData.results[0]?.response?.result?.rows || [];
    console.log('🔍 Found tables:', tables.length);

    let sqlDump = `-- Bandha Works Database Backup\n-- Date: ${timestamp}\n\nPRAGMA foreign_keys=OFF;\nBEGIN TRANSACTION;\n\n`;

    // Minden táblához
    for (const tableRow of tables) {
      const tableName = tableRow[0]?.value;
      if (!tableName) continue;

      console.log(`🔍 Processing table: ${tableName}`);

      // CREATE TABLE
      const createResponse = await fetch(httpUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              type: 'execute',
              stmt: {
                sql: `SELECT sql FROM sqlite_master WHERE type='table' AND name='${tableName}'`,
              },
            },
          ],
        }),
      });

      const createData = await createResponse.json();
      const createSql = createData.results[0]?.response?.result?.rows[0]?.[0]?.value;
      if (createSql) {
        sqlDump += `${createSql};\n`;
      }

      // INSERT data
      const dataResponse = await fetch(httpUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              type: 'execute',
              stmt: {
                sql: `SELECT * FROM ${tableName}`,
              },
            },
          ],
        }),
      });

      const rowsData = await dataResponse.json();
      const rows = rowsData.results[0]?.response?.result?.rows || [];

      for (const row of rows) {
        const values = row.map((cell: any) => {
          const val = cell?.value;
          if (val === null || val === undefined) return 'NULL';
          if (typeof val === 'number') return val;
          return `'${String(val).replace(/'/g, "''")}'`;
        });

        sqlDump += `INSERT INTO ${tableName} VALUES(${values.join(',')});\n`;
      }
      sqlDump += '\n';
    }

    sqlDump += 'COMMIT;\n';

    console.log('✅ Backup completed, size:', sqlDump.length);

    return new Response(
      JSON.stringify({
        success: true,
        filename,
        message: 'Backup completed',
        size: sqlDump.length,
        tables: tables.length,
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
        stack: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

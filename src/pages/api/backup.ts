import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  console.log('🔍 Backup API called');

  try {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
    const filename = `bandhaworks_backup_${timestamp}.sql`;

    const dbUrl = import.meta.env.TURSO_DATABASE_URL;
    const authToken = import.meta.env.TURSO_AUTH_TOKEN;

    if (!dbUrl || !authToken) {
      throw new Error('Missing database environment variables');
    }

    // libsql:// → https://
    const httpUrl = dbUrl.replace('libsql://', 'https://');

    // Lekérjük a táblákat
    console.log('🔍 Fetching tables...');
    const tablesResponse = await fetch(httpUrl, {
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
      throw new Error(`Tables fetch failed: ${tablesResponse.status} - ${errorText}`);
    }

    const tablesData = await tablesResponse.json();
    const tables = tablesData[0]?.results?.rows || [];
    console.log('🔍 Found tables:', tables.length);

    let sqlDump = `-- Bandha Works Database Backup\n-- Date: ${timestamp}\n\nPRAGMA foreign_keys=OFF;\nBEGIN TRANSACTION;\n\n`;

    // Minden táblához
    for (const tableRow of tables) {
      const tableName = tableRow[0];
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
          statements: [`SELECT sql FROM sqlite_master WHERE type='table' AND name='${tableName}'`],
        }),
      });

      const createData = await createResponse.json();
      const createSql = createData[0]?.results?.rows[0]?.[0];
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
          statements: [`SELECT * FROM ${tableName}`],
        }),
      });

      const rowsData = await dataResponse.json();
      const rows = rowsData[0]?.results?.rows || [];

      for (const row of rows) {
        const values = row.map((val: any) => {
          if (val === null || val === undefined) return 'NULL';
          if (typeof val === 'number') return val;
          return `'${String(val).replace(/'/g, "''")}'`;
        });

        sqlDump += `INSERT INTO ${tableName} VALUES(${values.join(',')});\n`;
      }
      sqlDump += '\n';
    }

    sqlDump += 'COMMIT;\n';

    console.log('✅ Backup SQL generated, size:', sqlDump.length);

    // GitHub-ra commit-olás
    const githubToken = import.meta.env.GITHUB_TOKEN;

    if (githubToken) {
      try {
        console.log('🔍 Committing to GitHub...');

        // Base64 encode
        const content = Buffer.from(sqlDump).toString('base64');

        // GitHub API: Create/Update file
        const githubResponse = await fetch(
          'https://api.github.com/repos/code-istvan/bw_astro_2024/contents/backups/' + filename,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `chore: automated backup ${timestamp}`,
              content: content,
              branch: 'main',
            }),
          }
        );

        if (githubResponse.ok) {
          console.log('✅ Backup committed to GitHub');
        } else {
          const errorText = await githubResponse.text();
          console.error('❌ GitHub commit failed:', githubResponse.status, errorText);
        }
      } catch (githubError) {
        console.error('❌ GitHub error:', githubError);
      }
    } else {
      console.log('ℹ️ GITHUB_TOKEN not set, skipping commit');
    }

    return new Response(
      JSON.stringify({
        success: true,
        filename,
        message: 'Backup completed',
        size: sqlDump.length,
        tables: tables.length,
        githubCommit: !!githubToken,
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

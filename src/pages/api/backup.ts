import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  console.log('🔍 Step 3: SQL dump + GitHub commit');

  try {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
    const filename = `bandhaworks_backup_${timestamp}.sql`;

    console.log('🔍 Filename:', filename);

    const dbUrl = import.meta.env.TURSO_DATABASE_URL;
    const authToken = import.meta.env.TURSO_AUTH_TOKEN;

    console.log('🔍 DB credentials exist:', !!dbUrl, !!authToken);

    if (!dbUrl || !authToken) {
      throw new Error('Missing database credentials');
    }

    const httpUrl = dbUrl.replace('libsql://', 'https://');

    // Get tables
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

    const tablesData = await tablesResponse.json();
    const tables = tablesData[0]?.results?.rows || [];

    console.log('✅ Found tables:', tables.length);

    let sqlDump = `-- Bandha Works Database Backup\n-- Date: ${timestamp}\n\n`;
    sqlDump += 'PRAGMA foreign_keys=OFF;\nBEGIN TRANSACTION;\n\n';

    // Process each table
    for (const tableRow of tables) {
      const tableName = tableRow[0];
      console.log(`🔍 Processing: ${tableName}`);

      // Get CREATE TABLE
      const createResp = await fetch(httpUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statements: [`SELECT sql FROM sqlite_master WHERE type='table' AND name='${tableName}'`],
        }),
      });

      const createData = await createResp.json();
      const createSql = createData[0]?.results?.rows[0]?.[0];
      if (createSql) sqlDump += `${createSql};\n`;

      // Get data
      const dataResp = await fetch(httpUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statements: [`SELECT * FROM ${tableName}`],
        }),
      });

      const rowsData = await dataResp.json();
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

    console.log('✅ SQL dump generated, size:', sqlDump.length);

    // GitHub commit
    const githubToken = import.meta.env.GITHUB_TOKEN;
    console.log('🔍 GitHub token exists:', !!githubToken);

    let githubSuccess = false;

    if (githubToken) {
      try {
        console.log('🔍 Starting GitHub commit...');

        const content = Buffer.from(sqlDump).toString('base64');
        console.log('🔍 Content encoded, length:', content.length);

        const githubUrl = `https://api.github.com/repos/code-istvan/bw_astro_2024/contents/backups/${filename}`;
        console.log('🔍 GitHub URL:', githubUrl);

        const githubResponse = await fetch(githubUrl, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `chore: automated backup ${timestamp} [skip ci]`,
            content: content,
            branch: 'main',
          }),
        });

        console.log('🔍 GitHub response status:', githubResponse.status);

        if (githubResponse.ok) {
          console.log('✅ GitHub commit successful!');
          githubSuccess = true;
        } else {
          const errorText = await githubResponse.text();
          console.error('❌ GitHub commit failed:', errorText);
        }
      } catch (githubError) {
        console.error('❌ GitHub error:', githubError);
      }
    } else {
      console.log('⚠️ No GitHub token, skipping commit');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: githubSuccess ? 'Backup saved to GitHub!' : 'Backup created (GitHub failed)',
        filename: filename,
        size: sqlDump.length,
        tables: tables.length,
        githubCommit: githubSuccess,
        step: 3,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Error:', error);
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

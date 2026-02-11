import type { APIRoute } from 'astro';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const GET: APIRoute = async ({ request }) => {
  try {
    // Budapest időzóna szerinti dátum és időpont
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

    console.log('Generated timestamp:', timestamp); // DEBUG

    // Turso dump parancs futtatása
    const { stdout } = await execAsync('turso db shell bandhaworks .dump');

    const filename = `bandhaworks_backup_${timestamp}.sql`;
    console.log('Generated filename:', filename); // DEBUG

    return new Response(stdout, {
      status: 200,
      headers: {
        'Content-Type': 'application/sql',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Backup error:', error);
    return new Response('Backup failed', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

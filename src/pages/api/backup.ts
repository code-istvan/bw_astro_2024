import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  console.log('🔍 BACKUP API CALLED - Step 1: Simple test');

  const timestamp = new Date().toISOString();

  console.log('✅ Timestamp created:', timestamp);

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Backup API is working!',
      timestamp: timestamp,
      step: 1,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

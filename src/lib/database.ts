import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5441'),
      database: process.env.POSTGRES_DB || 'foodguard',
      user: process.env.POSTGRES_USER || 'foodguard',
      password: process.env.POSTGRES_PASSWORD || 'foodguard123',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

export async function queryDb(text: string, params?: any[]) {
  const pool = getDbPool();
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: result.rowCount });
  return result;
} 
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
  
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    throw error;
  }
}

// 专用的数据库操作方法
export async function insertRecord(table: string, data: Record<string, any>) {
  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map((_, index) => `$${index + 1}`).join(', ');
  const values = Object.values(data);
  
  const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
  
  try {
    const result = await queryDb(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function updateRecord(table: string, id: any, data: Record<string, any>) {
  const setClause = Object.keys(data).map((key, index) => `${key} = $${index + 2}`).join(', ');
  const values = [id, ...Object.values(data)];
  
  const query = `UPDATE ${table} SET ${setClause} WHERE id = $1 RETURNING *`;
  
  try {
    const result = await queryDb(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function deleteRecord(table: string, id: any) {
  const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
  
  try {
    const result = await queryDb(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function findRecord(table: string, conditions: Record<string, any>) {
  const whereClause = Object.keys(conditions).map((key, index) => `${key} = $${index + 1}`).join(' AND ');
  const values = Object.values(conditions);
  
  const query = `SELECT * FROM ${table} WHERE ${whereClause}`;
  
  try {
    const result = await queryDb(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
} 
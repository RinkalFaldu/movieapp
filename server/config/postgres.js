import { Pool } from "pg";

let pool;

export async function getPostgresPool() {
  if (!process.env.PG_CONNECTION_STRING) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.PG_CONNECTION_STRING,
    });
  }

  return pool;
}

export async function initializePostgres() {
  const activePool = await getPostgresPool();
  if (!activePool) {
    return { connected: false, reason: "Missing PG_CONNECTION_STRING" };
  }

  try {
    await activePool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        share_id TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await activePool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        movie_id TEXT NOT NULL,
        movie JSONB NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        PRIMARY KEY (user_id, movie_id)
      )
    `);

    return { connected: true };
  } catch (error) {
    return { connected: false, reason: error.message };
  }
}

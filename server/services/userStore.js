import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { getPostgresPool } from "../config/postgres.js";
import { dataSourceStatus } from "./dataSources.js";
import { readStore, writeStore } from "../utils/fileStore.js";

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    shareId: row.share_id,
  };
}

export async function createUser({ name, email, password }) {
  const existing = await findUserByEmail(email);
  if (existing) {
    const error = new Error("An account with that email already exists");
    error.statusCode = 409;
    throw error;
  }

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: await bcrypt.hash(password, 10),
    shareId: crypto.randomUUID().slice(0, 10),
  };

  if (dataSourceStatus.postgres.connected) {
    const pool = await getPostgresPool();
    await pool.query(
      `
      INSERT INTO users (id, name, email, password_hash, share_id)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [user.id, user.name, user.email, user.passwordHash, user.shareId],
    );
    return sanitizeUser(user);
  }

  const store = await readStore();
  store.users.push(user);
  await writeStore(store);
  return sanitizeUser(user);
}

export async function findUserByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();

  if (dataSourceStatus.postgres.connected) {
    const pool = await getPostgresPool();
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      normalizedEmail,
    ]);
    return result.rows[0] ? mapRow(result.rows[0]) : null;
  }

  const store = await readStore();
  return store.users.find((user) => user.email === normalizedEmail) || null;
}

export async function findUserByName(name) {
  const normalizedName = name.trim().toLowerCase();

  if (dataSourceStatus.postgres.connected) {
    const pool = await getPostgresPool();
    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(name) = $1 ORDER BY created_at ASC LIMIT 1",
      [normalizedName],
    );
    return result.rows[0] ? mapRow(result.rows[0]) : null;
  }

  const store = await readStore();
  return (
    store.users.find((user) => user.name.trim().toLowerCase() === normalizedName) || null
  );
}

export async function findUserById(id) {
  if (dataSourceStatus.postgres.connected) {
    const pool = await getPostgresPool();
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] ? sanitizeUser(mapRow(result.rows[0])) : null;
  }

  const store = await readStore();
  const user = store.users.find((entry) => entry.id === id);
  return user ? sanitizeUser(user) : null;
}

export async function findUserByShareId(shareId) {
  if (dataSourceStatus.postgres.connected) {
    const pool = await getPostgresPool();
    const result = await pool.query("SELECT * FROM users WHERE share_id = $1", [
      shareId,
    ]);
    return result.rows[0] ? sanitizeUser(mapRow(result.rows[0])) : null;
  }

  const store = await readStore();
  const user = store.users.find((entry) => entry.shareId === shareId);
  return user ? sanitizeUser(user) : null;
}

export async function verifyUser(identifier, password) {
  if (!identifier || !password) {
    return null;
  }

  const user = identifier.includes("@")
    ? await findUserByEmail(identifier)
    : await findUserByName(identifier);
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  return isMatch ? sanitizeUser(user) : null;
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    shareId: user.shareId,
  };
}

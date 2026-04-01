import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataFile = path.resolve("server/data/dev-store.json");

const defaultStore = {
  users: [],
  favorites: [],
};

async function ensureStore() {
  try {
    await access(dataFile);
  } catch {
    await mkdir(path.dirname(dataFile), { recursive: true });
    await writeFile(dataFile, JSON.stringify(defaultStore, null, 2));
  }
}

export async function readStore() {
  await ensureStore();
  const raw = await readFile(dataFile, "utf8");
  return JSON.parse(raw);
}

export async function writeStore(nextStore) {
  await ensureStore();
  await writeFile(dataFile, JSON.stringify(nextStore, null, 2));
}

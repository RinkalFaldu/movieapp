import dotenv from "dotenv";
import app from "../server/app.js";
import { initializeDataSources } from "../server/services/dataSources.js";

dotenv.config();

let initialized = false;

async function ensureInitialized() {
  if (!initialized) {
    await initializeDataSources();
    initialized = true;
  }
}

export default async function handler(req, res) {
  await ensureInitialized();
  return app(req, res);
}

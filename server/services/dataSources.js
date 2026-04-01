import { initializePostgres } from "../config/postgres.js";

export const dataSourceStatus = {
  postgres: { connected: false, reason: "Not initialized" },
};

export async function initializeDataSources() {
  const postgres = await initializePostgres();

  dataSourceStatus.postgres = postgres;

  if (!postgres.connected) {
    console.log(`Postgres fallback enabled: ${postgres.reason}`);
  }
}

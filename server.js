import dotenv from "dotenv";
import app from "./server/app.js";
import { initializeDataSources } from "./server/services/dataSources.js";

dotenv.config();

await initializeDataSources();

export default app;

import dotenv from "dotenv";
import app from "./app.js";
import { initializeDataSources } from "./services/dataSources.js";

dotenv.config();

const port = Number(process.env.PORT) || 3000;

initializeDataSources().finally(() => {
  app.listen(port, () => {
    console.log(`CineStack API running at http://localhost:${port}`);
  });
});

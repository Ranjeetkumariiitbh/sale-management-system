// backend/src/index.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { loadSalesData } from "./utils/csvLoader.js";
import { SalesService } from "./services/salesService.js";
import { createSalesController } from "./controllers/salesController.js";
import { createSalesRouter } from "./routes/salesRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;

async function main() {
  // CSV file ka path
  const csvPath = path.join(
    __dirname,
    "..",
    "data",
    "truestate_assignment_dataset.csv"
  );
  console.log("CSV PATH =>", csvPath);

  // CSV load karo
  const salesData = await loadSalesData(csvPath);

  const service = new SalesService(salesData);
  const controller = createSalesController(service);
  const router = createSalesRouter(controller);

  const app = express();
  app.use(cors());
  app.use(express.json());

  // API routes
  app.use("/api/sales", router);

  // Health check
  app.get("/health", (req, res) => res.json({ status: "ok" }));

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

// startup
main().catch((e) => {
  console.error("Startup error", e);
  process.exit(1);
});

// routes/salesRoutes.js
// backend/src/routes/salesRoutes.js
// backend/src/routes/salesRoutes.js
// backend/src/routes/salesRoutes.js
import express from "express";

export function createSalesRouter(controller) {
  const router = express.Router();

  // GET /api/sales
  router.get("/", controller.getSales);

  // GET /api/sales/meta
  router.get("/meta", controller.getMetadata);

  return router;
}

// backend/src/controllers/salesController.js
import { buildSalesQueryFromRequest } from "../utils/buildQuery.js";

export function createSalesController(salesService) {
  return {
    getSales: (req, res, next) => {
      try {
        const query = buildSalesQueryFromRequest(req);
        const result = salesService.querySales(query);
        res.json(result);
      } catch (err) {
        next(err);
      }
    },

    getMetadata: (req, res, next) => {
      try {
        const meta = salesService.getFilterMetadata();
        res.json(meta);
      } catch (err) {
        next(err);
      }
    }
  };
}

// backend/src/utils/csvLoader.js
import fs from "fs";
import csv from "csv-parser";
import { mapCsvRowToSalesRecord } from "../models/salesRecord.js";

export async function loadSalesData(csvPath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        try {
          results.push(mapCsvRowToSalesRecord(row));
        } catch (e) {
          console.error("Row parse error:", e);
        }
      })
      .on("end", () => {
        console.log(`Loaded ${results.length} sales rows`);
        resolve(results);
      })
      .on("error", (err) => {
        console.error("CSV read error:", err);
        reject(err);
      });
  });
}

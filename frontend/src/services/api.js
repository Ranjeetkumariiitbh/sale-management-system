// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchSales(params) {
  const url = new URL(BASE_URL + "/api/sales");
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) {
      if (v.length) url.searchParams.set(k, v.join(","));
    } else if (v !== "") {
      url.searchParams.set(k, String(v));
    }
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch sales");
  return res.json();
}

export async function fetchMeta() {
  const res = await fetch(BASE_URL + "/api/sales/meta");
  if (!res.ok) throw new Error("Failed to fetch metadata");
  return res.json();
}

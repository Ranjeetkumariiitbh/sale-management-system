// utils/buildQuery.js
// backend/src/utils/buildQuery.js

export function buildSalesQueryFromRequest(req) {
  const {
    search,
    region,
    gender,
    ageMin,
    ageMax,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
    sortBy,
    sortDir,
    page = "1",
    pageSize = "10"
  } = req.query;

  const parseMulti = (value) =>
    value
      ? value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

  return {
    search: (search || "").trim(),
    regions: parseMulti(region),
    genders: parseMulti(gender),
    ageMin: ageMin ? Number(ageMin) : null,
    ageMax: ageMax ? Number(ageMax) : null,
    productCategories: parseMulti(productCategory),
    tags: parseMulti(tags),
    paymentMethods: parseMulti(paymentMethod),
    dateFrom: dateFrom || null,
    dateTo: dateTo || null,
    sortBy: sortBy || "date",
    sortDir: sortDir === "asc" ? "asc" : "desc",
    page: Math.max(1, Number(page) || 1),
    pageSize: Math.min(50, Math.max(1, Number(pageSize) || 10))
  };
}

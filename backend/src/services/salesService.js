// backend/src/services/salesService.js

// Helper functions
function inRange(value, min, max) {
  if (value == null) return false;
  if (min != null && value < min) return false;
  if (max != null && value > max) return false;
  return true;
}

function inMulti(value, list) {
  if (!list || list.length === 0) return true;
  return list.includes(value);
}

function hasAnyTag(recordTags, filterTags) {
  if (!filterTags || filterTags.length === 0) return true;
  if (!recordTags || recordTags.length === 0) return false;
  return recordTags.some((t) => filterTags.includes(t));
}

export class SalesService {
  constructor(data) {
    this.data = data || [];
  }

  querySales(q) {
    const {
      search,
      regions,
      genders,
      ageMin,
      ageMax,
      productCategories,
      tags,
      paymentMethods,
      dateFrom,
      dateTo,
      sortBy,
      sortDir,
      page,
      pageSize
    } = q;

    const searchLower = search.toLowerCase();

    // 1) Filtering
    let filtered = this.data.filter((r) => {
      if (searchLower) {
        const matchName =
          r.customerName &&
          r.customerName.toLowerCase().includes(searchLower);
        const matchPhone =
          r.phoneNumber &&
          r.phoneNumber.toLowerCase().includes(searchLower);
        if (!matchName && !matchPhone) return false;
      }

      if (!inMulti(r.customerRegion, regions)) return false;
      if (!inMulti(r.gender, genders)) return false;
      if (!inRange(r.age, ageMin, ageMax)) return false;
      if (!inMulti(r.productCategory, productCategories)) return false;
      if (!hasAnyTag(r.tags, tags)) return false;
      if (!inMulti(r.paymentMethod, paymentMethods)) return false;

      if (dateFrom && r.date && r.date < dateFrom) return false;
      if (dateTo && r.date && r.date > dateTo) return false;

      return true;
    });

    // 2) Sorting
    const dir = sortDir === "asc" ? 1 : -1;

    filtered.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "quantity") {
        cmp = (a.quantity || 0) - (b.quantity || 0);
      } else if (sortBy === "customerName") {
        const an = a.customerName || "";
        const bn = b.customerName || "";
        cmp = an.localeCompare(bn);
      } else {
        // default: date
        const ad = a.date || "";
        const bd = b.date || "";
        cmp = ad.localeCompare(bd);
      }
      return cmp * dir;
    });

    // 3) Pagination
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = filtered.slice(start, end);
    const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);

    return {
      total,
      page,
      pageSize,
      totalPages,
      items
    };
  }

  getFilterMetadata() {
    const unique = (arr, key) =>
      Array.from(
        new Set(arr.map((r) => r[key]).filter((v) => v != null && v !== ""))
      ).sort();

    return {
      regions: unique(this.data, "customerRegion"),
      genders: unique(this.data, "gender"),
      productCategories: unique(this.data, "productCategory"),
      paymentMethods: unique(this.data, "paymentMethod"),
      tags: Array.from(
        new Set(
          this.data
            .flatMap((r) => r.tags || [])
            .filter((t) => t != null && t !== "")
        )
      ).sort()
    };
  }
}

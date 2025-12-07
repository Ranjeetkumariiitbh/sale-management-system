// src/hooks/useSalesQuery.js
import { useEffect, useState } from "react";
import { fetchSales, fetchMeta } from "../services/api";

const PAGE_SIZE = 10;

export function useSalesQuery() {
  const [meta, setMeta] = useState(null);

  const [search, setSearch] = useState("");
  const [regions, setRegions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);

  const [data, setData] = useState({ items: [], total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMeta()
      .then(setMeta)
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchSales({
      search,
      region: regions,
      gender: genders,
      ageMin: ageMin || undefined,
      ageMax: ageMax || undefined,
      productCategory: productCategories,
      tags,
      paymentMethod: paymentMethods,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      sortBy,
      sortDir,
      page,
      pageSize: PAGE_SIZE
    })
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [
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
    page
  ]);

  const resetPage = () => setPage(1);

  return {
    meta,
    state: {
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
      page
    },
    setSearch: (v) => { setSearch(v); resetPage(); },
    setRegions: (v) => { setRegions(v); resetPage(); },
    setGenders: (v) => { setGenders(v); resetPage(); },
    setAgeMin: (v) => { setAgeMin(v); resetPage(); },
    setAgeMax: (v) => { setAgeMax(v); resetPage(); },
    setProductCategories: (v) => { setProductCategories(v); resetPage(); },
    setTags: (v) => { setTags(v); resetPage(); },
    setPaymentMethods: (v) => { setPaymentMethods(v); resetPage(); },
    setDateFrom: (v) => { setDateFrom(v); resetPage(); },
    setDateTo: (v) => { setDateTo(v); resetPage(); },
    setSortBy: (v) => { setSortBy(v); resetPage(); },
    setSortDir: (v) => { setSortDir(v); resetPage(); },
    setPage,
    data,
    loading,
    error,
    pageSize: PAGE_SIZE
  };
}

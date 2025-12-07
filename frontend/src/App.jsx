// src/App.jsx
import "./styles/main.css";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import SortDropdown from "./components/SortDropdown";
import TransactionTable from "./components/TransactionTable";
import PaginationControls from "./components/PaginationControls";
import { useSalesQuery } from "./hooks/useSalesQuery";

export default function App() {
  const {
    meta,
    state,
    setSearch,
    setRegions,
    setGenders,
    setAgeMin,
    setAgeMax,
    setProductCategories,
    setTags,
    setPaymentMethods,
    setDateFrom,
    setDateTo,
    setSortBy,
    setSortDir,
    setPage,
    data,
    loading,
    error
  } = useSalesQuery();

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Sales Management System</h1>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <SearchBar value={state.search} onChange={setSearch} />
          <FilterPanel
            meta={meta}
            regions={state.regions}
            setRegions={setRegions}
            genders={state.genders}
            setGenders={setGenders}
            ageMin={state.ageMin}
            setAgeMin={setAgeMin}
            ageMax={state.ageMax}
            setAgeMax={setAgeMax}
            productCategories={state.productCategories}
            setProductCategories={setProductCategories}
            tags={state.tags}
            setTags={setTags}
            paymentMethods={state.paymentMethods}
            setPaymentMethods={setPaymentMethods}
            dateFrom={state.dateFrom}
            setDateFrom={setDateFrom}
            dateTo={state.dateTo}
            setDateTo={setDateTo}
          />
        </aside>

        <main className="main-content">
          <div className="top-bar" style={{display: "flex", justifyContent:"space-between", marginBottom: "8px"}}>
            <SortDropdown
              sortBy={state.sortBy}
              sortDir={state.sortDir}
              setSortBy={setSortBy}
              setSortDir={setSortDir}
            />
            <div className="summary">
              {loading ? "Loading..." : `${data.total} records`}
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <TransactionTable items={data.items} />

          <PaginationControls
            page={state.page}
            totalPages={data.totalPages || 1}
            setPage={setPage}
          />
        </main>
      </div>
    </div>
  );
}

// src/components/SortDropdown.jsx
export default function SortDropdown({ sortBy, sortDir, setSortBy, setSortDir }) {
  return (
    <div className="sort-bar">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name (A–Z)</option>
      </select>
      <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
}

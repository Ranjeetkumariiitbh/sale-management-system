// src/components/FilterPanel.jsx
function MultiSelect({ label, options, selected, onChange }) {
  const toggle = (val) => {
    if (selected.includes(val)) {
      onChange(selected.filter((x) => x !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div className="filter-group">
      <div className="filter-label">{label}</div>
      <div className="filter-options">
        {options.map((o) => (
          <label key={o}>
            <input
              type="checkbox"
              checked={selected.includes(o)}
              onChange={() => toggle(o)}
            />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FilterPanel(props) {
  const {
    meta,
    regions,
    setRegions,
    genders,
    setGenders,
    ageMin,
    setAgeMin,
    ageMax,
    setAgeMax,
    productCategories,
    setProductCategories,
    tags,
    setTags,
    paymentMethods,
    setPaymentMethods,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo
  } = props;

  if (!meta) return null;

  return (
    <div className="filter-panel">
      <MultiSelect
        label="Customer Region"
        options={meta.regions}
        selected={regions}
        onChange={setRegions}
      />
      <MultiSelect
        label="Gender"
        options={meta.genders}
        selected={genders}
        onChange={setGenders}
      />
      <div className="filter-group">
        <div className="filter-label">Age Range</div>
        <div className="filter-inline">
          <input
            type="number"
            placeholder="Min"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
          />
          <span>–</span>
          <input
            type="number"
            placeholder="Max"
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value)}
          />
        </div>
      </div>
      <MultiSelect
        label="Product Category"
        options={meta.productCategories}
        selected={productCategories}
        onChange={setProductCategories}
      />
      <MultiSelect
        label="Tags"
        options={meta.tags}
        selected={tags}
        onChange={setTags}
      />
      <MultiSelect
        label="Payment Method"
        options={meta.paymentMethods}
        selected={paymentMethods}
        onChange={setPaymentMethods}
      />
      <div className="filter-group">
        <div className="filter-label">Date Range</div>
        <div className="filter-inline">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <span>–</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

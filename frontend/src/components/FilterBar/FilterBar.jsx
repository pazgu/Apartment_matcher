import "./FilterBar.css";

const FilterBar = ({ handleFilterChange, filters }) => {
  return (
    <div className="filters-container">
      <label>
        מספר חדרים:
        <input
          type="number"
          name="rooms"
          value={filters.rooms}
          onChange={handleFilterChange}
          placeholder="בחר מספר חדרים"
        />
      </label>
      <label>
        גודל דירה מינימלי (מ"ר):
        <input
          type="number"
          name="size"
          value={filters.size}
          onChange={handleFilterChange}
          placeholder="בחר גודל חדר"
        />
      </label>
      <label>
        מחיר מקסימלי:
        <input
          type="number"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          placeholder="בחר מחיר מקסימלי"
        />
      </label>
    </div>
  );
};

export default FilterBar;

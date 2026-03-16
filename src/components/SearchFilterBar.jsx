const SearchFilterBar = ({ query, onQueryChange, categories, activeCategory, onCategoryChange }) => (
  <div className="search-filter">
    <input
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      placeholder="Cari istilah, konsep, atau disease site..."
      className="input"
    />
    {categories && (
      <div className="chip-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip ${activeCategory === category ? 'chip--active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    )}
  </div>
)

export default SearchFilterBar

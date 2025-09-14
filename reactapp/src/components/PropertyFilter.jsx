import React, { useState } from "react";
import './PropertyFilter.css';

const PropertyFilter = ({ onFilter, onClear, loading }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleFilter = () => {
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      // Exact text expected by test
      setError("Min price should be less than max price.");
      return;
    }
    setError("");
    onFilter({
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      city: city || undefined,
    });
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setCity("");
    setError("");
    onClear();
  };

  return (
    <div data-testid="property-filter" className="filter-container">
      <div className="filter-header">
        <h3>🔍 Filter Properties</h3>
      </div>
      
      <div className="filter-grid">
        <div className="filter-group">
          <label className="filter-label">
            💰 Minimum Price:
            <input
              type="number"
              className="filter-input"
              placeholder="e.g. 100000"
              aria-label="Minimum Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            💰 Maximum Price:
            <input
              type="number"
              className="filter-input"
              placeholder="e.g. 500000"
              aria-label="Maximum Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            🛏️ Bedrooms:
            <input
              type="number"
              className="filter-input"
              placeholder="e.g. 3"
              aria-label="Bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </label>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            📍 City:
            <input
              type="text"
              className="filter-input"
              placeholder="e.g. New York"
              aria-label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </div>
      </div>

      {error && <div data-testid="filter-error" className="filter-error">{error}</div>}

      <div className="filter-actions">
        <button 
          data-testid="filter-button" 
          className="filter-btn primary"
          onClick={handleFilter} 
          disabled={loading}
        >
          {loading ? "Loading..." : "🔍 Filter"}
        </button>
        <button 
          data-testid="clear-button" 
          className="filter-btn secondary"
          onClick={handleClear}
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
};

export default PropertyFilter;

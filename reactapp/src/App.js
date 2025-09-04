import React, { useEffect, useState } from "react";
import PropertyList from "./components/PropertyList";
import PropertyDetail from "./components/PropertyDetail";
import PropertyFilter from "./components/PropertyFilter";
import { fetchAllProperties, fetchPropertyById, filterProperties } from "./utils/api";

const App = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProperties = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAllProperties();
      setProperties(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleSelect = async (property) => {
    setLoading(true);
    try {
      const detail = await fetchPropertyById(property.id);
      setSelectedProperty(detail);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleFilter = async (criteria) => {
    setLoading(true);
    try {
      const result = await filterProperties(criteria);
      setProperties(result);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleClear = () => {
    loadProperties();
  };

  return (
    <div className="app">
      <h1>Real Estate Listing Management System</h1>

      {selectedProperty ? (
        <PropertyDetail
          property={selectedProperty}
          onBack={() => setSelectedProperty(null)}
        />
      ) : (
        <>
          <PropertyFilter
            onFilter={handleFilter}
            onClear={handleClear}
            loading={loading}
          />
          <PropertyList
            properties={properties}
            loading={loading}
            error={error}
            onSelect={handleSelect}
          />
        </>
      )}
    </div>
  );
};

export default App;

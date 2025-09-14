import React, { useState, useMemo } from "react";
import './PropertyList.css';

const formatPrice = (price) => {
  return `$${price.toLocaleString()}`;
};

const PropertyList = ({ properties, loading, error, onSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 6;

  const sortedProperties = useMemo(() => {
    if (!properties) return [];
    return [...properties].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [properties, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = sortedProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  if (loading) return <div data-testid="loading" className="loading">Loading...</div>;
  if (error) return <div data-testid="error" className="error">[Error - You need to specify the message]</div>;
  if (!properties || properties.length === 0)
    return <div data-testid="empty-list" className="empty-list">No properties found.</div>;

  return (
    <div className="property-list-container">
      <div className="list-controls">
        <div className="sort-controls">
          <span>Sort by:</span>
          <button 
            className={`sort-btn ${sortBy === 'title' ? 'active' : ''}`}
            onClick={() => handleSort('title')}
          >
            Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
            onClick={() => handleSort('price')}
          >
            Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'city' ? 'active' : ''}`}
            onClick={() => handleSort('city')}
          >
            City {sortBy === 'city' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
        <div className="results-info">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedProperties.length)} of {sortedProperties.length} properties
        </div>
      </div>

      <div data-testid="property-list" className="property-list">
        {currentProperties.map((property) => (
          <div
            key={property.id}
            data-testid={`property-card-${property.id}`}
            className="property-card"
            onClick={() => onSelect(property)}
          >
            <div className="property-image">
              <div className="property-status">
                {property.isAvailable ? 'Available' : 'Sold'}
              </div>
            </div>
            <div className="property-content">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-price">{formatPrice(property.price)}</p>
              <div className="property-details">
                <span className="detail-item">
                  <span className="icon">🛏️</span> {property.bedrooms} Beds
                </span>
                <span className="detail-item">
                  <span className="icon">🚿</span> {property.bathrooms} Baths
                </span>
                <span className="detail-item">
                  <span className="icon">📐</span> {property.area} sqft
                </span>
              </div>
              <p className="property-location">
                <span className="icon">📍</span> {property.city}
              </p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
          
          <button 
            className="page-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyList;

import React from "react";

const formatPrice = (price) => {
  return `$${price.toLocaleString()}`;
};

const PropertyList = ({ properties, loading, error, onSelect }) => {
  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">[Error - You need to specify the message]</div>;
  if (!properties || properties.length === 0)
    return <div data-testid="empty-list">No properties found.</div>;

  return (
    <div data-testid="property-list" className="property-list">
      {properties.map((property) => (
        <div
          key={property.id}
          data-testid={`property-card-${property.id}`}
          className="property-card"
          onClick={() => onSelect(property)}
        >
          <h3>{property.title}</h3>
          <p>{formatPrice(property.price)}</p>
          <p>{property.bedrooms} Beds • {property.bathrooms} Baths</p>
          <p>{property.area} sqft • {property.city}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;

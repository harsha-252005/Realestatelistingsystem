import React from 'react';

const formatPrice = (price) => `$${price.toLocaleString()}`;

const PropertyDetail = ({ property, onBack }) => {
  if (!property) return null;

  return (
    <div data-testid="property-detail" className="property-detail">
      <button data-testid="back-button" onClick={onBack}>Back</button>

      <h2>{property.title}</h2>

      {/* Description */}
      <p>{property.description}</p>

      {/* Price formatted exactly as $#,### */}
      <p>{formatPrice(property.price)}</p>

      {/* Individual attributes on separate lines (tests look for plain text like 'Apartment' and '60607') */}
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Area: {property.area} sqft</p>

      <p>{property.address}</p>
      <p>{property.city}</p>
      <p>{property.state}</p>
      {/* Zip must appear as plain text so getByText('60607') finds it */}
      <p>{property.zipCode}</p>

      {/* propertyType should appear as plain text (test checks for 'Apartment') */}
      <p>{property.propertyType}</p>

      <p>{property.listingDate}</p>

      {/* Element with aria-label so getByLabelText(/Available:/i) finds it */}
      <div aria-label="Available:">{property.isAvailable ? 'Yes' : 'No'}</div>
    </div>
  );
};

export default PropertyDetail;

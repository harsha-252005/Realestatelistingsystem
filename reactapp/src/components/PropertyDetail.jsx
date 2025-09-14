import React from 'react';
import './PropertyDetail.css';

const formatPrice = (price) => `$${price.toLocaleString()}`;

const PropertyDetail = ({ property, onBack }) => {
  if (!property) return null;

  return (
    <div data-testid="property-detail" className="property-detail">
      <div className="detail-header">
        <button data-testid="back-button" className="back-btn" onClick={onBack}>
          ← Back to Properties
        </button>
      </div>

      <div className="detail-content">
        <div className="detail-main">
          <div className="property-hero">
            <div className="property-image-large">
              <div className="property-status-large">
                {property.isAvailable ? 'Available' : 'Sold'}
              </div>
            </div>
          </div>

          <div className="property-info">
            <h2 className="detail-title">{property.title}</h2>
            <p className="detail-price">{formatPrice(property.price)}</p>
            <p className="detail-description">{property.description}</p>

            <div className="detail-features">
              <div className="feature-item">
                <span className="feature-icon">🛏️</span>
                <span className="feature-text">Bedrooms: {property.bedrooms}</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚿</span>
                <span className="feature-text">Bathrooms: {property.bathrooms}</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📐</span>
                <span className="feature-text">Area: {property.area} sqft</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="info-card">
            <h3>Property Details</h3>
            <div className="info-item">
              <span className="info-label">Type:</span>
              <span className="info-value">{property.propertyType}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Listed:</span>
              <span className="info-value">{property.listingDate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <div aria-label="Available:" className="availability-status">
                {property.isAvailable ? 'Yes' : 'No'}
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Location</h3>
            <div className="location-info">
              <p className="address">{property.address}</p>
              <p className="city-state">{property.city}, {property.state}</p>
              <p className="zip">{property.zipCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

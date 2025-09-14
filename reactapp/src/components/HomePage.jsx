import React from 'react';
import './HomePage.css';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Property</h1>
          <p className="hero-subtitle">
            Discover the perfect home with our comprehensive real estate platform
          </p>
          <button 
            className="cta-button"
            onClick={() => onNavigate('properties')}
          >
            Browse Properties
          </button>
        </div>
      </div>
      
      <div className="features-section">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Wide Selection</h3>
              <p>Browse through thousands of properties</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search</h3>
              <p>Filter by price, location, and amenities</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing and great deals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
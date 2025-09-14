import React from 'react';
import './Navigation.css';
import './Auth.css';

const Navigation = ({ currentPage, onNavigate, user, onLogout }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => onNavigate('home')}>
          <span className="brand-icon">🏡</span>
          RealEstate
        </div>
        <div className="nav-links">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          {user && user.role === 'BUYER' && (
            <button 
              className={`nav-link ${currentPage === 'properties' ? 'active' : ''}`}
              onClick={() => onNavigate('properties')}
            >
              Browse Properties
            </button>
          )}
          {user && user.role === 'SELLER' && (
            <button 
              className={`nav-link ${currentPage === 'add-property' ? 'active' : ''}`}
              onClick={() => onNavigate('add-property')}
            >
              Add Property
            </button>
          )}
        </div>
        
        {user ? (
          <div className="user-info">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user.username}</span>
              <span className={`${user.role.toLowerCase()}-badge`}>{user.role}</span>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button 
            className="nav-link"
            onClick={() => onNavigate('login')}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
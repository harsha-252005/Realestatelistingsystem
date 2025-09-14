import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProperty from "./components/AddProperty";
import PropertyList from "./components/PropertyList";
import PropertyDetail from "./components/PropertyDetail";
import PropertyFilter from "./components/PropertyFilter";
import { fetchAllProperties, fetchPropertyById, filterProperties } from "./utils/api";
import "./components/AdminStyles.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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
    if (currentPage === 'properties' && properties.length === 0 && user) {
      loadProperties();
    }
  }, [currentPage, properties.length, user]);

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

  const handleNavigate = (page) => {
    if (page === 'properties' && !user) {
      setCurrentPage('login');
      return;
    }
    if (page === 'admin' && (!user || user.role !== 'ADMIN')) {
      return;
    }
    setCurrentPage(page);
    setSelectedProperty(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('home');
    setProperties([]);
  };

  const handlePropertyAdded = () => {
    setCurrentPage('properties');
    setProperties([]); // Clear to force reload
  };

  const renderContent = () => {
    if (selectedProperty) {
      return (
        <PropertyDetail
          property={selectedProperty}
          onBack={() => setSelectedProperty(null)}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} user={user} />;
      case 'login':
        return authMode === 'login' ? (
          <Login 
            onLogin={handleLogin} 
            onSwitchToSignup={() => setAuthMode('signup')} 
          />
        ) : (
          <Signup 
            onSignup={handleSignup} 
            onSwitchToLogin={() => setAuthMode('login')} 
          />
        );
      case 'properties':
        if (!user) {
          setCurrentPage('login');
          return null;
        }
        return (
          <div className="properties-page">
            <div className="page-header">
              <h1>Properties</h1>
              <p>Find your perfect property from our extensive collection</p>
            </div>
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
          </div>
        );
      case 'add-property':
        if (!user) {
          setCurrentPage('login');
          return null;
        }
        return (
          <AddProperty 
            onPropertyAdded={handlePropertyAdded}
            onCancel={() => setCurrentPage('properties')}
          />
        );
      case 'admin':
        if (!user || user.role !== 'ADMIN') {
          return <div className="access-denied">Access Denied: Admin Only</div>;
        }
        return (
          <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user.username}! You have admin access.</p>
          </div>
        );
      default:
        return <HomePage onNavigate={handleNavigate} user={user} />;
    }
  };

  return (
    <div className="app">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        user={user}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

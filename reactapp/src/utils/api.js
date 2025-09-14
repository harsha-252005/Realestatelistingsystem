const API_BASE_URL = 'http://localhost:8080/api/properties';

export const fetchAllProperties = async () => {
  try {
    console.log('Fetching properties from:', API_BASE_URL);
    const response = await fetch(API_BASE_URL);
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched properties:', data);
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const fetchPropertyById = async (id) => {
  try {
    console.log('Fetching property by ID:', id);
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Property not found: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched property:', data);
    return data;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    throw error;
  }
};

export const filterProperties = async ({ minPrice, maxPrice, bedrooms, city }) => {
  const params = new URLSearchParams();
  if (minPrice) params.append('minPrice', minPrice);
  if (maxPrice) params.append('maxPrice', maxPrice);
  if (bedrooms) params.append('bedrooms', bedrooms);
  if (city) params.append('city', city);
  
  const response = await fetch(`${API_BASE_URL}/filter?${params}`);
  if (!response.ok) throw new Error('Failed to filter properties');
  return response.json();
};

export const createProperty = async (property) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property)
  });
  if (!response.ok) throw new Error('Failed to create property');
  return response.json();
};

export const updateProperty = async (id, property) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property)
  });
  if (!response.ok) throw new Error('Failed to update property');
  return response.json();
};

export const deleteProperty = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete property');
};

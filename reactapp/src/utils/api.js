// Mock API utilities

const properties = [
  { id: 1, title: 'Modern Apartment', description: 'Nice apartment', price: 120000, bedrooms: 2, bathrooms: 2, area: 850, city: 'New York', address: '123 Main St', state: 'NY', zipCode: '10001', isAvailable: true, propertyType: 'Apartment', listingDate: '2024-01-01' },
  { id: 2, title: 'Cozy Cottage', description: 'Small cottage', price: 90000, bedrooms: 3, bathrooms: 2, area: 1200, city: 'Austin', address: '456 Oak Rd', state: 'TX', zipCode: '73301', isAvailable: false, propertyType: 'House', listingDate: '2024-02-15' },
  { id: 3, title: 'Luxury Villa', description: 'Big villa', price: 500000, bedrooms: 5, bathrooms: 4, area: 3500, city: 'Los Angeles', address: '789 Sunset Blvd', state: 'CA', zipCode: '90001', isAvailable: true, propertyType: 'Villa', listingDate: '2024-03-10' }
];

export const fetchAllProperties = async () => {
  return new Promise(resolve => setTimeout(() => resolve(properties), 200));
};

export const fetchPropertyById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const property = properties.find(p => p.id === id);
      if (property) resolve(property);
      else reject(new Error('Property not found'));
    }, 200);
  });
};

export const filterProperties = async ({ minPrice, maxPrice, bedrooms, city }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let result = [...properties];
      if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
      if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
      if (bedrooms) result = result.filter(p => p.bedrooms === Number(bedrooms));
      if (city) result = result.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
      resolve(result);
    }, 200);
  });
};

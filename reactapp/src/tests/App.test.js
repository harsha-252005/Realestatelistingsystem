import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';

import { fetchAllProperties, fetchPropertyById, filterProperties } from '../utils/api';

// Mocks for axios (via utils/api)
jest.mock('../utils/api', () => ({
  fetchAllProperties: jest.fn(),
  fetchPropertyById: jest.fn(),
  filterProperties: jest.fn()
}));

describe('App integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderPropertyListTest: renders all properties in a list', async () => {
    const properties = [
      {
        id: 1,
        title: 'Sunny Home',
        price: 305000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
        city: 'Miami',
      },
      {
        id: 2,
        title: 'Lakeview Condo',
        price: 425000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        city: 'Chicago',
      },
    ];
    fetchAllProperties.mockResolvedValueOnce(properties);

    render(<App />);
    expect(screen.getByText('Real Estate Listing Management System')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('property-list')).toBeInTheDocument();
    });
    expect(screen.getByText('Sunny Home')).toBeInTheDocument();
    expect(screen.getByText('Lakeview Condo')).toBeInTheDocument();
    expect(screen.getAllByText('$305,000')[0]).toBeInTheDocument();
    expect(screen.getAllByText('$425,000')[0]).toBeInTheDocument();
  });

  it('propertyDetailViewTest: shows full details when a property is selected and can return back', async () => {
    const properties = [
      {
        id: 1,
        title: 'Urban Loft',
        price: 400000,
        bedrooms: 2,
        bathrooms: 1.5,
        area: 950,
        city: 'Chicago',
      },
    ];
    const detail = {
      ...properties[0],
      description: 'Modern space with views',
      address: '789 Downtown Ave',
      state: 'IL',
      zipCode: '60607',
      propertyType: 'Apartment',
      listingDate: '2023-06-20',
      isAvailable: true
    };
    fetchAllProperties.mockResolvedValueOnce(properties);
    fetchPropertyById.mockResolvedValueOnce(detail);

    render(<App />);
    await screen.findByText('Urban Loft');
    fireEvent.click(screen.getByTestId('property-card-1'));
    await waitFor(() => {
      expect(screen.getByTestId('property-detail')).toBeInTheDocument();
    });
    expect(screen.getByText('Urban Loft')).toBeInTheDocument();
    expect(screen.getByText('Modern space with views')).toBeInTheDocument();
    expect(screen.getByText('$400,000')).toBeInTheDocument();
    expect(screen.getByLabelText(/Available:/i)).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('60607')).toBeInTheDocument();
    // Go back
    fireEvent.click(screen.getByTestId('back-button'));
    expect(screen.queryByTestId('property-detail')).toBeNull();
    expect(screen.getByTestId('property-list')).toBeInTheDocument();
  });

  it('propertyFilteringTest: filters properties by criteria', async () => {
    // Initial load
    fetchAllProperties.mockResolvedValueOnce([
      {
        id: 3,
        title: 'Sunny House',
        price: 250000,
        bedrooms: 2,
        bathrooms: 1,
        area: 900,
        city: 'New York'
      },
      {
        id: 4,
        title: 'Modern Apartment',
        price: 500000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1200,
        city: 'New York'
      },
    ]);
    filterProperties.mockResolvedValueOnce([
      {
        id: 4,
        title: 'Modern Apartment',
        price: 500000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1200,
        city: 'New York'
      },
    ]);

    render(<App />);
    await screen.findByText('Sunny House');
    // Open filter
    fireEvent.change(screen.getByLabelText(/Minimum Price/i), { target: { value: '200000' } });
    fireEvent.change(screen.getByLabelText(/Maximum Price/i), { target: { value: '550000' } });
    fireEvent.change(screen.getByLabelText(/Bedrooms/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'New York' } });
    fireEvent.click(screen.getByTestId('filter-button'));
    // Wait for filtered results
    await waitFor(() => {
      expect(screen.getByText('Modern Apartment')).toBeInTheDocument();
    });
    // Wait for Modern Apartment to remain but Sunny House to be gone (should not be present)
    await waitFor(() => {
      expect(screen.queryByText('Sunny House')).toBeNull();
    });
  });

  it('apiErrorHandlingTest: shows error when API call fails', async () => {
    fetchAllProperties.mockRejectedValueOnce(new Error('Unable to reach server'));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
    expect(screen.getByText(/Unable to reach server/)).toBeInTheDocument();
  });

  it('shows empty state if filter returns no results', async () => {
    fetchAllProperties.mockResolvedValueOnce([
      {
        id: 11,
        title: 'Ocean Villa',
        price: 850000,
        bedrooms: 5,
        bathrooms: 4,
        area: 3500,
        city: 'Miami'
      }
    ]);
    filterProperties.mockResolvedValueOnce([]);
    render(<App />);
    await screen.findByText('Ocean Villa');
    // Filter to a result that returns nothing
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Nowhere' } });
    fireEvent.click(screen.getByTestId('filter-button'));
    await waitFor(() => {
      expect(screen.getByTestId('empty-list')).toHaveTextContent('No properties found.');
    });
  });
});

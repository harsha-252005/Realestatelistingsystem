import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyDetail from '../components/PropertyDetail';

describe('PropertyDetail', () => {
  const property = {
    id: 1,
    title: 'Urban Loft',
    description: 'Modern space with views',
    price: 400000,
    bedrooms: 2,
    bathrooms: 1.5,
    area: 950,
    address: '789 Downtown Ave',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60607',
    propertyType: 'Apartment',
    listingDate: '2023-06-20',
    isAvailable: true
  };

  it('renders all property attributes', () => {
    render(<PropertyDetail property={property} onBack={() => {}} />);
    expect(screen.getByText('Urban Loft')).toBeInTheDocument();
    expect(screen.getByText('Modern space with views')).toBeInTheDocument();
    expect(screen.getByText('$400,000')).toBeInTheDocument();
    expect(screen.getByLabelText(/Available:/i)).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('60607')).toBeInTheDocument();
  });

  it('renders and calls onBack when back button is clicked', () => {
    const onBack = jest.fn();
    render(<PropertyDetail property={property} onBack={onBack} />);
    fireEvent.click(screen.getByTestId('back-button'));
    expect(onBack).toHaveBeenCalled();
  });

  it('renders nothing if property is null', () => {
    const { container } = render(<PropertyDetail property={null} onBack={() => {}} />);
    expect(container.innerHTML).toBe("");
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyList from '../components/PropertyList';

describe('PropertyList', () => {
  const properties = [
    {
      id: 1,
      title: 'Luxury Villa',
      price: 350000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      city: 'New York',
    },
    {
      id: 2,
      title: 'Cozy Studio',
      price: 125000,
      bedrooms: 1,
      bathrooms: 1,
      area: 500,
      city: 'Los Angeles',
    },
  ];

  it('renders loading state', () => {
    render(<PropertyList properties={[]} loading={true} error={null} onSelect={() => {}} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<PropertyList properties={[]} loading={false} error="Something went wrong" onSelect={() => {}} />);
    expect(screen.getByTestId('error')).toHaveTextContent('Something went wrong');
  });

  it('renders empty state', () => {
    render(<PropertyList properties={[]} loading={false} error={null} onSelect={() => {}} />);
    expect(screen.getByTestId('empty-list')).toHaveTextContent('No properties found.');
  });

  it('renders a list of properties', () => {
    render(<PropertyList properties={properties} loading={false} error={null} onSelect={() => {}} />);
    expect(screen.getByTestId('property-list')).toBeInTheDocument();
    expect(screen.getByText('Luxury Villa')).toBeInTheDocument();
    expect(screen.getByText('Cozy Studio')).toBeInTheDocument();
  });

  it('renders property price formatted with commas and dollar', () => {
    render(<PropertyList properties={properties} loading={false} error={null} onSelect={() => {}} />);
    expect(screen.getAllByText('$350,000')[0]).toBeInTheDocument();
    expect(screen.getAllByText('$125,000')[0]).toBeInTheDocument();
  });

  it('selects a property on click', () => {
    const handleSelect = jest.fn();
    render(<PropertyList properties={properties} loading={false} error={null} onSelect={handleSelect} />);
    fireEvent.click(screen.getByTestId('property-card-1'));
    expect(handleSelect).toHaveBeenCalledWith(properties[0]);
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyFilter from '../components/PropertyFilter';

describe('PropertyFilter', () => {
  it('renders the filter form fields', () => {
    render(<PropertyFilter onFilter={() => {}} onClear={() => {}} loading={false}/>);
    expect(screen.getByLabelText(/Minimum Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Maximum Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByTestId('filter-button')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button')).toBeInTheDocument();
  });

  it('calls onFilter with criteria on Filter button click', () => {
    const onFilter = jest.fn();
    render(<PropertyFilter onFilter={onFilter} onClear={() => {}} loading={false}/>);
    fireEvent.change(screen.getByLabelText(/Minimum Price/i), { target: { value: '200000' } });
    fireEvent.change(screen.getByLabelText(/Maximum Price/i), { target: { value: '500000' } });
    fireEvent.change(screen.getByLabelText(/Bedrooms/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'New York' } });
    fireEvent.click(screen.getByTestId('filter-button'));
    expect(onFilter).toHaveBeenCalledWith({ minPrice: 200000, maxPrice: 500000, bedrooms: 2, city: 'New York' });
  });

  it('calls onClear and resets fields', () => {
    const onClear = jest.fn();
    render(<PropertyFilter onFilter={() => {}} onClear={onClear} loading={false}/>);
    fireEvent.change(screen.getByLabelText(/Minimum Price/i), { target: { value: '100000' } });
    fireEvent.change(screen.getByLabelText(/Maximum Price/i), { target: { value: '300000' } });
    fireEvent.click(screen.getByTestId('clear-button'));
    expect(onClear).toHaveBeenCalled();
    expect(screen.getByLabelText(/Minimum Price/i).value).toBe('');
    expect(screen.getByLabelText(/Maximum Price/i).value).toBe('');
    expect(screen.getByLabelText(/Bedrooms/i).value).toBe('');
    expect(screen.getByLabelText(/City/i).value).toBe('');
  });

  it('shows error when minPrice > maxPrice', () => {
    render(<PropertyFilter onFilter={() => {}} onClear={() => {}} loading={false}/>);
    fireEvent.change(screen.getByLabelText(/Minimum Price/i), { target: { value: '600000' } });
    fireEvent.change(screen.getByLabelText(/Maximum Price/i), { target: { value: '300000' } });
    fireEvent.click(screen.getByTestId('filter-button'));
    expect(screen.getByTestId('filter-error')).toHaveTextContent('Min price should be less than max price.');
  });
});

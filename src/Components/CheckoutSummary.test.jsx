import { render, screen } from '@testing-library/react';
import CheckoutSummary from './CheckoutSummary';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';


describe('CheckoutSummary Component', () => {
  const mockProducts = [
    { name: 'Product 1', price: 20, tax: 0.1 },
    { name: 'Product 2', price: 30, tax: 0.15 },
  ];

  it('calculates and displays the correct subtotal', () => {
    render(<CheckoutSummary products={mockProducts} />);
    const subtotal = mockProducts.reduce((total, product) => total + product.price, 0).toFixed(2);
    expect(screen.getByText(`Product Subtotal: $${subtotal}`)).toBeInTheDocument();
  });

  it('calculates and displays the correct taxes', () => {
    render(<CheckoutSummary products={mockProducts} />);
    const taxes = mockProducts.reduce((total, product) => total + product.price * product.tax, 0).toFixed(2);
    expect(screen.getByText(`Estimated Taxes: $${taxes}`)).toBeInTheDocument();
  });

  it('calculates and displays the correct shipping', () => {
    const subtotal = mockProducts.reduce((total, product) => total + product.price, 0);
    const shipping = subtotal > 35 ? 0.0 : 20.0;

    render(<CheckoutSummary products={mockProducts} />);
    expect(
      screen.getByText(`Estimated Shipping: $${shipping.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it('calculates and displays the correct estimated total', () => {
    render(<CheckoutSummary products={mockProducts} />);
    const subtotal = mockProducts.reduce((total, product) => total + product.price, 0);
    const taxes = mockProducts.reduce((total, product) => total + product.price * product.tax, 0);
    const shipping = subtotal > 35 ? 0 : 20;
    const discount = 0;
    const estimatedTotal = (subtotal + taxes + shipping - discount).toFixed(2);

    expect(screen.getByText(`Estimated Total: $${estimatedTotal}`)).toBeInTheDocument();
  });

  it('renders the back to shopping bag button with correct text and link', () => {
    render(<CheckoutSummary products={mockProducts} />);
    const backButton = screen.getByRole('button', { name: /Back to Shopping Bag/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', 'http://localhost:5173/cart');
  });
});

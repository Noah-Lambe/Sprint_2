import { render, screen } from '@testing-library/react';
import Header from './Header';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom'; // Import jest-dom matchers

describe('Header Component', () => {
  it('renders the header image with correct alt text', () => {
    render(<Header />);
    const headerImage = screen.getByAltText("Annie's Electronics Header");
    expect(headerImage).toBeInTheDocument();
    expect(headerImage).toHaveAttribute('src', expect.stringContaining('annies_electronics.jpg'));
  });

  it('renders the account link with correct text and icon', () => {
    render(<Header />);
    const accountLink = screen.getByText('My Account');
    expect(accountLink).toBeInTheDocument();
    expect(accountLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/accounts');

    const accountIcon = screen.getByAltText('Account Icon');
    expect(accountIcon).toBeInTheDocument();
    expect(accountIcon).toHaveAttribute('src', expect.stringContaining('account_icon.png'));
  });

  it('renders the shopping bag link with correct text and icon', () => {
    render(<Header />);
    const bagLink = screen.getByText('Bag');
    expect(bagLink).toBeInTheDocument();
    expect(bagLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/cart');

    const bagIcon = screen.getByAltText('Shopping Bag Icon');
    expect(bagIcon).toBeInTheDocument();
    expect(bagIcon).toHaveAttribute('src', expect.stringContaining('shopping_bag.png'));
  });

  it('renders the navigation links in the bottom header', () => {
    render(<Header />);
    const shopLink = screen.getByText('Shop');
    expect(shopLink).toBeInTheDocument();
    expect(shopLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173');

    const supportLink = screen.getByText('Support');
    expect(supportLink).toBeInTheDocument();
    expect(supportLink.closest('a')).toHaveAttribute('href', '#');

    const aboutUsLink = screen.getByText('About Us');
    expect(aboutUsLink).toBeInTheDocument();
    expect(aboutUsLink.closest('a')).toHaveAttribute('href', '#');
  });
});

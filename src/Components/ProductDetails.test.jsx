import { render, screen, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => ({}),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ProductDetails Component', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders product details after fetching data', async () => {
    const mockProduct = {
      id: 1,
      name: 'Sample Product',
      description: 'This is a sample product.',
      price: 99.99,
      image: '/sample-image.jpg',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(mockProduct.name)).toBeInTheDocument());

    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toHaveAttribute('src', mockProduct.image);
  });

  it('renders error message if the product is not found', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(
      <MemoryRouter initialEntries={['/products/999']}>
        <Routes>
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Product not found/i)).toBeInTheDocument());
  });

  it('renders error message if fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch product data'));

    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Product not found/i)).toBeInTheDocument());
  });
});

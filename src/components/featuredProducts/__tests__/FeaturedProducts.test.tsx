import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeaturedProducts } from '../FeaturedProducts.component';
import { useFeaturedProducts } from '../hooks/useProducts.hook';
import type { ProductsResponse } from '../../../types/product.types';

vi.mock('../hooks/useProducts.hook');
const mockUseFeaturedProducts = vi.mocked(useFeaturedProducts);

const mockProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 99.99,
    thumbnail: 'test1.jpg',
    images: ['test1.jpg'],
    description: 'Test product description',
    discountPercentage: 0,
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 149.99,
    thumbnail: 'test2.jpg',
    images: ['test2.jpg'],
    description: 'Test product description 2',
    discountPercentage: 0,
  },
];

const mockProductsResponse: ProductsResponse = {
  products: mockProducts,
  total: 2,
  skip: 0,
  limit: 6,
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('FeaturedProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with correct title and products', () => {
    mockUseFeaturedProducts.mockReturnValue({
      data: mockProductsResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useFeaturedProducts>);

    render(
      <TestWrapper>
        <FeaturedProducts />
      </TestWrapper>
    );

    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('should show loading state when data is loading', () => {
    mockUseFeaturedProducts.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as ReturnType<typeof useFeaturedProducts>);

    render(
      <TestWrapper>
        <FeaturedProducts />
      </TestWrapper>
    );

    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons).toHaveLength(6);
  });

  it('should show error state when there is an error', () => {
    const errorMessage = 'Failed to fetch products';
    mockUseFeaturedProducts.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: errorMessage },
    } as ReturnType<typeof useFeaturedProducts>);

    render(
      <TestWrapper>
        <FeaturedProducts />
      </TestWrapper>
    );

    expect(screen.getByText('Error loading products')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should handle empty products array', () => {
    mockUseFeaturedProducts.mockReturnValue({
      data: { products: [], total: 0, skip: 0, limit: 6 },
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useFeaturedProducts>);

    render(
      <TestWrapper>
        <FeaturedProducts />
      </TestWrapper>
    );

    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('should render product images correctly', () => {
    mockUseFeaturedProducts.mockReturnValue({
      data: mockProductsResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useFeaturedProducts>);

    render(
      <TestWrapper>
        <FeaturedProducts />
      </TestWrapper>
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'test1.jpg');
    expect(images[1]).toHaveAttribute('src', 'test2.jpg');
  });

  it('should render product prices correctly', () => {
    mockUseFeaturedProducts.mockReturnValue({
      data: mockProductsResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useFeaturedProducts>);

    render(
      <TestWrapper>
        <FeaturedProducts />
      </TestWrapper>
    );

    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
  });

  it('should have proper heading structure', () => {
    mockUseFeaturedProducts.mockReturnValue({
      data: mockProductsResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useFeaturedProducts>);

    render(
      <TestWrapper>
        <FeaturedProducts />
      </TestWrapper>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Featured Products');
  });
});

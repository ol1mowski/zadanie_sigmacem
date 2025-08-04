import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewArrivals } from '../NewArrivals.component';
import { useNewArrivals } from '../hooks/useProducts.hook';
import type { ProductsResponse } from '../../../types/product.types';

vi.mock('../hooks/useProducts.hook');
const mockUseNewArrivals = vi.mocked(useNewArrivals);

const mockProducts = [
  {
    id: 1,
    title: 'New Product 1',
    price: 99.99,
    thumbnail: 'new1.jpg',
    images: ['new1.jpg'],
    description: 'New product description',
    discountPercentage: 0,
  },
  {
    id: 2,
    title: 'New Product 2',
    price: 149.99,
    thumbnail: 'new2.jpg',
    images: ['new2.jpg'],
    description: 'New product description 2',
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

describe('NewArrivals', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with correct title and products', () => {
    mockUseNewArrivals.mockReturnValue({
      data: mockProductsResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useNewArrivals>);

    render(
      <TestWrapper>
        <NewArrivals />
      </TestWrapper>
    );

    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
    expect(screen.getByText('New Product 1')).toBeInTheDocument();
    expect(screen.getByText('New Product 2')).toBeInTheDocument();
  });

  it('should show loading state when data is loading', () => {
    mockUseNewArrivals.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as ReturnType<typeof useNewArrivals>);

    render(
      <TestWrapper>
        <NewArrivals />
      </TestWrapper>
    );

    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons).toHaveLength(6);
  });

  it('should show error state when there is an error', () => {
    const errorMessage = 'Failed to fetch new arrivals';
    mockUseNewArrivals.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: errorMessage },
    } as ReturnType<typeof useNewArrivals>);

    render(
      <TestWrapper>
        <NewArrivals />
      </TestWrapper>
    );

    expect(screen.getByText('Błąd ładowania produktów')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should handle empty products array', () => {
    mockUseNewArrivals.mockReturnValue({
      data: { products: [], total: 0, skip: 0, limit: 6 },
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useNewArrivals>);

    render(
      <TestWrapper>
        <NewArrivals />
      </TestWrapper>
    );

    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('should render product images correctly', () => {
    mockUseNewArrivals.mockReturnValue({
      data: mockProductsResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useNewArrivals>);

    render(
      <TestWrapper>
        <NewArrivals />
      </TestWrapper>
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'new1.jpg');
    expect(images[1]).toHaveAttribute('src', 'new2.jpg');
  });

  it('should render product prices correctly', () => {
    mockUseNewArrivals.mockReturnValue({
      data: mockProductsResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useNewArrivals>);

    render(
      <TestWrapper>
        <NewArrivals />
      </TestWrapper>
    );

    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
  });

  it('should have proper heading structure', () => {
    mockUseNewArrivals.mockReturnValue({
      data: mockProductsResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useNewArrivals>);

    render(
      <TestWrapper>
        <NewArrivals />
      </TestWrapper>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('New Arrivals');
  });
});

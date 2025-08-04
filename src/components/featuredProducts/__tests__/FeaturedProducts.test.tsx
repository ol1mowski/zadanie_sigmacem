import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeaturedProducts } from '../FeaturedProducts.component';
import { useFeaturedProducts } from '../hooks/useProducts.hook';
import type { ProductsResponse } from '../../../types/product.types';

vi.mock('../hooks/useProducts.hook');
const mockUseFeaturedProducts = vi.mocked(useFeaturedProducts);

interface MockProductGridProps {
  products: unknown[];
  isLoading: boolean;
  error: string | null;
  className: string;
}

vi.mock('../../ui/grid/ProductGrid.component', () => ({
  ProductGrid: ({
    products,
    isLoading,
    error,
    className,
  }: MockProductGridProps) => (
    <div data-testid="product-grid" className={className}>
      {isLoading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      {products && products.length > 0 && (
        <div data-testid="products-count">Products: {products.length}</div>
      )}
    </div>
  ),
}));

vi.mock('../FeaturedProducts.module.css', () => ({
  default: {
    featuredProducts: 'featured-products',
    container: 'container',
    header: 'header',
    title: 'title',
    grid: 'grid',
  },
}));

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

  describe('Rendering', () => {
    it('should render the component with correct title', () => {
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
    });

    it('should render with custom className', () => {
      mockUseFeaturedProducts.mockReturnValue({
        data: mockProductsResponse,
        isLoading: false,
        error: null,
      } as ReturnType<typeof useFeaturedProducts>);

      render(
        <TestWrapper>
          <FeaturedProducts className="custom-class" />
        </TestWrapper>
      );

      const section = screen.getByText('Featured Products').closest('section');
      expect(section).toHaveClass('custom-class');
    });

    it('should render ProductGrid with correct props', () => {
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

      expect(screen.getByTestId('product-grid')).toBeInTheDocument();
      expect(screen.getByTestId('products-count')).toHaveTextContent(
        'Products: 2'
      );
    });
  });

  describe('Loading state', () => {
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

      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    it('should show error message when there is an error', () => {
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

      expect(screen.getByTestId('error')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('Data handling', () => {
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

      expect(screen.getByTestId('product-grid')).toBeInTheDocument();
      expect(screen.queryByTestId('products-count')).not.toBeInTheDocument();
    });
  });

  describe('Hook integration', () => {
    it('should call useFeaturedProducts hook', () => {
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

      expect(mockUseFeaturedProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
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

    it('should have semantic HTML structure with section element', () => {
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

      const section = screen.getByText('Featured Products').closest('section');
      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe('SECTION');
    });
  });
});

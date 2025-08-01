import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewArrivals } from '../NewArrivals.component';
import { useNewArrivals } from '../hooks/useProducts.hook';
import type { ProductsResponse } from '../../../types/product.types';

vi.mock('../hooks/useProducts.hook');
const mockUseNewArrivals = vi.mocked(useNewArrivals);

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

vi.mock('../NewArrivals.module.css', () => ({
  default: {
    newArrivals: 'new-arrivals',
    container: 'container',
    header: 'header',
    title: 'title',
    grid: 'grid',
  },
}));

const mockProducts = [
  {
    id: 1,
    title: 'New Product 1',
    price: 99.99,
    rating: 4.5,
    thumbnail: 'new1.jpg',
    images: ['new1.jpg'],
    description: 'New product description',
    discountPercentage: 0,
    stock: 10,
    brand: 'New Brand',
    category: 'new',
    tags: ['new'],
    sku: 'NEW1',
    weight: 1,
    dimensions: { width: 10, height: 10, depth: 10 },
    warrantyInformation: '1 year',
    shippingInformation: 'Free shipping',
    availabilityStatus: 'In Stock',
    reviews: [],
    returnPolicy: '30 days',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      barcode: '123456789',
      qrCode: 'qr123',
    },
  },
  {
    id: 2,
    title: 'New Product 2',
    price: 149.99,
    rating: 4.2,
    thumbnail: 'new2.jpg',
    images: ['new2.jpg'],
    description: 'New product description 2',
    discountPercentage: 0,
    stock: 15,
    brand: 'New Brand 2',
    category: 'new',
    tags: ['new'],
    sku: 'NEW2',
    weight: 2,
    dimensions: { width: 20, height: 20, depth: 20 },
    warrantyInformation: '2 years',
    shippingInformation: 'Free shipping',
    availabilityStatus: 'In Stock',
    reviews: [],
    returnPolicy: '30 days',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      barcode: '987654321',
      qrCode: 'qr456',
    },
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

  describe('Rendering', () => {
    it('should render the component with correct title', () => {
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
    });

    it('should render with custom className', () => {
      mockUseNewArrivals.mockReturnValue({
        data: mockProductsResponse,
        isLoading: false,
        error: null,
      } as ReturnType<typeof useNewArrivals>);

      render(
        <TestWrapper>
          <NewArrivals className="custom-class" />
        </TestWrapper>
      );

      const section = screen.getByText('New Arrivals').closest('section');
      expect(section).toHaveClass('custom-class');
    });

    it('should render ProductGrid with correct props', () => {
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

      expect(screen.getByTestId('product-grid')).toBeInTheDocument();
      expect(screen.getByTestId('products-count')).toHaveTextContent(
        'Products: 2'
      );
    });
  });

  describe('Loading state', () => {
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

      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    it('should show error message when there is an error', () => {
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

      expect(screen.getByTestId('error')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('Data handling', () => {
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

      expect(screen.getByTestId('product-grid')).toBeInTheDocument();
      expect(screen.queryByTestId('products-count')).not.toBeInTheDocument();
    });
  });

  describe('Hook integration', () => {
    it('should call useNewArrivals hook', () => {
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

      expect(mockUseNewArrivals).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
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

    it('should have semantic HTML structure with section element', () => {
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

      const section = screen.getByText('New Arrivals').closest('section');
      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe('SECTION');
    });
  });
});

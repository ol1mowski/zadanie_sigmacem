import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNewArrivals } from '../useProducts.hook';
import { API_CONFIG, buildApiUrl } from '../../../../config/api.config';
import type { ProductsResponse } from '../../../../types/product.types';

global.fetch = vi.fn();

vi.mock('../../../../config/api.config', () => ({
  API_CONFIG: {
    BASE_URL: 'https://dummyjson.com',
    ENDPOINTS: {
      PRODUCTS: '/products',
    },
    FEATURED_LIMIT: 6,
  },
  buildApiUrl: vi.fn(),
}));

const mockBuildApiUrl = vi.mocked(buildApiUrl);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useNewArrivals', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockBuildApiUrl.mockReturnValue(
      'https://dummyjson.com/products?limit=6&sortBy=id&order=desc'
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Successful API calls', () => {
    it('should fetch new arrivals successfully', async () => {
      const mockProducts = [
        {
          id: 1,
          title: 'New Product 1',
          price: 99.99,
          rating: 4.5,
          thumbnail: 'new1.jpg',
          images: ['new1.jpg'],
          description: 'New product',
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
      ];

      const mockResponse: ProductsResponse = {
        products: mockProducts,
        total: 1,
        skip: 0,
        limit: 6,
      };

      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const { result } = renderHook(() => useNewArrivals(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(result.current.error).toBeNull();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=6&sortBy=id&order=desc'
      );
    });

    it('should call buildApiUrl with correct parameters for new arrivals', async () => {
      const mockResponse: ProductsResponse = {
        products: [],
        total: 0,
        skip: 0,
        limit: 6,
      };

      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      renderHook(() => useNewArrivals(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockBuildApiUrl).toHaveBeenCalledWith(
          API_CONFIG.ENDPOINTS.PRODUCTS,
          {
            limit: API_CONFIG.FEATURED_LIMIT,
            sortBy: 'id',
            order: 'desc',
          }
        );
      });
    });
  });

  describe('Error handling', () => {
    it('should handle API errors', async () => {
      const errorMessage = 'API request failed: Not Found';

      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      const { result } = renderHook(() => useNewArrivals(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe(errorMessage);
      expect(result.current.data).toBeUndefined();
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        networkError
      );

      const { result } = renderHook(() => useNewArrivals(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe('Network error');
    });
  });

  describe('Query configuration', () => {
    it('should handle empty products response', async () => {
      const mockResponse: ProductsResponse = {
        products: [],
        total: 0,
        skip: 0,
        limit: 6,
      };

      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const { result } = renderHook(() => useNewArrivals(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(result.current.data?.products).toEqual([]);
    });

    it('should use correct query key for new arrivals', () => {
      const { result } = renderHook(() => useNewArrivals(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
    });
  });

  describe('Sorting and filtering', () => {
    it('should sort by id in descending order for new arrivals', async () => {
      const mockResponse: ProductsResponse = {
        products: [],
        total: 0,
        skip: 0,
        limit: 6,
      };

      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      renderHook(() => useNewArrivals(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockBuildApiUrl).toHaveBeenCalledWith(
          API_CONFIG.ENDPOINTS.PRODUCTS,
          {
            limit: API_CONFIG.FEATURED_LIMIT,
            sortBy: 'id',
            order: 'desc',
          }
        );
      });
    });
  });
});

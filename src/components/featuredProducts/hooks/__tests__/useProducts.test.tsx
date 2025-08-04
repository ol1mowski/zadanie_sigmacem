import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFeaturedProducts } from '../useProducts.hook';
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

describe('useFeaturedProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockBuildApiUrl.mockReturnValue(
      'https://dummyjson.com/products?limit=6&sortBy=rating&order=desc'
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Successful API calls', () => {
    it('should fetch featured products successfully', async () => {
      const mockProducts = [
        {
          id: 1,
          title: 'Test Product 1',
          price: 99.99,
          thumbnail: 'test1.jpg',
          images: ['test1.jpg'],
          description: 'Test product',
          discountPercentage: 0,
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

      const { result } = renderHook(() => useFeaturedProducts(), {
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
        'https://dummyjson.com/products?limit=6&sortBy=rating&order=desc'
      );
    });

    it('should call buildApiUrl with correct parameters', async () => {
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

      renderHook(() => useFeaturedProducts(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockBuildApiUrl).toHaveBeenCalledWith(
          API_CONFIG.ENDPOINTS.PRODUCTS,
          {
            limit: API_CONFIG.FEATURED_LIMIT,
            sortBy: 'rating',
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

      const { result } = renderHook(() => useFeaturedProducts(), {
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

      const { result } = renderHook(() => useFeaturedProducts(), {
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

      const { result } = renderHook(() => useFeaturedProducts(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(result.current.data?.products).toEqual([]);
    });
  });
});

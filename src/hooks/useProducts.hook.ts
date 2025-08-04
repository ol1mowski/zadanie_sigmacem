import { useQuery } from '@tanstack/react-query';
import { API_CONFIG, buildApiUrl } from '../config/api.config';
import type { ProductsResponse } from '../types/product.types';

type ApiParams = Record<string, string | number>;

const sanitizeQuery = (query: string): string => {
  return query.trim().slice(0, 100).replace(/[<>]/g, '').replace(/\s+/g, ' ');
};

const fetchProducts = async (
  endpoint: string,
  params: ApiParams = {}
): Promise<ProductsResponse> => {
  const url = buildApiUrl(endpoint, params);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

export const useProductSearch = (query: string) => {
  const sanitizedQuery = sanitizeQuery(query);

  return useQuery({
    queryKey: ['products', 'search', sanitizedQuery],
    queryFn: () =>
      fetchProducts(API_CONFIG.ENDPOINTS.PRODUCTS_SEARCH, {
        q: sanitizedQuery,
      }),
    enabled: sanitizedQuery.length > 0 && sanitizedQuery.length <= 100,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () =>
      fetchProducts(API_CONFIG.ENDPOINTS.PRODUCTS, {
        limit: API_CONFIG.FEATURED_LIMIT,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useNewArrivals = () => {
  return useQuery({
    queryKey: ['products', 'newArrivals'],
    queryFn: () =>
      fetchProducts(API_CONFIG.ENDPOINTS.PRODUCTS, {
        limit: API_CONFIG.FEATURED_LIMIT,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

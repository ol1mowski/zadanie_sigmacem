import { useQuery } from '@tanstack/react-query';
import { API_CONFIG, buildApiUrl } from '../../../config/api.config';
import type { ProductsResponse } from '../../../types/product.types';

export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  newArrivals: () => [...PRODUCT_QUERY_KEYS.all, 'newArrivals'] as const,
} as const;

const fetchProducts = async (params?: {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}): Promise<ProductsResponse> => {
  const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS, params);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
};

const fetchNewArrivals = async (): Promise<ProductsResponse> => {
  return fetchProducts({
    limit: API_CONFIG.FEATURED_LIMIT,
    sortBy: 'id',
    order: 'desc',
  });
};

export const useNewArrivals = () => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.newArrivals(),
    queryFn: fetchNewArrivals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

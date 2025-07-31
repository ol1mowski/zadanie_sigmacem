import { useQuery } from '@tanstack/react-query';
import { API_CONFIG, buildApiUrl } from '../../../config/api.config';
import type { ProductsResponse } from '../types/product.types';

export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  featured: () => [...PRODUCT_QUERY_KEYS.all, 'featured'] as const,
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

const fetchFeaturedProducts = async (): Promise<ProductsResponse> => {
  return fetchProducts({
    limit: API_CONFIG.FEATURED_LIMIT,
    sortBy: 'rating',
    order: 'desc',
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.featured(),
    queryFn: fetchFeaturedProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

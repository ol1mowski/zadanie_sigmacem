import { useQuery } from '@tanstack/react-query';
import { API_CONFIG, buildApiUrl } from '../../../../../config/api.config';
import type { ProductsResponse } from '../../../../../types/product.types';

export const SEARCH_QUERY_KEYS = {
  all: ['search'] as const,
  products: (query: string) =>
    [...SEARCH_QUERY_KEYS.all, 'products', query] as const,
} as const;

const fetchProductSearch = async (query: string): Promise<ProductsResponse> => {
  if (!query.trim()) {
    return { products: [], total: 0, skip: 0, limit: 0 };
  }

  const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS_SEARCH, { q: query });
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Search request failed: ${response.statusText}`);
  }

  return response.json();
};

export const useProductSearch = (query: string) => {
  return useQuery({
    queryKey: SEARCH_QUERY_KEYS.products(query),
    queryFn: () => fetchProductSearch(query),
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

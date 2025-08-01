export const API_CONFIG = {
  BASE_URL: 'https://dummyjson.com',
  ENDPOINTS: {
    PRODUCTS: '/products',
    PRODUCT_CATEGORIES: '/products/categories',
    PRODUCT_CATEGORY_LIST: '/products/category-list',
  },
  DEFAULT_LIMIT: 8,
  FEATURED_LIMIT: 6,
} as const;

export const buildApiUrl = (
  endpoint: string,
  params?: Record<string, string | number>
) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
};

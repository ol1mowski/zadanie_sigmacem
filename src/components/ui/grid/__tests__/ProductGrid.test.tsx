import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductGrid } from '../ProductGrid.component';
import type { Product } from '../../../../types/product.types';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    discountPercentage: 10,
    thumbnail: 'thumb1.jpg',
    images: ['img1.jpg'],
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description 2',
    price: 149.99,
    discountPercentage: 0,
    thumbnail: 'thumb2.jpg',
    images: ['img2.jpg'],
  },
];

// Mock ProductCard component
vi.mock('../../product/ProductCard.component', () => ({
  ProductCard: ({ product }: { product: Product }) => (
    <div data-testid={`product-card-${product.id}`}>{product.title}</div>
  ),
}));

describe('ProductGrid', () => {
  it('should render products when data is available', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should show loading skeleton when isLoading is true', () => {
    render(<ProductGrid products={[]} isLoading={true} />);

    // Sprawdź czy są skeletony (6 sztuk)
    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons).toHaveLength(6);
  });

  it('should show error display when error is provided', () => {
    const errorMessage = 'Failed to load products';
    render(<ProductGrid products={[]} error={errorMessage} />);

    expect(screen.getByText('Błąd ładowania produktów')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText('Spróbuj ponownie')).toBeInTheDocument();
  });

  it('should show empty state when no products', () => {
    render(<ProductGrid products={[]} />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Try adjusting your search criteria or browse our categories.'
      )
    ).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<ProductGrid products={mockProducts} className="custom-class" />);

    const grid = screen.getByText('Product 1').closest('div');
    expect(grid?.parentElement?.className).toContain('custom-class');
  });

  it('should render with default props', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
  });

  it('should prioritize loading state over other states', () => {
    render(
      <ProductGrid
        products={mockProducts}
        isLoading={true}
        error="Some error"
      />
    );

    // Powinien pokazać loading, nie error
    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons).toHaveLength(6);
    expect(
      screen.queryByText('Błąd ładowania produktów')
    ).not.toBeInTheDocument();
  });

  it('should prioritize error state over empty state', () => {
    const errorMessage = 'Network error';
    render(<ProductGrid products={[]} error={errorMessage} />);

    // Powinien pokazać error, nie empty state
    expect(screen.getByText('Błąd ładowania produktów')).toBeInTheDocument();
    expect(screen.queryByText('No products found')).not.toBeInTheDocument();
  });
});

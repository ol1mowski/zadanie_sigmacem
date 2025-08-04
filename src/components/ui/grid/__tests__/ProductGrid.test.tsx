import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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

describe('ProductGrid', () => {
  it('should render products when data is available', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
  });

  it('should show loading skeleton when isLoading is true', () => {
    render(<ProductGrid products={[]} isLoading={true} />);

    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons).toHaveLength(6);
  });

  it('should show error display when error is provided', () => {
    const errorMessage = 'Failed to load products';
    render(<ProductGrid products={[]} error={errorMessage} />);

    expect(screen.getByText('Error loading products')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
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

  it('should prioritize loading state over other states', () => {
    render(
      <ProductGrid
        products={mockProducts}
        isLoading={true}
        error="Some error"
      />
    );

    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons).toHaveLength(6);
    expect(
      screen.queryByText('Error loading products')
    ).not.toBeInTheDocument();
  });

  it('should prioritize error state over empty state', () => {
    const errorMessage = 'Network error';
    render(<ProductGrid products={[]} error={errorMessage} />);

    expect(screen.getByText('Error loading products')).toBeInTheDocument();
    expect(screen.queryByText('No products found')).not.toBeInTheDocument();
  });

  it('should render product images correctly', () => {
    render(<ProductGrid products={mockProducts} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'img1.jpg');
    expect(images[1]).toHaveAttribute('src', 'img2.jpg');
  });

  it('should render with proper semantic structure', () => {
    render(<ProductGrid products={mockProducts} />);

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);

    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('Product 1');
    expect(headings[1]).toHaveTextContent('Product 2');
  });
});

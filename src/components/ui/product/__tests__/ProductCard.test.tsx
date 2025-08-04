import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from '../ProductCard.component';
import type { Product } from '../../../../types/product.types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test product description',
  price: 99.99,
  discountPercentage: 10,
  thumbnail: 'test-thumbnail.jpg',
  images: ['test-image1.jpg', 'test-image2.jpg'],
};

describe('ProductCard', () => {
  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('should render product image', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image1.jpg');
  });

  it('should use thumbnail when images array is empty', () => {
    const productWithoutImages = {
      ...mockProduct,
      images: [],
    };

    render(<ProductCard product={productWithoutImages} />);

    const image = screen.getByAltText('Test Product');
    expect(image).toHaveAttribute('src', 'test-thumbnail.jpg');
  });

  it('should have proper semantic structure', () => {
    render(<ProductCard product={mockProduct} />);

    const article = screen.getByRole('article');
    const title = screen.getByRole('heading', { level: 3 });
    const image = screen.getByRole('img');

    expect(article).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Product');
    expect(image).toHaveAttribute('alt', 'Test Product');
  });
});

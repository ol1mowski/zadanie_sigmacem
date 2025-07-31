import { ProductCard } from '../product/ProductCard.component';
import type { Product } from '../../featuredProducts/types/product.types';
import './ProductGrid.component.css';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export const ProductGrid = ({
  products,
  isLoading = false,
  error = null,
  className = '',
}: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className={`product-grid product-grid--loading ${className}`}>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="product-grid__skeleton">
            <div className="product-grid__skeleton-image"></div>
            <div className="product-grid__skeleton-content">
              <div className="product-grid__skeleton-title"></div>
              <div className="product-grid__skeleton-price"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`product-grid product-grid--error ${className}`}>
        <div className="product-grid__error">
          <h3>Error loading products</h3>
          <p>{error}</p>
          <button
            className="product-grid__retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`product-grid product-grid--empty ${className}`}>
        <div className="product-grid__empty">
          <h3>No products found</h3>
          <p>Try adjusting your search criteria or browse our categories.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`product-grid ${className}`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

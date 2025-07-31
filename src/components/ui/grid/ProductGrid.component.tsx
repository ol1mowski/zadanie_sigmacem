import { ProductCard } from '../product/ProductCard.component';
import type { Product } from '../../../types/product.types';
import styles from './ProductGrid.module.css';

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
      <div className={`${styles.productGrid} ${styles.loading} ${className}`}>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className={styles.skeleton}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonPrice}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.productGrid} ${styles.error} ${className}`}>
        <div className={styles.errorContent}>
          <h3 className={styles.errorTitle}>Error loading products</h3>
          <p className={styles.errorMessage}>{error}</p>
          <button
            className={styles.retryButton}
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
      <div className={`${styles.productGrid} ${styles.empty} ${className}`}>
        <div className={styles.emptyContent}>
          <h3 className={styles.emptyTitle}>No products found</h3>
          <p className={styles.emptyMessage}>
            Try adjusting your search criteria or browse our categories.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.productGrid} ${className}`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

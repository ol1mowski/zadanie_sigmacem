import { ProductCard } from '../product/ProductCard.component';
import { LoadingSkeleton } from '../loading/loadingSkeleton/LoadingSkeleton.component';
import { ErrorDisplay } from '../error/errorDisplay/ErrorDisplay.component';
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
      <div className={`${styles.productGrid} ${className}`}>
        {Array.from({ length: 6 }, (_, index) => (
          <LoadingSkeleton key={index} type="card" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.productGrid} ${className}`}>
        <ErrorDisplay
          title="Błąd ładowania produktów"
          message={error}
          onRetry={() => window.location.reload()}
        />
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

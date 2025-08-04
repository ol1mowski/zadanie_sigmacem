import type { Product } from '../../../../../types/product.types';
import { LoadingSpinner } from '../../../../ui/loading/loadingSpinner/LoadingSpinner.component';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  products: Product[];
  isLoading: boolean;
  isVisible: boolean;
  onProductSelect?: (product: Product) => void;
  className?: string;
}

export const SearchResults = ({
  products,
  isLoading,
  isVisible,
  onProductSelect,
  className = '',
}: SearchResultsProps) => {
  if (!isVisible) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="medium" />
          <span className={styles.loadingText}>Searching products...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.emptyState}>
          <span className={styles.emptyText}>No products found</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.resultsList}>
        {products.map(product => (
          <div
            key={product.id}
            className={styles.resultItem}
            onClick={() => onProductSelect?.(product)}
            role="button"
            aria-label={`Select product: ${product.title}`}
          >
            <div className={styles.productImage}>
              <img src={product.thumbnail} alt={product.title} loading="lazy" />
            </div>
            <div className={styles.productInfo}>
              <h4 className={styles.productTitle}>{product.title}</h4>
              <p className={styles.productDescription}>
                {product.description.length > 80
                  ? `${product.description.substring(0, 80)}...`
                  : product.description}
              </p>
              <div className={styles.productPrice}>
                <span className={styles.price}>
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

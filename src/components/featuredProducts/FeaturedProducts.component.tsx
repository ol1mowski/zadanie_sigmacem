import { ProductGrid } from '../ui/grid/ProductGrid.component';
import { useFeaturedProducts } from './hooks/useProducts.hook';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductsProps {
  className?: string;
}

export const FeaturedProducts = ({ className = '' }: FeaturedProductsProps) => {
  const { data: productsResponse, isLoading, error } = useFeaturedProducts();

  const products = productsResponse?.products || [];

  return (
    <section className={`${styles.featuredProducts} ${className}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
        </div>

        <ProductGrid
          products={products}
          isLoading={isLoading}
          error={error?.message || null}
          className={styles.grid}
        />
      </div>
    </section>
  );
};

import { ProductGrid } from '../ui/grid/ProductGrid.component';
import { useNewArrivals } from '../../hooks/useProducts.hook';
import styles from './NewArrivals.module.css';

interface NewArrivalsProps {
  className?: string;
}

export const NewArrivals = ({ className = '' }: NewArrivalsProps) => {
  const { data: productsResponse, isLoading, error } = useNewArrivals();

  const products = productsResponse?.products || [];

  return (
    <section className={`${styles.newArrivals} ${className}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Arrivals</h2>
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

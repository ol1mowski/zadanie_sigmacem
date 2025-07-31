import { ProductGrid } from '../ui/grid/ProductGrid.component';
import { useFeaturedProducts } from './hooks/useProducts.hook';
import './FeaturedProducts.component.css';

interface FeaturedProductsProps {
  className?: string;
}

export const FeaturedProducts = ({ className = '' }: FeaturedProductsProps) => {
  const { data: productsResponse, isLoading, error } = useFeaturedProducts();

  const products = productsResponse?.products || [];

  return (
    <section className={`featured-products ${className}`}>
      <div className="featured-products__container">
        <div className="featured-products__header">
          <h2 className="featured-products__title">Featured Products</h2>
        </div>

        <ProductGrid
          products={products}
          isLoading={isLoading}
          error={error?.message || null}
          className="featured-products__grid"
        />
      </div>
    </section>
  );
};

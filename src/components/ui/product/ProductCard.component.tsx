import type { Product } from '../../featuredProducts/types/product.types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { title, price, thumbnail, images } = product;

  const displayImage = images?.[0] || thumbnail;

  return (
    <article className={`${styles.productCard} ${className}`}>
      <div className={styles.imageContainer}>
        <img
          src={displayImage}
          alt={title}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>${price}</p>
      </div>
    </article>
  );
};

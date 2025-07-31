import type { Product } from '../../featuredProducts/types/product.types';
import './ProductCard.component.css';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { title, price, thumbnail, images } = product;

  const displayImage = images?.[0] || thumbnail;

  return (
    <article className={`product-card ${className}`}>
      <div className="product-card__image-container">
        <img
          src={displayImage}
          alt={title}
          className="product-card__image"
          loading="lazy"
        />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__price">${price}</p>
      </div>
    </article>
  );
};

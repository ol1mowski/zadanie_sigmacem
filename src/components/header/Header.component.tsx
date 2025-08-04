import { useCallback } from 'react';
import { Logo } from '../ui';
import { SearchBar } from './components/searchBar/SearchBar.component';
import type { Product } from '../../types/product.types';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
  onProductSelect?: (product: Product) => void;
}

export const Header = ({ className = '', onProductSelect }: HeaderProps) => {
  const handleProductSelect = useCallback(
    (product: Product) => {
      onProductSelect?.(product);
      console.log('Wybrany produkt:', product);
    },
    [onProductSelect]
  );

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.container}>
        <Logo />
        <SearchBar onProductSelect={handleProductSelect} />
      </div>
    </header>
  );
};

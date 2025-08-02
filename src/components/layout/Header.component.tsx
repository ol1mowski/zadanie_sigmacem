import { useCallback } from 'react';
import { Logo } from '../ui/Logo.component';
import { SearchBar } from './components/searchBar/SearchBar.component';
import type { Product } from '../../types/product.types';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
  onSearchResults?: (products: Product[]) => void;
  onSearchStateChange?: (isSearching: boolean) => void;
  onProductSelect?: (product: Product) => void;
}

export const Header = ({
  className = '',
  onSearchResults,
  onSearchStateChange,
  onProductSelect,
}: HeaderProps) => {
  const handleSearchResults = useCallback(
    (products: Product[]) => {
      onSearchResults?.(products);
    },
    [onSearchResults]
  );

  const handleSearchStateChange = useCallback(
    (searching: boolean) => {
      onSearchStateChange?.(searching);
    },
    [onSearchStateChange]
  );

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
        <SearchBar
          onSearchResults={handleSearchResults}
          onSearchStateChange={handleSearchStateChange}
          onProductSelect={handleProductSelect}
        />
      </div>
    </header>
  );
};

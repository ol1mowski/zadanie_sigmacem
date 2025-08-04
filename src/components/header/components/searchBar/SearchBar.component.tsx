import { useCallback } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce.hook';
import { useProductSearch } from '../../../../hooks/useProducts.hook';
import { SearchResults } from './components/SearchResults.component';
import { SearchInput, SearchError } from '../../../ui';
import { useSearchState } from './hooks/useSearchState.hook';
import { useClickOutside } from './hooks/useClickOutside.hook';
import type { Product } from '../../../../types/product.types';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  className?: string;
  onProductSelect?: (product: Product) => void;
}

export const SearchBar = ({
  className = '',
  onProductSelect,
}: SearchBarProps) => {
  const {
    searchQuery,
    isResultsVisible,
    handleInputChange,
    handleClearSearch,
    hideResults,
  } = useSearchState();

  const debouncedQuery = useDebounce(searchQuery, 300);
  const {
    data: searchResults,
    isLoading,
    error,
  } = useProductSearch(debouncedQuery);
  const products = searchResults?.products || [];

  const handleProductSelect = useCallback(
    (product: Product) => {
      onProductSelect?.(product);
      hideResults();
    },
    [onProductSelect, hideResults]
  );

  const containerRef = useClickOutside(hideResults);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      <SearchInput
        value={searchQuery}
        onChange={handleInputChange}
        onClear={handleClearSearch}
        isLoading={isLoading}
        isResultsVisible={isResultsVisible}
      />

      <SearchError error={error} />

      <SearchResults
        products={products}
        isLoading={isLoading}
        isVisible={isResultsVisible}
        onProductSelect={handleProductSelect}
        className={styles.searchResults}
      />
    </div>
  );
};

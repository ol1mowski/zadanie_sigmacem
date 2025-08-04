import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce.hook';
import searchIcon from '../../../../assets/search_icon.svg';
import { useProductSearch } from './hooks/useProductSearch.hook';
import { SearchResults } from './components/SearchResults.component';
import type { Product } from '../../../../types/product.types';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  className?: string;
  onSearchResults?: (products: Product[]) => void;
  onSearchStateChange?: (isSearching: boolean) => void;
  onProductSelect?: (product: Product) => void;
}

export const SearchBar = ({
  className = '',
  onSearchResults,
  onSearchStateChange,
  onProductSelect,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useProductSearch(debouncedQuery);
  const products = useMemo(
    () => searchResults?.products || [],
    [searchResults]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchQuery(value);
      setIsResultsVisible(value.trim().length > 0);
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setIsResultsVisible(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    if (searchQuery.trim().length > 0) {
      setIsResultsVisible(true);
    }
  }, [searchQuery]);

  const handleInputBlur = useCallback(() => {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsResultsVisible(false);
      }
    }, 150);
  }, []);

  const handleProductSelect = useCallback(
    (product: Product) => {
      onProductSelect?.(product);
      setSearchQuery(product.title);
      setIsResultsVisible(false);
    },
    [onProductSelect]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    onSearchResults?.(products);
  }, [products, onSearchResults]);

  useEffect(() => {
    onSearchStateChange?.(isLoading);
  }, [isLoading, onSearchStateChange]);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      <div className={styles.searchInputContainer}>
        <img src={searchIcon} alt="Search" className={styles.icon} />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search products..."
          className={styles.input}
          aria-label="Search products"
          aria-expanded={isResultsVisible}
          aria-haspopup="listbox"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        {isLoading && <div className={styles.loadingIndicator} />}
      </div>

      {error && (
        <div className={styles.errorMessage} role="alert">
          Search failed. Please try again.
        </div>
      )}

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

import searchIcon from '../../../assets/search_icon.svg';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isLoading?: boolean;
  isResultsVisible?: boolean;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({
  value,
  onChange,
  onClear,
  isLoading = false,
  isResultsVisible = false,
  placeholder = 'Search for products',
  className = '',
}: SearchInputProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img src={searchIcon} alt="Search" className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Search products"
        aria-expanded={isResultsVisible}
        aria-haspopup="listbox"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
      {isLoading && <div className={styles.loadingIndicator} />}
    </div>
  );
};

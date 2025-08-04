import searchIcon from '../../../../../assets/search_icon.svg';
import styles from '../SearchBar.module.css';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isResultsVisible: boolean;
}

export const SearchInput = ({
  value,
  onChange,
  onClear,
  isResultsVisible,
}: SearchInputProps) => {
  return (
    <div className={styles.searchInputContainer}>
      <img src={searchIcon} alt="Search" className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search for products"
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
    </div>
  );
};

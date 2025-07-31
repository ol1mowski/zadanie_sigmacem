import searchIcon from '../../assets/search_icon.svg';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className = '' }: SearchBarProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img src={searchIcon} alt="Search" className={styles.icon} />
      <input
        type="text"
        placeholder="Search products..."
        className={styles.input}
      />
    </div>
  );
};

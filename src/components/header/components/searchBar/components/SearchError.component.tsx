import styles from '../SearchBar.module.css';

interface SearchErrorProps {
  error: Error | null;
}

export const SearchError = ({ error }: SearchErrorProps) => {
  if (!error) return null;

  return (
    <div className={styles.errorMessage} role="alert">
      Search failed. Please try again.
    </div>
  );
};

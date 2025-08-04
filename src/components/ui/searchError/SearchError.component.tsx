import styles from './SearchError.module.css';

interface SearchErrorProps {
  error: Error | null;
  message?: string;
  className?: string;
}

export const SearchError = ({
  error,
  message = 'Search failed. Please try again.',
  className = '',
}: SearchErrorProps) => {
  if (!error) return null;

  return (
    <div className={`${styles.errorMessage} ${className}`} role="alert">
      {message}
    </div>
  );
};

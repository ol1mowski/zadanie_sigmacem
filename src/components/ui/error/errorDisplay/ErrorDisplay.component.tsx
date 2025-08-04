import styles from './ErrorDisplay.module.css';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  error?: Error;
  onRetry?: () => void;
  className?: string;
}

export const ErrorDisplay = ({
  title = 'Error',
  message = 'An error occurred while loading the data.',
  error,
  onRetry,
  className = '',
}: ErrorDisplayProps) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`${styles.errorContainer} ${className}`}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h3 className={styles.errorTitle}>{title}</h3>
        <p className={styles.errorMessage}>{message}</p>

        {error && (
          <details className={styles.errorDetails}>
            <summary className={styles.errorSummary}>Error details</summary>
            <pre className={styles.errorStack}>{error.stack}</pre>
          </details>
        )}

        <button
          className={styles.retryButton}
          onClick={handleRetry}
          type="button"
          data-testid="retry-button"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

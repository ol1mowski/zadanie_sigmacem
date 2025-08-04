import styles from './ErrorFallback.module.css';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  className?: string;
}

export const ErrorFallback = ({
  resetErrorBoundary,
  className = '',
}: ErrorFallbackProps) => {
  return (
    <div className={`${styles.errorFallback} ${className}`}>
      <div className={styles.errorContent}>
        <h2 className={styles.errorTitle}>Ups! Coś poszło nie tak</h2>
        <p className={styles.errorMessage}>
          Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
        </p>
        {resetErrorBoundary && (
          <button
            className={styles.retryButton}
            onClick={resetErrorBoundary}
            type="button"
          >
            Spróbuj ponownie
          </button>
        )}
      </div>
    </div>
  );
};

import styles from './LoadingSkeleton.module.css';

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'image';
  className?: string;
}

export const LoadingSkeleton = ({
  type = 'card',
  className = '',
}: LoadingSkeletonProps) => {
  return (
    <div className={`${styles.skeleton} ${styles[type]} ${className}`}>
      {type === 'card' && (
        <>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonPrice}></div>
          </div>
        </>
      )}
      {type === 'text' && <div className={styles.skeletonText}></div>}
      {type === 'image' && <div className={styles.skeletonImage}></div>}
    </div>
  );
};

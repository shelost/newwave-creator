import React from 'react';
import styles from './BlobBackground.module.css';

const BlobBackground: React.FC = () => {
  return (
    <div className={styles.blobContainer}>
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
      <div className={`${styles.blob} ${styles.blob3}`}></div>
      <div className={`${styles.blob} ${styles.blob4}`}></div>
      <div className={`${styles.blob} ${styles.blob5}`}></div>
    </div>
  );
};

export default BlobBackground;

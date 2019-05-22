import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <span className={[styles.bar, styles.small].join(' ')}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={[styles.bar, styles.small].join(' ')}></span>
    </div>
  );
};

export default Loader;
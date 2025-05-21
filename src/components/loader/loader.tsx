import clsx from 'clsx';

import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={clsx(styles.loader, styles.loader_active)}>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>
    </div>
  );
};

export default Loader;

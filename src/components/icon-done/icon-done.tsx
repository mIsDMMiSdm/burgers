import clsx from 'clsx';

import styles from './icon-done.module.css';

const IconDone = () => {
  return (
    <div className={clsx(styles.iconDone, 'p-5')}>
      <div className={clsx(styles.iconDone__layer, styles.icon)}></div>
      <div className={clsx(styles.iconDone__layer, styles.shape_size_s)}></div>
      <div className={clsx(styles.iconDone__layer, styles.shape_size_xl)}></div>
      <div className={clsx(styles.iconDone__layer, styles.shape_size_l)}></div>
    </div>
  );
};

export default IconDone;

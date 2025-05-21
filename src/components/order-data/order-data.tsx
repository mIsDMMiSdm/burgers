import clsx from 'clsx';
import { memo, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useRedux';
import { getWebsocket } from '../../services/helpers/getSelector';
import styles from './order-data.module.css';

const OrderData = () => {
  const { orders, total, totalToday } = useAppSelector(getWebsocket);
  const readyOrders = useMemo(() => {
    if (orders) {
      const orderStatusArray = orders?.filter((item) => item.status === 'done');
      return orderStatusArray?.slice(0, 15).map((item) => <li key={item._id}>{item.number}</li>);
    }

    return null;
  }, [orders]);

  const pendingOrders = useMemo(() => {
    if (orders) {
      const orderStatusArray = orders?.filter((item) => item.status === 'pending');
      return orderStatusArray?.slice(0, 15).map((item) => <li key={item._id}>{item.number}</li>);
    }

    return null;
  }, [orders]);

  return (
    <div className={styles.container}>
      <div className={styles.orders_queue}>
        <h3
          className={clsx('text', 'text_type_main-medium')}
        >
          Готовы:
        </h3>
        <h3
          className={clsx('text', 'text_type_main-medium')}
        >
          В работе:
        </h3>
        <ul className={clsx(
          'page__list',
          'text',
          'text_type_digits-default',
          styles.orders,
          styles.orders_ready
        )}>
          {readyOrders}
        </ul>

        <ul className={clsx('page__list',
          'text',
          'text_type_digits-default',
          styles.orders,
        )}>
          {pendingOrders}
        </ul>
      </div>
      <h3 className={clsx(
        'mt-10',
        'text',
        'text_type_main-medium'
      )}>
        Выполнено за все время:
      </h3>
      <p className={clsx(
        'text',
        'text_type_digits-large',
        styles.number
      )}>
        {total || '0'}
      </p>

      <h3 className={clsx(
        'mt-10',
        'text',
        'text_type_main-medium'
      )}>
        Выполнено за сегодня:
      </h3>
      <p className={clsx(
        'text',
        'text_type_digits-large',
        styles.number
      )}>
        {totalToday || '0'}
      </p>
    </div>
  );
};

export default memo(OrderData);

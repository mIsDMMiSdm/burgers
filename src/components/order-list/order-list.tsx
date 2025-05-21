import clsx from 'clsx';
import { useMemo } from 'react';

import { useAppSelector } from '../../hooks/useRedux';
import { getWebsocket } from '../../services/helpers/getSelector';
import Order from '../order/order';
import styles from './order-list.module.css';

const OrderList = () => {
  const { orders } = useAppSelector(getWebsocket);

  const ordersFeed = useMemo(
    () =>
      orders?.map((item) => (
        <li key={item._id}>
          <Order order={item}/>
        </li>
      )),
    [orders]
  );

  return (
    <ul className={clsx(styles.orders)}>
      {
        ordersFeed && ordersFeed.length === 0
          ? (
            <li>
              <h1 className={clsx('text', 'text_type_main-large', styles.subtitle)}>
                Заказы отсутствуют
              </h1>
            </li>
          )
          : <>{ordersFeed}</>
      }
    </ul>
  );
};

export default OrderList;

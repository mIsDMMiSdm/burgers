import clsx from 'clsx';
import { useEffect } from 'react';

import Loader from '../../components/loader/loader';
import OrderData from '../../components/order-data/order-data';
import OrderList from '../../components/order-list/order-list';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getWebsocket } from '../../services/helpers/getSelector';
import { wsConnectionClosed, wsConnectionStart } from '../../services/slices/wsSlice';
import { WSS_FOR_ALL_ORDERS } from '../../utils/config';
import styles from './feed.module.css';

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(getWebsocket);

  useEffect(() => {
    dispatch(wsConnectionStart(`${WSS_FOR_ALL_ORDERS}`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);


  return (
    orders
      ? (
        <div className={clsx(styles.container)}>
          <h2 className={clsx('text', 'text_type_main-large')}>
            Лента заказов
          </h2>
          <section className={styles.feed}>
            <OrderList/>
            <OrderData/>
          </section>
        </div>
      )
      : (<Loader/>)
  );
};


export default FeedPage;

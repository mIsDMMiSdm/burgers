import clsx from 'clsx';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/loader/loader';
import OrderDetails from '../../components/order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchGetOrder } from '../../services/asyncThunk/orderThunk';
import { getOrder } from '../../services/helpers/getSelector';
import NotFound from '../not-found/not-found';
import styles from './order.module.css';

const OrderPage = () => {
  const { order } = useAppSelector(getOrder);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    params.id && dispatch(fetchGetOrder(+params.id));
  }, [dispatch, params.id]);

  return (
    order === null
      ? (<Loader />)
      : order
        ? (
          <section className={clsx(styles.section)}>
            <OrderDetails order={order}/>
          </section>
        )
        : (
          <NotFound />
        )
  );
};


export default OrderPage;

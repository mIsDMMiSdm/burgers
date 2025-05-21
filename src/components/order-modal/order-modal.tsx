import clsx from 'clsx';

import { useAppSelector } from '../../hooks/useRedux';
import { getOrder } from '../../services/helpers/getSelector';
import IconDone from '../icon-done/icon-done';
import styles from './order-modal.module.css';

const OrderModal = () => {
  const { orderNumber } = useAppSelector(getOrder);

  return (
    <div
      className={clsx(
        styles.order_modal,
        'mt-4'
      )}
    >
      <span
        className="text text_type_digits-large"
      >
        {orderNumber}
      </span>
      <span
        className={clsx(
          styles.order_modal_text_case_lower,
          'text',
          'text_type_main-medium',
          'mt-8',
          'mb-15'
        )}
      >
        Идентификатор заказа
      </span>
      <IconDone/>
      <span
        className="text text_type_main-default mt-15 mb-2"
      >
        Ваш заказ начали готовить
      </span>
      <span
        className="text text_type_main-default text_color_inactive"
      >
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

export default OrderModal;

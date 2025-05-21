import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { ReactNode, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useAppSelector } from '../../hooks/useRedux';
import { getModal } from '../../services/helpers/getSelector';
import { MODAL_ID } from '../../utils/constants';
import styles from './notification.module.css';

type Props = {
  children?: ReactNode;
  handleModalClose: () => void;
  title: string;
}

const Notification = ({ children, handleModalClose, title }: Props) => {
  const { modalNotification } = useAppSelector(getModal)
  const isNotificationOpen = useMemo(() => !!modalNotification, [modalNotification])


  return createPortal(
    <div
      className={clsx(
        styles.notification,
        { [styles.notification_opened]: isNotificationOpen }
      )}
      aria-labelledby={title ? 'modal-title' : 'aria-title'}
      aria-modal={isNotificationOpen ? 'true' : 'false'}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
    >
      <div className={clsx(styles.notification__header)}>
        <h3
          className={clsx(styles.notification__title, 'text', 'text_type_main-default')}
          id="modal-title"
        >
          {title}
        </h3>
        <button
          aria-label="Закрыть модальное окно"
          className={clsx(styles.notification__close)}
          onClick={() => handleModalClose()}
          type="button"
        >
          <CloseIcon type="primary"/>
        </button>
      </div>
      {children}
    </div>,
    document.querySelector(MODAL_ID) as HTMLDivElement
  );
};

export default Notification;

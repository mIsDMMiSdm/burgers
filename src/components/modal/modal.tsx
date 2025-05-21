import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { MODAL_ID } from '../../utils/constants';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

type Props = {
  ariaTitle: string;
  children?: ReactNode;
  handleModalClose: () => void;
  isModalOpen: boolean;
  title: string;
}

const Modal = ({ ariaTitle, children, handleModalClose, isModalOpen, title }: Props) => {

  return createPortal(
    <>
      {
        <>
          <ModalOverlay handleModalClose={handleModalClose}/>
          <div
            className={clsx(
              styles.modal,
              { [styles.modal_opened]: isModalOpen },
            )}
            aria-labelledby={title ? 'modal-title' : 'aria-title'}
            aria-modal={isModalOpen ? 'true' : 'false'}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <div className={clsx(styles.modal__header)}>
              {
                title &&
                <h3
                  className={clsx(
                    styles.modal__title,
                    'text',
                    'text_type_main-large'
                  )}
                  id="modal-title">
                  {title}
                </h3>
              }
              {
                !title &&
                <h3 className={clsx(styles.screenReader)} id="aria-title">
                  {ariaTitle}
                </h3>
              }
              <button
                aria-label="Закрыть модальное окно"
                className={clsx(styles.modal__close)}
                onClick={handleModalClose}
                type="button"
              >
                <CloseIcon type="primary"/>
              </button>
            </div>
            {children}
          </div>
        </>
      }
    </>,
    document.querySelector(MODAL_ID) as HTMLDivElement
  );
};

export default Modal;

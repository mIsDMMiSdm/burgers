import clsx from 'clsx';
import { useCallback, useEffect, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useRedux';
import { getModal } from '../../services/helpers/getSelector';
import styles from './modal-overlay.module.css';

type Props = {
  handleModalClose: () => void
}

const ModalOverlay = ({ handleModalClose }: Props) => {
  const { modalIngredient, modalOrder, modalOrderSuccess } = useAppSelector(getModal)
  const handleEscape = useCallback((e: KeyboardEvent) => (e.key === 'Escape') && handleModalClose(), [handleModalClose])

  const isModalOpen = useMemo(() => !!modalIngredient || !!modalOrder || !!modalOrderSuccess, [modalIngredient, modalOrder, modalOrderSuccess])

  useEffect(() => {
    if (!isModalOpen) return;
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape, isModalOpen]);

  return (
    <div
      className={
        clsx(
          styles.modal__overlay,
          { [styles.modal__overlay_opened]: isModalOpen }
        )
      }
      onClick={handleModalClose}
      tabIndex={1}
    >
    </div>
  );
};

export default ModalOverlay;

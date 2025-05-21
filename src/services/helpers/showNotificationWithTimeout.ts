import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { AppDispatch } from '../index';
import { closeAllModal, setModalNotification } from '../slices/modalSlice';

export const showNotificationWithTimeout = (
  content: string,
  dispatch: AppDispatch,
  setMessage: ActionCreatorWithPayload<boolean>
) => {
  dispatch(setMessage(true));
  dispatch(setModalNotification(content));
  setTimeout(() => {
      dispatch(setMessage(false));
      dispatch(closeAllModal());
    },
    4000);
};
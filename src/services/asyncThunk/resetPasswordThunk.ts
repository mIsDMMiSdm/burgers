import { createAsyncThunk } from '@reduxjs/toolkit';

import { ResetPasswordInput } from '../../types/ResetPasswordInput';
import { ResetPasswordPromise } from '../../types/ResetPasswordPromise';
import { resetPassword } from '../api/profileApi';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout';
import { AppDispatch, RootState } from '../index';
import { setErrorMessage, setMessage } from '../slices/passwordSlice';

type KnownErrorData = {
  message: string;
  success: boolean;
};

type ResetPasswordError = {
  data: KnownErrorData;
  ok: boolean;
  status: number;
  statusText: string;
  success: boolean;
  url: string;
}

export const fetchResetPassword = createAsyncThunk<
  ResetPasswordPromise,
  ResetPasswordInput,
  {
    dispatch: AppDispatch
    rejectValue: ResetPasswordError,
    state: RootState,
  }
>(
  'profile/fetchResetPassword',
  async (values,
         thunkAPI) => {
    try {
      const { dispatch, getState } = thunkAPI;
      const res = await resetPassword({
        password: values.password,
        token: values.token
      });
      const { password } = getState();
      showNotificationWithTimeout(password.resetPasswordRequest.messageContent,
        dispatch, setMessage);
      return res;
    } catch (e) {
      const { dispatch, rejectWithValue } = thunkAPI;
      const hasErrorData = (e  as ResetPasswordError);
      dispatch(setErrorMessage(true));
      setTimeout(() => {
        dispatch(setErrorMessage(false));
      }, 4000);
      return rejectWithValue(hasErrorData);
    }
  }
);
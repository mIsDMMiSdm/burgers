import { createAsyncThunk } from '@reduxjs/toolkit';

import { ForgotPasswordInput } from '../../types/ForgotPasswordInput';
import { ForgotPasswordPromise } from '../../types/ForgotPasswordPromise';
import { forgotPassword } from '../api/profileApi';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout';
import { AppDispatch, RootState } from '../index';
import { setMessage } from '../slices/passwordSlice';

type ForgotPasswordError = {
  [key: string]: unknown;
  message: string;
}

export const fetchForgotPassword = createAsyncThunk<
  ForgotPasswordPromise,
  ForgotPasswordInput,
  {
    dispatch: AppDispatch
    rejectValue: ForgotPasswordError,
    state: RootState,
  }
>(
  'profile/fetchForgotPassword',
  async ({ email },
         thunkAPI) => {
    try {
      const { dispatch, getState } = thunkAPI;
      const { password } = getState();
      const res = await forgotPassword({ email });
      showNotificationWithTimeout(password.forgotPasswordRequest.messageContent,
        dispatch, setMessage);
      return res;
    } catch (e) {
      const { rejectWithValue } = thunkAPI;
      const hasErrorData = (e  as ForgotPasswordError);
      return rejectWithValue(hasErrorData);
    }
  }
);
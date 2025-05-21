import { createAsyncThunk } from '@reduxjs/toolkit';

import { LogoutInput } from '../../types/LogoutInput';
import { LogoutPromise } from '../../types/LogoutPromise';
import { logoutUser } from '../api/profileApi';
import { resetAllCookie } from '../helpers/resetAllCookie';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout';
import { AppDispatch, RootState } from '../index';
import { setMessage } from '../slices/logoutSlice';
import { updateUser } from '../slices/userSlice';

type LogoutError = {
  message: string;
  success: boolean;
}

export const fetchLogout = createAsyncThunk<
  LogoutPromise,
  LogoutInput,
  {
    dispatch: AppDispatch
    rejectValue: LogoutError,
    state: RootState,
  }
>(
  'profile/fetchLogout',
  async ({ token },
         thunkAPI) => {
    try {
      const { dispatch, getState } = thunkAPI;
      const res = await logoutUser({ token });
      dispatch(updateUser({
        email: '',
        isLogin: false,
        isLogout: true,
        name: '',
        token: { accessToken: null, expiresAt: null, refreshToken: null }
      }));
      resetAllCookie();
      const { logout } = getState();
      showNotificationWithTimeout(logout.messageContent, dispatch, setMessage);
      return res;
    } catch (e: unknown) {
      const { rejectWithValue } = thunkAPI;
      const hasErrorData = (e as LogoutError);
      return rejectWithValue(hasErrorData);
    }
  }
);
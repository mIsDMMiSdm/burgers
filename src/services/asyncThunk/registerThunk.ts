import { createAsyncThunk } from '@reduxjs/toolkit';

import { LoginPromise } from '../../types/LoginPromise';
import { User } from '../../types/User';
import { registerUser } from '../api/profileApi';
import { changeUserLoginInfo } from '../helpers/changeUserLoginInfo';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout';
import { AppDispatch, RootState } from '../index';
import { setErrorMessage, setMessage } from '../slices/registerSlice';

type KnownErrorData = {
  message: string;
  success: boolean;
};

type RegisterError = {
  data: KnownErrorData;
  ok: boolean;
  status: number;
  statusText: string;
  success: boolean;
  url: string;
}

export const fetchRegister = createAsyncThunk<
    LoginPromise,
    User,
    {
      dispatch: AppDispatch
      rejectValue: RegisterError,
      state: RootState,
    }
  >(
    'profile/fetchRegister',
    async (userData,
           thunkAPI) => {
      try {
        const { dispatch, getState } = thunkAPI;
        const { email, name, password } = userData;
        const res = await registerUser({ email, name, password });
        const { accessToken, refreshToken, user } = res;
        changeUserLoginInfo(user, accessToken, refreshToken, dispatch);
        const { register } = getState();
        showNotificationWithTimeout(register.messageContent, dispatch, setMessage);
        return res;
      } catch (e) {
        const { dispatch, rejectWithValue } = thunkAPI;
        const hasErrorData = (e  as RegisterError);
        dispatch(setErrorMessage(true));
        setTimeout(() => {
          dispatch(setErrorMessage(false));
        }, 4000);
        return rejectWithValue(hasErrorData);
      }
    }
  )
;
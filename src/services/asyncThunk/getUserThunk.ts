import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserError } from '../../types/UserError';
import { UserPromise } from '../../types/UserPromise';
import { getUser } from '../api/profileApi';
import { AppDispatch, RootState } from '../index';
import { updateUser } from '../slices/userSlice';

export const fetchGetUser = createAsyncThunk<
  UserPromise,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  {
    dispatch: AppDispatch
    rejectValue: UserError,
    state: RootState,
  }
>(
  'profile/fetchGetUser',
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const res = await getUser();
      const { user } = res;
      dispatch(updateUser({
        email: user.email,
        isLogin: true,
        name: user.name
      }));
      return res;
    } catch (e: unknown) {
      const { rejectWithValue } = thunkAPI;
      const hasErrorData = (e as UserError);
      return rejectWithValue(hasErrorData);
    }
  }
);

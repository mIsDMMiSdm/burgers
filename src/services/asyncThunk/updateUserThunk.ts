import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserError } from '../../types/UserError';
import { UserPromise } from '../../types/UserPromise';
import { fetchUpdateUserInput } from '../../types/fetchUpdateUserInput';
import { patchUser } from '../api/profileApi';
import { AppDispatch, RootState } from '../index';
import { setError } from '../slices/userSlice';

export const fetchUpdateUser = createAsyncThunk<
  UserPromise,
  fetchUpdateUserInput,
  {
    dispatch: AppDispatch
    rejectValue: UserError,
    state: RootState,
  }
>(
  'profile/fetchUpdateUser',
  async (userData,
         thunkAPI) => {
    try {
      const { email, name, password } = userData;
      return await patchUser({ email, name, password })
    } catch (e) {
      const { dispatch, rejectWithValue } = thunkAPI;
      const hasErrorData = (e  as UserError);
      setTimeout(() => dispatch(setError(false)), 2000);
      return rejectWithValue(hasErrorData);
    }
  }
);

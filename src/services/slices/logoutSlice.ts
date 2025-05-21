import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { State } from '../../types/State';
import {
  ERROR_DEFAULT,
  NOTIFICATION_LOGOUT_SUCCESS,
} from '../../utils/constants';
import { fetchLogout } from '../asyncThunk/logoutThunk';

const initialState: State = {
  error: false,
  errorMessage: false,
  errorMessageContent: ERROR_DEFAULT,
  fetch: false,
  message: false,
  messageContent: NOTIFICATION_LOGOUT_SUCCESS
};

const logoutSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Logout
      .addCase(fetchLogout.pending, (state) => {
        state.fetch = true;
        state.error = false;
        state.message = false;
        state.errorMessage = false;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.fetch = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        if (action.payload && 'message' in action.payload) {
          const { message } = action.payload;
          state.errorMessageContent = message || ERROR_DEFAULT;
          state.fetch = false;
          state.error = true;
        } else {
          console.error('action.payload is undefined');
        }
      });
  },
  initialState,
  name: 'logout',
  reducers: {
    setMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.message = action.payload;
    },
  }
});

export const { setMessage } = logoutSlice.actions;
export default logoutSlice.reducer;
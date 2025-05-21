import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { State } from '../../types/State';
import {
  ERROR_DEFAULT, ERROR_USER_EXISTS,
  NOTIFICATION_USER_CREATED, SERVER_RESPOND_USER_EXISTS
} from '../../utils/constants';
import { fetchRegister } from '../asyncThunk/registerThunk';

const initialState: State = {
  error: false,
  errorMessage: false,
  errorMessageContent: ERROR_DEFAULT,
  fetch: false,
  message: false,
  messageContent: NOTIFICATION_USER_CREATED
};

const registerSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(fetchRegister.pending, (state) => {
        state.fetch = true;
        state.error = false;
        state.message = false;
        state.errorMessage = false;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.fetch = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        if (action.payload && 'data' in action.payload) {
          const { data } = action.payload;
          const { message } = data;
          state.errorMessage = true;
          state.errorMessageContent = (message && message === SERVER_RESPOND_USER_EXISTS)
            ? state.errorMessageContent = ERROR_USER_EXISTS
            : state.errorMessageContent = message || ERROR_DEFAULT;
          state.fetch = false;
          state.error = true;
        } else {
          console.error('action.payload is undefined');
        }
      });
  },
  initialState,
  name: 'register',
  reducers: {
    setErrorMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.errorMessage = action.payload;
    },
    setMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.message = action.payload;
    }
  }
});

export const { setErrorMessage, setMessage } = registerSlice.actions;
export default registerSlice.reducer;
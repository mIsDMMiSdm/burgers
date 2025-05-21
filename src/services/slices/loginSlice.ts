import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { State } from '../../types/State';
import {
  ERROR_DEFAULT, ERROR_LOGIN,
  NOTIFICATION_LOGIN_SUCCESS,
  SERVER_RESPOND_INCORRECT_VALUES
} from '../../utils/constants';
import { fetchLogin } from '../asyncThunk/loginThunk';

const initialState: State = {
  error: false,
  errorMessage: false,
  errorMessageContent: ERROR_DEFAULT,
  fetch: false,
  message: false,
  messageContent: NOTIFICATION_LOGIN_SUCCESS
};

const loginSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(fetchLogin.pending,
        (state) => {
          state.fetch = true;
          state.error = false;
          state.message = false;
          state.errorMessage = false;
        })
      .addCase(fetchLogin.fulfilled,
        (state) => {
          state.fetch = false;
        })
      .addCase(fetchLogin.rejected,
        (state, action) => {
          if (action.payload && "data" in action.payload) {
            const { data } = action.payload;
            const { message } = data;
            state.errorMessage = true;
            state.errorMessageContent = (message && message === SERVER_RESPOND_INCORRECT_VALUES)
              ? state.errorMessageContent = ERROR_LOGIN
              : state.errorMessageContent = message || ERROR_DEFAULT;
            state.fetch = false;
            state.error = true;
          } else {
            console.error('action.payload is undefined')
          }
        });

  },
  initialState,
  name: 'login',
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

export const { setErrorMessage, setMessage } = loginSlice.actions;
export default loginSlice.reducer;

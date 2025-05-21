import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { State } from '../../types/State';
import {
  ERROR_DEFAULT,
  NOTIFICATION_EMAIL_SUBMITTED, NOTIFICATION_INCORRECT_TOKEN,
  NOTIFICATION_PASSWORD_RESET,
  SERVER_RESPOND_INCORRECT_TOKEN
} from '../../utils/constants';
import { fetchForgotPassword } from '../asyncThunk/forgotPasswordThunk';
import { fetchResetPassword } from '../asyncThunk/resetPasswordThunk';

export type PasswordState = {
  forgotPasswordRequest: State;
  isEmailSubmitted: boolean;
  isPasswordChanged: boolean;
  resetPasswordRequest: State;
}

const initialState: PasswordState = {
  forgotPasswordRequest: {
    error: false,
    errorMessage: false,
    errorMessageContent: ERROR_DEFAULT,
    fetch: false,
    message: false,
    messageContent: NOTIFICATION_EMAIL_SUBMITTED,
  },
  isEmailSubmitted: false,
  isPasswordChanged: false,
  resetPasswordRequest: {
    error: false,
    errorMessage: false,
    errorMessageContent: ERROR_DEFAULT,
    fetch: false,
    message: false,
    messageContent: NOTIFICATION_PASSWORD_RESET,
  },
};

const passwordSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Password forgot
      .addCase(fetchForgotPassword.pending, (state) => {
        state.isEmailSubmitted = false;
        state.forgotPasswordRequest = {
          ...initialState.forgotPasswordRequest,
          fetch: true
        };
      })
      .addCase(fetchForgotPassword.fulfilled, (state) => {
        state.isEmailSubmitted = true;
        state.forgotPasswordRequest = {
          ...state.forgotPasswordRequest,
          fetch: false,
          message: true
        };
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.isEmailSubmitted = false;
        state.forgotPasswordRequest = {
          ...state.forgotPasswordRequest,
          error: true,
          errorMessage: true,
          errorMessageContent: action.payload?.message ?? ERROR_DEFAULT,
          fetch: false,
        };
      })
      // Password reset
      .addCase(fetchResetPassword.pending, (state) => {
        state.isPasswordChanged = false;
        state.resetPasswordRequest = {
          ...initialState.resetPasswordRequest,
          fetch: true
        };
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.isPasswordChanged = true;
        state.isEmailSubmitted = false;
        state.resetPasswordRequest = {
          ...state.resetPasswordRequest,
          fetch: false,
          message: true
        };
      })
      .addCase(fetchResetPassword.rejected,
        (state, action) => {
          state.isPasswordChanged = false;
          // todo: найти причину почему action.payload может быть undefined
          if (action.payload && 'data' in action.payload) {
            const { data } = action.payload;
            const { message } = data;
            state.resetPasswordRequest = {
              ...state.resetPasswordRequest,
              error: true,
              errorMessage: true,
              errorMessageContent: (message && message === SERVER_RESPOND_INCORRECT_TOKEN)
                ? state.resetPasswordRequest.errorMessageContent = NOTIFICATION_INCORRECT_TOKEN
                : state.resetPasswordRequest.errorMessageContent = message || ERROR_DEFAULT,
              fetch: false,
            };
          } else {
            console.error('action.payload is undefined');
          }
        });
  },
  initialState,
  name: 'password',
  reducers: {
    setErrorMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.forgotPasswordRequest.errorMessage = action.payload;
      state.resetPasswordRequest.errorMessage = action.payload;
    },
    setIsEmailSubmitted(
      state,
      action: PayloadAction<boolean>
    ) {
      state.isEmailSubmitted = action.payload;
    },
    setIsPasswordChanged(
      state,
      action: PayloadAction<boolean>
    ) {
      state.isPasswordChanged = action.payload;
    },
    setMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.forgotPasswordRequest.message = action.payload;
      state.resetPasswordRequest.message = action.payload;
    }
  }
});

export const { setErrorMessage, setMessage } = passwordSlice.actions;
export default passwordSlice.reducer;

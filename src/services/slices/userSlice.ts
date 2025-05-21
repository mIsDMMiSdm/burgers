import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { State } from '../../types/State';
import { Token } from '../../types/Token';
import {
  ACCESS_TOKEN,
  ERROR_DEFAULT, ERROR_USER_EXISTS, EXPIRES_AT, NOTIFICATION_LOGIN_SUCCESS,
  NOTIFICATION_USER_UPDATE_ERROR,
  NOTIFICATION_USER_UPDATE_SUCCESS, REFRESH_TOKEN
} from '../../utils/constants';
import { fetchGetUser } from '../asyncThunk/getUserThunk';
import { fetchUpdateUser } from '../asyncThunk/updateUserThunk';
import { getCookie } from '../helpers/getCookie';

export type UserState = {
  getUserRequest: State;
  patchUserRequest: State;
  user: {
    email: string;
    isLogin: boolean;
    isLogout: boolean;
    name: string;
    token: Token;
  }
}

const initialState: UserState = {
  getUserRequest: {
    error: false,
    errorMessage: false,
    errorMessageContent: ERROR_DEFAULT,
    fetch: false,
    message: false,
    messageContent: NOTIFICATION_LOGIN_SUCCESS
  },
  patchUserRequest: {
    error: false,
    errorMessage: false,
    errorMessageContent: NOTIFICATION_USER_UPDATE_ERROR,
    fetch: false,
    message: false,
    messageContent: NOTIFICATION_USER_UPDATE_SUCCESS
  },
  user: {
    email: '',
    isLogin: !!getCookie(ACCESS_TOKEN) || false,
    isLogout: false,
    name: '',
    token: {
      accessToken: getCookie(ACCESS_TOKEN) ?? null,
      expiresAt: getCookie(EXPIRES_AT) ?? null,
      refreshToken: getCookie(REFRESH_TOKEN) ?? null
    }
  }
};

const userSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Get user
      .addCase(fetchGetUser.pending, (state) => {
        state.getUserRequest = {
          ...initialState.getUserRequest,
          fetch: true
        };
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        const { email, name } = user;

        state.getUserRequest = {
          ...state.getUserRequest,
          fetch: false,
        };

        state.user = {
          ...state.user,
          email,
          isLogin: true,
          name
        };
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        if (action.payload && 'message' in action.payload) {
          const { message } = action.payload;
          state.getUserRequest = {
            ...state.getUserRequest,
            error: true,
            errorMessageContent: message || ERROR_DEFAULT,
            fetch: false
          };
          state.user = {
            ...state.user,
            isLogin: false
          };
        } else {
          console.error('action.payload is undefined');
        }
      })
      // Update user
      .addCase(fetchUpdateUser.pending, (state) => {
        state.patchUserRequest = {
          ...initialState.patchUserRequest,
          fetch: true
        };
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        const { email, name } = user;

        state.patchUserRequest = {
          ...state.patchUserRequest,
          fetch: false,
          message: true
        };

        state.user = {
          ...state.user,
          email,
          isLogin: true,
          name
        };
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        if (action.payload && 'message' in action.payload) {
          const { message } = action.payload;
          state.patchUserRequest = {
            ...state.patchUserRequest,
            error: true,
            errorMessage: true,
            fetch: false
          };
          (message && message === 'User with such email already exists')
            ? state.patchUserRequest.errorMessageContent = ERROR_USER_EXISTS
            : state.patchUserRequest.errorMessageContent = message || NOTIFICATION_USER_UPDATE_ERROR;
        } else {
          console.error('action.payload is undefined');
        }
      });
  },
  initialState,
  name: 'user',
  reducers: {
    setError(
      state,
      action: PayloadAction<boolean>
    ) {
      state.patchUserRequest = {
        ...state.patchUserRequest,
        errorMessage: action.payload
      };
    },
    updateUser(
      state,
      action: PayloadAction<{
        email?: string;
        isLogin?: boolean;
        isLogout?: boolean;
        name?: string;
        token?: Token;
      }>
    ) {
      state.user = {
        ...state.user,
        ...action.payload
      };
    }
  },
});

export const { setError, updateUser } = userSlice.actions;
export default userSlice.reducer;

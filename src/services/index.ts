import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { socketMiddleware } from './middleware/socketMiddleware';
import cartSlice from './slices/cartSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import loadingSlice from './slices/loadingSlice';
import loginSlice from './slices/loginSlice';
import logoutSlice from './slices/logoutSlice';
import modalSlice from './slices/modalSlice';
import orderSlice from './slices/orderSlice';
import passwordSlice from './slices/passwordSlice';
import registerSlice from './slices/registerSlice';
import userSlice from './slices/userSlice';
import wsSlice, { wsActions } from './slices/wsSlice';

const rootReducer = combineReducers({
  cart: cartSlice,
  ingredients: ingredientsSlice,
  loading: loadingSlice,
  login: loginSlice,
  logout: logoutSlice,
  modal: modalSlice,
  order: orderSlice,
  password: passwordSlice,
  register: registerSlice,
  user: userSlice,
  websocket: wsSlice
});

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsActions)),
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
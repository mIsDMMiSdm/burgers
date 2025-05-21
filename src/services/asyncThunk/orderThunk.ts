import { createAsyncThunk } from '@reduxjs/toolkit';

import { Cart } from '../../types/Cart';
import { GetOrdersPromise } from '../../types/GetOrdersPromise';
import { OrderPromise } from '../../types/OrderPromise';
import { getOrder, postOrder } from '../api/orderApi';
import { AppDispatch, RootState } from '../index';
import { cleanCart } from '../slices/cartSlice';
import { closeAllModal, setModalNotification, setModalOrderSuccess } from '../slices/modalSlice';
import { setErrorMessage, setMessage, setOrder } from '../slices/orderSlice';


type OrderError = {
  message: string;
}

export const createOrder = createAsyncThunk<
  OrderPromise,
  Cart,
  {
    dispatch: AppDispatch
    rejectValue: OrderError,
    state: RootState,
  }
>(
  'order/createOrder',
  async (cart, thunkAPI) => {
    try {
      const { dispatch, getState } = thunkAPI;
      const bunId = cart.bun._id;
      const ingredientsIdsArray = cart.ingredients.map(item => item._id);
      const idsArray = [bunId, ...ingredientsIdsArray, bunId];
      dispatch(setMessage(true));
      const { order } = getState();
      dispatch(setModalNotification(order.messageContent));
      setTimeout(() => {
          dispatch(setMessage(false));
          dispatch(closeAllModal());
        },
        14000);
      const res = await postOrder({ ingredients: idsArray });
      dispatch(setModalOrderSuccess(res));
      dispatch(cleanCart());
      return res;
    } catch (e) {
      const { dispatch, getState, rejectWithValue } = thunkAPI;
      const hasErrorData = (e  as OrderError);
      dispatch(setErrorMessage(true));
      const { order } = getState();
      dispatch(setModalNotification(order.errorMessageContent));
      setTimeout(() => {
          dispatch(setErrorMessage(false));
          dispatch(closeAllModal());
        },
        4000);
      return rejectWithValue(hasErrorData);
    }
  },
);

export const fetchGetOrder = createAsyncThunk<
  GetOrdersPromise,
  number,
  {
    dispatch: AppDispatch
    rejectValue: OrderError,
    state: RootState,
  }
>(
  'order/getOrder',
  async (orderNumber,
         thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const res = await getOrder({ orderNumber });
      const { orders } = res;
      dispatch(setOrder(orders[0]));
      return res;
    } catch (e) {
      const { rejectWithValue } = thunkAPI;
      const hasErrorData = (e  as OrderError);
      return rejectWithValue(hasErrorData);
    }
  },
);
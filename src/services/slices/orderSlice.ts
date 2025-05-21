import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Order } from '../../types/Order';
import { State } from '../../types/State';
import { ERROR_DEFAULT, NOTIFICATION_ORDER_PENDING } from '../../utils/constants';
import { createOrder } from '../asyncThunk/orderThunk';

export type OrderState = {
  order: Order | null,
  orderNumber: null | string,
}

const initialState: OrderState & State = {
  error: false,
  errorMessage: false,
  errorMessageContent: ERROR_DEFAULT,
  fetch: false,
  message: false,
  messageContent: NOTIFICATION_ORDER_PENDING,
  order: null,
  orderNumber: null
};

const orderSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.fetch = true;
        state.error = false;
        state.message = false;
        state.errorMessage = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        const { number } = order;
        state.order = order;
        state.orderNumber = number.toString();
        state.fetch = false;
        state.message = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        if (action.payload?.message) {
          state.errorMessage = true;
          state.errorMessageContent = action.payload.message;
        }

        state.fetch = false;
        state.error = true;
      });
  },
  initialState,
  name: 'order',
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
    },
    setOrder(
      state,
      action: PayloadAction<Order>
    ) {
      state.order = action.payload;
    }
  },
});
export const { setErrorMessage, setMessage, setOrder } = orderSlice.actions;

export default orderSlice.reducer;
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Order } from '../../types/Order';
import { WebsocketState } from '../../types/WebsocketState';

const initialState: WebsocketState = {
  orders: null,
  total: 0,
  totalToday: 0,
  wsConnected: false
};

const wsSlice = createSlice({
  initialState,
  name: 'wsSlice',
  reducers: {
    wsConnectionClosed(state) {
      state.wsConnected = false;
      state.orders = null;
    },
    wsConnectionFailed(state) {
      state.wsConnected = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    wsConnectionStart(_state, _action: PayloadAction<string>) {
      return undefined;
    },
    wsConnectionSuccess(state) {
      state.wsConnected = true;
    },
    wsGetAllOrders(
      state,
      action: PayloadAction<{
        orders: Order[],
        total: number,
        totalToday: number
      }>
    ) {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
  }
});

export const {
  wsConnectionClosed,
  wsConnectionFailed,
  wsConnectionStart,
  wsConnectionSuccess,
  wsGetAllOrders
} = wsSlice.actions;

export const wsActions = {
  onClose: wsConnectionClosed.type,
  onError: wsConnectionFailed.type,
  onMessage: wsGetAllOrders.type,
  onOpen: wsConnectionSuccess.type,
  wsInit: wsConnectionStart.type,
};
export default wsSlice.reducer;

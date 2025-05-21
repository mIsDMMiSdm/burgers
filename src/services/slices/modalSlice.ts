import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Ingredient } from '../../types/Ingredient';
import { Order } from '../../types/Order';
import { OrderPromise } from '../../types/OrderPromise';

export type ModalState = {
  modalIngredient: Ingredient | null;
  modalNotification: null | string;
  modalOrder: Order | null;
  modalOrderSuccess: OrderPromise | null;
}

const initialState: ModalState = {
  modalIngredient: null,
  modalNotification: null,
  modalOrder: null,
  modalOrderSuccess: null
};

const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    closeAllModal(state) {
      state.modalOrder = null;
      state.modalIngredient = null;
      state.modalNotification = null;
      state.modalOrderSuccess = null;
    },
    setModalIngredient(
      state,
      action: PayloadAction<Ingredient>
    ) {
      state.modalIngredient = action.payload;
    },
    setModalNotification(
      state,
      action: PayloadAction<string>
    ) {
      state.modalNotification = action.payload;
    },
    setModalOrder(
      state,
      action: PayloadAction<Order>
    ) {
      state.modalOrder = action.payload;
    },
    setModalOrderSuccess(
      state,
      action: PayloadAction<OrderPromise>
    ) {
      state.modalOrderSuccess = action.payload;
    }
  }
});

export const {
  closeAllModal,
  setModalIngredient,
  setModalNotification,
  setModalOrder,
  setModalOrderSuccess,
} = modalSlice.actions;
export default modalSlice.reducer;
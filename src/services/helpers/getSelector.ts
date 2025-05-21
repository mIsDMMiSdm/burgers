import { State } from '../../types/State';
import { WebsocketState } from '../../types/WebsocketState';
import { RootState } from '../index';
import { CartState } from '../slices/cartSlice';
import { IngredientsState } from '../slices/ingredientsSlice';
import { LoadingState } from '../slices/loadingSlice';
import { ModalState } from '../slices/modalSlice';
import { OrderState } from '../slices/orderSlice';
import { PasswordState } from '../slices/passwordSlice';
import { UserState } from '../slices/userSlice';

export const getIngredients = (store: RootState): IngredientsState => store.ingredients
export const getUser = (store: RootState): UserState => store.user
export const getOrder = (store: RootState): OrderState & State => store.order
export const getModal = (store: RootState): ModalState => store.modal
export const getLoading = (store: RootState): LoadingState => store.loading
export const getCart = (store: RootState): CartState => store.cart
export const getWebsocket = (store: RootState): WebsocketState => store.websocket
export const getPassword = (store: RootState): PasswordState => store.password
export const getLogin = (store: RootState): State => store.login
export const getRegister = (store: RootState): State => store.register


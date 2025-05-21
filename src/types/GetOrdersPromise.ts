import { Order } from './Order';

export type GetOrdersPromise = {
  orders: Order[];
  success: boolean;
}
import { Order } from './Order';

export type OrderPromise = {
  name: string;
  order: Order;
  success: boolean;
}
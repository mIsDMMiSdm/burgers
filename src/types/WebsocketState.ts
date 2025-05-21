import { Order } from './Order';

export type WebsocketState = {
  orders: Order[] | null;
  total: number;
  totalToday: number;
  wsConnected: boolean;
}
import { GetOrdersPromise } from '../../types/GetOrdersPromise';
import { OrderPromise } from '../../types/OrderPromise';
import { request } from '../helpers/request';

export const postOrder = ({ ingredients }: { ingredients: string[] }) =>
  request('orders', {
    body: JSON.stringify({ ingredients }),
    method: 'POST'
  }) as Promise<OrderPromise>;
export const getOrder = ({ orderNumber }: { orderNumber: number }) =>
  request(`orders/${orderNumber}`) as Promise<GetOrdersPromise>;

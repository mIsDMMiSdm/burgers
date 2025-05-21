import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware, MiddlewareAPI } from 'redux';

import { WebsocketActions } from '../../types/WebsocketActions';
import { WebsocketState } from '../../types/WebsocketState';
import { WS_RESPOND_INCORRECT_TOKEN } from '../../utils/constants';
import { fetchGetUser } from '../asyncThunk/getUserThunk';
import { AppDispatch, RootState } from '../index';

export const socketMiddleware =
  (wsActions: WebsocketActions): Middleware =>
    (store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;

      return (next) => (action: PayloadAction<string>) => {
        const { dispatch } = store;
        const {
          payload,
          type,
        } = action;
        const {
          onClose,
          onError,
          onMessage,
          onOpen,
          wsInit,
        } = wsActions;

        if (type === wsInit) {
          socket = new WebSocket(payload);
        }

        if ((type === wsInit || type === onClose) && socket?.readyState === 1) {
          socket.close();
        }

        if (socket) {
          socket.onopen = () => {
            dispatch({ type: onOpen });
          };

          socket.onerror = () => {
            dispatch({ type: onError });
          };

          socket.onmessage = (event: MessageEvent<string>) => {
            const { data } = event;
            const parsedData = JSON.parse(data) as WebsocketState & { message: string };

            if (parsedData.message
              && parsedData.message === WS_RESPOND_INCORRECT_TOKEN) {
              void dispatch(fetchGetUser());
            }

            const { ...restParsedData } = parsedData;

            if (restParsedData.orders) {
              restParsedData.orders.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
              );

              dispatch({
                payload: restParsedData,
                type: onMessage,
              });
            }
          };

          socket.onclose = () => {
            dispatch({ type: onClose });
          };
        }

        next(action);
      };
    };

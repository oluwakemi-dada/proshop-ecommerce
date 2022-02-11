import axios from 'axios';
import { errorHandler } from './errorHandler';
import { OrderCreateActionTypes, OrderCreate, Order } from '../types/index';
import { AppThunk } from '../store';

export const createOrder =
  (order: Order): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: OrderCreateActionTypes.ORDER_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        'Content-Type': 'application/json',
        headers: {
          Authorization: `Bearer ${userInfo!.token}`,
        },
      };

      const { data } = await axios.post<OrderCreate>(
        '/api/orders',
        order,
        config
      );

      dispatch({
        type: OrderCreateActionTypes.ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: OrderCreateActionTypes.ORDER_CREATE_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

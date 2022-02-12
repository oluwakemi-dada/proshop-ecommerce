import axios from 'axios';
import { errorHandler } from './errorHandler';
import {
  OrderCreateActionTypes,
  OrderDetailsActionTypes,
  OrderCreate,
  Order,
  OrderDetails,
} from '../types/index';
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

export const getOrderDetails =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: OrderDetailsActionTypes.ORDER_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo!.token}`,
        },
      };

      const { data } = await axios.get<OrderDetails>(
        `/api/orders/${id}`,
        config
      );

      dispatch({
        type: OrderDetailsActionTypes.ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: OrderDetailsActionTypes.ORDER_DETAILS_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

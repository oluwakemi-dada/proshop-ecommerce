import axios from 'axios';
import { errorHandler } from './errorHandler';
import {
  OrderCreateActionTypes,
  OrderDetailsActionTypes,
  OrderPayActionTypes,
  OrderDeliverActionTypes,
  OrderListMyActionTypes,
  OrderListActionTypes,
  OrderCreate,
  Order,
  OrderDetails,
  OrderListMy,
  OrderList,
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

// Custom type
export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  payer: { email_address: string };
}

export const payOrder =
  (orderId: string, paymentResult: PaymentResult): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: OrderPayActionTypes.ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo!.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: OrderPayActionTypes.ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: OrderPayActionTypes.ORDER_PAY_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

// DELIVER ORDER
export const deliverOrder =
  (orderId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: OrderDeliverActionTypes.ORDER_DELIVER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo!.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/deliver`,
        {},
        config
      );

      dispatch({
        type: OrderDeliverActionTypes.ORDER_DELIVER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: OrderDeliverActionTypes.ORDER_DELIVER_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

// LIST MY ORDERS
export const listMyOrders = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderListMyActionTypes.ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo!.token}`,
      },
    };

    const { data } = await axios.get<OrderListMy[]>(
      `/api/orders/myorders`,
      config
    );

    dispatch({
      type: OrderListMyActionTypes.ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderListMyActionTypes.ORDER_LIST_MY_FAILURE,
      payload: errorHandler(error),
    });
  }
};

// LIST ALL ORDERS
export const listOrders = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderListActionTypes.ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo!.token}`,
      },
    };

    const { data } = await axios.get<OrderList[]>(`/api/orders`, config);

    dispatch({
      type: OrderListActionTypes.ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderListActionTypes.ORDER_LIST_FAILURE,
      payload: errorHandler(error),
    });
  }
};

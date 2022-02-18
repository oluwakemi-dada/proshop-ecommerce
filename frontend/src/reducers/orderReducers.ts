import {
  OrderCreateActionTypes,
  OrderCreateAction,
  OrderCreateState,
  OrderDetailsActionTypes,
  OrderDetailsAction,
  OrderDetailsState,
  OrderPayActionTypes,
  OrderPayAction,
  OrderPayState,
  OrderDeliverActionTypes,
  OrderDeliverAction,
  OrderDeliverState,
  OrderListMyActionTypes,
  OrderListMyAction,
  OrderListMyState,
  OrderListActionTypes,
  OrderListAction,
  OrderListState,
} from '../types/index';

const orderCreateInitialState: OrderCreateState = {
  loading: false,
};

export const orderCreateReducer = (
  state = orderCreateInitialState,
  action: OrderCreateAction
) => {
  switch (action.type) {
    case OrderCreateActionTypes.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case OrderCreateActionTypes.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case OrderCreateActionTypes.ORDER_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const orderDetailsInitialState: OrderDetailsState = {
  loading: false,
};

export const orderDetailsReducer = (
  state = orderDetailsInitialState,
  action: OrderDetailsAction
) => {
  switch (action.type) {
    case OrderDetailsActionTypes.ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case OrderDetailsActionTypes.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case OrderDetailsActionTypes.ORDER_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// ORDER PAY
const orderPayInitialState: OrderPayState = {};

export const orderPayReducer = (
  state = orderPayInitialState,
  action: OrderPayAction
) => {
  switch (action.type) {
    case OrderPayActionTypes.ORDER_PAY_REQUEST:
      return {
        loading: true,
      };

    case OrderPayActionTypes.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case OrderPayActionTypes.ORDER_PAY_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case OrderPayActionTypes.ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

// ORDER DELIVER
const orderDeliverInitialState: OrderDeliverState = {};

export const orderDeliverReducer = (
  state = orderDeliverInitialState,
  action: OrderDeliverAction
) => {
  switch (action.type) {
    case OrderDeliverActionTypes.ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };

    case OrderDeliverActionTypes.ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case OrderDeliverActionTypes.ORDER_DELIVER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case OrderDeliverActionTypes.ORDER_DELIVER_RESET:
      return {};

    default:
      return state;
  }
};

// LIST MY ORDERS
const orderListMyInitialState: OrderListMyState = {
  loading: false,
  orders: [],
};

export const orderListMyReducer = (
  state = orderListMyInitialState,
  action: OrderListMyAction
) => {
  switch (action.type) {
    case OrderListMyActionTypes.ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };

    case OrderListMyActionTypes.ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case OrderListMyActionTypes.ORDER_LIST_MY_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case OrderListMyActionTypes.ORDER_LIST_MY_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};

// LIST ALL ORDERS
const orderListInitialState: OrderListState = {
  loading: false,
  orders: [],
};

export const orderListReducer = (
  state = orderListInitialState,
  action: OrderListAction
) => {
  switch (action.type) {
    case OrderListActionTypes.ORDER_LIST_REQUEST:
      return {
        loading: true,
      };

    case OrderListActionTypes.ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case OrderListActionTypes.ORDER_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

import {
  OrderCreateActionTypes,
  OrderCreateAction,
  OrderCreateState,
  OrderDetailsActionTypes,
  OrderDetailsAction,
  OrderDetailsState,
} from '../types/index';

const orderCreateReducerInitialState: OrderCreateState = {
  loading: false,
};

export const orderCreateReducer = (
  state = orderCreateReducerInitialState,
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

const orderDetailsReducerInitialState: OrderDetailsState = {
  loading: false,
};

export const orderDetailsReducer = (
  state = orderDetailsReducerInitialState,
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

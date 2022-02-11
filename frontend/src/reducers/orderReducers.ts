import {
  OrderCreateActionTypes,
  OrderCreateAction,
  OrderCreateState,
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

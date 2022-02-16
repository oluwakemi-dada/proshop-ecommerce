import {
  ProductListActionTypes,
  ProductListAction,
  ProductListState,
  ProductDetailsActionTypes,
  ProductDetailsAction,
  ProductDetailsState,
  ProductDeleteActionTypes,
  ProductDeleteAction,
  ProductDeleteState,
} from '../types/index';

const productListInitialState: ProductListState = {
  products: [],
  loading: false,
};

export const productListReducer = (
  state = productListInitialState,
  action: ProductListAction
) => {
  switch (action.type) {
    case ProductListActionTypes.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ProductListActionTypes.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ProductListActionTypes.PRODUCT_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const productDetailsInitialState: ProductDetailsState = {
  loading: false,
};

export const productDetailsReducer = (
  state = productDetailsInitialState,
  action: ProductDetailsAction
) => {
  switch (action.type) {
    case ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case ProductDetailsActionTypes.PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const productDeleteInitialState: ProductDetailsState = {
  loading: false,
};

export const productDeleteReducer = (
  state = productDeleteInitialState,
  action: ProductDeleteAction
) => {
  switch (action.type) {
    case ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case ProductDeleteActionTypes.PRODUCT_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

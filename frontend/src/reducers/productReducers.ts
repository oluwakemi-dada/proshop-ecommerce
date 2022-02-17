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
  ProductCreateActionTypes,
  ProductCreateAction,
  ProductCreateState,
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
        loading: true,
      };

    case ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case ProductDetailsActionTypes.PRODUCT_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// PRODUCT DELETE REDUCER
const productDeleteInitialState: ProductDeleteState = {
  loading: false,
};

export const productDeleteReducer = (
  state = productDeleteInitialState,
  action: ProductDeleteAction
) => {
  switch (action.type) {
    case ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };

    case ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ProductDeleteActionTypes.PRODUCT_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// PRODUCT CREATE REDUCER
const productCreateInitialState: ProductCreateState = {
  loading: false,
};

export const productCreateReducer = (
  state = productCreateInitialState,
  action: ProductCreateAction
) => {
  switch (action.type) {
    case ProductCreateActionTypes.PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };

    case ProductCreateActionTypes.PRODUCT_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case ProductCreateActionTypes.PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

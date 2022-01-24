import {
  ProductListActionTypes,
  ProductListAction,
  ProductListState,
  ProductDetailsActionTypes,
  ProductDetailsAction,
  ProductDetailsState,
} from '../types/index';

const initialProductListState: ProductListState = {
  products: [],
  loading: false,
};

export const productListReducers = (
  state = initialProductListState,
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

const initialProductDetailsState: ProductDetailsState = {
  loading: false,
};

export const productDetailsReducers = (
  state = initialProductDetailsState,
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

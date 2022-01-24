import { Product } from './index';

export interface ProductListState {
  products: Product[];
  loading: boolean;
  error?: undefined;
}

export enum ProductListActionTypes {
  PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST',
  PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS',
  PRODUCT_LIST_FAILURE = 'PRODUCT_LIST_FAILURE',
}

export interface GetProductsRequestAction {
  type: ProductListActionTypes.PRODUCT_LIST_REQUEST;
}

export interface GetProductsSuccessAction {
  type: ProductListActionTypes.PRODUCT_LIST_SUCCESS;
  payload: { products: Product[] };
}

export interface GetProductsFailureAction {
  type: ProductListActionTypes.PRODUCT_LIST_FAILURE;
  payload: any;
}

export type ProductListAction =
  | GetProductsSuccessAction
  | GetProductsFailureAction
  | GetProductsRequestAction;

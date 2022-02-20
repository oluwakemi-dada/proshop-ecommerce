import { Product } from './index';

export interface ProductListState {
  loading: boolean;
  products: Product[];
  pages?: number;
  page?: number;
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
  payload: { products: Product[]; pages: number; page: number };
}

export interface GetProductsFailureAction {
  type: ProductListActionTypes.PRODUCT_LIST_FAILURE;
  payload: any;
}

export type ProductListAction =
  | GetProductsSuccessAction
  | GetProductsFailureAction
  | GetProductsRequestAction;

import { Product } from './index';

export interface ProductDetailsState {
  loading: boolean;
  product?: Product;
  error?: undefined;
}

export enum ProductDetailsActionTypes {
  PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST',
  PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS',
  PRODUCT_DETAILS_FAILURE = 'PRODUCT_DETAILS_FAILURE',
}

export interface GetProductRequestAction {
  type: ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST;
}

export interface GetProductSuccessAction {
  type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS;
  payload: Product;
}

export interface GetProductFailureAction {
  type: ProductDetailsActionTypes.PRODUCT_DETAILS_FAILURE;
  payload: any;
}

export type ProductDetailsAction =
  | GetProductSuccessAction
  | GetProductFailureAction
  | GetProductRequestAction;

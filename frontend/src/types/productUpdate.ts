import { Product } from './product';

export interface UpdateProductData {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
}

export interface ProductUpdateState {
  success?: boolean;
  product?: Product;
  loading?: boolean;
  error?: any;
}

export enum ProductUpdateActionTypes {
  PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST',
  PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS',
  PRODUCT_UPDATE_FAILURE = 'PRODUCT_UPDATE_FAILURE',
  PRODUCT_UPDATE_RESET = 'PRODUCT_UPDATE_RESET',
}

export interface ProductUpdateRequestAction {
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST;
}

export interface ProductUpdateSuccessAction {
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS;
  payload: Product;
}

export interface ProductUpdateFailureAction {
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE;
  payload: any;
}

export interface ProductUpdateResetAction {
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_RESET;
}

export type ProductUpdateAction =
  | ProductUpdateRequestAction
  | ProductUpdateSuccessAction
  | ProductUpdateFailureAction
  | ProductUpdateResetAction;

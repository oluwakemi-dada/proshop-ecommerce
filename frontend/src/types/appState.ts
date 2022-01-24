import { ProductListState, ProductDetailsState, CartState } from './index';

export interface ReduxState {
  productList: ProductListState;
  productDetails: ProductDetailsState;
  cart: CartState;
}

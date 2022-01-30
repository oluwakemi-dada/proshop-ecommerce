import { ProductListState, ProductDetailsState, CartState, UserLoginState } from './index';

export interface ReduxState {
  productList: ProductListState;
  productDetails: ProductDetailsState;
  cart: CartState;
  userLogin: UserLoginState
}

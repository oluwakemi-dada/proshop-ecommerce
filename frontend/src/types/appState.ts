import {
  ProductListState,
  ProductDetailsState,
  CartState,
  UserLoginState,
  UserRegisterState,
} from './index';

export interface ReduxState {
  productList: ProductListState;
  productDetails: ProductDetailsState;
  cart: CartState;
  userLogin: UserLoginState;
  userRegister: UserRegisterState;
}

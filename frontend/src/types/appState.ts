import {
  ProductListState,
  ProductDetailsState,
  CartState,
  UserLoginState,
  UserRegisterState,
  UserDetailsState,
  UserListState,
  UserDeleteState,
  UserUpdateProfileState,
  OrderCreateState,
  OrderDetailsState,
  OrderPayState,
  OrderListMyState,
} from './index';

export interface ReduxState {
  productList: ProductListState;
  productDetails: ProductDetailsState;
  cart: CartState;
  userLogin: UserLoginState;
  userRegister: UserRegisterState;
  userDetails: UserDetailsState;
  userUpdateProfile: UserUpdateProfileState;
  userList: UserListState;
  userDelete: UserDeleteState;
  orderCreate: OrderCreateState;
  orderDetails: OrderDetailsState;
  orderPay: OrderPayState;
  orderListMy: OrderListMyState;
}

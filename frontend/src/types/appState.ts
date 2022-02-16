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
  UserUpdateState,
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
  userUpdate: UserUpdateState;
  orderCreate: OrderCreateState;
  orderDetails: OrderDetailsState;
  orderPay: OrderPayState;
  orderListMy: OrderListMyState;
}

import {
  ProductListState,
  ProductCreateState,
  ProductDetailsState,
  ProductDeleteState,
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
  productCreate: ProductCreateState;
  productList: ProductListState;
  productDetails: ProductDetailsState;
  productDelete: ProductDeleteState;
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

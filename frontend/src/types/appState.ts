import {
  ProductListState,
  ProductCreateState,
  ProductDetailsState,
  ProductCreateReviewState,
  ProductUpdateState,
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
  OrderDeliverState,
  OrderListMyState,
  OrderListState,
} from './index';

export interface ReduxState {
  productCreate: ProductCreateState;
  productList: ProductListState;
  productDetails: ProductDetailsState;
  productReviewCreate: ProductCreateReviewState;
  productUpdate: ProductUpdateState;
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
  orderDeliver: OrderDeliverState;
  orderListMy: OrderListMyState;
  orderList: OrderListState;
}

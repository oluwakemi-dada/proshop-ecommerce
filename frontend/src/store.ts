import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ReduxState } from './types/index';
import {
  productListReducer,
  productDetailsReducer,
  cartReducer,
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  orderCreateReducer,
} from './reducers';

export type AppDispatch = ThunkDispatch<ReduxState, unknown, Action<string>>;

export type AppThunk = ThunkAction<
  Promise<void>,
  ReduxState,
  unknown,
  Action<string>
>;

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
});

const items = localStorage.getItem('cartItems');
const user = localStorage.getItem('userInfo');
const address = localStorage.getItem('shippingAddress');
const cartItemsFromStorage = items ? JSON.parse(items) : [];
const userInfoFromStorage = user ? JSON.parse(user) : null;
const shippingAddressFromStorage = address ? JSON.parse(address) : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ReduxState } from './types/index';
import {
  productListReducers,
  productDetailsReducers,
  cartReducer,
} from './reducers';

export type AppDispatch = ThunkDispatch<ReduxState, unknown, Action<string>>;

export type AppThunk = ThunkAction<
  Promise<void>,
  ReduxState,
  unknown,
  Action<string>
>;

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
});

const items = localStorage.getItem('cartItems');

const cartItemsFromStorage = items ? JSON.parse(items) : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

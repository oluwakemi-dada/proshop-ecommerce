import { CartActionTypes, CartAction, CartState } from '../types/index';

const initialState: CartState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case CartActionTypes.CART_ADD_ITEM:
      // Check if item already exist in cart
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.product === item.product
      )!;

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CartActionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    default:
      return state;
  }
};

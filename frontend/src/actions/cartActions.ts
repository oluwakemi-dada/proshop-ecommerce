import axios from 'axios';
import { AppThunk } from '../store';
import { CartActionTypes, Product } from '../types/index';

export const addToCart =
  (id: string, qty: number): AppThunk =>
  async (dispatch, getState) => {
    const { data } = await axios.get<Product>(`/api/products/${id}`);

    dispatch({
      type: CartActionTypes.CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

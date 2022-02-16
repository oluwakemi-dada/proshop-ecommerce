import axios from 'axios';
import { errorHandler } from './errorHandler';
import {
  ProductListActionTypes,
  ProductDetailsActionTypes,
  ProductDeleteActionTypes,
  Product,
} from '../types/index';
import { AppThunk } from '../store';

export const listProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch({ type: ProductListActionTypes.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get<{
      products: Product[];
    }>('/api/products');

    dispatch({
      type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ProductListActionTypes.PRODUCT_LIST_FAILURE,
      payload: errorHandler(error),
    });
  }
};

export const listProductDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST });

      const { data } = await axios.get<Product>(`/api/products/${id}`);

      dispatch({
        type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ProductDetailsActionTypes.PRODUCT_DETAILS_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const deleteProduct =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo!.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);

      dispatch({
        type: ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ProductDeleteActionTypes.PRODUCT_DELETE_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

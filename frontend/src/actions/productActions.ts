import axios from 'axios';
import { errorHandler } from './errorHandler';
import {
  ProductCreateActionTypes,
  ProductListActionTypes,
  ProductDetailsActionTypes,
  ProductCreateReviewActionTypes,
  ProductUpdateActionTypes,
  ProductDeleteActionTypes,
  UpdateProductData,
  Product,
} from '../types/index';
import { AppThunk } from '../store';

export const listProducts =
  (keyword = ''): AppThunk =>
  async (dispatch) => {
    try {
      dispatch({ type: ProductListActionTypes.PRODUCT_LIST_REQUEST });

      const { data } = await axios.get<{
        products: Product[];
      }>(`/api/products?keyword=${keyword}`);

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

export const createProduct = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch({
      type: ProductCreateActionTypes.PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo!.token}`,
      },
    };

    const { data } = await axios.post<Product>(`/api/products`, {}, config);

    dispatch({
      type: ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ProductCreateActionTypes.PRODUCT_CREATE_FAILURE,
      payload: errorHandler(error),
    });
  }
};

// UPDATE PRODUCT
export const updateProduct =
  (product: UpdateProductData): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo!.token}`,
        },
      };

      const { data } = await axios.put<Product>(
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch({
        type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

// CREATE PRODUCT REVIEW
export const createProductReview =
  (productId: string, review: { rating: number; comment: string }): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo!.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

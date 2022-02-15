import axios from 'axios';
import { errorHandler } from './errorHandler';
import {
  UserLoginActionTypes,
  UserRegisterActionTypes,
  UserDetailsActionTypes,
  UserUpdateProfileActionTypes,
  OrderListMyActionTypes,
  UserListActionTypes,
  UserWithToken,
  UserWithPassword,
  User,
} from '../types/index';
import { AppThunk } from '../store';

export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch({
        type: UserLoginActionTypes.USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<UserWithToken>(
        '/api/users/login',
        { email, password },
        config
      );

      dispatch({
        type: UserLoginActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UserLoginActionTypes.USER_LOGIN_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: UserLoginActionTypes.USER_LOGOUT,
  });
  dispatch({
    type: UserDetailsActionTypes.USER_DETAILS_RESET,
  });
  dispatch({
    type: OrderListMyActionTypes.ORDER_LIST_MY_RESET,
  });
};

export const register =
  (name: string, email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch({
        type: UserRegisterActionTypes.USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<UserWithToken>(
        '/api/users',
        { name, email, password },
        config
      );

      dispatch({
        type: UserRegisterActionTypes.USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: UserLoginActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UserRegisterActionTypes.USER_REGISTER_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const getUserDetails =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UserDetailsActionTypes.USER_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo!.token}`,
        },
      };

      const { data } = await axios.get<User>(`/api/users/${id}`, config);

      dispatch({
        type: UserDetailsActionTypes.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UserDetailsActionTypes.USER_DETAILS_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const updateUserProfile =
  (user: UserWithPassword): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        'Content-Type': 'application/json',
        headers: {
          Authorization: `Bearer ${userInfo!.token}`,
        },
      };

      const { data } = await axios.put<UserWithToken>(
        '/api/users/profile',
        user,
        config
      );

      dispatch({
        type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: UserLoginActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAILURE,
        payload: errorHandler(error),
      });
    }
  };

export const listUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch({
      type: UserListActionTypes.USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo!.token}`,
      },
    };

    const { data } = await axios.get<User[]>('/api/users', config);

    dispatch({
      type: UserListActionTypes.USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserListActionTypes.USER_LIST_FAILURE,
      payload: errorHandler(error),
    });
  }
};

import axios from 'axios';
import { errorHandler } from './errorHandler';
import {
  UserLoginActionTypes,
  UserRegisterActionTypes,
  UserDetailsActionTypes,
  UserWithToken,
  User
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

      const { data } = await axios.get<User>(
        `/api/users/${id}`,
        config
      );

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

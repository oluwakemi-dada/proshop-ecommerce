import axios from 'axios';
import { errorHandler } from './errorHandler';
import {
  UserLoginActionTypes,
  UserRegisterActionTypes,
  UserWithToken,
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

import axios from 'axios';
import { errorHandler } from './errorHandler';
import { UserLoginActionTypes, UserWithToken } from '../types/index';
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

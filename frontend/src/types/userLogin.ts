import { UserWithToken } from './index';

export interface UserLoginState {
  loading?: boolean;
  userInfo?: UserWithToken;
  error?: any;
}

export enum UserLoginActionTypes {
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE',
  USER_LOGIN_FAILURE_RESET = 'USER_LOGIN_FAILURE_RESET',
  USER_LOGOUT = 'USER_LOGOUT',
}

export interface UserLoginRequestAction {
  type: UserLoginActionTypes.USER_LOGIN_REQUEST;
}

export interface UserLoginSuccessAction {
  type: UserLoginActionTypes.USER_LOGIN_SUCCESS;
  payload: UserWithToken;
}

export interface UserLoginFailureAction {
  type: UserLoginActionTypes.USER_LOGIN_FAILURE;
  payload: any;
}

export interface UserLoginFailureResetAction {
  type: UserLoginActionTypes.USER_LOGIN_FAILURE_RESET;
}

export interface UserLogoutAction {
  type: UserLoginActionTypes.USER_LOGOUT;
}

export type UserLoginAction =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailureAction
  | UserLoginFailureResetAction
  | UserLogoutAction;

import { UserWithToken } from '.';

export interface UserRegisterState {
  loading?: boolean;
  userInfo?: UserWithToken;
  error?: any;
}

export enum UserRegisterActionTypes {
  USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST',
  USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
  USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE',
  USER_REGISTER_FAILURE_RESET = 'USER_REGISTER_FAILURE_RESET',
}

export interface UserRegisterRequestAction {
  type: UserRegisterActionTypes.USER_REGISTER_REQUEST;
}

export interface UserRegisterSuccessAction {
  type: UserRegisterActionTypes.USER_REGISTER_SUCCESS;
  payload: UserWithToken;
}

export interface UserRegisterFailureAction {
  type: UserRegisterActionTypes.USER_REGISTER_FAILURE;
  payload: any;
}

export interface UserRegisterFailureResetAction {
  type: UserRegisterActionTypes.USER_REGISTER_FAILURE_RESET;
}

export type UserRegisterAction =
  | UserRegisterRequestAction
  | UserRegisterSuccessAction
  | UserRegisterFailureAction
  | UserRegisterFailureResetAction;

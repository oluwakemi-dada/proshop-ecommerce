import { User } from './index';

export interface UserDetailsState {
  user?: User;
  loading?: boolean;
  error?: any;
}

export enum UserDetailsActionTypes {
  USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST',
  USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS',
  USER_DETAILS_FAILURE = 'USER_DETAILS_FAILURE',
}

export interface UserDetailsRequestAction {
  type: UserDetailsActionTypes.USER_DETAILS_REQUEST;
}

export interface UserDetailsSuccessAction {
  type: UserDetailsActionTypes.USER_DETAILS_SUCCESS;
  payload: User;
}

export interface UserDetailsFailureAction {
  type: UserDetailsActionTypes.USER_DETAILS_FAILURE;
  payload: any;
}

export type UserDetailsAction =
  | UserDetailsRequestAction
  | UserDetailsSuccessAction
  | UserDetailsFailureAction;
import {
  UserLoginActionTypes,
  UserLoginState,
  UserLoginAction,
  UserRegisterActionTypes,
  UserRegisterState,
  UserRegisterAction,
} from '../types/index';

const loginInitialState: UserLoginState = {
  loading: false,
};

export const userLoginReducer = (
  state = loginInitialState,
  action: UserLoginAction
) => {
  switch (action.type) {
    case UserLoginActionTypes.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };

    case UserLoginActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case UserLoginActionTypes.USER_LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case UserLoginActionTypes.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

const registerInitialState: UserRegisterState = {
  loading: false,
};

export const userRegisterReducer = (
  state = registerInitialState,
  action: UserRegisterAction
) => {
  switch (action.type) {
    case UserRegisterActionTypes.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case UserRegisterActionTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case UserRegisterActionTypes.USER_REGISTER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

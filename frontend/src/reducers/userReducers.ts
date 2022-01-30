import { UserLoginActionTypes, UserLoginState, UserLoginAction } from '../types/index';

const initialState: UserLoginState = {
  loading: false
};

export const userLoginReducer = (
  state = initialState,
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

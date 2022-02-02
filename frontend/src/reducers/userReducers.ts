import {
  UserLoginActionTypes,
  UserLoginState,
  UserLoginAction,
  UserRegisterActionTypes,
  UserRegisterState,
  UserRegisterAction,
  UserDetailsActionTypes,
  UserDetailsState,
  UserDetailsAction,
  UserUpdateProfileActionTypes,
  UserUpdateProfileState,
  UserUpdateProfileAction,
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

const userDetailsInitialState: UserDetailsState = {
  loading: false,
};

export const userDetailsReducer = (
  state = userDetailsInitialState,
  action: UserDetailsAction
) => {
  switch (action.type) {
    case UserDetailsActionTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserDetailsActionTypes.USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case UserDetailsActionTypes.USER_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const userUpdateProfileInitialState: UserUpdateProfileState = {
  loading: false,
};

export const userUpdateProfileReducer = (
  state = userUpdateProfileInitialState,
  action: UserUpdateProfileAction
) => {
  switch (action.type) {
    case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };

    case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };

    case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    // case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET:
    //   return {
    //     loading: false,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};

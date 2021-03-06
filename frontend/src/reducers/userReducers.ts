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
  UserListActionTypes,
  UserListAction,
  UserListState,
  UserDeleteActionTypes,
  UserDeleteAction,
  UserDeleteState,
  UserUpdateActionTypes,
  UserUpdateAction,
  UserUpdateState,
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

    case UserLoginActionTypes.USER_LOGIN_FAILURE_RESET:
      return {
        loading: false,
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

    case UserRegisterActionTypes.USER_REGISTER_FAILURE_RESET:
      return {
        loading: false,
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

    case UserDetailsActionTypes.USER_DETAILS_RESET:
      return {
        user: {},
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

    case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

const userListInitialState: UserListState = {
  loading: false,
  users: [],
};

export const userListReducer = (
  state = userListInitialState,
  action: UserListAction
) => {
  switch (action.type) {
    case UserListActionTypes.USER_LIST_REQUEST:
      return {
        loading: true,
      };

    case UserListActionTypes.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case UserListActionTypes.USER_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case UserListActionTypes.USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

// USER DELETE REDUCER
const userDeleteInitialState: UserDeleteState = {
  loading: false,
};

export const userDeleteReducer = (
  state = userDeleteInitialState,
  action: UserDeleteAction
) => {
  switch (action.type) {
    case UserDeleteActionTypes.USER_DELETE_REQUEST:
      return {
        loading: true,
      };

    case UserDeleteActionTypes.USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case UserDeleteActionTypes.USER_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// USER UPDATE REDUCER
const userUpdateInitialState: UserUpdateState = {
  loading: false,
};

export const userUpdateReducer = (
  state = userUpdateInitialState,
  action: UserUpdateAction
) => {
  switch (action.type) {
    case UserUpdateActionTypes.USER_UPDATE_REQUEST:
      return {
        loading: true,
      };

    case UserUpdateActionTypes.USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case UserUpdateActionTypes.USER_UPDATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case UserUpdateActionTypes.USER_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

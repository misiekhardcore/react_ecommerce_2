import types from "./types";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_SIGNIN_REQUEST:
      return {
        loading: true,
      };
    case types.USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        info: null,
      };
    case types.USER_SIGNIN_FAIL:
      return {
        loading: false,
        info: action.payload,
      };
    case types.USER_SIGNOUT:
      return {};
    case types.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case types.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        info: null,
      };
    case types.USER_REGISTER_FAIL:
      return {
        loading: false,
        info: action.payload,
      };
    case types.USER_REGISTER_SET_INFO:
      return {
        info: action.payload,
      };
    default:
      return state;
  }
};

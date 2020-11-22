import types from "./types";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        info: null,
      };
    case types.USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case types.USER_SIGNOUT:
      return {};
    case types.USER_REGISTER_REQUEST:
      return {
        ...state,
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
      };
    case types.USER_REGISTER_FAIL:
      return {
        loading: false,
        ...action.payload,
      };
    case types.USER_REGISTER_SET_INFO:
      return {
        ...state,
        info: action.payload,
      };
    default:
      return state;
  }
};

export const userFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case types.USER_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case types.USER_FETCH_SET_INFO:
      return {
        ...state,
        info: action.payload,
      };
    default:
      return state;
  }
};

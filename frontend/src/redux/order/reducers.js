import types from "./types";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case types.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case types.ORDER_CREATE_FAIL:
      return {
        loading: false,
        ...action.payload,
      };
    case types.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

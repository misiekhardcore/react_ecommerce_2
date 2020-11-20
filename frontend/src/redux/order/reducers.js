import types from "./types";

export const orderCreateReducer = (state = {}, action) => {
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

export const orderFetchReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case types.ORDER_FETCH_REQUEST:
      return {
        loading: true,
      };
    case types.ORDER_FETCH_SUCCESS:
      return {
        loading: false,
        order: { ...action.payload },
      };
    case types.ORDER_FETCH_FAIL:
      return {
        loading: false,
        ...action.payload.data,
      };
    case types.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case types.ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case types.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case types.ORDER_PAY_FAIL:
      return {
        loading: false,
        info: { ...action.payload },
      };
    default:
      return state;
  }
};

import types from "./types";

export const productListReducer = (
  state = { products: [], loading: true, info: null },
  action
) => {
  switch (action.type) {
    case types.PRODUCT_LIST_REQUEST:
      return { loading: true };
    case types.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case types.PRODUCT_LIST_FAIL:
      return { loading: false, info: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, seller: {}, loading: true, info: null },
  action
) => {
  switch (action.type) {
    case types.PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case types.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, ...action.payload };
    case types.PRODUCT_DETAILS_FAIL:
      return { loading: false, info: action.payload };
    default:
      return state;
  }
};

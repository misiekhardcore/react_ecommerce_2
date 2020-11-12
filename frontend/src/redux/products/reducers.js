import types from "./types";

export const productListReducer = (
  state = { products: [], loading: true, error: null },
  action
) => {
  switch (action.type) {
    case types.PRODUCT_LIST_REQUEST:
      return { loading: true };
    case types.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case types.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

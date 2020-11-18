import types from "./types";

export const cartListReducer = (
  state = { cartItems: [], loading: true, error: null },
  action
) => {
  switch (action.type) {
    case types.ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.product._id === item.product._id
      );
      if (existItem) {
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, item],
        };
      }
    case types.ADD_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product._id !== action.payload
        ),
      };

    default:
      return { ...state };
  }
};

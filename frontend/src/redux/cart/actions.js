import types from "./types";
import Axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  dispatch({
    type: types.ADD_TO_CART_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/${id}`);
    dispatch({
      type: types.ADD_TO_CART_SUCCESS,
      payload: { ...data, qty },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartList.cartItems)
    );
  } catch (err) {
    dispatch({
      type: types.ADD_TO_CART_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

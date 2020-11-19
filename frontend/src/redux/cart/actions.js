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

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: types.REMOVE_FROM_CART_REQUEST,
    payload: id,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartList.cartItems)
  );
};

export const removeAllFromCart = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  dispatch({
    type: types.REMOVE_ALL_FROM_CART_REQUEST,
  });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: types.SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

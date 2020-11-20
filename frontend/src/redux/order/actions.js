import Axios from "axios";
import { removeAllFromCart } from "../cart/actions";
import types from "./types";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: types.ORDER_CREATE_REQUEST,
  });

  try {
    const {
      userInfo: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: types.ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch(removeAllFromCart);
  } catch (err) {
    dispatch({
      type: types.ORDER_CREATE_FAIL,
      payload: err.response && err.response.data,
    });
  }
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: types.ORDER_CREATE_RESET });
};

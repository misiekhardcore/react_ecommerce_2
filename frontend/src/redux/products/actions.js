import Axios from "axios";
import types from "./types";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: types.PRODUCT_LIST_REQUEST,
  });

  try {
    const { data } = await Axios.get("/api/products");
    dispatch({
      type: types.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: types.PRODUCT_LIST_FAIL,
      payload: err.message,
    });
  }
};

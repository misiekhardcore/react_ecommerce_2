import Axios from "axios";
import types from "./types";

export const fetchProducts = () => async (dispatch) => {
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

export const fetchProductDetails = (id) => async (dispatch) => {
  dispatch({
    type: types.PRODUCT_DETAILS_REQUEST,
    payload: id,
  });

  try {
    const { data } = await Axios.get(`/api/products/${id}`);
    dispatch({
      type: types.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: types.PRODUCT_DETAILS_FAIL,
      error:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

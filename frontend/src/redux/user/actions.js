import Axios from "axios";
import types from "./types";

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: types.USER_SIGNIN_REQUEST,
    payload: { email, password },
  });

  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({
      type: types.USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: types.USER_SIGNIN_FAIL,
      payload: err.response && err.response.data,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  localStorage.removeItem("order");
  dispatch({
    type: types.USER_SIGNOUT,
  });
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: types.USER_REGISTER_REQUEST,
  });

  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({
      type: types.USER_REGISTER_SUCCESS,
    });
    dispatch({
      type: types.USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload: err.response && err.response.data,
    });
  }
};

export const setUserInfo = (info) => async (dispatch) => {
  dispatch({
    type: types.USER_REGISTER_SET_INFO,
    payload: info,
  });
};

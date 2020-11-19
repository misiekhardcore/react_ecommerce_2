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
    dispatch({
      type: types.USER_SIGNIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({
    type: types.USER_SIGNOUT,
  });
};

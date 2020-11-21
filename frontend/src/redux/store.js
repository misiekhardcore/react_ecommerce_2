import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { productDetailsReducer, productListReducer } from "./products/reducers";
import { cartListReducer } from "./cart/reducers";
import {
  userSigninReducer,
  userRegisterReducer,
  userFetchReducer,
} from "./user/reducers";
import {
  orderCreateReducer,
  orderFetchAllReducer,
  orderFetchReducer,
  orderPayReducer,
} from "./order/reducers";

const initialState = {
  userInfo: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cartList: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : {},
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cartList: cartListReducer,
  userInfo: userSigninReducer,
  userRegister: userRegisterReducer,
  userFetch: userFetchReducer,
  orderCreate: orderCreateReducer,
  orderFetch: orderFetchReducer,
  orderFetchAll: orderFetchAllReducer,
  orderPay: orderPayReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

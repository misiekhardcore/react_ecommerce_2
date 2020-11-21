import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import {
  clearOrder,
  fetchOrder,
  orderPayment,
  resetOrder,
} from "../../redux/order/actions";

const OrderPage = (props) => {
  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const { order, loading, info } = useSelector((state) => state.orderFetch);
  const { userInfo } = useSelector((state) => state.userInfo);
  const orderPay = useSelector((state) => state.orderPay);
  const { info: infoPay, loading: loadingPay } = orderPay;

  const dispatch = useDispatch();

  if (!userInfo) {
    props.history.push("/signin");
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || (order && order._id !== id)) {
      dispatch(resetOrder());
      dispatch(clearOrder());
      dispatch(fetchOrder(id));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, id, sdkReady]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(orderPayment(order, paymentResult));
  };

  return loading ? (
    <LoadingBox />
  ) : info ? (
    <MessageBox variant={info.type}>{info.message}</MessageBox>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <div className="card w-100">
            <div className="card-body">
              <h2>Order</h2>
              <p>
                <strong>Name: </strong>
                {order.shippingAddress.fullName}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.street},{" "}
                {order.shippingAddress.postalCode} {order.shippingAddress.city},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <MessageBox variant="success">Delivered</MessageBox>
              ) : (
                <MessageBox variant="error">Not Delivered</MessageBox>
              )}
            </div>
          </div>
          <div className="card w-100">
            <div className="card-body">
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at: {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="error">Not Paid</MessageBox>
              )}
            </div>
          </div>
          <div className="card w-100">
            <div className="card-body">
              <h2>Order items</h2>
              <ul className="w-100">
                {order.orderItems.map((cartItem) => {
                  const { product, qty } = cartItem;
                  return (
                    <div key={cartItem._id} className="row">
                      <div>
                        <Link to={`/products/${product._id}`}>
                          <img
                            className="small"
                            src={product.image}
                            alt={product.name}
                          />
                        </Link>
                      </div>
                      <div className="min-30">
                        <Link to={`/products/${product._id}`}>
                          {product.name}
                        </Link>
                      </div>
                      <div></div>
                      <div>
                        {qty} x ${product.price.toFixed(2)} = $
                        {(qty * product.price).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-1">
          <div className="card">
            <div className="card-body">
              <h2>Order summary</h2>
              <ul>
                <li className="row">
                  <p>Items:</p>
                  <p>$ {order.itemsPrice.toFixed(2)}</p>
                </li>
                <li className="row">
                  <p>Shipping:</p>
                  <p>$ {order.shippingPrice.toFixed(2)}</p>
                </li>
                <li className="row">
                  <p>Tax:</p>
                  <p>$ {order.taxPrice.toFixed(2)}</p>
                </li>
                <li className="row">
                  <p className="price">Total:</p>
                  <p className="price">$ {order.totalPrice.toFixed(2)}</p>
                </li>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox />
                    ) : (
                      <>
                        {infoPay && infoPay.type === "error" && (
                          <MessageBox variant={infoPay.type}>
                            {infoPay.message}
                          </MessageBox>
                        )}
                        {loadingPay && <LoadingBox />}
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={handleSuccessPayment}
                        />
                      </>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

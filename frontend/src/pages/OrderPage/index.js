import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { fetchOrder } from "../../redux/order/actions";

const OrderPage = (props) => {
  const { id } = useParams();
  const { order, loading, info } = useSelector((state) => state.orderFetch);
  const { userInfo } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  if (!userInfo) {
    props.history.push("/signin");
  }

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);

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
                <MessageBox variant="success">Paid</MessageBox>
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
                        {qty} x ${product.price} = ${qty * product.price}
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
                  <p>$ {order.itemsPrice}</p>
                </li>
                <li className="row">
                  <p>Shipping:</p>
                  <p>$ {order.shippingPrice}</p>
                </li>
                <li className="row">
                  <p>Tax:</p>
                  <p>$ {order.taxPrice}</p>
                </li>
                <li className="row">
                  <p className="price">Total:</p>
                  <p className="price">$ {order.totalPrice}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";

const PlaceorderPage = (props) => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cartList
  );

  const cart = useSelector((state) => state.cartList);

  if (!shippingAddress.street) {
    props.history.push("/payment");
  }

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.product.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const handlePlaceorder = () => {};

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <div className="card w-100">
            <div className="card-body">
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {shippingAddress.fullName}
              </p>
              <p>
                <strong>Address: </strong>
                {shippingAddress.street}, {shippingAddress.postalCode}{" "}
                {shippingAddress.city}, {shippingAddress.country}
              </p>
            </div>
          </div>
          <div className="card w-100">
            <div className="card-body">
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </div>
          </div>
          <div className="card w-100">
            <div className="card-body">
              <h2>Order items</h2>
              <ul className="w-100">
                {cartItems.map((cartItem) => {
                  const { product, qty } = cartItem;
                  return (
                    <div key={product._id} className="row">
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
                  <p>$ {cart.itemsPrice.toFixed(2)}</p>
                </li>
                <li className="row">
                  <p>Shipping:</p>
                  <p>$ {cart.shippingPrice.toFixed(2)}</p>
                </li>
                <li className="row">
                  <p>Tax:</p>
                  <p>$ {cart.taxPrice.toFixed(2)}</p>
                </li>
                <li className="row">
                  <p className="price">Total:</p>
                  <p className="price">$ {cart.totalPrice.toFixed(2)}</p>
                </li>
                <li>
                  <button
                    className="primary block"
                    type="button"
                    onClick={handlePlaceorder}
                    disabled={cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceorderPage;

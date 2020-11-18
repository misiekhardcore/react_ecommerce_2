import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../redux/cart/actions";
import "./styles.scss";

import MessageBox from "./../../components/MessageBox";

const CartPage = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const { cartItems } = useSelector((state) => state.cartList);

  const handleRemoveFromCart = (id) => {
    return null;
  };

  const handleCheckout = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go shopping</Link>
          </MessageBox>
        ) : (
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
                    <Link to={`/products/${product._id}`}>{product.name}</Link>
                  </div>
                  <div>
                    <select
                      name="qty"
                      value={qty}
                      onChange={(e) =>
                        dispatch(addToCart(product._id, Number(e.target.value)))
                      }
                    >
                      {product.countInStock < 10
                        ? [...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        : [...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div>$ {product.price}</div>
                  <div className="">
                    <button
                      className="deletebutton"
                      type="button"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        )}
      </div>
      <div className="col-1"></div>
      <div className="col-1">
        <div className="card">
          <div className="card-body">
            <ul>
              <li>
                <h2>
                  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} itmes) :
                  ${cartItems.reduce((a, c) => a + c.product.price * c.qty, 0)}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="block primary"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

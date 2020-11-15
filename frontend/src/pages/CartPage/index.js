import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/cart/actions";
import "./styles.scss";

const CartPage = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cartItems = useSelector((state) => state.cartList);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div className="cart">
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default CartPage;

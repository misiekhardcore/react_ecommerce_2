import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../redux/user/actions";

const Header = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartList);
  const { cartItems } = cart;
  const { userInfo } = useSelector((state) => state.userInfo);

  const handleSignout = () => {
    dispatch(signout());
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">amazona</Link>
      </div>
      <nav>
        <Link to="/cart">
          Cart
          {cartItems.length ? (
            <span className="badge">{cartItems.length}</span>
          ) : null}
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#">
              {userInfo.name} <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdownContent">
              <li>
                <Link to="#signout" onClick={handleSignout}>
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin">sign in</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

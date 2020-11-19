import { BrowserRouter, Link, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { useSelector, useDispatch } from "react-redux";
import SigninPage from "./pages/SigninPage";

import { signout } from "./redux/user/actions";
import { removeAllFromCart } from "./redux/cart/actions";
import RegisterPage from "./pages/RegisterPage";
import ShippingAddressPage from "./pages/ShippingAddressPage.js";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartList);
  const { cartItems } = cart;
  const { userInfo } = useSelector((state) => state.userInfo);

  const handleSignout = () => {
    dispatch(signout());
    dispatch(removeAllFromCart());
  };

  return (
    <BrowserRouter>
      <div className="App">
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
        <main>
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/signin" component={SigninPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/shipping" component={ShippingAddressPage} />
          <Route exact path="/" component={HomePage} />
        </main>
        <footer>All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

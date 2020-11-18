import { BrowserRouter, Link, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";
import SigninPage from "./pages/SigninPage";

function App() {
  const cart = useSelector((state) => state.cartList);
  const { cartItems } = cart;

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
            <Link to="/signin">sign in</Link>
          </nav>
        </header>
        <main>
          <Route path="/products/:id" component={ProductPage} />
          <Route exact path="/" component={HomePage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/signin" component={SigninPage} />
        </main>
        <footer>All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingAddressPage from "./pages/ShippingAddressPage/";
import PaymentScreen from "./pages/PaymentPage";
import PlaceorderPage from "./pages/PlaceorderPage";
import Header from "./components/Header";
import OrderPage from "./pages/OrderPage";
import OrderhistoryPage from "./pages/OrderhistoryPage";
import UserPage from "./pages/UserPage";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/signin" component={SigninPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/shipping" component={ShippingAddressPage} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceorderPage} />
          <Route path="/orders/:id" component={OrderPage} />
          <PrivateRoute path="/users/:id" component={UserPage} />
          <Route exact path="/orders/" component={OrderhistoryPage} />
          <Route exact path="/" component={HomePage} />
        </main>
        <footer>All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

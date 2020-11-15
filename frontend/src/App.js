import { BrowserRouter, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <div className="logo">
            <a href="/">amazona</a>
          </div>
          <nav>
            <a href="/cart">cart</a>
            <a href="/signin">sign in</a>
          </nav>
        </header>
        <main>
          <Route path="/products/:id" component={ProductPage} />
          <Route exact path="/" component={HomePage} />
        </main>
        <footer>All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

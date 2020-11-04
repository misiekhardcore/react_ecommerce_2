import data from "./data";
import Product from "./components/Product";

function App() {
  return (
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
        <div className="row center">
          {data.products.map((product) => (
            <Product key={product._id} {...product} />
          ))}
        </div>
      </main>
      <footer>All rights reserved</footer>
    </div>
  );
}

export default App;

import React from "react";
import Product from "./../../components/Product";
import data from "./../../data";

const HomePage = () => {
  return (
    <div className="row center">
      {data.products.map((product) => (
        <Product key={product._id} {...product} />
      ))}
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import Product from "./../../components/Product";
import axios from "axios";

import LoadingBox from "./../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} {...product} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;

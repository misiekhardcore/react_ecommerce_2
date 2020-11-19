import React, { useEffect } from "react";
import Product from "./../../components/Product";
import { useDispatch, useSelector } from "react-redux";

import LoadingBox from "./../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { fetchProducts } from "../../redux/products/actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} {...product} />
          ))}
          {[...Array(4 - (products.length % 4)).keys()].map((x) => (
            <div
              className="card"
              style={{
                borderColor: "transparent",
                backgroundColor: "transparent",
               }}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;

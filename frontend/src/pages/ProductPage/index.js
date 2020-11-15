import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./../../data.js";

import MessageBox from "./../../components/MessageBox";
import LoadingBox from "./../../components/LoadingBox";
import Rating from "../../components/Rating";

import { fetchProductDetails } from "../../redux/products/actions";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { product, seller, error, loading } = useSelector(
    (state) => state.productDetails
  );

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to products</Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating {...product}></Rating>
                </li>
                <li>
                  <p>Price: $ {product.price}</p>
                </li>
                <li>
                  <p>Description:</p>
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card">
                <div className="card-body">
                  <ul>
                    <li>
                      <p>Seller:</p>
                    </li>
                    <li className="row">
                      <p className="seller">{seller.name}</p>
                    </li>
                    <li>
                      <Rating {...seller}></Rating>
                    </li>
                    <li className="row">
                      <p>Price:</p>
                      <p className="price">$ {product.price}</p>
                    </li>
                    <li className="row">
                      <p>Status:</p>
                      {product.countInStock > 0 ? (
                        <p className="success">In Stock</p>
                      ) : (
                        <p className="error">Out of Stock</p>
                      )}
                    </li>
                    <li className="row">
                      <button className="primary block">Add to Cart</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;

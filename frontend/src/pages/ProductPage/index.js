import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./../../data.js";

import MessageBox from "./../../components/MessageBox";
import LoadingBox from "./../../components/LoadingBox";
import Rating from "../../components/Rating";

import { fetchProductDetails } from "../../redux/products/actions";

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { product, seller, error, loading } = useSelector(
    (state) => state.productDetails
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleQty = (val) => {
    setQty(val);
  };

  const handleAddToCart = () => {
    props.history.push(`/cart/${id}?qty=${qty}`);
  };

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
                        <p className="success">
                          In Stock {`(${product.countInStock})`}
                        </p>
                      ) : (
                        <p className="error">Out of Stock</p>
                      )}
                    </li>
                    {product.countInStock > 0 && (
                      <>
                        <li className="row">
                          <p>Qty:</p>
                          <select
                            name="qty"
                            value={qty}
                            onChange={(e) => handleQty(e.target.value)}
                          >
                            {product.countInStock < 10
                              ? [...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )
                              : [...Array(10).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                          </select>
                        </li>
                        <li className="row">
                          <button
                            onClick={() => handleAddToCart()}
                            className="primary block"
                          >
                            Add to Cart
                          </button>
                        </li>
                      </>
                    )}
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

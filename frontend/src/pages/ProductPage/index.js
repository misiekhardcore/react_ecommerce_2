import React from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../components/Rating";
import data from "../../data";

const ProductPage = () => {
  const { id } = useParams();
  const {
    name,
    price,
    image,
    rating,
    numReviews,
    _id,
    description,
    countInStock,
    sellerId,
  } = data.products.find((x) => x._id === id);

  const seller = data.sellers.find((x) => x._id === sellerId);

  if (!name) return <p className="error">Product not found</p>;
  return (
    <div>
      <Link to="/">Back to products</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={image} alt={name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{name}</h1>
            </li>
            <li>
              <Rating {...{ rating, numReviews, _id }}></Rating>
            </li>
            <li>
              <p>Price: $ {price}</p>
            </li>
            <li>
              <p>Description:</p>
              <p>{description}</p>
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
                  <p className="price">$ {price}</p>
                </li>
                <li className="row">
                  <p>Status:</p>
                  {countInStock > 0 ? (
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
  );
};

export default ProductPage;

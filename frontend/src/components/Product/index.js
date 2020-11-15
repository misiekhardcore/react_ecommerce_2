import React from "react";
import { Link } from "react-router-dom";
import Rating from "./../Rating";

const Product = (product) => {
  const { _id, name, price, image, rating, numReviews } = product;

  return (
    <div className="card">
      <div className="card-thumbnail">
        <Link to={`/products/${_id}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className="card-body">
        <Link to={`/products/${_id}`}>
          <h2>{name}</h2>
        </Link>
        <Rating {...{ rating, numReviews, _id }}></Rating>
        <p className="price">$ {price}</p>
      </div>
    </div>
  );
};

export default Product;

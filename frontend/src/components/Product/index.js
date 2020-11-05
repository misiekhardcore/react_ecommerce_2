import React from "react";
import Rating from "./../Rating";

const Product = (product) => {
  const { _id, name, price, image, rating, numReviews } = product;

  return (
    <div className="card">
      <div className="card-thumbnail">
        <a href={`/product/${_id}`}>
          <img src={image} alt={name} />
        </a>
      </div>
      <div className="card-body">
        <a href={`/product/${_id}`}>
          <h2>{name}</h2>
        </a>
        <Rating {...{ rating, numReviews, _id }}></Rating>
        <p className="price">$ {price}</p>
      </div>
    </div>
  );
};

export default Product;

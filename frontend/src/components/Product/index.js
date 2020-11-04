import React from "react";

const Product = (product) => {
  const { _id, name, price, image } = product;

  return (
    <div className="card">
      <div className="card-thumbnail">
        <a href={`/product/${_id}`}>
          <img src={image} alt={name} />
        </a>
      </div>
      <div className="card-body">
        <a href="product.html">
          <h2>{name}</h2>
        </a>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
        </div>
        <p className="price">$ {price}</p>
      </div>
    </div>
  );
};

export default Product;

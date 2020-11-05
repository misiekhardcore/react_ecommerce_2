import React from "react";
import { useParams } from "react-router-dom";
import Rating from "../../components/Rating";
import data from "../../data";

const ProductPage = () => {
  const { id } = useParams();
  const { name, price, image, rating, numReviews, _id, description } = data.products.find(
    (x) => x._id === id
  );
  if (!name) return <p className="error">Product not found</p>;
  return (
    <div className="row top">
      <div className="col-2">
        <img src={image} alt={name} />
      </div>
      <div className="col1">
        <ul>
          <li>
            <h1>{name}</h1>
          </li>
          <li>
            <Rating {...{ rating, numReviews, _id }}></Rating>
          </li>
          <li>Price: $ {price}</li>
          <li>
            Description:
            <p>{description}</p>
          </li>
        </ul>
      </div>
      <div className="col-1">
        <div className="addToCart">
            aaa
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

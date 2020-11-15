import React from "react";

const Rating = ({rating, numReviews,_id}) => {
  return (
    <div className="rating">
      <i className={rating >= 1 ? "fas fa-star" : ""}></i>
      <i className={rating >= 2 ? "fas fa-star" : ""}></i>
      <i className={rating >= 3 ? "fas fa-star" : ""}></i>
      <i className={rating >= 4 ? "fas fa-star" : ""}></i>
      <i className={rating >= 5 ? "fas fa-star" : ""}></i>
      <i className={(2 * rating) % 2 ? "fas fa-star-half-alt" : ""}></i>
      <i className={rating <= 4 ? "far fa-star" : ""}></i>
      <i className={rating <= 3 ? "far fa-star" : ""}></i>
      <i className={rating <= 2 ? "far fa-star" : ""}></i>
      <i className={rating <= 1 ? "far fa-star" : ""}></i>
      <i className={rating <= 0 ? "far fa-star" : ""}></i>
      <a href={`/product/${_id}?review`} className="review">
        {numReviews} Reviews
      </a>
    </div>
  );
};

export default Rating

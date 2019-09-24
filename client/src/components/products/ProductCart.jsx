import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductCart = props => {
  const { name, quantity, color, size, id, imgUrl, price } = props.value;
  return (
    <div
      className="product-cart row align-items-center text-center mx-0 mb-lg-0 mb-4"
      data-aos="fade-up"
    >
      <div className="col-lg-2">
        <img src={imgUrl} alt="cart product" className="mx-auto mb-3" />
      </div>
      <h4 className=" px-2 py-1 col-lg-3">{name}</h4>
      <div className="col-lg-3">
        <h4 className=" px-2 py-1">{color}</h4>
        <h4 className=" px-2 py-1">{size}</h4>
      </div>
      <h4 className=" px-2 py-1 col-lg-2">
        {quantity} sets
        <br /> {`$ ${price}`} / set
      </h4>
      <div className="col-lg-2 py-2">
        <button
          className="btn ml-auto d-block-inline btn-danger text-center px-1 py-0"
          onClick={() => props.removeOrder(id)}
        >
          <FontAwesomeIcon icon="times" size="lg" color="white" />
        </button>
      </div>
    </div>
  );
};

export default ProductCart;

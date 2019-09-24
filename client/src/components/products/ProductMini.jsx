import React from "react";
import { Link } from "react-router-dom";
import styles from "../style/product.module.scss";
import newImage from "./new.png";

const ProductMini = props => {
  return (
    <div
      className={`text-center mx-4 mt-4 mb-4 position-relative ${styles.product}`}
      data-aos="fade-up"
    >
      {props.data.isNew && (
        <img
          src={newImage}
          alt=""
          className="position-absolute"
          style={{
            top: "-30px",
            left: "-20px",
            zIndex: "3",
            transform: "rotate(-30deg)"
          }}
        />
      )}
      <Link to={`/product/${props.data.model}`} data-aos="flip-left">
        <div className={styles.imgsWrapper}>
          <img src={props.data.imgUrl} alt="" />
          <img src={props.data.imgUrl_2} alt="" />
        </div>
      </Link>

      <h3 className="my-2 mt-3 text-dark">{props.data.name}</h3>
      <h5 className="text-primary">{props.data.price}</h5>
      <Link
        to={`/product/${props.data.model}`}
        className="btn btn-primary"
        data-aos="flip-left"
      >
        See More
      </Link>
    </div>
  );
};

export default ProductMini;

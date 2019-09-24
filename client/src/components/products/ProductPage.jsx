import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../products/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import throttle from "lodash/throttle";
import "../style/img-zoom.scss";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../layouts/Loading";
import { store } from "react-notifications-component";
import { gql } from "apollo-boost";
const uuidv1 = require("uuid/v1");

const ProductPage = props => {
  //Setting States & context and extracting model num from the url
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [quantity, setQuantity] = useState(5);
  const { products, setProducts } = useContext(CartContext);

  const model = parseInt(props.match.params.model, 10);
  //Querying data from server using the model number
  const { loading, data } = useQuery(gql`
    {
      getProduct(model: ${model}) {
        model
        name
        imgUrl
        price
        ingredients
        sizes
        colors
      }
    }
  `);

  // const product = loading ? {} : data.getProduct;

  //Adding current Model To Cart
  const addToCart = () => {
    if (size && color) {
      setProducts([
        ...products,
        {
          id: uuidv1(),
          model,
          size: JSON.stringify(size),
          color,
          name: product.name,
          quantity,
          imgUrl: product.imgUrl,
          price: product.price
        }
      ]);
      store.addNotification({
        title: "Added",
        message: "This item was added successfully to your cart",
        type: "info",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          pauseOnHover: true
        }
      });
    }
  };
  //Adding Events Listeners for image zooming
  useEffect(() => {
    const image = document.querySelector("#img-zoomed");
    if (!image) return;
    function calculatOrigin(e) {
      const yPos =
        (((e.pageY - e.target.parentNode.offsetTop) / image.clientHeight) *
          100) |
        0;
      const xPos =
        (((e.pageX - e.target.parentNode.offsetLeft) / image.clientWidth) *
          100) |
        0;
      image.style.transform = "scale(2)";
      image.style.transformOrigin = ` ${xPos}% ${yPos}%`;
    }

    image.addEventListener("mousemove", throttle(calculatOrigin, 10));

    image.addEventListener("mouseout", () => {
      image.style.transform = "scale(1)";
    });
  }, [loading]);

  if (loading)
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );

  const product = data.getProduct;
  if (!size) setSize(product.sizes[0]);
  if (!color) setColor(product.colors[0]);

  return (
    <div className="product-page my-5 py-5 text-dark container mx-auto">
      <div className="img-magnifier-container mx-auto mb-5">
        <img
          id={`img-zoomed`}
          className=" mx-auto d-block"
          src={product.imgUrl}
          alt="Showcase"
        />
      </div>
      <div className="text-center">
        <h2 className="text-primary mb-4">{product.name}</h2>
        <h4>Price : {product.price} $</h4>
        <p>Ingerdients : {product.ingredients}</p>
        <p>Model.NO : {model}</p>
      </div>
      <hr className="bg-primary" />
      <h3 className="mt-5 mb-4 h1  font-weight-bold">Order it :</h3>
      <div className="row px-3">
        <div className="px-5 col-md-6" style={{ direction: "ltr" }}>
          <h4>Available Sizes </h4>
          <div>
            {product.sizes.map((size, index) => {
              return (
                <label
                  key={index}
                  className="row radio-container"
                  style={{ maxWidth: "200px" }}
                >
                  {size.map(value => (
                    <span key={value}> {value} </span>
                  ))}{" "}
                  <input
                    type="radio"
                    name="size-radio"
                    value={size}
                    defaultChecked={index === 0}
                    onClick={e => setSize(e.target.value)}
                  />
                  <span className="checkmark" />
                </label>
              );
            })}
          </div>
        </div>
        <div className="px-5 col-md-6" style={{ direction: "ltr" }}>
          <h4>Available Colors </h4>
          <div>
            {product.colors.map((color, index) => {
              return (
                <label
                  key={index}
                  className="row radio-container"
                  style={{ flexDirection: "row-reverse", maxWidth: "200px" }}
                >
                  {color}
                  <input
                    type="radio"
                    value={color}
                    name="color-radio"
                    defaultChecked={index === 0}
                    onChange={e => setColor(e.target.value)}
                  />
                  <span className="checkmark" />
                </label>
              );
            })}
          </div>
        </div>
        <div className="slidecontainer my-5 mx-auto">
          <h3>
            How Many : <span className="text-primary">{quantity} </span>Item
          </h3>
          <input
            type="range"
            min="1"
            max="50"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="input-slider "
            id="myRange"
          />
        </div>
      </div>
      <button
        className="btn btn-lg btn-primary mx-auto my-5 d-block"
        onClick={addToCart}
      >
        Add To My Cart
        <FontAwesomeIcon icon="cart-plus" size="lg" className="mx-2" />
      </button>
    </div>
  );
};

export default ProductPage;

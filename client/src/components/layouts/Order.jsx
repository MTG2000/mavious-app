import React, { useContext, useState } from "react";
import { CartContext } from "../products/CartContext";
import ProductCart from "../products/ProductCart";
import { Redirect } from "react-router-dom";
import { store } from "react-notifications-component";
import "../style/cart.scss";

const OrderPage = () => {
  const { products, setProducts } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);

  //   console.log(products);
  const removeOrder = id => {
    const newOrder = products.filter(p => p.id !== id);
    setProducts(newOrder);
  };

  const hanldeOrder = async e => {
    e.preventDefault();
    if (products.length > 0) {
      const infoToSend = { products, email, phone };
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(infoToSend)
      });
      const data = await response.json();
      if (data.success) {
        store.addNotification({
          title: "Success",
          message: "Your Order was sent successfully",
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            pauseOnHover: true
          }
        });
        setProducts([]);
        setRedirect(true);
      } else {
        store.addNotification({
          title: "Not Successful",
          message: "Something Wrong happened, please try again",
          type: "danger",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000
          }
        });
      }
    }
  };
  let totalPrice = 0;
  products.forEach(p => {
    const price = Number.parseFloat(p.price);
    const quantity = +p.quantity;
    totalPrice += price * quantity;
  });
  totalPrice.toFixed(2);

  if (redirect) return <Redirect to="/" />;

  return (
    <main className="container mt-5 mb-6">
      <h2 className="text-center  mt-3" data-aos="fade-down">
        Please review your
        <span className="text-primary text-decoration-underline">
          {" "}
          Order{" "}
        </span>{" "}
        And Make sure to enter
        <span className="text-primary"> Contact Info </span>Correctly and we
        will respond to you very quickly
      </h2>
      {products.length <= 0 ? (
        <h4 className="text-center my-5 h2">No orders yet </h4>
      ) : (
        <React.Fragment>
          <h3
            className="mt-6 mb-5 text-primary h1 text-center"
            data-aos="zoom-in"
          >
            Your Order{" "}
          </h3>
          <div className="w-100" data-aos="fade-up">
            <div className="row px-2 w-100 mx-0 text-center">
              <h4 className="mb-0 text-secondary col-lg-2 ">Image</h4>
              <h4 className="mb-0 text-secondary col-lg-3">Product Name </h4>
              <h4 className="mb-0 text-secondary col-lg-3 ">Color & Size</h4>
              <h4 className="mb-0 text-secondary col-lg-2">Quantity</h4>
              <h4 className="mb-0 col-lg-2  text-white"> </h4>
            </div>
            <div className="products-cart mb-5  w-100">
              {products.map(product => (
                <ProductCart
                  value={product}
                  key={`${product.id}`}
                  removeOrder={removeOrder}
                />
              ))}
            </div>
            <div>
              <h3 className="px-2">
                Your Total Price : <span>{totalPrice} $</span>
              </h3>
            </div>
          </div>
        </React.Fragment>
      )}
      <h3 className=" mb-4 mt-5 text-primary text-center h1" data-aos="zoom-in">
        Your Contact Info{" "}
      </h3>
      <form
        className="row justify-content-around w-lg-75 mt-3 px-3"
        onSubmit={hanldeOrder}
      >
        <div className="form-group col-md-6" data-aos="fade-right">
          <label>
            Your Email <span className="text-primary">*</span> :
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            required
            placeholder="eg.ahmad1999@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group col-md-6" data-aos="fade-left">
          <label>Phone Number </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="eg.+963 967635310"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        {/* <div className="form-group col-md-12">
          <label>
            Message <span className="text-primary">*</span> :
          </label>
          <textarea
            type="text"
            className="form-control"
            name="message"
            required
            rows="5"
            style={{ resize: "none" }}
            placeholder="eg.Hello there , I would like you to supply us with ***"
          />
        </div> */}

        <button
          type="submit"
          className="btn btn-primary btn-lg ml-auto mr-4 mt-4"
        >
          Send Your Order{" "}
        </button>
      </form>
    </main>
  );
};

export default OrderPage;

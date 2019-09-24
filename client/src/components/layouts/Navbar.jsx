import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../style/nav.scss";
import { CartContext } from "../products/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="nav-wrapper">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand font-weight-bold my-0">
          <span style={{ fontSize: "2.25em" }}>Mavious</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#basicExampleNav"
          aria-controls="basicExampleNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav ml-auto ">
            <li className="nav-item">
              <Link className="nav-link px-2 rounded" to="/">
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 rounded " to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 rounded" to="/contact">
                Contact Us
              </Link>
            </li>

            <li className="nav-item mx-0 mx-lg-4">
              <Link to="/order" className=" d-inline-block py-2  rounded">
                <FontAwesomeIcon icon="shopping-cart" color="white" size="lg" />
                <span
                  className="badge badge-light mx-1"
                  style={{ width: "30px" }}
                >
                  {products.length}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

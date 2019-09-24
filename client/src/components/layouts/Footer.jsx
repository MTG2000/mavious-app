import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="w-100" style={{ background: "#222" }}>
      <div className="container text-white py-2">
        Made With <FontAwesomeIcon icon="heart" color="rgb(243, 106, 213)" /> By{" "}
        <a
          href="https://mtgdev.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary"
        >
          Mtg Dev
        </a>
      </div>
    </div>
  );
};

export default Footer;

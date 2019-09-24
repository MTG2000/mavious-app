import React from "react";
import "./style/call-to-action.scss";

const CallToAction = ({ image, imgAlt, children, overlay = "#007bff00" }) => {
  return (
    <div className="mtg-call-to-action">
      <img src={image} alt={imgAlt} />
      <div className="overlay" style={{ backgroundColor: overlay }}></div>
      {children}
    </div>
  );
};

export default CallToAction;

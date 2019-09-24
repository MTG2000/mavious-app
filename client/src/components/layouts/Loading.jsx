import React from "react";
import "../style/loading.scss";

const Loading = props => {
  const size = props.size || 100;
  let classValues = "";
  if (props.fullscreen)
    classValues = "vh-100 d-flex flex-column justify-content-center";
  return (
    <React.Fragment>
      <div className={classValues}>
        <div
          className="cssload-thecube mt-5"
          style={{ width: size, height: size }}
        >
          <div className="cssload-cube cssload-c1" />
          <div className="cssload-cube cssload-c2" />
          <div className="cssload-cube cssload-c4" />
          <div className="cssload-cube cssload-c3" />
        </div>
        <h3 className="text-dark text-center my-5">Loading ...</h3>
      </div>
    </React.Fragment>
  );
};

export default Loading;

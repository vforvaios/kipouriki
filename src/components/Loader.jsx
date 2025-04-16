import React from "react";

const Loader = ({ smaller }) => {
  return (
    <div className={`loader-container ${smaller ? "smaller" : ""}`}>
      <div className="loader" />
    </div>
  );
};

export default Loader;

import React from "react";
import "./Main.css"; //importing style sheet

//Lazy Loading Component
const Loading = () => {
  return (
    <>
      <div className="loading-container">
        <div className="text-center">
          <p className="fw-bold text-white">Loading...</p>
          <div className="spinner-grow text-danger" role="status"></div>
          <div className="spinner-grow text-warning mx-3" role="status"></div>
          <div className="spinner-grow text-success" role="status"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;

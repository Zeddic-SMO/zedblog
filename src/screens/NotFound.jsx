import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="loginContainer">
      <div className="loginGIF">
        <Link to="/">
          <img src={require("../assets/images/logo.png")} alt="" />
        </Link>
      </div>
      <div className="formContainer">
        <div className="loginForm">
          <h1
            style={{
              fontSize: "50px",
              lineHeight: "50px",
              textAlign: "center",
              color: "#eb6440",
            }}
          >
            404 - UNKOWN PAGE
          </h1>
          <div
            style={{
              margin: "30px 0px",
              textAlign: "center",
              boxShadow: "2px 2px 5px #eb6440",
            }}
          >
            <Link to="/">
              <h2>BACK TO HOME PAGE</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

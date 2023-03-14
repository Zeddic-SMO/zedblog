import React, { useContext, useRef, useEffect } from "react";
import { BlogProvider } from "../BlogContext";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Register = () => {
  const { handleRegInput, handleRegSubmit, registerDetails, error } =
    useContext(BlogProvider);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { firstName, lastName, email, password } = registerDetails;
  return (
    <div className="loginContainer">
      <div className="loginGIF">
        <Link to="/">
          <img src={require("../assets/images/logo.png")} alt="" />
        </Link>
      </div>
      <div className="formContainer">
        <div className="loginForm">
          <h2>Create an account</h2>
          <p style={{ fontWeight: "600", margin: "10px 0px" }}>
            Already have an account?{" "}
            <Link to="/login">
              <small>Login</small>
            </Link>
          </p>
          <div className="googleLogin">
            <FcGoogle />
            <FaGithub />
          </div>
          <div className="optionalLogin">
            <div></div>
            OR
            <div></div>
          </div>
          {error && <div className="error">{error}</div>}
          <div className="firstName-lastName">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={handleRegInput}
              ref={inputRef}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleRegInput}
              value={lastName}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleRegInput}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleRegInput}
            value={password}
          />

          <button
            className="loginBtn"
            onClick={handleRegSubmit}
            style={{ margin: "10px 0px" }}
          >
            Create Account
          </button>
          <p style={{ fontSize: "10px", fontWeight: "700" }}>
            By continuing, you agree LottieFiles Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useContext, useRef, useEffect } from "react";
import { BlogProvider } from "../BlogContext";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Spinner from "../components/Spinner/Spinner";

const Login = () => {
  const { handleChange, handleSubmit, loginDetails, error, loading } =
    useContext(BlogProvider);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { email, password } = loginDetails;
  return (
    <div className="loginContainer">
      <div className="loginGIF">
        <Link to="/">
          <img src={require("../assets/images/logo.png")} alt="" />
        </Link>
      </div>
      <div className="formContainer">
        <div className="loginForm">
          <h2>Welcome Back</h2>
          <p style={{ fontWeight: "600", margin: "10px 0px" }}>
            New to ZedBlog?{" "}
            <Link to="/register">
              <small>Create an account</small>
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
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={email}
            ref={inputRef}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <p style={{ textAlign: "right", margin: "10px 0px" }}>
            <small>Forgot your password?</small>
          </p>
          {!loading ? (
            <button className="loginBtn" onClick={handleSubmit}>
              Log in
            </button>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

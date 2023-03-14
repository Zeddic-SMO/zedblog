import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { BlogProvider } from "../../BlogContext";

const Navigation = () => {
  const { currentUser, handleLogOut } = useContext(BlogProvider);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <Link to="/">
          <img src={require("../../assets/images/logo.png")} alt="logo" />
        </Link>

        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          {currentUser && (
            <>
              <li>
                <Link to="/posts">POSTS</Link>
              </li>
              <li>
                <Link to="/addPost">COMPOSE</Link>
              </li>
              <li>
                <Link to="/profile">PROFILE</Link>
              </li>
            </>
          )}

          {!currentUser ? (
            <>
              <li>
                <Link to="/register">REGISTER</Link>
              </li>
              <li>
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "5px",
                    backgroundColor: "#eb6440",
                  }}
                >
                  SIGN IN
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                style={{
                  padding: "8px 12px",
                  borderRadius: "5px",
                  backgroundColor: "#eb6440",
                }}
                onClick={handleLogOut}
              >
                LOG OUT
              </button>
            </li>
          )}
          <li>
            <Link to="/profile">
              <FaRegUserCircle className={styles.userIcon} />
            </Link>
          </li>
        </ul>
        {/* Mobile Menu */}
        <RiMenu3Fill
          className={styles.hamburger}
          onClick={() => setMobileMenu((prev) => !prev)}
        />
        {mobileMenu && (
          <div className={styles.mobileMenu}>
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/profile">
                  <FaRegUserCircle className={styles.userIcon} />
                </Link>
              </li>
              <li>
                <Link to="/register">SIGN UP</Link>
              </li>
              <li>
                <Link to="/login">SIGN IN</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;

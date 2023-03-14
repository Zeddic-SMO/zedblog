import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <h1>
        &copy; {new Date().getFullYear()} ZEDBlog || Designed by : : Samuel M.
        O.
      </h1>
    </div>
  );
};

export default Footer;

import React from "react";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

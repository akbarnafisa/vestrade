import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

import Nav from "../Navigation/Nav";
import Footer from "../Navigation/Footer";

function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;

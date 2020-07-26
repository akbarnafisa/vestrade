import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

import Nav from "../Navigation/Nav";
import Footer from "../Navigation/Footer";
import SideNav from "../Navigation/SideNav";

function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen h-full bg-gray-300">
      <Nav />
      <main className="flex-1 container flex mx-auto mt-4 mb-16">
        <SideNav />
        <div className="bg-white overflow-hidden w-full rounded border border-gray-400 py-6 px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;

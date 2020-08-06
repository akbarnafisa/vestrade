import PropTypes from "prop-types"
import React, { createContext, useContext, useState, useEffect } from "react"

import Nav from "../Navigation/Nav"
import Footer from "../Navigation/Footer"

export const EthContext = createContext()
export const useEth = () => useContext(EthContext)

function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 bg-gray-300">{children}</main>
      <Footer />
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout

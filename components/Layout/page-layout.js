import Link from "next/link";
import PropTypes from "prop-types";
import React, { createContext, useContext, useState, useEffect } from "react";

import Nav from "../Navigation/Nav";
import Footer from "../Navigation/Footer";

import { getWeb3 } from "@/utils/index"

export const EthContext = createContext();
export const useEth = () => useContext(EthContext);

function PageLayout({ children }) {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = await getWeb3();
        if (web3) {
          setWeb3(web3)
          web3.eth.handleRevert = true
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (!web3) {
      initWeb3()
    }
  }, [web3])

  const value = { web3, accounts, setAccounts }

  return (
    <EthContext.Provider value={value}>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </EthContext.Provider>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;

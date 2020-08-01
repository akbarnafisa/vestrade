import Link from "next/link";
import PropTypes from "prop-types";
import React, { useEffect, createContext, useContext, useState } from "react";

import Nav from "../Navigation/Nav";
import Footer from "../Navigation/Footer";
import SideNav from "../Navigation/SideNav";

import { getWeb3 } from "@/utils/index"

import VestradeOffering from '@/contracts/Vestrade_Offering.json'
import VestradeOfferingFactory from '@/contracts/Vestrade_Offering_Factory.json'
import VestradeERC20 from '@/contracts/Vestrade_ERC20.json'
import VestradeERC20Factory from '@/contracts/Vestrade_ERC20_Factory.json'

export const EthContext = createContext();
export const useEth = () => useContext(EthContext);

function PageLayout({ children }) {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [contracts, setContracts] = useState([])

  const availableContracts = {
    VestradeOffering: VestradeOffering,
    VestradeOfferingFactory: VestradeOfferingFactory,
    VestradeERC20: VestradeERC20,
    VestradeERC20Factory: VestradeERC20Factory
  }

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = await getWeb3();
        web3.eth.handleRevert = true
        const accounts = await web3.eth.getAccounts();
        // logged in
        console.log('logged in')
        setWeb3(web3)
        setAccounts(accounts)
      } catch (err) {
        console.log(err)
      }
    }
    if (!web3) {
      initWeb3()
    }
  }, [web3])

  const getContract = async (name, addr) => {
    if (name.includes('Factory')) {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = availableContracts[name].networks[networkId];
      const instance = new web3.eth.Contract(
        availableContracts[name].abi,
        deployedNetwork && deployedNetwork.address,
      )
      return instance
    }
    const contract = new web3.eth.Contract(
      availableContracts[name].abi,
      addr
    )
    return contract
  }

  const value = { web3, accounts, contracts, getContract }

  return (
    <EthContext.Provider value={value}>
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
    </EthContext.Provider>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;

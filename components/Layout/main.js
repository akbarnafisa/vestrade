import PropTypes from "prop-types";
import React, { createContext, useContext, useState, useEffect } from "react";

import { getWeb3 } from "@/utils/index"

import VestradeOffering from '@/contracts/Vestrade_Offering.json'
import VestradeOfferingFactory from '@/contracts/Vestrade_Offering_Factory.json'
import VestradeERC20 from '@/contracts/Vestrade_ERC20.json'
import VestradeERC20Factory from '@/contracts/Vestrade_ERC20_Factory.json'

import Nav from "../Navigation/Nav";
import Footer from "../Navigation/Footer";

export const EthContext = createContext();
export const useEth = () => useContext(EthContext);

function Main ({ children }) {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)

  const availableContracts = {
    VestradeOffering: VestradeOffering,
    VestradeOfferingFactory: VestradeOfferingFactory,
    VestradeERC20: VestradeERC20,
    VestradeERC20Factory: VestradeERC20Factory
  }

  useEffect(() => {
    async function listenMMAccount() {
      window.ethereum.on("accountsChanged", async function() {
        window.location.reload()
      });
    }
    if (window.ethereum) {
      listenMMAccount();
    }
  }, []);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = await getWeb3();
        if (web3) {
          setWeb3(web3)
          web3.eth.handleRevert = true
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (!web3) {
      initWeb3()
    }
  }, [web3])

  const getContract = (name, addr) => {
    const contract = new web3.eth.Contract(
      availableContracts[name].abi,
      addr
    )
    return contract
  }

  const value = { web3, accounts, setAccounts, getContract }

  return (
    <EthContext.Provider value={value}>
      { children }
    </EthContext.Provider>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;

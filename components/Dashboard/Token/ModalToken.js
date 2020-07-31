import React, { useState, useEffect } from "react";

import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import { useEth } from "@/components/Layout/dashboard";
import { toast } from "@/utils/index";


import VestradeERC20Factory from "@/contracts/Vestrade_ERC20_Factory.json"

export default ({ closeModalToken }) => {
  const [symbol, setSymbol] = useState(``);
  const [org, setOrg] = useState(``);
  const [eth, setEth] = useState(``);
  const [contract, setContract] = useState(null)
  const { web3, accounts } = useEth()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VestradeERC20Factory.networks[networkId];
      const instance = new web3.eth.Contract(
        VestradeERC20Factory.abi,
        deployedNetwork && deployedNetwork.address,
      )
      setContract(instance)
      setEth(accounts[0])
    }
    init()
  }, [])

  const _closeModalToken = () => {
    !loading ? closeModalToken() : null;
  };

  const submitValue = () => {
    setLoading(true)
    contract.methods.create(org, symbol.toUpperCase(), 18).send({
      from: accounts[0]
    })
      .once('error', (error) => {
        console.log(error)
        toast.error('Fail to create token!');
        _closeModalToken()
      })
      .once('transactionHash', (transactionHash) => {
        toast.success('Trx hash success waiting confirmation!');
        console.log(`tx hash success waiting confirmation ${transactionHash}`)
        _closeModalToken()
      })
      .once('confirmation', async (confirmationNumber, receipt) => {
        toast.success('Token successfully created!');
        console.log(`${newTokenSymbol.toUpperCase()} successfully created!`)
        _closeModalToken()
      })
    setTimeout(() => _closeModalToken(), 5000)

  };
  return (
    <div className="modal-dashboard">
      <div
        className="modal-dashboard__overlay"
        onClick={() => _closeModalToken()}
      ></div>
      <div className="modal-dashboard__content">
        <div className="modal-dashboard__content__title">Add New Token</div>
        <div className="mb-4">
          This process will create new token that will be available on Ethereum
          blockchain
        </div>
        <Input
          label="Token Symbol"
          onChange={(val) => setSymbol(val)}
          placeholder="Symbol"
          value={symbol.toUpperCase()}
          disabled={loading}
        />
        <Input
          label="Organization Name"
          onChange={(val) => setOrg(val)}
          placeholder="Organization Name"
          value={org}
          disabled={loading}
        />
        <Input
          label="Issuer’s ETH Address"
          value={eth}
          disabled={true}
          onChange={(val) => setEth(val)}
          placeholder="ETH Address"
        />
        <div className="flex mt-8">
          <Button
            className="w-full py-3"
            onClick={() => _closeModalToken()}
            type="btn-ghost"
          >
            Cancel
          </Button>
          <Button
            className=" ml-2 w-full py-3"
            disabled={loading || (org === '' || symbol === '')}
            loading={loading}
            onClick={() => submitValue()}
            type="btn-primary"
          >
            Create New Token
          </Button>
        </div>
      </div>
    </div>
  );
};

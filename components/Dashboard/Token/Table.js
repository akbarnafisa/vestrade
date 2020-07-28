import React, { useEffect, useState } from "react";
import { get, prettyBalance } from "@/utils/index";
import { useEth } from "@/components/Layout/dashboard";

import VestradeERC20 from '@/contracts/Vestrade_ERC20.json'

const TokenRow = ({token, index, setModalEditToken}) => {
  const { web3 } = useEth()

  const [totalSupply, setTotalSupply] = useState(null)

  useEffect(() => {
    const getTotalSupply = async () => {
      const tokenContract = new web3.eth.Contract(
        VestradeERC20.abi,
        token.tokenAddr
      )
      const totalSupply = await tokenContract.methods.totalSupply().call()
      setTotalSupply(prettyBalance(totalSupply))
    }
    if (web3 && token) {
      getTotalSupply()
    }
  }, [web3, token])

  return (
    <tr className={index % 2 !== 0 ? `bg-gray-200` : ``} key={index}>
      <td className="border-t px-6 py-4">
        {get(token, `symbol`, `-`)}
      </td>
      <td className="border-t px-6 py-4">
        {get(token, `name`, `-`)}
      </td>
      <td className="border-t font-bold px-6 py-4">{totalSupply}</td>
      <td className="border-t">
        <div
          className="w-6 h-6 cursor-pointer"
          onClick={() => setModalEditToken(token)}
        >
          <img className="w-4 h-auto" src="/icon/edit.svg" />
        </div>
      </td>
    </tr>
  )
}

export default ({ tokens, setModalEditToken }) => {
  return (
    <div className="dasboard-table relative mx-auto">
      <table className="table-fixed bg-white w-full shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-400">
            <th className="w-4/12 px-6 py-4 text-left">Token Symbol</th>
            <th className="w-4/12 px-6 py-4 text-left">Organization Name</th>
            <th className="w-4/12 px-6 py-4 text-left">Total Supply</th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => {
            return (
              <TokenRow token={token} index={index} setModalEditToken={setModalEditToken} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

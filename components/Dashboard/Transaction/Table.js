import React, { useEffect, useState } from "react";
import { formatDate, get, prettyBalance, prettyAddress } from "@/utils/index";
import { useEth } from "@/components/Layout/main";

const TxRow = ({ tx, idx }) => {
  const { web3, getContract } = useEth()
  const [symbol, setSymbol] = useState(null)

  useEffect(() => {
    const init = async () => {
      const contract = await getContract('VestradeERC20', tx.tokenAddr)
      const symbol = await contract.methods.symbol().call()
      setSymbol(symbol)
    }

    if (web3 && tx) {
      init()
    }
  }, [web3, tx])

  return (
    <tr
      className={idx % 2 !== 0 ? `bg-gray-200` : ``}
      key={idx}
    >
      <td className="border-t px-6 py-4">
        {prettyAddress(get(tx, `txId`, `-`))}
      </td>
      <td className="border-t px-6 py-4">
        {prettyAddress(get(tx, `tokenAddr`, `-`))}
      </td>
      <td className="border-t px-6 py-4">
        {prettyBalance(tx.tokens, 18, 6)} { symbol }
      </td>
      <td className="border-t px-6 py-4">
        {prettyBalance(tx.amount, 18, 6)}
      </td>
      <td className="border-t px-6 py-4">
        {prettyAddress(get(tx, `fromAddr`, `-`))}
      </td>
      <td className="border-t px-6 py-4">
        {formatDate(
          Number(get(tx, `timestamp`, 0)) * 1000,
          `DD MMM YYYY`
        )}
      </td>
    </tr>
  )
}

export default ({ transactions }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="dasboard-table  relative mx-auto">
        <table className="bg-white w-full shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-400">
              <th className="w-3/12 min px-6 py-4 text-left">Tranx ID</th>
              <th className="w-3/12 px-6 py-4 text-left">Tokens</th>
              <th className="w-3/12 px-6 py-4 text-left">Amount</th>
              <th className="w-3/12 px-6 py-4 text-left">ETH Amount</th>

              <th className="w-3/12 px-6 py-4 text-left">From</th>
              <th className="w-3/12 px-6 py-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => {
              return (
                <TxRow tx={tx} idx={index} key={tx.id} />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="inset-shaddow"></div>
      <style jsx>
        {`
          .inset-shaddow {
            width: 10px;
            height: 100%;
            top: 0;
            right: 0;
            position: absolute;
            background: white;
            -moz-box-shadow: 13px 13px 0px 0px #ffffff;
            -webkit-box-shadow: 13px 13px 0px 0px #ffffff;
            box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.5);
          }
          thead tr th {
            min-width: 250px;
          }

          .dasboard-table {
            overflow-y: auto;
          }

          .dasboard-table::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 8px;
            height: 8px;
          }

          .dasboard-table::-webkit-scrollbar-thumb {
            border-radius: 8px;
            border: 1px solid white; /* should match background, can't be transparent */
            background-color: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
    </div>
  );
};

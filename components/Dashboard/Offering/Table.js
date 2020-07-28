import React, { useEffect, useState } from "react";
import { formatDate, get, prettyAddress, prettyBalance } from "@/utils/index";
import VestradeOffering from "@/contracts/Vestrade_Offering.json";
import { useEth } from "@/components/Layout/dashboard";

const OfferingRow = ({ offering, index }) => {
  const { web3 } = useEth()

  const [balance, setBalance] = useState('')

  useEffect(() => {
    const getBalance = async () => {
      const offeringContract = new web3.eth.Contract(
        VestradeOffering.abi,
        offering.addr
      )
      const balance = await offeringContract.methods.balance().call()
      setBalance(balance)
      console.log(offering)
    }
    if (web3 && offering && !balance) {
      getBalance()
    }
  }, [web3, offering, balance])

  return (
    <tr className={index % 2 !== 0 ? `bg-gray-200` : ``} key={index}>
      <td className="border-t px-6 py-4">
        {prettyAddress(get(offering, `tokenAddr`, `-`))}
      </td>
      <td className="border-t px-6 py-4 flex items-center">
        <div>{1 / Number(get(offering, `rate`, `-`))} </div>
        <div className="ml-2">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.88916 11.1394L4.99834 11.2483L9.99685 8.29374L4.99834 0L4.88916 0.371093V11.1394Z" fill="#343434" />
            <path d="M4.99851 11.2484V0L0 8.29374L4.99851 11.2484Z" fill="#8C8C8C" />
            <path d="M4.93701 16.1057L4.99853 16.2854L10.0001 9.2417L4.99857 12.1948L4.93705 12.2698L4.93701 16.1057Z" fill="#3C3C3B" />
            <path d="M0 9.2417L4.99851 16.2854V12.1948L0 9.2417Z" fill="#8C8C8C" />
            <path d="M4.99854 6.02173V11.2482L9.99697 8.29368L4.99854 6.02173Z" fill="#141414" />
            <path d="M4.99843 6.02173L0 8.29364L4.99843 11.2482V6.02173Z" fill="#393939" />
          </svg>
        </div>
      </td>
      <td className="border-t px-6 py-4">
        {prettyBalance(balance)}
      </td>
      <td className="border-t px-6 py-4">
        {prettyBalance(offering.supply)}
      </td>
      <td className="border-t px-6 py-4">
        {formatDate(
          Number(get(offering, `startDate`, 0)),
          `DD MMM YYYY`
        )}
      </td>
      <td className="border-t px-6 py-4">
        {formatDate(
          Number(get(offering, `endDate`, 0)),
          `DD MMM YYYY`
        )}
      </td>
    </tr>
  )
}

export default ({ offerings }) => {
  return (
    <div className="dasboard-table relative mx-auto">
      <table className="table-fixed bg-white w-full shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-400">
            <th className="w-2/12 px-6 py-4 text-left">Address</th>
            <th className="w-2/12 px-6 py-4 text-left">Price</th>
            <th className="w-2/12 px-6 py-4 text-left">Available</th>
            <th className="w-2/12 px-6 py-4 text-left">Supply</th>
            <th className="w-2/12 px-6 py-4 text-left">Start Date</th>
            <th className="w-2/12 px-6 py-4 text-left">End Date</th>
          </tr>
        </thead>
        <tbody>
          {offerings.map((offering, index) => {
            return (
              <OfferingRow offering={offering} index={index} key={index} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

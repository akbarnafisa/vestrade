import React, { useState } from "react";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import { useEth } from "@/components/Layout/dashboard";
import { useRouter } from "next/router";
import JSBI from "jsbi";
import { toast } from "@/utils/index";

export default ({ closeModal }) => {
  const router = useRouter()
  const { web3, accounts, getContract } = useEth()
  const [name, setName] = useState(``);
  const [supply, setSupply] = useState(``);
  const [token, setToken] = useState(``);
  const [startDate, setStartDate] = useState(``);
  const [endDate, setEndDate] = useState(``);

  const newOffering = async () => {
    const tokenContract = await getContract('VestradeERC20', router.query.tokenAddr);
    const offeringFactoryContract = await getContract('VestradeOfferingFactory');
    const decimals = await tokenContract.methods.decimals().call()
    const mintValue = JSBI.BigInt(supply * 10 ** decimals).toString()

    const oneWei = web3.utils.toWei('1', 'ether')

    const rate = JSBI.divide(JSBI.BigInt(token * 10 ** decimals), JSBI.BigInt(oneWei))

    offeringFactoryContract.methods.create(name, router.query.tokenAddr, mintValue, rate.toString(), new Date(startDate).getTime(), new Date(endDate).getTime()).send({
      from: accounts[0]
    })
      .once('error', (error) => {
        console.log(error)
        toast.error('Failed to create offering!');
      })
      .once('transactionHash', (transactionHash) => {
        console.log(`tx hash ${transactionHash}`)
        toast.success('Offering is successfully created, waiting for confirmation!');
        closeModal()
      })
      .once('confirmation', async (confirmationNumber, receipt) => {
        console.log(`tx confirmed`)
        toast.success('Offering successfully confirmed!');
        closeModal()
      })
  }

  const _validateOffering = () => {
    if (name.length > 0 && supply > 0 && !isNaN(supply) && token > 0 && !isNaN(token) && new Date(startDate) && new Date(endDate)) {
      return true
    }
    return false
  }

  return (
    <div className="fixed top-0 left-0 min-h-screen min-w-full flex items-center justify-center z-50">
      <div
        className="bg-black opacity-50 absolute top-0 left-0 bottom-0 right-0"
        onClick={() => closeModal()}
      ></div>
      <div className="modal bg-white py-6 px-8 relative">
        <div className="text-3xl mb-4 font-bold">Add New Offering</div>
        <Input
          label="Name"
          onChange={(val) => setName(val)}
          placeholder="Name"
        />
        <Input
          label="Supply"
          onChange={(val) => setSupply(val)}
          placeholder="Supply"
        />
        <Input
          label="Token per ETH"
          onChange={(val) => setToken(val)}
          placeholder="Token per ETH"
        />
        <div className="flex justify-between">
          <Input
            label="Start Date"
            onChange={(val) => setStartDate(val)}
            placeholder="Start Date"
            type="date"
          />
          <Input
            className="ml-4"
            label="End Date"
            onChange={(val) => setEndDate(val)}
            placeholder="End Date"
            type="date"
          />
        </div>
        <div className="flex mt-8">
          <Button
            className="w-full"
            onClick={() => closeModal()}
            type="btn-ghost"
          >
            Cancel
          </Button>
          <Button disabled={!_validateOffering()} onClick={newOffering} className="w-full ml-2" type="btn-primary">
            Add New Offering
          </Button>
        </div>
      </div>
      <style jsx>
        {`
          .modal {
            width: 500px;
          }
        `}
      </style>
    </div>
  );
};

import React, { useState, useEffect } from "react";

import Button from "@/components/Common/Button";
import { useEth } from "@/components/Layout/main";
import { useRouter } from "next/router";

export default ({ closeModal, offering }) => {
  const router = useRouter()
  const { web3, accounts, getContract } = useEth()
  const [step, setStep] = useState(1);
  const [mintTokenStatus, setMintTokenStatus] = useState(null)
  const [startStatus, setStartStatus] = useState(false)

  useEffect(() => {
    const init = async () => {
      const offeringContract = await getContract('VestradeOffering', offering.addr)
      const latestMintStatus = await offeringContract.methods.mintStatus().call()
      const latestIsStarted = await offeringContract.methods.offeringStatus().call()
      if (latestMintStatus) {
        setMintTokenStatus('confirmed')
        setStep(2)
      }
      if (latestIsStarted) {
        setMintTokenStatus('confirmed')
        setStartStatus('confirmed')
        setStep(2)
      }
    }

    init()
  }, [])

  const mintToken = async () => {
    const tokenAddr = router.query.tokenAddr
    const tokenContract = await getContract('VestradeERC20', tokenAddr)
    tokenContract.methods.mint(offering.addr, offering.supply).send({
      from: accounts[0]
    })
      .once('error', (error) => {
        console.log(error)
      })
      .once('transactionHash', (transactionHash) => {
        console.log(`tx hash ${transactionHash}`)
        // alert.setMsg('Transaction success, minting will begin soon')
        // alert.setShow(true)
        setMintTokenStatus('pending')
      })
      .once('confirmation', (confirmationNumber, receipt) => {
        // console.log(receipt.events)
        setMintTokenStatus('confirmed')
      })
  }

  const startOffering = async () => {
    const offeringContract = await getContract('VestradeOffering', offering.addr)
    offeringContract.methods.startOffering().send({
      from: accounts[0]
    })
      .once('error', (error) => {
        console.log(error)
      })
      .once('transactionHash', (transactionHash) => {
        console.log(`tx hash ${transactionHash}`)
        // alert.setMsg('Transaction success, offering will begin soon')
        // alert.setShow(true)
        setStartStatus('pending')
      })
      .once('confirmation', (confirmationNumber, receipt) => {
        // console.log(receipt.events)
        setStartStatus('confirmed')
      })
  }

  const Stepper = ({
    active = 1,
    nameOfSteps = [`Name of Step 1`, `Name of Step 2`],
    onChange,
  }) => {
    return (
      <div className="flex justify-between ">
        {nameOfSteps.map((step, index) => {
          let isActiveStep = active == index + 1;
          let stepClass = `w-6 h-6 rounded-full bg-gray-500 relative z-10  text-white flex items-center text-sm justify-center mb-4`;
          stepClass = isActiveStep ? `${stepClass} bg-purple-700` : stepClass;

          let bar;
          if (index + 1 !== nameOfSteps.length) {
            bar = <div className="bar border-t absolute border-gray-400"></div>;
          }
          return (
            <div
              className="flex relative cursor-pointer"
              key={index}
              onClick={() => onChange(index + 1)}
            >
              <div className="flex flex-col items-center justify-center">
                <div className={stepClass}>{index + 1}</div>
                <div
                  className={isActiveStep ? `text-gray-800` : `text-gray-500`}
                >
                  {step}
                </div>
              </div>
              {bar}
            </div>
          );
        })}
        <style jsx>
          {`
            .bar {
              top: 10px;
              left: 50%;
              width: 390px;
            }
          `}
        </style>
      </div>
    );
  };

  const FirstStep = () => {
    return (
      <div className="mt-8">
        <div>
          Before you can start the offering, you need to mint new token that
          later will be available for sale
        </div>
        <div className="flex mt-8">
          <Button
            className="w-full"
            onClick={() => closeModal()}
            type="btn-ghost"
          >
            Cancel
          </Button>
          <Button disabled={mintTokenStatus === 'confirmed'} onClick={mintToken} className="ml-2 w-full" type="btn-primary">
            Mint
          </Button>
        </div>
      </div>
    );
  };
  const SecondStep = () => {
    return (
      <div className="mt-8">
        <div>Offering will be active once you click the start button</div>
        <div className="flex mt-8">
          <Button
            className="w-full"
            onClick={() => closeModal()}
            type="btn-ghost"
          >
            Cancel
          </Button>
          <Button disabled={startStatus === 'confirmed'} onClick={startOffering} className="ml-2 w-full" type="btn-primary">
            Start
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 min-h-screen min-w-full flex items-center justify-center">
      <div
        className="bg-black opacity-50 absolute top-0 left-0 bottom-0 right-0"
        onClick={() => closeModal()}
      ></div>
      <div className="modal bg-white py-6 px-8 relative z-50">
        <Stepper
          active={step}
          nameOfSteps={[`Step 1`, `Step 2`]}
          onChange={(val) => setStep(val)}
        />
        {step == 1 ? <FirstStep /> : null}
        {step == 2 ? <SecondStep /> : null}
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

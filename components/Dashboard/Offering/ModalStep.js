import React, { useState } from "react";

import Button from "@/components/Common/Button";
export default ({ closeModal }) => {
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
          <Button className="ml-2 w-full" type="btn-primary">
            Mint
          </Button>
        </div>
      </div>
    );
  };
  const SecondStep = () => {
    return (
      <div className="mt-8">
        <div>SecondStep</div>
        <div className="flex mt-8">
          <div className="btn-ghost w-full py-3" onClick={() => closeModal()}>
            Cancel
          </div>
          <div className="btn-primary ml-2 w-full py-3">Mint</div>
        </div>
      </div>
    );
  };

  const [step, setStep] = useState(1);

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

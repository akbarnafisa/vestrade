import React, { useState } from "react";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";


export default ({ closeModal }) => {
  const [name, setName] = useState(``);
  const [supply, setSupply] = useState(``);
  const [token, setToken] = useState(``);
  const [startDate, setStartDate] = useState(``);
  const [endDate, setEndDate] = useState(``);

  return (
    <div className="fixed top-0 left-0 min-h-screen min-w-full flex items-center justify-center">
      <div
        className="bg-black opacity-50 absolute top-0 left-0 bottom-0 right-0"
        onClick={() => closeModal()}
      ></div>
      <div className="modal bg-white py-6 px-8 relative z-50">
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
          <Button className="w-full ml-2" type="btn-primary">
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

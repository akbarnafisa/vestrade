import React, { useState } from "react";
import axios from "axios";

import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";

export default ({ closeModalToken, setInitTokens }) => {
  const [org, setOrg] = useState(``);
  const [eth, setEth] = useState(``);

  const submitValue = () => {
    const frmdetails = {
      "First Name": fName,
      "Last Name": lName,
      Phone: phone,
      Email: email,
    };
    const data = {
      _id: `1`,
      name: `CV ZXC INDO`,
      addr: `0xe659faa053a900c33fc6d35d2c3627e6144c60d3`,
      detail: {
        _id: `5f0fe41565e6843dd348bfbb`,
        tokenAddr: `0xe659faa053a900c33fc6d35d2c3627e6144c60d3`,
        address: `Jln. ZXC, Jakarta Selatan`,
        businessOwner: {
          name: `Joni`,
          avatarUrl: `https://google.com`,
          bio: `10 tahun kerja di per-Joni-an`,
        },
        name: `CV ZXC INDO`,
        prospectusUrl: null,
        symbol: `ZXC`,
        thumbnailListUrl: null,
      },
    };
    axios
      .post(`https://5f13fb012710570016b37a62.mockapi.io/api/token`, data)
      .then((res) => {
        setInitTokens(res.data);
        closeModalToken();
      });
  };

  return (
    <div className="modal-dashboard">
      <div
        className="modal-dashboard__overlay"
        onClick={() => closeModalToken()}
      ></div>
      <div className="modal-dashboard__content">
        <div className="modal-dashboard__content__title">Add New Token</div>
        <div className="mb-4">
          This process will create new token that will be available on Ethereum
          blockchain
        </div>
        <div className="mb-4">
          <div className="mb-2 text-center">Token Symbol</div>
          <div className="text-center w-full py-2 rounded bg-gray-200 text-2xl font-semibold">
            PTJM
          </div>
        </div>
        <Input
          label="Organization Name"
          onChange={(val) => setOrg(val)}
          placeholder="Organization Name"
        />
        <Input
          label="Issuer’s ETH Address"
          onChange={(val) => setEth(val)}
          placeholder="ETH Address"
        />
        <div className="flex mt-8">
          <Button
            className="w-full py-3"
            onClick={() => closeModalToken()}
            type="btn-ghost"
          >
            Cancel
          </Button>
          <Button
            className=" ml-2 w-full py-3"
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

import React, { useState } from "react";

import axios from "axios";

import { get } from "@/utils/index";

import Uploader from "@/components/Dashboard/Common/Uploader";
import Input from "@/components/Common/Input";
import Textarea from "@/components/Common/Textarea";
import Button from "@/components/Common/Button";

import { ToastContainer, toast } from "react-toastify";

export default ({ token, updateTokens, closeModalEditToken }) => {
  const [name, setName] = useState(get(token, `name`, ``));
  const [tokenAddress, setTokenAddress] = useState(get(token, `tokenAddr`, ``));
  const [symbol, setSymbol] = useState(get(token, `symbol`, ``));

  const [address, setAddress] = useState(get(token, `address`, ``));
  const [prospectusUrl, setProspectusUrl] = useState(
    get(token, `prospectusUrl`, ``)
  );
  const [thumbnailListUrl, setThumbnailListUrl] = useState(
    get(token, `thumbnailListUrl`, [])
  );

  const [loading, setLoading] = useState(false);

  const submitValue = () => {
    const data = {
      address,
      businessOwnerName: `Elizabeth Olsen`,
      businessOwnerAvatarUrl: `https://pic.element3ds.com/forum/201611/30/152859rzez4k6n645kxfzb.jpg`,
      businessOwnerBio: `10 tahun kerja di per-Joni-an`,
      prospectusUrl,
      thumbnailListUrl,
    };
    const config = {
      header: {
        "content-type": `application/x-www-form-urlencoded`,
      },
    };
    setLoading(true);

    axios
      .put(`http://api.vestrade.io/tokens/${tokenAddress}`, data, config)
      .then((res) => {
        setLoading(false);
        updateTokens(res.data.data);
        toast.success(`Token updated`, {
          position: `top-right`,
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        closeModalEditToken();
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Fail to update token`, {
          position: `top-right`,
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        closeModalEditToken();
        setLoading(true);
      });
  };

  const removeAsset = (src, assets) => {
    if (src === `prospectus`) {
      setProspectusUrl(``);
    }
    if (src === `thumbnail`) {
      const temp = thumbnailListUrl.filter((val) => val !== assets);
      setThumbnailListUrl(temp);
    }
  };

  const _closeModalEditToken = () => {
    !loading ? closeModalEditToken() : null;
  };

  return (
    <div className="modal-dashboard">
      <ToastContainer
        autoClose={2500}
        closeOnClick={false}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="top-right"
        rtl={false}
      />
      <div
        className="modal-dashboard__overlay"
        onClick={() => _closeModalEditToken()}
      ></div>
      <div className="modal-dashboard__content">
        <div className="modal-dashboard__content__title">Edit Token</div>
        <Input disabled={true} label="Name" placeholder="Name" value={name} />
        <Input
          disabled={true}
          label="Token Address"
          placeholder="Token Address"
          value={tokenAddress}
        />
        <Input
          disabled={true}
          label="Symbol"
          placeholder="Symbol"
          value={symbol}
        />
        <Textarea
          label="Address"
          onChange={(val) => setAddress(val)}
          placeholder="Address"
          value={address}
        />

        <Uploader
          assets={prospectusUrl}
          label={`Prospectus`}
          onChange={(val) => setProspectusUrl(val)}
          onRemove={(val) => removeAsset(`prospectus`, val)}
        />

        <Uploader
          assets={thumbnailListUrl}
          label={`Thumbnail`}
          onChange={(val) => setThumbnailListUrl(thumbnailListUrl.concat(val))}
          onRemove={(val) => removeAsset(`thumbnail`, val)}
        />

        <div className="flex mt-8">
          <Button
            className="w-full"
            onClick={() => _closeModalEditToken()}
            type="btn-ghost"
          >
            Cancel
          </Button>
          <Button
            className="ml-2 w-full"
            disabled={loading}
            loading={loading}
            onClick={() => submitValue()}
            type="btn-primary"
          >
            Edit Token
          </Button>
        </div>
      </div>
    </div>
  );
};

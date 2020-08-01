import React, { useState } from "react";

import axios from "axios";

import { get, toast } from "@/utils/index";

import Uploader from "@/components/Dashboard/Common/Uploader";
import Input from "@/components/Common/Input";
import Textarea from "@/components/Common/Textarea";
import Button from "@/components/Common/Button";


export default ({ token, updateTokens, closeModalEditToken }) => {
  const [name, setName] = useState(get(token, `name`, ``));
  const [tokenAddress, setTokenAddress] = useState(get(token, `tokenAddr`, ``));
  const [symbol, setSymbol] = useState(get(token, `symbol`, ``));

  const [businessOwnerName, setOwnerName] = useState(get(token, `businessOwner.name`, ``) || '');
  const [businessOwnerAvatarUrl, setOwnerAvatarUrl] = useState(get(token, `businessOwner.avatarUrl`, '') || '');
  const [businessOwnerBio, setOwnerBio] = useState(get(token, `businessOwner.bio`, ``) || '');

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
      businessOwnerName,
      businessOwnerAvatarUrl,
      businessOwnerBio,
      // businessOwner: {
      //   name: businessOwnerName,
      //   avatarUrl: businessOwnerAvatarUrl,
      //   bio: businessOwnerBio,
      // },
      // businessOwnerName: `Elizabeth Olsen`,
      // businessOwnerAvatarUrl: `https://3.bp.blogspot.com/-0WNZzIvLXCQ/T4OYV9EYaGI/AAAAAAAAFBM/sEUZ59ENuOA/s1600/just%2Bamy025_pp_Snapseed%25231.jpg`,
      // businessOwnerBio: `10 tahun kerja di per-Joni-an`,
      prospectusUrl,
      thumbnailListUrl,
    };
    const config = {
      header: {
        "content-type": `application/x-www-form-urlencoded`,
      },
    };
    console.log(data)
    setLoading(true);

    axios
      .put(`http://api.vestrade.io/tokens/${tokenAddress}`, data, config)
      .then((res) => {
        setLoading(false);
        updateTokens(res.data.data);
        toast.success('Token updated');
        closeModalEditToken();
      })
      .catch((e) => {
        console.log(e);
        toast.error('Fail to update token');
        closeModalEditToken();
        setLoading(true);
      });
  };

  const removeAsset = (src, assets) => {
    if (src === 'prospectus') {
      setProspectusUrl('');
    }
    if (src === 'avatar') {
      setOwnerAvatarUrl('');
    }
    if (src === 'thumbnail') {
      const temp = thumbnailListUrl.filter((val) => val !== assets);
      setThumbnailListUrl(temp);
    }
  };

  const _closeModalEditToken = () => {
    !loading ? closeModalEditToken() : null;
  };

  return (
    <div className="modal-dashboard">
      <div
        className="modal-dashboard__overlay"
        onClick={() => _closeModalEditToken()}
      ></div>
      <div className="modal-dashboard__content">
        <div className="modal-dashboard__content__title">Edit Token</div>
        <div className="text-xl mb-2 text-gray-900 font-bold">
          User Info
        </div>

        <Input
          label="Owner Name"
          placeholder="Owner Name"
          value={businessOwnerName}
          onChange={(val) => setOwnerName(val)}

        />
        <Input
          label="Owner Bio"
          placeholder="Owner Bio"
          value={businessOwnerBio}
          onChange={(val) => setOwnerBio(val)}

        />

        <Uploader
          assets={businessOwnerAvatarUrl}
          label={`Avatar`}
          onChange={(val) => setOwnerAvatarUrl(val)}
          onRemove={(val) => removeAsset(`avatar`, val)}
        />

        <div className="text-xl mb-2 mt-8 text-gray-900 font-bold">
          Token Info
        </div>
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

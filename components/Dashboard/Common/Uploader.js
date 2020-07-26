import Dropzone from "react-dropzone-uploader";

export default function Uploader({ label, onChange, onRemove, assets }) {
  const getUploadParams = ({ file }) => {
    const url = `http://api.vestrade.io/upload`;
    const body = new FormData();
    body.append(`file`, file);
    return {
      url,
      body,
    };
  };

  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    if (status == `done`) {
      const response = JSON.parse(xhr.response);
      onChange(response.data);
    }
  };

  // const renderAssets = (url) => {
  //   const imgAsset = url.match(/\.(jpeg|jpg|gif|png)$/)
  //   if (imgAsset) {
  //     return (
  //       <img className="pb-4 p-2 rounded" src={url} />
  //     )
  //   } else {
  //     const reg = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  //     let ext
  //     try {
  //       ext = url.match(reg)[1]
  //     } catch (error) {
  //       ext = 'files'
  //     }
  //     const filename = url.split('/').pop().split('_')[1]
  //     return (
  //       <div className="mr-4 mb-4">
  //         <div className="p-8 flex items-center justify-center text-white bg-gray-500 font-semibold rounded">
  //           {`.${ext}`}
  //         </div>
  //         <div className="ellipsis text-center mt-2">
  //           {filename}
  //         </div>
  //       </div>
  //     )

  //   }

  // }
  const validateAssets = () => {
    const assetsIsString = typeof assets === `string`;
    if (assetsIsString) {
      if (!assets) return;
      const reg = /\.([0-9a-z]+)(?:[\?#]|$)/i;
      let ext;
      try {
        ext = assets.match(reg)[1];
      } catch (error) {
        ext = `files`;
      }
      const filename = assets.split(`/`).pop().split(`_`)[1];
      return (
        <div
          className="w-1/3 relative cursor-pointer"
          onClick={(e) => window.open(assets, `_blank`)}
        >
          <div className="mr-4 mb-4">
            <div className="p-8 flex items-center justify-center text-white bg-gray-500 font-semibold rounded">
              {`.${ext}`}
            </div>
            <div className="ellipsis text-center mt-2">{filename}</div>
          </div>
          <div
            className="uploader__delete w-6 h-6"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(assets);
            }}
          >
            <img alt="" className="w-full" src="/icon/delete.svg" />
          </div>
        </div>
      );
    }
    return assets.map((asset, index) => (
      <div className="w-1/3 relative" key={index}>
        <img className="pb-4 p-2 rounded" src={asset} />
        <div
          className="uploader__delete w-6 h-6 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(asset);
          }}
        >
          >
          <img alt="" className="w-full" src="/icon/delete.svg" />
        </div>
      </div>
    ));
  };
  return (
    <div className="mb-8">
      <div className="text-sm font-semibold text-gray-700 mb-2">{label}</div>
      <div className="flex flex-wrap">
        {
          validateAssets()
          // validateAssets.map((asset, index) => (
          //   <div key={index} onClick={(e) => window.open(asset, "_blank")} className="w-1/3 relative cursor-pointer">
          //     {renderAssets(asset)}
          //     <div onClick={(e) => {
          //       e.stopPropagation()
          //       onRemove(asset)
          //     }} className="uploader__delete w-6 h-6">
          //       <img src="/icon/delete.svg" className="w-full" alt="" />
          //     </div>
          //   </div>
          // ))
        }
      </div>
      <Dropzone
        SubmitButtonComponent={null}
        canRemove={false}
        getUploadParams={getUploadParams}
        inputContent={`Upload ${label}`}
        onChangeStatus={handleChangeStatus}
        styles={{
          dropzone: { minHeight: 100, maxHeight: 250 },
          inputLabel: { color: `#1B105F`, fontFamily: `SpaceGrotesk` },
          inputLabelWithFiles: { marginBottom: `16px` },
        }}
      />
    </div>
  );
}

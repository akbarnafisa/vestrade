import React from "react";
import Button from "@/components/Common/Button";
export default ({ title, desc, btn, openModal }) => {
  return (
    <div>
      <div className=" flex items-center items-center justify-between">
        <div>
          <div className="text-3xl font-bold">{title}</div>

          {desc ? (
            <div className="mt-2 flex items-center">
              <div className="ml-2">{desc}</div>
            </div>
          ) : null}
        </div>
        {btn ? <Button onClick={() => openModal()}>{btn}</Button> : null}
      </div>
      <div className=" border-t border-gray-300 w-full my-6"></div>
    </div>
  );
};

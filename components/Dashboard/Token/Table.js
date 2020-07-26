import React from "react";
import { get } from "@/utils/index";

export default ({ tokens, setModalEditToken }) => {
  return (
    <div className="dasboard-table relative mx-auto">
      <table className="table-fixed bg-white w-full shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-400">
            <th className="w-4/12 px-6 py-4 text-left">Token Symbol</th>
            <th className="w-4/12 px-6 py-4 text-left">Organization Name</th>
            <th className="w-4/12 px-6 py-4 text-left">Total Supply</th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => {
            return (
              <tr className={index % 2 !== 0 ? `bg-gray-200` : ``} key={index}>
                <td className="border-t px-6 py-4">
                  {get(token, `symbol`, `-`)}
                </td>
                <td className="border-t px-6 py-4">
                  {get(token, `name`, `-`)}
                </td>
                <td className="border-t font-bold px-6 py-4">0.000</td>
                <td className="border-t">
                  <div
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setModalEditToken(token)}
                  >
                    <img className="w-4 h-auto" src="/icon/edit.svg" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

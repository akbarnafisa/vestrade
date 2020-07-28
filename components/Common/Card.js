import React from "react";
import Link from "next/link";
import { get } from "@/utils/index";

export default function Card({ item }) {
  const thumbnail = () => {
    const img = get(item.detail, `thumbnailListUrl`, [])[0];
    const placeholder = `https://keepitlocalcc.com/wp-content/uploads/2019/11/placeholder.png`;
    return img ? img : placeholder;
  };
  return (
    <div className="p-3 pb-8 cursor-pointer no-underline font-normal">
      <Link href={`/launchpad/${get(item, `addr`, ``)}`}>
        <a className="shadow-lg block bg-white rounded overflow-hidden font-normal no-underline">
          <div
            className="w-full h-48"
            style={{
              backgroundImage: `url(${thumbnail()})`,
              backgroundPosition: `center`,
              backgroundSize: `cover`,
              backgroundRepeat: `no-repeat`,
            }}
          />
          <div className="p-4">
            <div className="mb-3 flex">
              <div className="font-semibold mr-4">{get(item.detail, `name`, ``)} </div>
              <div className="text-grey-300">{get(item.detail, `symbol`, ``)}</div>
            </div>
            <div className="flex mb-4">
              <img src="icon/location.svg" />
              <div className="text-gray-900 text-sm ml-3">
                {get(item.detail, `address`, `-`)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-900 mb-1">Token Price</div>
              <div className="font-semibold">
                {1/item.rate} ETH
                {/* 2,733 BTC */}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

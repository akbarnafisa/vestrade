import React from "react";

export default function Hero({ heroImage }) {
  return (
    <div className="hero bg-purple-700 pb-32 flex">
      <div className="hero-wrapper mt-16 flex flex-wrap container mx-auto">
        <div className="hero__right w-full md:w-1/2">
          <div className="text-white font-bold text-6xl leading-tight">
            Vestrade.
            <br />
            Invest, Trade, Easily.
          </div>
          <div className="text-white max-w-sm mt-5">
            We are more than an exchange. Invest and Trade everywhere 24/7 with
            peer-to-peer settlement
          </div>
        </div>
        <div className="her__left w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img src={heroImage} />
        </div>
      </div>
    </div>
  );
}

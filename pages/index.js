import axios from "axios";

import PageLayout from "@/components/Layout/page-layout";
import Carousel from "@/components/Common/Carousel";
import Card from "@/components/Common/Card";
import Hero from "@/components/Common/Hero";

import Link from "next/link";

import Button from "@/components/Common/Button";

const Table = () => {
  const marktes = [
    {
      icon: `bitcoin`,
      name: `Bitcoin`,
      id: `BTC`,
      price: `Rp140,506,274.80`,
      change: {
        operator: `+`,
        amount: `2.97`,
      },
      markets: ``,
    },
    {
      icon: `ethereum`,
      name: `Ethereum`,
      id: `ETH`,
      price: `Rp3,710,448.10`,
      change: {
        operator: `-`,
        amount: `1.59`,
      },
      markets: ``,
    },
    {
      icon: `bitcoin-cash`,
      name: `Bitcoin Cash`,
      id: `BCH`,
      price: `Rp6,700,623.90`,
      change: {
        operator: `+`,
        amount: `3.69`,
      },
      markets: ``,
    },
    {
      icon: `sudirman-park`,
      name: `Sudirman Park`,
      id: `SDPK`,
      price: `Rp1,121,760.20`,
      change: {
        operator: `-`,
        amount: `4.78`,
      },
      markets: ``,
    },
    {
      icon: `bfc`,
      name: `BFC Fried Chicken`,
      id: `BFCF`,
      price: `Rp4,465.99`,
      change: {
        operator: `+`,
        amount: `5.60`,
      },
      markets: ``,
    },
  ];
  return (
    <div className="hero-table relative mx-auto pb-32">
      <div className="background absolute top-0 left-0 w-screen z-0 h-32 bg-purple-700"></div>
      <div className="table-wrapper container px-16 mx-auto relative z-10">
        <table className="table-fixed bg-white w-full shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-2/5 pl-16 px-4 py-4 text-left">Name</th>
              <th className="w-1/5 px-4 py-4 text-left">Last Price</th>
              <th className="w-1/5 px-4 py-4 text-left">24th Change</th>
              <th className="w-1/5 pr-16 px-4 py-4 text-left">Markets</th>
            </tr>
          </thead>
          <tbody>
            {marktes.map((market, index) => {
              const icon = `/images/landing/${market.icon}.png `;
              let changeClassName = `border-t px-4 py-4`;
              if (market.change.operator === `+`) {
                changeClassName += ` text-green-400`;
              } else {
                changeClassName += ` text-red-400`;
              }
              return (
                <tr key={market.id}>
                  <td className="border-t pl-16 px-4 py-4 flex items-center">
                    <img alt="" src={icon} />
                    <div className="pl-6 font-semibold">{market.name}</div>
                    <div className="pl-4 font-light">{market.id}</div>
                  </td>
                  <td className="border-t px-4 py-4">{market.price}</td>
                  <td className={changeClassName}>
                    {market.change.operator}
                    {market.change.amount}%
                  </td>
                  <td className="border-t px-4 py-4"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HowTo = () => {
  const carouselSlidesData = [
    {
      img: `images/landing/slider-1.png`,
      title: `Trade or Hold`,
      desc: `You can trade your asset or hold them for dividend income. Our fee is very competitive (0.2 percent).`,
    },
    {
      img: `images/landing/slider-1.png`,
      title: `Earn Dividen`,
      desc: `You can trade your asset or hold them for dividend income. Our fee is very competitive (0.2 percent).`,
    },
    {
      img: `images/landing/slider-1.png`,
      title: `Invest`,
      desc: `You can trade your asset or hold them for dividend income. Our fee is very competitive (0.2 percent).`,
    },
  ];
  return (
    <div className="how-to bg-purple-600 flex">
      <div className="how-to-wrapper py-32 flex container mx-auto">
        <div className="how-to__left w-1/3">
          <div className="text-white mt-12 font-bold text-5xl ma">
            How Vestrade
            <br />
            works ?
          </div>
          <Link href="/">
            <a>
              <button className="text-white border-white border py-3 mt-20 px-6">
                Try Vestrade Now
              </button>
            </a>
          </Link>
        </div>
        <div className="how-to-right w-2/3">
          <Carousel slides={carouselSlidesData} />
        </div>
      </div>
    </div>
  );
};

const Solution = () => {
  const items = [
    {
      icon: `images/landing/solution-1.svg`,
      title: `Trading Platform`,
      desc: `Buy or sell digital securities crossborderly. Our platform is always open 24/7. We list startup, SMEs, Franchise, and post-IPO stocks around the world`,
    },
    {
      icon: `images/landing/solution-2.svg`,
      title: `Equity Crowdfunding`,
      desc: `Be the underwriter in Vestrade. Tokenized stocks will be listed in our exchange with higher price to ensure your maximum return.`,
    },
    {
      icon: `images/landing/solution-2.svg`,
      title: `Secure and Low Fee`,
      desc: `We care your asset’s security very serious. So we won’t hold your asset, you manage your own asset. Our transaction is settled wallet to wallet with lower fee and no minimum order.`,
    },
  ];
  return (
    <div className="solution container mx-auto bg-white py-12 px-16 shadow-lg">
      <div className="font-bold text-3xl mb-12">
        Why Vestrade is your best
        <br />
        solution
      </div>
      <div className="flex justify-between">
        {items.map((item, index) => {
          return (
            <div className="w-1/3" key={index}>
              <img className="w-16 h-16" src={item.icon} />
              <div className="font-semibold mt-8 mb-2">{item.title}</div>
              <div className="mr-12">{item.desc}</div>
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          .solution {
            position: relative;
            top: 72px;
            z-index: 2;
          }
        `}
      </style>
    </div>
  );
};

const Launchpad = ({ tokens }) => {
  return (
    <div className="launchpad pt-32 container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-3xl">Vestrade Launchpad</div>
        <div className="w-5/12 text-center mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci aliquet
          sed nunc enim lectus pharetra.
        </div>
      </div>
      <div className="flex flex-wrap mt-12">
        {tokens.map((token, index) => (
          <div className="w-1/3" key={index + `card`}>
            <Card item={token} />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Link href="/launchpad">
          <a>
            <Button className="mt-20" type="btn-ghost">
              All Properties
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

const Map = () => {
  return (
    <div className="map-wrapper bg-purple-600 w-screen relative overflow-hidden">
      <img alt="" className="absolute  w-2/3" src="images/landing/map.png" />
      <div className="container w-full h-full flex flex-row-reverse  items-center mx-auto">
        <div className="text-white text-4xl w-1/2 text-right flex flex-col items-end font-semibold">
          Our mission is to make investment affordable for everyone. We grow
          together with every Vestrade stakeholders.
          <div className="h-1 w-16 bg-white mt-6 mb-8" />
          <div className=" mb-4 text-sm">Available soon on</div>
          <img
            alt=""
            className="map__download-cta"
            src="images/landing/download.png"
          />
        </div>
      </div>
      <style jsx>
        {`
          .map-wrapper {
            height: 75vh;
            min-height: 670px;
          }
          .map__download-cta {
            width: 255px;
          }
        `}
      </style>
    </div>
  );
};

// Data for carousel

export async function getStaticProps() {
  const res = await axios.get(`http://api.vestrade.io/tokens`);
  const tokens = await res.data.data;
  return {
    props: {
      tokens,
    },
  };
}

export default function Home({ tokens = [] }) {
  return (
    <PageLayout>
      <div className="bg-gray-300">
        <Hero heroImage="images/landing/hero.svg" />
        <Table />
        <HowTo />
        <Launchpad tokens={tokens.slice(0, 3)} />
        <Solution />
        <Map />
      </div>
    </PageLayout>
  );
}

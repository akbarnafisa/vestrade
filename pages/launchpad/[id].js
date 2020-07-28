import React, { createContext, useContext, useEffect } from "react";
import PageLayout from "@/components/Layout/page-layout";
import Carousel from "@/components/Common/Carousel";
import Link from "next/link";
import { get, prettyBalance } from "@/utils/index";
import axios from "axios";
import JSBI from 'jsbi'

import Button from "@/components/Common/Button";
import { useEth } from "@/components/Layout/page-layout";
import VestradeERC20 from "@/contracts/Vestrade_ERC20.json";
import VestradeOffering from "@/contracts/Vestrade_Offering.json";

const StockDetail = ({ token }) => {
  return (
    <div className="bg-white border border-gray-400 w-2/5 rounded overflow-hidden">
      <div className="bg-purple-700 text-white text-center text-sm font-semibold py-3">
        Stock Detail
      </div>
      <div className="flex flex-wrap py-4 px-8">
        <div className="mr-24">
          <div className="text-gray-700 mb-2">Harga Saham</div>
          <div className="font-semibold">{1 / get(token, `rate`, `-`)} ETH</div>
        </div>

        <div>
          <div className="text-gray-700 mb-2">Total Saham</div>
          <div className="font-semibold">{prettyBalance(get(token, `supply`, `-`), 18, 8, true)} Lembar</div>
        </div>

        <div className="mr-24">
          <div className="text-gray-700 mb-2 mt-8">Min. Pembelian</div>
          <div className="font-semibold">0 Lembar</div>
        </div>

        <div>
          <div className="text-gray-700 mb-2 mt-8">Total Saham (Rp)</div>
          <div className="font-semibold">600.000.000</div>
        </div>
      </div>
    </div>
  );
};

const StockMarketStatus = () => {
  return (
    <div className="w-3/5 ">
      <div className="ml-8 bg-white border border-gray-400 rounded overflow-hidden ">
        <div className="bg-purple-700 text-white text-center text-sm font-semibold py-3">
          Stock Market Status
        </div>
        <div className="py-4 px-8">
          <div className="flex">
            <div className="mr-24">
              <div className="text-gray-700 mb-2">Saham Tersisa</div>
              <div className="font-semibold">100%</div>
            </div>

            <div className="mr-24">
              <div className="text-gray-700 mb-2">Dalam Lembar</div>
              <div className="font-semibold">6.000.000 Lembar</div>
            </div>

            <div className="mr-24">
              <div className="text-gray-700 mb-2">Dalam Rupiah</div>
              <div className="font-semibold">6.000.000</div>
            </div>
          </div>

          <div className=" border-t my-8 border-gray-400 w-full"></div>

          <div className="flex">
            <div className="mr-24">
              <div className="text-gray-700 mb-2">Saham Terjual</div>
              <div className="font-semibold">0%</div>
            </div>

            <div className="mr-24">
              <div className="text-gray-700 mb-2">Dalam Lembar</div>
              <div className="font-semibold">600.000 Lembar</div>
            </div>

            <div className="mr-24">
              <div className="text-gray-700 mb-2">Dalam Rupiah</div>
              <div className="font-semibold">600.000.000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetail = ({ token = {} }) => {
  const { web3, accounts, setAccounts } = useEth()

  const unlockWallet = async () => {
    const accounts = await web3.eth.requestAccounts();
    setAccounts(accounts);
  }

  const buy = async () => {
    console.log(token)

    const amount = 100
    const valueInETH = amount / token.rate

    const offeringContract = new web3.eth.Contract(
      VestradeOffering.abi,
      token.addr
    )
    const tokenContract = new web3.eth.Contract(
      VestradeERC20.abi,
      token.tokenAddr
    )
    const decimals = await tokenContract.methods.decimals().call()
    const amountPrecision = JSBI.BigInt(amount * 10 ** decimals)
    const value = web3.utils.toWei(valueInETH.toString(), 'ether')

    offeringContract.methods.buy(amountPrecision.toString()).send({
      from: accounts[0],
      value: value
    })
      .once('error', (error) => {
        console.log(error)
      })
      .once('transactionHash', (transactionHash) => {
        console.log(`tx hash ${transactionHash}`)
      })
      .once('confirmation', (confirmationNumber, receipt) => {
        console.log(`tx confirmed, check your wallet`)
      })
  }

  return (
    <div className="product border rounded mb-4 border-gray-400 flex items-center bg-white">
      <div className="w-2/5 bg-grey-900 h-full">
        <Carousel
          className="product__carousel"
          slides={get(token.detail, `thumbnailListUrl`, [])}
          type="product"
        />
      </div>
      <div className="product__detail w-3/5 bg-white pt-8 pb-9 px-12">
        <div className="flex items-center mb-3">
          <div className="text-bold  text-3xl font-bold">
            {get(token.detail, `name`, `-`)}
          </div>
          <div className="ml-6 text-gray-700 font-medium text-xl">
            {get(token.detail, `symbol`, `-`)}
          </div>
        </div>
        {/* <div className="text-gray-600 mb-4">
          PT BFC Ayam Indonesia
        </div> */}
        <div className="flex items-center">
          <img alt="" className="w-6 h-auto" src="/icon/location.svg" />
          <div className="ml-2">{get(token.detail, `address`, `-`)}</div>
        </div>
        <div className=" border-t my-8 border-gray-400 w-full"></div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className=" w-12 h-12 rounded-full overflow-hidden  mr-4">
              <img
                alt=""
                className="w-12 h-12"
                src={get(token.detail, `businessOwner.avatarUrl`, ``)}
              />
            </div>
            <div>
              <div className=" text-sm text-gray-900">Bussiness Owner</div>
              <div className="font-semibold">
                {get(token.detail, `businessOwner.name`, ``)}
              </div>
            </div>
          </div>
          <div>
            <Button
              disabled={!get(token, `prospectusUrl`, ``)}
              onClick={() =>
                window.open(
                  `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`,
                  `_blank`
                )
              }
              type="btn-primary"
            >
              Download Perspektus
            </Button>
            {
              (accounts && accounts[0]) ? (
                <Button onClick={buy} className="mr-4" type="btn-ghost">
                  Beli
                </Button>
              ) : (
                  <Button onClick={unlockWallet} onClick={buy} className="mr-4" type="btn-ghost">
                    Connect Wallet
                  </Button>
                )
            }
          </div>
        </div>
      </div>
      <style jsx>{`
        .product {
          height: 100vh;
          max-height: 350px;
        }
      `}</style>
    </div>
  );
};

const Breadcrumb = ({ symbol }) => {
  return (
    <div className="py-4 no-underline font-normal">
      <Link href="/launchpad">
        <a className="text-gray-700">See All</a>
      </Link>
      <span className="mx-2">/</span>
      <Link href={`/launchpad/${symbol}`}>
        <a className=" font-semibold text-purple-700">{symbol}</a>
      </Link>
    </div>
  );
};

// export async function getStaticPaths() {
//   const res = await axios.get(`http://api.vestrade.io/tokens`);
//   const tokens = await res.data.data;
//   return {
//     paths: tokens?.map((token) => `/launchpad/${token.symbol}`) || [],
//     fallback: true,
//   };
// }

export async function getServerSideProps({ params, preview = null }) {
  const res = await axios.get(
    `http://api.vestrade.io/launchpads?addr=${params.id}`
  );
  const token = await res.data.data[0];
  return {
    props: {
      token,
    },
  };
}

const Page = ({ token }) => {
  const { web3, setAccounts } = useEth()

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts()
      setAccounts(accounts)
    }
    if (web3) {
      getAccounts()
    }
  }, [web3])

  return (
    <div className="bg-gray-300 pb-8">
      <div className="container mx-auto ">
        <Breadcrumb symbol={get(token, `symbol`, ``)} />
        <ProductDetail token={token} />
        <div className="flex">
          <StockDetail token={token} />
          <StockMarketStatus />
        </div>
      </div>
    </div>
  )
}

export default function Home({ token }) {
  return (
    <PageLayout>
      <Page token={token} />
    </PageLayout>
  );
}

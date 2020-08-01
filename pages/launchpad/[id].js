import React, { createContext, useContext, useEffect, useState } from "react";

import PageLayout from "@/components/Layout/page-layout";
import Carousel from "@/components/Common/Carousel";
import Input from "@/components/Common/Input";
import { ToastContainer } from "react-toastify";
import { toast } from "@/utils/index";

import Link from "next/link";
import {
  get,
  prettyBalance,
  lockScroll
} from "@/utils/index";
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
      </div>
    </div>
  );
};

const StockMarketStatus = ({ offeringContract, token }) => {
  const [balance, setBalance] = useState(null)
  const [supply, setSupply] = useState(null)
  const [rate, setRate] = useState(null)
  const [availableToken, setAvailableToken] = useState(0)

  useEffect(() => {
    const init = async () => {
      const newBalance = await offeringContract.methods.balance().call()
      const newSupply = await offeringContract.methods.supply().call()
      const newRate = 1 / get(token, `rate`, `-`)
      setBalance(newBalance)
      setSupply(newSupply)
      setRate(newRate)
      setAvailableToken(JSBI.divide(JSBI.multiply(JSBI.BigInt(newBalance), JSBI.BigInt(100)), JSBI.BigInt(newSupply)).toString())
    }
    if (offeringContract) {
      init()
    }
  }, [offeringContract])

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
              {
                balance && supply && (
                  <div className="font-semibold">{availableToken}%</div>
                )
              }
            </div>

            <div className="mr-24">
              <div className="text-gray-700 mb-2">Dalam Lembar</div>
              {
                balance && (
                  <div className="font-semibold"> {prettyBalance(balance, 18, 8, true)} Lembar</div>
                )
              }
            </div>

            <div className="mr-24">
              <div className="text-gray-700 mb-2">Dalam ETH</div>
              {
                balance && rate && (
                  <div className="font-semibold">{prettyBalance(balance * rate, 18, 8, true)} ETH</div>
                )
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const ProductDetail = ({ token = {}, openBuyModal }) => {
  const { web3, accounts, setAccounts } = useEth()

  const unlockWallet = async () => {
    const accounts = await web3.eth.requestAccounts();
    setAccounts(accounts);
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
              disabled={!get(token, 'detail.prospectusUrl', ``)}
              onClick={() =>
                window.open(
                  get(token, 'detail.prospectusUrl', ``),
                  `_blank`
                )
              }
              type="btn-ghost"
              className="mr-4"
            >
              Download Perspektus
            </Button>
            {
              (accounts && accounts[0]) ? (
                <Button onClick={openBuyModal} className="mr-4" type="btn-primary">
                  Buy Stock
                </Button>
              ) : (
                  <Button onClick={unlockWallet} className="mr-4" type="btn-primary">
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

const Breadcrumb = ({ symbol, tokenAddr }) => {
  return (
    <div className="py-4 no-underline font-normal">
      <Link href="/launchpad">
        <a className="text-gray-700">See All</a>
      </Link>
      <span className="mx-2">/</span>
      <Link href={`/launchpad/${tokenAddr}`}>
        <a className=" font-semibold text-purple-700">{symbol}</a>
      </Link>
    </div>
  );
};


const BuyModal = ({ closeBuyModal, token }) => {
  const { web3, accounts } = useEth()

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const _closeBuyModal = () => {
    !loading ? closeBuyModal() : null;
  };

  const _setAmount = (val) => {
    if (val === '') {
      setAmount('')
    }
    if (/^[0-9\b]+$/.test(val)) {
      setAmount(val)
    }
  }

  const valueInETH = (val) => {
    val ? 0 : val
    return val / token.rate
  }


  const buy = async () => {
    setLoading(true)
    const formatAmount = Number(amount)
    const valueInETH = formatAmount / token.rate

    const offeringContract = new web3.eth.Contract(
      VestradeOffering.abi,
      token.addr
    )
    const tokenContract = new web3.eth.Contract(
      VestradeERC20.abi,
      token.tokenAddr
    )
    const decimals = await tokenContract.methods.decimals().call()
    const amountPrecision = JSBI.BigInt(formatAmount * 10 ** decimals)
    const value = web3.utils.toWei(valueInETH.toString(), 'ether')

    offeringContract.methods.buy(amountPrecision.toString()).send({
      from: accounts[0],
      value: value
    })
      .once('error', (error) => {
        toast.error('Fail to create transction!');
        _closeBuyModal()
        console.log(error)
      })
      .once('transactionHash', (transactionHash) => {
        toast.success('Transaction hash created');
        _closeBuyModal()
        console.log(`tx hash ${transactionHash}`)
      })
      .once('confirmation', (confirmationNumber, receipt) => {
        toast.success('Transaction confirmed, check your wallet');
        _closeBuyModal()
        console.log(`tx confirmed, check your wallet`)
      })
    setTimeout(() => _closeBuyModal(), 5000)
  }

  return (
    <div className="modal-dashboard">
      <div
        className="modal-dashboard__overlay"
        onClick={() => _closeBuyModal()}
      ></div>
      <div className="modal-dashboard__content">
        <div className="modal-dashboard__content__title">Buy Stock</div>
        <Input
          label="Amount"
          placeholder="Amount"
          value={amount}
          disabled={loading}
          onChange={(val) => _setAmount(val)}
        />
        <div className="flex items-center justify-between px-2 font-semibold">
          <div>
            Value in ETH
          </div>
          <div className="text-2xl font-semibold text-orange-500">
            {
              valueInETH(amount)
            }
          </div>
        </div>

        <div className="flex mt-8">
          <Button
            className="w-full"
            onClick={() => _closeBuyModal()}
            type="btn-ghost"
          >
            Cancel
          </Button>
          <Button
            className="ml-2 w-full"
            disabled={loading || !Number(amount) > 0}
            loading={loading}
            onClick={() => buy()}
            type="btn-primary"
          >
            Buy Stock
          </Button>
        </div>
      </div>
    </div>
  );
}

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
  const [buyModal, setBuyModal] = useState(false)
  const [offeringContract, setOfferingContract] = useState(null)
  const [tokenContract, setTokenContract] = useState(null)

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts()
      const newOfferingContract = new web3.eth.Contract(
        VestradeOffering.abi,
        token.addr
      )
      const newTokenContract = new web3.eth.Contract(
        VestradeERC20.abi,
        token.tokenAddr
      )
      setAccounts(accounts)
      setOfferingContract(newOfferingContract)
      setTokenContract(newTokenContract)
    }
    if (web3) {
      getAccounts()
    }
  }, [web3])

  return (
    <div className="bg-gray-300 pb-8">
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
      <div className="container mx-auto ">
        {buyModal ? (
          <BuyModal
            token={token}
            closeBuyModal={() => {
              setBuyModal(false);
              lockScroll(false);
            }}
            setInitTokens={(val) => setInitTokens(initTokens.concat(val))}
          />
        ) : null}
        <Breadcrumb
          symbol={get(token, 'detail.symbol', '')}
          tokenAddr={get(token, 'detail.tokenAddr', '')}
        />
        <ProductDetail
          openBuyModal={() => { setBuyModal(true) }}
          token={token}
        />
        <div className="flex">
          <StockDetail token={token} />
          <StockMarketStatus offeringContract={offeringContract} token={token} />
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

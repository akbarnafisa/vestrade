import PageLayout from "@/components/Layout/page-layout";
import { useEth } from "@/components/Layout/page-layout";
import { useEffect, useState } from "react";
import axios from 'axios';
import JSBI from "jsbi";
import { prettyBalance, prettyAddress } from "@/utils/index";

export async function getServerSideProps () {
  const res = await axios.get(`http://api.vestrade.io/tokens`);
  const tokens = await res.data.data;
  return {
    props: {
      tokens,
    },
  };
}

const Table = ({ accounts, ownedTokens, totalBalance }) => {
  return (
    <div className="container mx-auto max-w-4xl mt-4">
      <div className="flex">
        <div className="bg-white flex flex-col justify-center mx-4 p-6 rounded w-1/2 shadow-md">
          <div className="font-semibold text-gray-700">
            Account
          </div>
          <div className="font-semibold text-xl">
            {
              prettyAddress(accounts[0])
            }
          </div>
        </div>
        <div className="bg-white flex flex-col justify-center mx-4 p-6 rounded w-1/2 shadow-md">
          <div className="font-semibold text-gray-700">
            Total
          </div>
          <div className="font-semibold text-3xl">
            {prettyBalance(totalBalance, 18, 4)} ETH
          </div>
        </div>
      </div>
      <div className="dasboard-table relative mx-auto my-8">
        <table className="table-fixed bg-white w-full shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-4/12 px-6 py-4 text-left">Token Symbol</th>
              <th className="w-4/12 px-6 py-4 text-left">Balance</th>
              <th className="w-4/12 px-6 py-4 text-left">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {
              ownedTokens.map((token, index) => {
                return (
                  <tr
                    onClick={() => router.push(`/dashboard/offering?tokenAddr=${token.tokenAddr}`)}
                    className="hover:bg-gray-200 cursor-pointer" key={index}
                  >
                    <td className="border-t px-6 py-4">
                      {token.symbol}
                    </td>
                    <td className="border-t px-6 py-4">
                      {prettyBalance(token.balance, 18, 8, true)}
                    </td>
                    <td className="border-t font-bold px-6 py-4">
                      {token.balancePercentage}%
                  </td>
                  </tr>
                  // <div>
                  //   {token.symbol} {prettyBalance(token.balance, 18, 8, true)} {token.balancePercentage}%
                  // </div>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>

  )
}

const Client = ({ tokens }) => {
  const { web3, accounts, setAccounts, getContract } = useEth()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [totalBalance, setTotalBalance] = useState(0)
  const [ownedTokens, setOwnedTokens] = useState([])
  const [txList, setTxList] = useState([])

  useEffect(() => {
    const init = async () => {
      let curTotalBalance = 0
      const getTokenBalance = tokens.map(token => {
        return new Promise(async (resolve, reject) => {
          const tokenContract = getContract('VestradeERC20', token.tokenAddr)
          const balance = await tokenContract.methods.balanceOf(accounts[0]).call()
          if (JSBI.greaterThan(JSBI.BigInt(balance), JSBI.BigInt(0))) {
            const response = await axios.get(`http://api.vestrade.io/offerings?tokenAddr=${token.tokenAddr}&isActive=true`);
            const latestOffering = response.data.data[response.data.data.length - 1]
            const balanceInETH = balance * (1 / latestOffering.rate)
            token.balance = balance
            token.balanceInETH = balanceInETH
            curTotalBalance += balanceInETH
            resolve(token)
          }
          resolve(null)
        })
      })
      const userTokens = await Promise.all(getTokenBalance)
      const userOwnedTokens = userTokens.filter(token => {
        return token
      }).map(token => {
        // console.log(token.balanceInETH, curTotalBalance)
        token.balancePercentage = Math.round((token.balanceInETH * 100) / curTotalBalance)
        return token
      })

      const newTxList = await axios.get(`http://api.vestrade.io/transactions?fromAddr=${accounts[0].toLowerCase()}`);

      // console.log(userOwnedTokens)
      setTotalBalance(curTotalBalance)
      setOwnedTokens(userOwnedTokens)
      setTxList(newTxList.data.data)
    }

    if (web3 && accounts && accounts[0]) {
      init()
    }
  }, [web3, accounts])

  const requestAccount = async () => {
    try {
      const accounts = await web3.eth.getAccounts()
      setAccounts(accounts)
      setIsLoggedIn(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (web3 && !accounts) {
      requestAccount()
    }
  }, [web3])

  return (
    <div>
      {
        isLoggedIn ?
          <Table
            accounts={accounts}
            totalBalance={totalBalance}
            ownedTokens={ownedTokens}
          /> :
          <button onClick={requestAccount}>Login with ETH</button>
      }
    </div >
  )
}

export default function ClientPage ({ tokens }) {
  return (
    <PageLayout>
      <Client tokens={tokens} />
    </PageLayout>
  )
}
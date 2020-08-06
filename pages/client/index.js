import PageLayout from "@/components/Layout/page-layout"
import { useEth } from "@/components/Layout/main"
import { useEffect, useState } from "react"
import axios from 'axios'
import JSBI from "jsbi"
import { prettyBalance, prettyAddress, formatDate, get, } from "@/utils/index"


export async function getServerSideProps() {
  const res = await axios.get(`https://api.vestrade.io/tokens`)
  const tokens = await res.data.data
  return {
    props: {
      tokens,
    },
  }
}

const TokenTable = ({ accounts, ownedTokens, totalBalance }) => {
  return (
    <div className="container mx-auto max-w-4xl mt-4">
      <div className="flex justify-center">
        <div className="bg-white w-56 h-56 rounded-full overflow-hidden flex flex-col justify-center p-6 shadow-md text-center">
          <div className="font-semibold text-gray-700">
            Portfolio Total
          </div>
          <div className="font-semibold text-3xl flex items-center justify-center">
            <span>{prettyBalance(totalBalance, 18, 4)}</span>
            <div className="pl-2">
              <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.88916 11.1394L4.99834 11.2483L9.99685 8.29374L4.99834 0L4.88916 0.371093V11.1394Z" fill="#343434" />
                <path d="M4.99851 11.2484V0L0 8.29374L4.99851 11.2484Z" fill="#8C8C8C" />
                <path d="M4.93701 16.1057L4.99853 16.2854L10.0001 9.2417L4.99857 12.1948L4.93705 12.2698L4.93701 16.1057Z" fill="#3C3C3B" />
                <path d="M0 9.2417L4.99851 16.2854V12.1948L0 9.2417Z" fill="#8C8C8C" />
                <path d="M4.99854 6.02173V11.2482L9.99697 8.29368L4.99854 6.02173Z" fill="#141414" />
                <path d="M4.99843 6.02173L0 8.29364L4.99843 11.2482V6.02173Z" fill="#393939" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="dasboard-table relative mx-auto mt-12 mb-8">
        <div className=" text-3xl font-semibold mb-4">
          Token Holdings
        </div>
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
                  <tr className="hover:bg-gray-200 cursor-pointer" key={index}>
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

const TransactionTable = ({ transactions }) => {
  return (
    <div className="container mx-auto max-w-4xl mt-12 mb-8">
      <div className=" text-3xl font-semibold mb-4">
        Transactions
      </div>
      <div className="relative overflow-hidden">
        <div className="dasboard-table  relative mx-auto">
          <table className="bg-white w-full shadow rounded overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-3/12 min px-6 py-4 text-left">Tranx ID</th>
                <th className="w-3/12 px-6 py-4 text-left">Tokens</th>
                <th className="w-3/12 px-6 py-4 text-left">Amount</th>
                <th className="w-3/12 px-6 py-4 text-left">ETH Amount</th>

                <th className="w-3/12 px-6 py-4 text-left">From</th>
                <th className="w-3/12 px-6 py-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => {
                return (
                  <tr
                    className={idx % 2 !== 0 ? `bg-gray-200` : ``}
                    key={idx}
                  >
                    <td className="border-t px-6 py-4">
                      {prettyAddress(get(tx, `txId`, `-`))}
                    </td>
                    <td className="border-t px-6 py-4">
                      {prettyAddress(get(tx, `tokenAddr`, `-`))}
                    </td>
                    <td className="border-t px-6 py-4">
                      {prettyBalance(tx.tokens, 18, 6)}
                    </td>
                    <td className="border-t px-6 py-4">
                      {prettyBalance(tx.amount, 18, 6)}
                    </td>
                    <td className="border-t px-6 py-4">
                      {prettyAddress(get(tx, `fromAddr`, `-`))}
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatDate(
                        Number(get(tx, `timestamp`, 0)) * 1000,
                        `DD MMM YYYY`
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="inset-shaddow"></div>
        <style jsx>
          {`
          .inset-shaddow {
            width: 5px;
            height: calc(100% + 20px);
            top: 0;
            right: 0;
            position: absolute;
            background: #e2e8f0;
            -moz-box-shadow: 13px 13px 0px 0px #ffffff;
            -webkit-box-shadow: 13px 13px 0px 0px #ffffff;
            box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.5);
          }
          thead tr th {
            min-width: 225px;
          }

          .dasboard-table {
            overflow-y: auto;
          }

          .dasboard-table::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 8px;
            height: 8px;
          }

          .dasboard-table::-webkit-scrollbar-thumb {
            border-radius: 8px;
            border: 1px solid white; /* should match background, can't be transparent */
            background-color: rgba(0, 0, 0, 0.5);
          }
        `}
        </style>
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
          const tokenContract = await getContract('VestradeERC20', token.tokenAddr)
          const balance = await tokenContract.methods.balanceOf(accounts[0]).call()
          if (JSBI.greaterThan(JSBI.BigInt(balance), JSBI.BigInt(0))) {
            const response = await axios.get(`https://api.vestrade.io/offerings?tokenAddr=${token.tokenAddr}&isActive=true`)
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

      const newTxList = await axios.get(`https://api.vestrade.io/transactions?fromAddr=${accounts[0].toLowerCase()}`)

      console.log(userOwnedTokens)
      setTotalBalance(curTotalBalance)
      setOwnedTokens(userOwnedTokens)
      setTxList(newTxList.data.data)
      setIsLoggedIn(true)
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

  console.log(ownedTokens, txList)

  useEffect(() => {
    if (web3 && !accounts) {
      requestAccount()
    }
  }, [web3])

  const Content = () => {
    return (
      <>
        <TokenTable
          accounts={accounts}
          totalBalance={totalBalance}
          ownedTokens={ownedTokens}
        />
        <TransactionTable transactions={txList} />
      </>
    )
  }

  return (
    <div>
      {
        isLoggedIn ?
          Content()
          :
          <button onClick={requestAccount}>Login with ETH</button>
      }
    </div >
  )
}

export default function ClientPage({ tokens }) {
  return (
    <PageLayout>
      <Client tokens={tokens} />
    </PageLayout>
  )
}
import PageLayout from "@/components/Layout/page-layout";
import { useEth } from "@/components/Layout/page-layout";
import { useEffect, useState } from "react";
import axios from 'axios';
import JSBI from "jsbi";
import { prettyBalance } from "@/utils/index";

export async function getServerSideProps() {
  const res = await axios.get(`http://api.vestrade.io/tokens`);
  const tokens = await res.data.data;
  return {
    props: {
      tokens,
    },
  };
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
            const latestOffering = response.data.data[response.data.data.length -1 ]
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
        console.log(token.balanceInETH, curTotalBalance)
        token.balancePercentage = Math.round((token.balanceInETH * 100) / curTotalBalance)
        return token
      })

      const newTxList = await axios.get(`http://api.vestrade.io/transactions?fromAddr=${accounts[0].toLowerCase()}`);
      
      console.log(userOwnedTokens)
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
        isLoggedIn ? (
          <div>
            Hello {accounts[0]}
            <div>
              Total { prettyBalance(totalBalance, 18, 4) } ETH
            </div>
            <div>
              {
                ownedTokens.map(token => {
                  return (
                    <div>
                      { token.symbol } { prettyBalance(token.balance, 18, 8, true) } { token.balancePercentage }%
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : (
          <button onClick={requestAccount}>Login with ETH</button>
        )
      }
    </div>
  )
}

export default function ClientPage({ tokens }) {
  return (
    <PageLayout>
      <Client tokens={tokens} />
    </PageLayout>
  )
}
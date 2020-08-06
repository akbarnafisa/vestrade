import React, { useEffect } from "react"
import Link from "next/link"
import Button from "@/components/Common/Button"
import { useEth } from '../Layout/main'
import { prettyAddress } from '@/utils/index'

export default function Nav() {
  const { accounts } = useEth()

  return (
    <nav className="nav-wrapper bg-purple-700 sticky top-0 z-20">
      <div className="nav container py-6 flex justify-between mx-auto">
        <div className="nav__left flex items-center">
          <Link href="/">
            <a className="text-white text-xl md:text-2xl no-underline">
              VESTRADE
            </a>
          </Link>
        </div>
        <div className="nav__right flex">
          {
            accounts && accounts[0] ? (
              <div className="text-white">
                <Link href="/client">
                  <a>
                    {prettyAddress(accounts[0])}
                  </a>
                </Link>
              </div>
            ) : (
                <Button onClick={async () => {
                  try {
                    const accounts = await web3.eth.requestAccounts()
                    setAccounts(accounts)
                  } catch (err) {
                    alert('Install Metamask to continue')
                  }
                }} type="btn-secondary">Connect Metamask</Button>
              )
          }
        </div>
      </div>
    </nav>
  )
}

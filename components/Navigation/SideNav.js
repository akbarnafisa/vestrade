import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideNav() {
  const router = useRouter();
  const defaultClass = `side-nav__links flex items-center py-3 pl-4 hover:bg-gray-200 `;
  const activeClass =
    `border-l-4 border-purple-700 bg-gray-200 ` + defaultClass;
  return (
    <div className="side-nav bg-white mr-4 border border-gray-400 rounded">
      <div className="px-12 py-10 bg-purple-700 font-bold text-white text-3xl">
        Dashboard
      </div>
      <div className="mt-4">
        <Link href="/dashboard">
          <a
            className={
              router.pathname == `/dashboard` ? activeClass : defaultClass
            }
          >
            <img className="w-6 h-6" src="/icon/token.svg" />
            <div className="ml-3">Token</div>
          </a>
        </Link>
        <Link href="/dashboard/offering">
          <a
            className={
              router.pathname == `/dashboard/offering`
                ? activeClass
                : defaultClass
            }
          >
            <img className="w-6 h-6" src="/icon/offering.svg" />
            <div className="ml-3">Offering</div>
          </a>
        </Link>
        <Link href="/dashboard/transaction">
          <a
            className={
              router.pathname == `/dashboard/transaction`
                ? activeClass
                : defaultClass
            }
          >
            <img className="w-6 h-6" src="/icon/transaction.svg" />
            <div className="ml-3">Transaction</div>
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          .side-nav {
            min-width: 270px;
            height: 474px;
          }
        `}
      </style>
    </div>
  );
}

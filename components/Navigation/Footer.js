import React from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <footer className="footer-wrapper bg-purple-700 pb-6">
      <div className="footer container flex flex-wrap justify-between mx-auto text-white">
        <div className="order-3 md:order-1 w-full md:w-3/5 pr-6 pt-6">
          <Link href="/">
            <button className="bg-transparent text-white border-2 border-solid border-white py-2 px-5">
              VESTRADE
            </button>
          </Link>
          <div className="text-white mt-8">p: +1 (888) 908-7930</div>
          <div className="text-white mt-2">e: support@vestrade.io</div>
          <div className="mt-2">
            Graha Joe, Kebagusan, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah
            Khusus Ibukota Jakarta 12520
          </div>
          <div className="mt-8">©2020 Vestrade</div>
        </div>
        <div className="order-1 md:order-2 col-2 w-full md:w-1/5 flex flex-col pr-6 pt-6">
          <div className="font-semibold mb-6">Link</div>
          <Link href="/">
            <a className="text-white mb-2 font-normal mr-8 no-underline">
              Home
            </a>
          </Link>
          <Link href="/">
            <a className="text-white mb-2 font-normal mr-8 no-underline">
              Markets
            </a>
          </Link>
          <Link href="/launchpad">
            <a className="text-white mb-2 font-normal mr-8 no-underline">
              Launchpad
            </a>
          </Link>
          <Link href="/">
            <a className="text-white mb-2 font-normal mr-8 no-underline">
              Account
            </a>
          </Link>
        </div>
        <div className="order-2 md:order-3 col-2 flex flex-col w-full md:w-1/5 pr-6 pt-6">
          <div className="font-semibold mb-6">Social</div>
          <Link href="/">
            <a className="text-white mb-2 font-normal mr-8 no-underline">
              Blog
            </a>
          </Link>
          <Link href="/">
            <a className="text-white mb-2 font-normal mr-8 no-underline">
              Facebook
            </a>
          </Link>
          <Link href="/">
            <a className="text-white mb-2 font-normal mr-8 no-underline">
              Linkedin
            </a>
          </Link>
          <Link href="/">
            <a className="text-white mb-2 font-normal mr-8 no-underline">
              Twitter
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}

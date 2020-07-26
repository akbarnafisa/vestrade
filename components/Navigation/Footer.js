import React from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <footer className="footer-wrapper bg-purple-700 py-20">
      <div className="footer container py-6 flex justify-between mx-auto text-white">
        <div className="col-1 w-2/5">
          <Link href="/">
            <button className="bg-transparent text-white border-2 border-solid border-white py-2 px-5">
              VESTRADE
            </button>
          </Link>
          <div className="mt-8">
            Graha Joe, Kebagusan, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah
            Khusus Ibukota Jakarta 12520
          </div>
          <div className="mt-8">©2020 Vestrade</div>
        </div>
        <div className="col-2 flex flex-col">
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
        <div className="col-3 flex flex-col">
          <div className="font-semibold mb-6">Contact Us</div>
          <div className="text-white mb-2 mr-8 ">p: +1 (888) 908-7930</div>
          <div className="text-white mb-2 mr-8 ">e: support@vestrade.io</div>
        </div>
        <div className="col-2 flex flex-col">
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

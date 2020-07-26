import React from "react";
import Link from "next/link";
import Button from "@/components/Common/Button";

export default function Nav() {
  return (
    <nav className="nav-wrapper bg-purple-700">
      <div className="nav container py-6 flex justify-between mx-auto">
        <div className="nav__left flex items-center">
          <Link href="/">
            <a className="text-white text-xl md:text-2xl no-underline">
              VESTRADE
            </a>
          </Link>

          <Link href="/">
            <a className="text-white font-normal ml-16 no-underline">Markets</a>
          </Link>
          <Link href="/">
            <a className="text-white font-normal ml-8 no-underline">Exchange</a>
          </Link>
          <Link href="/launchpad">
            <a className="text-white font-normal ml-8 no-underline">
              Launchpad
            </a>
          </Link>
        </div>
        <div className="nav__right">
          <Link href="/launchpad">
            <a className="text-white font-normal mr-8 no-underline">
              Launchpad
            </a>
          </Link>
          <Link href="/">
            <a>
              <Button type="btn-secondary">Register</Button>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

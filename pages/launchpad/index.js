import PageLayout from "@/components/Layout/page-layout";
import Card from "@/components/Common/Card";
import Hero from "@/components/Common/Hero";
import axios from "axios";

import Link from "next/link";

const LaunchpadSlides = () => {
  return (
    <div className=" relative mx-auto pb-24">
      <div className="background absolute top-0 left-0 w-screen z-0 h-32 bg-purple-700"></div>
      <div className="table-wrapper container px-16 mx-auto relative z-10">
        <div
          className="p-16 px-24 "
          style={{
            backgroundImage: `url(images/landing/launchpad-slide.png)`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
          }}
        >
          <div className="w-2/3 text-6xl font-semibold mb-12">
            Get ready to join Vestrade Launchpad.
          </div>
          <Link href="/">
            <a className="text-3xl font-normal ">Verify your account now!</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Cards = ({ items = [] }) => {
  return (
    <div className="launchpad container mx-auto pb-32">
      <div className="flex justify-between px-8">
        <div className="flex items-center ">
          <div className="font-semibold mr-4">Latest Property</div>
          <img src="icon/down.svg" />
        </div>
        <div className="left-inner-addon input-container">
          <img src="icon/search.svg" />
          <input
            className="form-control py-3"
            placeholder="Search Property"
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-wrap mt-12">
        {items.map((item, index) => (
          <div className="w-1/3" key={index + `card`}>
            <Card item={item} />
          </div>
        ))}
      </div>
      <style jsx>
        {``}
        {`
          ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #333333;
            opacity: 1; /* Firefox */
          }

          :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #333333;
          }

          ::-ms-input-placeholder {
            /* Microsoft Edge */
            color: #333333;
          }

          .left-inner-addon {
            position: relative;
          }
          .left-inner-addon input {
            padding-left: 48px !important;
            padding-right: 16px !important;
            background: transparent;
            border: 1px solid #333333;
            box-sizing: border-box;
            border-radius: 4px;
          }
          .left-inner-addon img {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 16px;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

// Data for carousel

export async function getStaticProps () {
  const res = await axios.get(`http://api.vestrade.io/tokens`);
  const tokens = await res.data.data;
  return {
    props: {
      tokens,
    },
  };
}

export default function Home ({ tokens }) {
  return (
    <PageLayout>
      <div className="bg-gray-300">
        <Hero heroImage="images/landing/hero-2.svg" />
        <LaunchpadSlides />
        <Cards items={tokens} />
      </div>
    </PageLayout>
  );
}

import { format, parseISO } from "date-fns";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";

import Container from "./container";
import HeroSection from "./hero-section";
import Layout from "./layout";

function Post(props) {
  return (
    <Layout>
      <Head>
        {/* HTML Meta Tags */}
        <title key="html-meta-title">{`Taylor Bryant - ${props.meta.title}`}</title>
        <meta
          content={props.meta.summary}
          key="html-meta-description"
          name="description"
        />
        {/* Google / Search Engine Tags */}
        <meta content={props.meta.title} itemProp="name" key="google-name" />
        <meta
          content={props.meta.summary}
          itemProp="description"
          key="google-description"
        />
        <meta
          content="/images/favicon/android-chrome-256x256.png"
          itemProp="image"
          key="google-image"
        />
        {/* Facebook Meta Tags */}
        <meta
          content={`https://bryant.io/blog${props.meta.url}`}
          key="facebook-url"
          property="og:url"
        />
        <meta content="website" key="facebook-type" property="og:type" />
        <meta
          content={props.meta.title}
          key="facebook-title"
          property="og:title"
        />
        <meta
          content={props.meta.summary}
          key="facebook-description"
          property="og:description"
        />
        <meta
          content="/images/favicon/android-chrome-256x256.png"
          key="facebook-image"
          property="og:image"
        />
        {/* Twitter Meta Tags */}
        <meta
          content="summary_large_image"
          key="twitter-card"
          name="twitter:card"
        />
        <meta
          content={props.meta.title}
          key="twitter-title"
          name="twitter:title"
        />
        <meta
          content={props.meta.summary}
          key="twitter-description"
          name="twitter:description"
        />
        <meta
          content="/images/favicon/android-chrome-256x256.png"
          key="twitter-iamge"
          name="twitter:image"
        />
      </Head>

      <HeroSection>
        <p className="mb-2 tracking-widest text-white uppercase">
          {format(parseISO(props.meta.date), `MMMM d, yyyy`)}
        </p>
        <h1 className="text-2xl font-black leading-tight text-white md:leading-normal sm:text-3xl md:text-4xl">
          {props.meta.title}
        </h1>
        <p className="text-xl text-white sm:text-2xl">{props.meta.summary}</p>
      </HeroSection>

      <Container>
        <div className="my-4 markdown-body">{props.children}</div>
      </Container>
    </Layout>
  );
}

Post.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired
};

export default Post;

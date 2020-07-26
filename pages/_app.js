import "../css/index.css";
import "react-dropzone-uploader/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";

import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import ReactGA from "react-ga";

import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

const SEO_TITLE = `Vestrade`;
const SEO_DESCRIPTION = `Vestrade`;

Router.events.on(`routeChangeComplete`, (url) => ReactGA.pageview(url));

Router.events.on(`routeChangeStart`, () => NProgress.start());
Router.events.on(`routeChangeComplete`, () => NProgress.done());
Router.events.on(`routeChangeError`, () => NProgress.done());

class MyApp extends App {
  componentDidMount() {
    ReactGA.initialize(`UA-111515120-4`);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          {/* HTML Meta Tags */}
          <title key="html-meta-title">{SEO_TITLE}</title>
          <meta
            content={SEO_DESCRIPTION}
            key="html-meta-description"
            name="description"
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;

import React from "react";

import ssrPrepass from "react-ssr-prepass";
import initializeUrqlClient from "./initialize-urql-client";

const withUrqlClient = App => {
  return class WithUrql extends React.Component {
    static async getInitialProps(ctx) {
      const { AppTree } = ctx;

      // Run the wrapped component's getInitialProps function
      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // getInitialProps is universal, but we only want
      // to run server-side rendered suspense on the server
      const isBrowser = typeof window !== `undefined`;
      if (isBrowser) {
        return appProps;
      }

      const [urqlClient, ssrCache] = initializeUrqlClient();

      // Run suspense and hence all urql queries
      await ssrPrepass(<AppTree {...appProps} urqlClient={urqlClient} />);

      // Extract query data from the Apollo store
      // Extract the SSR query data from urql's SSR cache
      const urqlState = ssrCache.extractData();

      return {
        ...appProps,
        urqlState
      };
    }

    constructor(props) {
      super(props);

      if (props.urqlClient) {
        this.urqlClient = props.urqlClient;
      } else {
        // Create the urql client and rehydrate the prefetched data
        const [urqlClient] = initializeUrqlClient(props.urqlState);
        this.urqlClient = urqlClient;
      }
    }

    render() {
      return <App {...this.props} urqlClient={this.urqlClient} />;
    }
  };
};

export default withUrqlClient;

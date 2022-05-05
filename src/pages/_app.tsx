/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import "@fontsource/poppins";
import "@fontsource/space-mono";
import "@fontsource/orbitron";
// import "@fontsource/inter";
// import "@fontsource/montserrat";

import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import { chain, createClient, defaultChains, Provider } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import defaultSEOConfig from "../../next-seo.config";
import Layout from "components/layout";
import createEmotionCache from "styles/createEmotionCache";
import theme from "styles/customTheme";
import "styles/globals.css";

const clientSideEmotionCache = createEmotionCache();
// Get environment variables
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

// Pick chains
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const currentChain = chains.find((x) => x.id === chainId) ?? defaultChain;
    const rpcUrl = currentChain.rpcUrls.infura
      ? `${currentChain.rpcUrls.infura}/${infuraId}`
      : currentChain.rpcUrls.default;
    return [
      new InjectedConnector(),
      new CoinbaseWalletConnector({
        options: {
          appName: "Infini3",
          chainId: currentChain.id,
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        options: {
          clientMeta: {
            icons: ["🚀🌈"],
            description: "A great dapp!",
            url: "https://infini3.xyz",
            name: "Infini3",
          },
          qrcode: true,
          rpc: {
            [currentChain.id]: rpcUrl,
          },
        },
      }),
    ];
  },
});
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  return (
    <Provider client={client}>
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>
          <DefaultSeo {...defaultSEOConfig} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </CacheProvider>
    </Provider>
  );
};

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
};

export default MyApp;

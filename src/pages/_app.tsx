/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider, css, Global } from "@emotion/react";
import "@fontsource/orbitron";
import "@fontsource/space-mono";
import ConnectProvider from "core/providers/ConnectProvider";
import Layout from "layouts";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import { customTheme } from "@discovery-dao/infini-ui";
import createEmotionCache from "styles/createEmotionCache";
import "styles/globals.css";
import defaultSEOConfig from "../../next-seo.config";
import { generateBreakpointTypographyCssVars } from "../tw-components/utils/typography";

const clientSideEmotionCache = createEmotionCache();

const fontSizeCssVars = generateBreakpointTypographyCssVars();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  return (
    <ConnectProvider>
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={customTheme}>
          <Global
            styles={css`
              ${fontSizeCssVars}
            `}
          />
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
    </ConnectProvider>
  );
};

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
};

export default MyApp;

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { chain, createClient, WagmiProvider } from "wagmi";

interface Props {
  children?: React.ReactNode;
}

const ConnectProvider = ({ children }: Props) => {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.rinkeby, chain.arbitrum],
    [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Infini3",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: "Infini3",
          learnMoreUrl: "https://infini3.xyz",
        }}
        chains={chains}
        theme={lightTheme({
          accentColor: "#02e2ac",
          accentColorForeground: "black",
          borderRadius: "small",
          fontStack: "system",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
};

export default ConnectProvider;

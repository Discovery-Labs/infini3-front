import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

interface Props {
  children?: React.ReactNode;
}

const activeChainId = ChainId.Mainnet;

const ConnectProvider = ({ children }: Props) => {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      {children}
    </ThirdwebProvider>
  );
};

export default ConnectProvider;

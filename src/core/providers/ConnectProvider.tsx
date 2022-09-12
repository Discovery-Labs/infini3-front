import { ThirdwebProvider } from "@thirdweb-dev/react";
import { DESIRED_CHAIN_ID } from "core/utils/constants";

interface Props {
  children?: React.ReactNode;
}

const ConnectProvider = ({ children }: Props) => {
  return (
    <ThirdwebProvider desiredChainId={DESIRED_CHAIN_ID}>
      {children}
    </ThirdwebProvider>
  );
};

export default ConnectProvider;

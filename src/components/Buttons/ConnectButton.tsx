import { Button, HStack, Skeleton, IconButton } from "@chakra-ui/react";
import { IoMdExit } from "react-icons/io";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import Address from "../custom/Address";

function ConnectButton({ w }: { w?: string }) {
  const { data: account } = useAccount();
  const { connect, connectors, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <HStack>
      {account?.address ? (
        <>
          <Address
            address={account?.address}
            value={account?.address}
            logout={disconnect}
            fontSize="18px"
            size="short"
          />
          <IconButton
            display={["none", "none", "inherit"]}
            aria-label="exit"
            icon={<IoMdExit />}
            onClick={() => disconnect()}
          />
        </>
      ) : (
        connectors.map((connector) => {
          return isConnecting ? (
            <Button w={w} key={connector.id}>
              <Skeleton height="20px">Connecting</Skeleton>
            </Button>
          ) : (
            <Button
              w={w}
              key={connector.id}
              onClick={() => connect(connector)}
              isLoading={isConnecting}
              loadingText="Connecting"
            >
              {connector.name}
            </Button>
          );
        })
      )}
    </HStack>
  );
}

export default ConnectButton;

import {
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { IoMdExit } from "react-icons/io";
import React from "react";

import Address from "../custom/Address";
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';

function ConnectButton({ w }: { w?: string }) {
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();
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
          <IconButton display={["none", "none", "inherit"]} aria-label="exit" icon={<IoMdExit />} onClick={() => disconnect()} />
        </>
      ) : connectors.map((connector) => {
        return (
          <Button w={w}
            key={connector.id}
            onClick={() => connect(connector)}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isConnecting &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </Button>
        )
      })
      }
    </HStack>
  );
}

export default ConnectButton;

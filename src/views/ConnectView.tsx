// Set the value
import { Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useStore, { AdventureEnum } from "core/states";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { useConnect } from "wagmi";

const ConnectView = () => {
  const [playYay] = useSound("/sounds/yay.mp3");
  const [playClick] = useSound("/sounds/click.mp3");
  const { setProgress, setAdventureState } = useStore();
  const { activeConnector } = useConnect();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(activeConnector ? true : false);
  }, [activeConnector]);

  useEffect(() => {
    if (isCompleted) {
      playYay();
      setProgress(10);
    }
  }, [isCompleted]);

  return (
    <VStack h="inherit" justify="space-between" maxW="xl">
      <Heading pt="4" textAlign="center">
        Connect your wallet
      </Heading>

      {activeConnector ? (
        <Stack layerStyle="solid-card" align="center" spacing={8}>
          <Text>Connected to {activeConnector.name}</Text>
        </Stack>
      ) : (
        <Stack layerStyle="solid-card" align="center" spacing={8}>
          <Text>Connect your wallet</Text>
          <ConnectButton />
        </Stack>
      )}

      <Stack w="full" bg="accent">
        {isCompleted && <Text>Nicely done</Text>}
        <Button
          w="full"
          disabled={!isCompleted}
          onClick={() => {
            playClick();
            setAdventureState(AdventureEnum.mintAdventurer);
          }}
        >
          Next
        </Button>
      </Stack>
    </VStack>
  );
};

export default ConnectView;

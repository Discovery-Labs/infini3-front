import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
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
      setProgress(20);
    }
  }, [isCompleted]);

  return (
    <>
      <Container maxW="container.lg">
        <Heading pt="4" textAlign="center">
          Connect your wallet
        </Heading>
      </Container>

      <Container maxW="container.lg">
        <Flex w="full" justify="center">
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
        </Flex>
      </Container>

      <Box position="relative" height="120px" w="full">
        <Stack
          w="full"
          bg={isCompleted ? "accent" : ""}
          py={4}
          position="absolute"
          bottom={0}
        >
          <Container maxW="container.lg">
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
            >
              {isCompleted ? (
                <Flex>
                  <Text color="primary" fontWeight="bold" pb="4">
                    Nicely done!
                  </Text>
                  <Spacer />
                  <Text color="primary" fontWeight="bold" pb="4">
                    +10 xp
                  </Text>
                </Flex>
              ) : (
                <Box></Box>
              )}
              <Button
                w={{ base: "full", md: "md" }}
                disabled={!isCompleted}
                onClick={() => {
                  playClick();
                  setAdventureState(AdventureEnum.mintAdventurer);
                }}
              >
                Next
              </Button>
            </Flex>
          </Container>
        </Stack>
      </Box>
    </>
  );
};

export default ConnectView;

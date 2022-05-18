// Set the value
import { Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";
// import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectView = () => {
  const { adventureState, setAdventureState } = useStore();
  return (
    <VStack h="inherit" justify="space-between" maxW="xl">
      <Heading pt="4" textAlign="center">
        Connect your wallet
      </Heading>
      <Stack layerStyle="solid-card">
        <Text>Connect your wallet : {adventureState}</Text>
      </Stack>
      <Button
        w="full"
        onClick={() => setAdventureState(AdventureEnum.mintAdventurer)}
      >
        Next
      </Button>
    </VStack>
  );
};

export default ConnectView;

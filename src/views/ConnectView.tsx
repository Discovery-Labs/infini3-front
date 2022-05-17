// Set the value
import { Button, Flex, Text } from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";

const ConnectView = () => {
  const { adventureState, setAdventureState } = useStore();

  return (
    <>
      <Flex h="calc(100vh - 56px)">
        <Text>Name : {adventureState}</Text>
        <Button onClick={() => setAdventureState(AdventureEnum.mintAdventurer)}>
          Next
        </Button>
      </Flex>
    </>
  );
};

export default ConnectView;

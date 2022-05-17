// Set the value
import { Button, Text } from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";

const MintTokenView = () => {
  const { adventureState, setAdventureState } = useStore();

  return (
    <>
      <Text>Name : {adventureState}</Text>
      <Button onClick={() => setAdventureState(AdventureEnum.swap)}>
        Next
      </Button>
    </>
  );
};

export default MintTokenView;

// Set the value
import { Button, Text } from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";

const MintAdventurerView = () => {
  const { adventureState, setAdventureState } = useStore();

  return (
    <>
      <Text>Name : {adventureState}</Text>
      <Button onClick={() => setAdventureState(AdventureEnum.mintToken)}>
        Next
      </Button>
    </>
  );
};

export default MintAdventurerView;

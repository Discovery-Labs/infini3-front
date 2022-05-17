// Set the value
import { Button, Text } from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";

const SwapView = () => {
  const { adventureState, setAdventureState } = useStore();

  return (
    <>
      <Text>Name : {adventureState}</Text>
      <Button onClick={() => setAdventureState(AdventureEnum.liquidity)}>
        Complete
      </Button>
    </>
  );
};

export default SwapView;

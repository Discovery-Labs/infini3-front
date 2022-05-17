// Set the value
import { Button, Text } from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";

const LiquidityView = () => {
  const { adventureState, setAdventureState } = useStore();

  return (
    <>
      <Text>Name : {adventureState}</Text>
      <Button onClick={() => setAdventureState(AdventureEnum.connectWallet)}>
        Next
      </Button>
    </>
  );
};

export default LiquidityView;

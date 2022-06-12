import { VStack } from "@chakra-ui/react";
import useStore, { AdventureEnum, ViewsProps } from "core/states";
import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import NextSteps from "views/NextSteps";
import StepOne from "views/StepOne";
import StepTwo from "views/StepTwo";

const Adventure: NextPage = () => {
  const { adventureState, setAdventureState } = useStore();

  const loadView = useCallback(() => {
    console.log(`loadView: ${AdventureEnum.StepOne}`);
  }, [setAdventureState]);
  useEffect(() => {
    loadView();
  }, [adventureState, loadView]);

  const views: ViewsProps = {
    [AdventureEnum.StepOne]: () => <StepOne />,
    [AdventureEnum.StepTwo]: () => <StepTwo />,
    [AdventureEnum.NextSteps]: () => <NextSteps />,
  };
  return (
    <VStack flex="1" justify="space-between">
      {views[adventureState]()}
    </VStack>
  );
};

export default Adventure;

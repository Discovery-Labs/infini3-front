import { VStack } from "@chakra-ui/react";
import useStore, { AdventureEnum, ViewsProps } from "core/states";
import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import NextSteps from "views/NextSteps";
import StepFour from "views/StepFour";
import StepOne from "views/StepOne";
import StepThree from "views/StepThree";
import StepTwo from "views/StepTwo";
import StepZero from "views/StepZero";

const Adventure: NextPage = () => {
  const { adventureState, setAdventureState } = useStore();

  const loadView = useCallback(() => {
    console.log(`loadView: ${adventureState}`);
  }, [setAdventureState]);
  useEffect(() => {
    loadView();
  }, [adventureState, loadView]);

  const views: ViewsProps = {
    [AdventureEnum.StepZero]: () => <StepZero />,
    [AdventureEnum.StepOne]: () => <StepOne />,
    [AdventureEnum.StepTwo]: () => <StepTwo />,
    [AdventureEnum.StepThree]: () => <StepThree />,
    [AdventureEnum.StepFour]: () => <StepFour />,
    [AdventureEnum.NextSteps]: () => <NextSteps />,
  };
  return (
    <VStack flex="1" justify="space-between">
      {views[adventureState]()}
    </VStack>
  );
};

export default Adventure;

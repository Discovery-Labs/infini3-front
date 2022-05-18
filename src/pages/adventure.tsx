import { CloseIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Progress, VStack } from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";
import type { NextPage } from "next";
import router from "next/router";
import { useEffect } from "react";
import ConnectView from "views/ConnectView";
import LiquidityView from "views/LiquidityView";
import MintAdventurerView from "views/MintAdventurerView";
import MintTokenView from "views/MintTokenView";
import SwapView from "views/SwapView";

const Adventure: NextPage = () => {
  const { adventureState, progress } = useStore();

  const loadView = () => {
    console.log("load view");
  };
  useEffect(() => {
    loadView();
  }, []);

  const views = {
    [AdventureEnum.connectWallet]: () => <ConnectView />,
    [AdventureEnum.mintAdventurer]: () => <MintAdventurerView />,
    [AdventureEnum.mintToken]: () => <MintTokenView />,
    [AdventureEnum.swap]: () => <SwapView />,
    [AdventureEnum.liquidity]: () => <LiquidityView />,
  };

  return (
    <VStack h="inherit">
      <HStack w="full">
        <IconButton
          onClick={() => router.push("./")}
          variant="ghost"
          icon={<CloseIcon />}
          aria-label={"Back"}
        />
        <Progress w="full" value={progress} />
      </HStack>
      {views[adventureState]()}
    </VStack>
  );
};

export default Adventure;

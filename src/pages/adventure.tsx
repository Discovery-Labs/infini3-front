import { CloseIcon } from "@chakra-ui/icons";
import {
  Container,
  HStack,
  IconButton,
  Progress,
  VStack,
} from "@chakra-ui/react";
import useStore, { AdventureEnum } from "core/states";
import type { NextPage } from "next";
import router from "next/router";
import { useEffect } from "react";
import ConnectView from "views/ConnectView";
import LiquidityView from "views/LiquidityView";
import MintAdventurerView from "views/MintAdventurerView";
import MintTokenView from "views/MintTokenView";
import StakeView from "views/StakeView";
import SwapView from "views/SwapView";

const Adventure: NextPage = () => {
  const { adventureState, progress, setAdventureState } = useStore();

  const loadView = () => {
    console.log("load view");
    // TODO Check if wallet is connected, NFT is minted, token is bought, have done a swap, have staked
    setAdventureState(AdventureEnum.swap);
  };
  useEffect(() => {
    loadView();
  }, []);

  const views = {
    [AdventureEnum.connectWallet]: () => <ConnectView />,
    [AdventureEnum.mintAdventurer]: () => <MintAdventurerView />,
    [AdventureEnum.mintToken]: () => <MintTokenView />,
    [AdventureEnum.stake]: () => <StakeView />,
    [AdventureEnum.swap]: () => <SwapView />,
    [AdventureEnum.liquidity]: () => <LiquidityView />,
  };
  return (
    <>
      <Container my={{ base: 4, md: 8 }} maxW="container.lg">
        <HStack w="full">
          <IconButton
            onClick={() => router.push("./")}
            variant="ghost"
            icon={<CloseIcon />}
            aria-label={"Back"}
          />
          <Progress hasStripe isAnimated w="full" value={progress} />
        </HStack>
      </Container>

      <VStack flex="1" justify="space-between">
        {views[adventureState]()}
      </VStack>
    </>
  );
};

export default Adventure;

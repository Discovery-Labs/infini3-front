import useStore from "core/states";
import type { NextPage } from "next";
import ConnectView from "views/ConnectView";
import MintAdventurerView from "views/MintAdventurerView";
import MintTokenView from "views/MintTokenView";
import SwapView from "views/SwapView";
import LiquidityView from "views/LiquidityView";

const Adventure: NextPage = () => {
  const { adventureState } = useStore();

  const views = {
    connectWallet: () => <ConnectView />,
    mintAdventurer: () => <MintAdventurerView />,
    mintToken: () => <MintTokenView />,
    swap: () => <SwapView />,
    liquidity: () => <LiquidityView />,
  };

  return <div>{views[adventureState]()}</div>;
};

export default Adventure;

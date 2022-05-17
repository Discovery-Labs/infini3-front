import create from "zustand";

export enum AdventureEnum {
  connectWallet = "connectWallet",
  mintAdventurer = "mintAdventurer",
  mintToken = "mintToken",
  swap = "swap",
  liquidity = "liquidity",
}

interface AdventureState {
  adventureState: AdventureEnum;
  setAdventureState: (adventureState: AdventureEnum) => void;
}

const useStore = create<AdventureState>((set) => ({
  adventureState: AdventureEnum.connectWallet,
  setAdventureState: (adventureState) =>
    set((state) => ({ ...state, adventureState })),
}));

export default useStore;

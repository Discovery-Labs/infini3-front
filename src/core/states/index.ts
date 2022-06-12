import create from "zustand";

export type ViewsProps = {
  [AdventureEnum: string]: () => JSX.Element;
};

export enum AdventureEnum {
  StepZero = "StepZero",
  StepOne = "StepOne",
  StepTwo = "StepTwo",
  StepThree = "StepThree",
  StepFour = "StepFour",
  NextSteps = "NextSteps",
}

interface AdventureState {
  adventureState: AdventureEnum;
  setAdventureState: (adventureState: AdventureEnum) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

const useStore = create<AdventureState>((set) => ({
  adventureState: AdventureEnum.StepZero,
  setAdventureState: (adventureState) =>
    set((state) => ({ ...state, adventureState })),
  progress: 0,
  setProgress: (progress) => set((state) => ({ ...state, progress })),
}));

export default useStore;

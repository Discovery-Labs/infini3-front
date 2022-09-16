import create from "zustand";

interface AdventureState {
  questionIndex: number;
  nextQuestion: () => void;
  corrects: number;
  totalAnswered: number;
  incrementCorrects: () => void;
  incrementAnswered: () => void;
  reset: () => void;
}

const initialState: Partial<AdventureState> = {
  questionIndex: 0,
  corrects: 0,
  totalAnswered: 0,
};

// zustand merge only first level. second level looks like questionIndex: { count: 0 }
// for second level you have to use spread operator
const useStore = create<AdventureState>((set) => ({
  questionIndex: 0,
  nextQuestion: () => {
    set((state) => ({
      questionIndex: state.questionIndex + 1,
    }));
  },
  corrects: 0,
  totalAnswered: 0,
  incrementCorrects: () => {
    set((state) => ({
      corrects: state.corrects + 1,
      totalAnswered: state.totalAnswered + 1,
    }));
  },
  incrementAnswered: () => {
    set((state) => ({
      totalAnswered: state.totalAnswered + 1,
    }));
  },
  reset: () => {
    set(initialState);
  },
}));

export default useStore;

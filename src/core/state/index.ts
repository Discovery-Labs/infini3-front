import create from "zustand";

interface AdventureState {
  questionIndex: number;
  nextQuestion: () => void;
  correct: number;
  answered: number;
  incrementCorrect: () => void;
  incrementAnswered: () => void;
  reset: () => void;
}

const initialState: Partial<AdventureState> = {
  questionIndex: 0,
  correct: 0,
  answered: 0,
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
  correct: 0,
  answered: 0,
  incrementCorrect: () => {
    set((state) => ({
      correct: state.correct + 1,
      answered: state.answered + 1,
    }));
  },
  incrementAnswered: () => {
    set((state) => ({
      answered: state.answered + 1,
    }));
  },
  reset: () => {
    set(initialState);
  },
}));

export default useStore;

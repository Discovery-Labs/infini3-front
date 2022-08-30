import create from "zustand";

interface AdventureState {
  questionIndex: number;
  nextQuestion: () => void;
  correct: number;
  incrementCorrect: () => void;
}

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
  incrementCorrect: () => {
    set((state) => ({
      correct: state.correct + 1,
    }));
  },
}));

export default useStore;

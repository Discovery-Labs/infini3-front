import create from "zustand";

interface AdventureState {
  questionIndex: number;
  nextQuestion: (qIndex: number, qLength: number) => void;
  // progress: number;
  // setProgress: (progress: number) => void;
}

// zustand merge only first level. second level looks like questionIndex: { count: 0 }
// for second level you have to use spread operator
const useStore = create<AdventureState>((set) => ({
  questionIndex: 0,
  nextQuestion: (qIndex, qLength) => {
    if (qIndex === qLength - 1) {
      set((state) => ({
        ...state,
        questionIndex: state.questionIndex,
      }));
    } else {
      set((state) => ({
        questionIndex: state.questionIndex + 1,
      }));
    }
  },
  // setQuestionIndex: (adventureState) =>
  //   set((state) => ({ ...state, questionIndex })),
  // progress: 0,
  // setProgress: (progress) => set((state) => ({ ...state, progress })),
}));

export default useStore;

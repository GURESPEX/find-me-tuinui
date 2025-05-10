import { create } from "zustand";

type GameState = {
  correct: number;
  wrong: number;
  time: number;
};

type GameAction = {
  click: (isTuinui: boolean) => void;
};

export const useGame = create<GameState & GameAction>((set) => ({
  correct: 0,
  wrong: 0,
  time: 30,
  click: (isTuinui) =>
    set((state) =>
      isTuinui
        ? { ...state, correct: state.correct + 1 }
        : { ...state, wrong: state.wrong + 1 }
    ),
}));

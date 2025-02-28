import { create } from "zustand";

interface State {
  isActive: boolean;
  setActive: (isActive: boolean) => void;
}

export const useSearchStore = create<State>((set) => ({
  isActive: false,
  setActive: (isActive) => set({ isActive }),
}));

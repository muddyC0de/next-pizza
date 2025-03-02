import { create } from "zustand";

interface State {
  activeId: number;
  setActiveId: (id: number) => void;
}

export const useCategoryStore = create<State>((set) => ({
  activeId: 1,
  setActiveId: (activeId) => set({ activeId }),
}));

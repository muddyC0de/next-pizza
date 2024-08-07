import { create } from "zustand";

interface State {
  selectedIngredients: Set<string>;
  selectedPizzaTypes: Set<string>;
  selectedSizes: Set<string>;
  sortBy: string;
  toggleIngredient: (item: string) => void;
  togglePizzaTypes: (item: string) => void;
  toggleSize: (item: string) => void;
  setSortBy: (value: string) => void;
}

export const useQueryStore = create<State>((set) => ({
  sortBy: "asc",
  selectedIngredients: new Set(),
  selectedPizzaTypes: new Set(),
  selectedSizes: new Set(),

  toggleIngredient: (item) =>
    set((state) => {
      const newIngredients = new Set(state.selectedIngredients);
      if (newIngredients.has(item)) {
        newIngredients.delete(item);
      } else {
        newIngredients.add(item);
      }
      return { selectedIngredients: newIngredients };
    }),

  togglePizzaTypes: (item) =>
    set((state) => {
      const newPizzaTypes = new Set(state.selectedPizzaTypes);
      if (newPizzaTypes.has(item)) {
        newPizzaTypes.delete(item);
      } else {
        newPizzaTypes.add(item);
      }
      return { selectedPizzaTypes: newPizzaTypes };
    }),

  toggleSize: (item) =>
    set((state) => {
      const newSizes = new Set(state.selectedSizes);
      if (newSizes.has(item)) {
        newSizes.delete(item);
      } else {
        newSizes.add(item);
      }
      return { selectedSizes: newSizes };
    }),

  setSortBy: (value: string) => set({ sortBy: value }),
}));

// src/features/newScenario/store/useScenarioStore.ts

import { create } from "zustand";
import { ScenarioState } from "../types/newScenario.types";

const emptyCompany = {
  projectTitle: "",
  name: "",
  industry: "",
  focalQuestion: "",
  companySummary: "",
  horizonYear: "2030",
};

export const useScenarioStore = create<ScenarioState>((set) => ({
  currentStep: 1,
  company: { ...emptyCompany },
  forces: [],
  movingFactors: [],

  // Actions
  setStep: (step: number) => set({ currentStep: step }),

  updateCompany: (companyUpdate) =>
    set((state) => ({
      company: { ...state.company, ...companyUpdate },
    })),

  addForce: ({ category, title, description }) =>
    set((state) => {
      // Logic: Favor Title if provided, otherwise use Category.
      // If both are provided, Title is the "Specific" identifier.
      const identifier = title.trim() || category;
      const newForce = {
        id: crypto.randomUUID(),
        category,
        title,
        description,
        // Format: "Category or Title : Description"
        formatted: `${identifier} : ${description}`,
      };
      const updated = [...state.forces, newForce];
      console.log(
        "Forces updated:",
        updated.map((f) => f.formatted),
      );
      return { forces: updated };
    }),

  removeForce: (id: string) =>
    set((state) => ({
      forces: state.forces.filter((f) => f.id !== id),
    })),

  updateMovingFactors: (factors) => set({ movingFactors: factors }),

  resetStore: () =>
    set({
      currentStep: 1,
      company: { ...emptyCompany },
      forces: [],
      movingFactors: [],
    }),
}));

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
  axes: null,
  strategicOptions: [
    "Option A: Full digital platform build — invest AED 400M over five years to build a standalone retail digital wealth platform targeting the mass-affluent segment.",
    "Option B: Digitally enhanced relationship model — invest AED 120M in client-facing digital tools, AI-assisted advisor support, and improved reporting, while keeping the relationship model intact.",
    "Option C: Stay the course — minimal digital investment, focus resources on deepening HNW relationships and expanding geographically within the GCC.",
  ],
  windtunnelData: null,
  conversationHistory: [],

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
      return { forces: updated };
    }),

  removeForce: (id: string) =>
    set((state) => ({
      forces: state.forces.filter((f) => f.id !== id),
    })),

  updateMovingFactors: (factors) => set({ movingFactors: factors }),

  updateAxes: (axes) => set({ axes }),

  updateStrategicOptions: (options) => set({ strategicOptions: options }),

  setWindtunnelData: (data) => set({ windtunnelData: data }),

  addHistory: (role, content) =>
    set((state) => ({
      conversationHistory: [...state.conversationHistory, { role, content }],
    })),

  resetStore: () =>
    set({
      currentStep: 1,
      company: { ...emptyCompany },
      forces: [],
      movingFactors: [],
      axes: null,
      strategicOptions: [
        "Option A: Full digital platform build — invest AED 400M over five years to build a standalone retail digital wealth platform targeting the mass-affluent segment.",
        "Option B: Digitally enhanced relationship model — invest AED 120M in client-facing digital tools, AI-assisted advisor support, and improved reporting, while keeping the relationship model intact.",
        "Option C: Stay the course — minimal digital investment, focus resources on deepening HNW relationships and expanding geographically within the GCC.",
      ],
      windtunnelData: null,
      conversationHistory: [],
    }),
}));

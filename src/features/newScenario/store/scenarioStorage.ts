// src/features/newScenario/store/scenarioStorage.ts

import {
  CompanyInfo,
  DrivingForce,
  MovingFactor,
  ClassifyResponse,
  AxesData,
  ScenarioResult,
  WindtunnelResult,
} from "../types/newScenario.types";

const STORAGE_KEY = "scenario_workshop_state";

export interface PartialScenarioState {
  currentStep: number;
  company: CompanyInfo;
  forces: DrivingForce[];
  movingFactors: MovingFactor[];
  classification: ClassifyResponse["data"] | null;
  axes: AxesData | null;
  scenarios: ScenarioResult[] | null;
  strategicOptions: string[];
  windtunnelData: WindtunnelResult | null;
  conversationHistory: { role: "user" | "assistant"; content: string }[];
}

export const saveScenarioState = (state: PartialScenarioState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadScenarioState = (): PartialScenarioState | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to parse scenario state from localStorage:", err);
    return null;
  }
};

export const clearScenarioState = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

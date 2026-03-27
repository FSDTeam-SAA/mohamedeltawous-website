// src/features/newScenario/types/newScenario.types.ts

export interface MovingFactor {
  category: string;
  description: string;
}

export interface CompanyInfo {
  projectTitle: string;
  name: string;
  industry: string;
  focalQuestion: string;
  companySummary: string;
}

export interface DrivingForce {
  id: string;
  category: string;
  title: string;
  description: string;
  /** Formatted as "Category: Title... Description" */
  formatted: string;
}

export interface ClassifyPayload {
  company: {
    projectTitle: string;
    name: string;
    industry: string;
    summary: string;
    focalQuestion: string;
  };
  forces: string[];
  conversationHistory: unknown[]; // Using unknown[] for now as it's empty
}

export interface ClassifyResponse {
  message: string;
  status: string;
  data?: unknown; // Keeping unknown here for data
}

export interface ScenarioState {
  currentStep: number;
  company: CompanyInfo;
  forces: DrivingForce[];
  movingFactors: MovingFactor[];

  // Actions
  setStep: (step: number) => void;
  updateCompany: (company: Partial<CompanyInfo>) => void;
  addForce: (force: Omit<DrivingForce, "id" | "formatted">) => void;
  removeForce: (id: string) => void;
  updateMovingFactors: (factors: MovingFactor[]) => void;
  resetStore: () => void;
}

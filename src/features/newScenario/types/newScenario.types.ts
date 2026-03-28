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
  horizonYear: string;
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

export interface ForceItem {
  force: string;
  rationale: string;
  impact?: string;
}

export interface ClassifyResponse {
  success: boolean;
  data: {
    predetermined: ForceItem[];
    uncertainties: ForceItem[];
  };
  history: unknown[];
}

export interface AxesPayload {
  company: {
    name: string;
    industry: string;
    summary: string;
    focalQuestion: string;
    horizonYear: string;
  };
  classification: {
    predetermined: ForceItem[];
    uncertainties: ForceItem[];
  };
  conversationHistory: unknown[];
}

export interface AxisResult {
  label: string;
  pole1: string;
  pole2: string;
  reason: string;
}

export interface AxesData {
  axisA: AxisResult;
  axisB: AxisResult;
}

export interface AxesResponse {
  success: boolean;
  data: AxesData;
}

export interface MatrixResponse {
  success: boolean;
  data: MatrixData;
}

export interface Scenario {
  title: string;
  narrative: string;
  risks: string[];
  opportunities: string[];
  strategicImplications: string;
}

export interface MatrixData {
  scenarioA: Scenario; // X+, Y+ (Top Right)
  scenarioB: Scenario; // X-, Y+ (Top Left)
  scenarioC: Scenario; // X-, Y- (Bottom Left)
  scenarioD: Scenario; // X+, Y- (Bottom Right)
}

export interface MatrixPayload {
  company: CompanyInfo;
  axes: AxesData;
  conversationHistory: unknown[];
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

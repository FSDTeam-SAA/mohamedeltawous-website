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
  pole1?: string;
  pole2?: string;
  poleA1?: string;
  poleA2?: string;
  poleB1?: string;
  poleB2?: string;
  reason: string;
}

export interface AxesData {
  axisA: AxisResult;
  axisB: AxisResult;
  scenarios?: {
    topRight: { name: string; summary: string };
    topLeft: { name: string; summary: string };
    bottomLeft: { name: string; summary: string };
    bottomRight: { name: string; summary: string };
  };
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

export interface ScenariosPayload {
  company: {
    name: string;
    industry: string;
    summary: string;
    focalQuestion: string;
    horizonYear: string;
  };
  axes: {
    axisA: {
      label: string;
      poleA1: string;
      poleA2: string;
    };
    axisB: {
      label: string;
      poleB1: string;
      poleB2: string;
    };
  };
  forces: string[];
  conversationHistory: { role: string; content: string }[];
}

export interface ScenarioResult {
  id: number;
  name: string;
  combination: string;
  story: string;
  implications: string;
  signposts: string[];
}

export interface ScenariosResponse {
  success: boolean;
  data: {
    scenarios: ScenarioResult[];
  };
}

export interface ScenarioState {
  currentStep: number;
  company: CompanyInfo;
  forces: DrivingForce[];
  movingFactors: MovingFactor[];
  axes: AxesData | null;
  conversationHistory: { role: "user" | "assistant"; content: string }[];

  // Actions
  setStep: (step: number) => void;
  updateCompany: (company: Partial<CompanyInfo>) => void;
  addForce: (force: Omit<DrivingForce, "id" | "formatted">) => void;
  removeForce: (id: string) => void;
  updateMovingFactors: (factors: MovingFactor[]) => void;
  updateAxes: (axes: AxesData) => void;
  addHistory: (role: "user" | "assistant", content: string) => void;
  resetStore: () => void;
}

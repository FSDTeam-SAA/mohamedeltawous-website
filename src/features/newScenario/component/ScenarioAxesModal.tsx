"use client";

import React, { useState } from "react";
import { X, Layers, Loader2, ArrowRight } from "lucide-react";
import { AxesData, ScenariosResponse } from "../types/newScenario.types";
import { useGenerateScenarios } from "../hooks/useNewScenario";
import { useScenarioStore } from "../store/useScenarioStore";
import StrategicMatrixChart from "./StrategicMatrixChart";
import DataMismatchModal from "./DataMismatchModal";

interface ScenarioAxesModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AxesData;
  onScenariosGenerated: (data: ScenariosResponse["data"]) => void;
}

const ScenarioAxesModal: React.FC<ScenarioAxesModalProps> = ({
  isOpen,
  onClose,
  data: axesData,
  onScenariosGenerated,
}) => {
  const { company, forces, conversationHistory } = useScenarioStore();
  const { mutateAsync: generateScenarios, isPending: isGenerating } =
    useGenerateScenarios();
  const [isMismatch, setIsMismatch] = useState(false);
  const [mismatchVariant, setMismatchVariant] = useState<
    "alignment" | "processing" | "structural"
  >("alignment");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-md transition-opacity cursor-default"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter") onClose();
        }}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 flex flex-col max-h-[95vh] border border-slate-200">
        {/* Top Accent Gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-slate-400" />

        {/* Header */}
        <header className="px-10 py-8 flex items-center justify-between bg-white border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shadow-sm">
                <Layers className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Strategic Dimensioning
              </span>
            </div>
            <h2 className="text-3xl font-black text-[#0F172A] tracking-tighter">
              Scenario Axes Result
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all duration-300 text-slate-400 active:rotate-90 group"
            >
              <X className="w-6 h-6 group-hover:scale-110" />
            </button>
          </div>
        </header>

        {/* Main Strategic Matrix Content */}
        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/20">
          <StrategicMatrixChart
            axisA={axesData.axisA}
            axisB={axesData.axisB}
            scenarios={axesData.scenarios}
          />

          {/* Blueprint Guide */}
          {/* <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100/50 shadow-sm">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0F172A] tracking-tight">
                    Understanding the Blueprint
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    How to read the strategic matrix for{" "}
                    {company.name || "your company"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
                <div className="bg-slate-50 rounded-2xl p-6 group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-slate-200 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Move className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-[#0F172A] mb-2 tracking-tight">
                    1. The &quot;Axis&quot;
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    A <strong>Critical Uncertainty</strong> that has a massive
                    impact on your business but is highly unpredictable. It
                    forms the X or Y dimensions of the future.
                  </p>
                </div>

         
                <div className="bg-slate-50 rounded-2xl p-6 group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-slate-200 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-[#0F172A] mb-2 tracking-tight">
                    2. The &quot;Pole&quot;
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    An extreme &quot;end&quot; of an axis (e.g., Low vs High).
                    Each axis features two opposing poles that represent
                    contrasting versions of tomorrow.
                  </p>
                </div>
 
                <div className="bg-slate-50 rounded-2xl p-6 group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-slate-200 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-4 text-amber-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-[#0F172A] mb-2 tracking-tight">
                    3. The &quot;Reason&quot;
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    The strategic logic explaining why these specific axes were
                    chosen, highlighting their <strong>Impact</strong>,{" "}
                    <strong>Uncertainty</strong>, and{" "}
                    <strong>Independence</strong>.
                  </p>
                </div>
 
                <div className="bg-slate-50 rounded-2xl p-6 group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-slate-200 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center mb-4 text-rose-600 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                    <Grid2X2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-[#0F172A] mb-2 tracking-tight">
                    4. The &quot;Quadrant&quot;
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Crossing the two axes yields 4 distinct boxes. Each quadrant
                    represents a unique &quot;Future World&quot; that you must
                    strategize and prepare for.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <footer className="px-10 py-8 bg-white border-t border-slate-100 flex items-center justify-between">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest hidden sm:block">
            Step 3 of 4 • Scenario Framework Finalization
          </p>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                const { setClassificationModal, setAxesModal } =
                  useScenarioStore.getState();
                setAxesModal(false);
                setClassificationModal(true);
              }}
              className="flex-1 sm:flex-none px-8 py-4 rounded-2xl text-sm font-black text-slate-400 hover:text-[#0F172A] hover:bg-slate-50 transition-all uppercase tracking-wider"
            >
              Back to classification
            </button>
            <button
              disabled={isGenerating}
              onClick={async () => {
                try {
                  const payload = {
                    company: {
                      name: company.name,
                      industry: company.industry,
                      summary: company.companySummary,
                      focalQuestion: company.focalQuestion,
                      horizonYear: company.horizonYear,
                    },
                    axes: {
                      axisA: {
                        label: axesData.axisA.label,
                        poleA1:
                          axesData.axisA.pole1 || axesData.axisA.poleA1 || "",
                        poleA2:
                          axesData.axisA.pole2 || axesData.axisA.poleA2 || "",
                      },
                      axisB: {
                        label: axesData.axisB.label,
                        poleB1:
                          axesData.axisB.pole1 || axesData.axisB.poleB1 || "",
                        poleB2:
                          axesData.axisB.pole2 || axesData.axisB.poleB2 || "",
                      },
                    },
                    forces: forces.map((f) => f.title || f.category),
                    conversationHistory: conversationHistory,
                  };

                  console.log("Generating Scenarios with Payload:", payload);
                  const response = await generateScenarios(payload);
                  console.log("Scenario Generation Response:", response);

                  if (
                    !response?.data?.scenarios ||
                    response.data.scenarios.length === 0
                  ) {
                    console.error(
                      "Data mismatch: No scenarios returned from AI.",
                    );

                    // Structural check: did it return classification again?
                    const respData = response?.data as unknown as
                      | Record<string, unknown>
                      | undefined;
                    if (respData?.predetermined || respData?.uncertainties) {
                      setMismatchVariant("structural");
                    } else {
                      setMismatchVariant("alignment");
                    }

                    setIsMismatch(true);
                    return;
                  }

                  if (response?.data) {
                    onScenariosGenerated(response.data);
                    const { setAxesModal, setStep } =
                      useScenarioStore.getState();
                    setAxesModal(false);
                    setStep(4);
                  }
                } catch (err: unknown) {
                  console.error("Scenario generation failed:", err);
                  const errorResponse = err as {
                    response?: { data?: { message?: string } };
                    message?: string;
                  };
                  const errorMessage =
                    errorResponse?.response?.data?.message ||
                    errorResponse?.message ||
                    "";
                  if (
                    errorMessage.includes(
                      "Failed to parse AI response into JSON after retry",
                    )
                  ) {
                    setMismatchVariant("processing");
                    setIsMismatch(true);
                  }
                }
              }}
              id="advance-to-matrix-btn"
              className="flex-1 sm:flex-none px-10 py-4 rounded-2xl text-sm font-black bg-[#0F172A] text-white flex items-center justify-center gap-3 hover:shadow-[0_20px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all duration-300 active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGenerating
                ? "Synthesizing Scenarios..."
                : "Generate 4 Futures"}
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              )}
            </button>
          </div>
        </footer>

        <DataMismatchModal
          isOpen={isMismatch}
          variant={mismatchVariant}
          onClose={() => setIsMismatch(false)}
          onRetry={async () => {
            setIsMismatch(false);
            const advanceBtn = document.getElementById("advance-to-matrix-btn");
            if (advanceBtn) advanceBtn.click();
          }}
          backStepLabel="Back to Step 3"
          onRestart={() => {
            setIsMismatch(false);
            const { setAxesModal, setClassificationModal } =
              useScenarioStore.getState();
            setAxesModal(false);
            setClassificationModal(true); // Return to factors classification
          }}
        />
      </div>
    </div>
  );
};

export default ScenarioAxesModal;

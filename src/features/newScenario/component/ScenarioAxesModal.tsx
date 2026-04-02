"use client";

import React, { useState } from "react";
import { X, Layers, Loader2, ArrowRight } from "lucide-react";
import { AxesData, ScenariosResponse } from "../types/newScenario.types";
import { useGenerateScenarios } from "../hooks/useNewScenario";
import { useScenarioContext } from "../store/ScenarioContext";
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
  const {
    company,
    classification,
    conversationHistory,
    addHistory,
    setStep,
    setScenarios,
    setAxesModal,
    setClassificationModal,
  } = useScenarioContext();
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
        </div>

        <footer className="px-10 py-8 bg-white border-t border-slate-100 flex items-center justify-between">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest hidden sm:block">
            Step 3 of 4 • Scenario Framework Finalization
          </p>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
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
                  // 1. Construct refined forces list from classification result
                  const predetermined = classification?.predetermined || [];
                  const uncertainties = classification?.uncertainties || [];

                  const forceStrings = [
                    ...predetermined.map((p) =>
                      typeof p === "string" ? p : p.force,
                    ),
                    ...uncertainties.map((u) =>
                      typeof u === "string" ? u : u.force,
                    ),
                  ].filter(Boolean);

                  // 2. Extract poles with robust fallback
                  const pA1 =
                    axesData.axisA.poleA1 || axesData.axisA.pole1 || "";
                  const pA2 =
                    axesData.axisA.poleA2 || axesData.axisA.pole2 || "";
                  const pB1 =
                    axesData.axisB.poleB1 || axesData.axisB.pole1 || "";
                  const pB2 =
                    axesData.axisB.poleB2 || axesData.axisB.pole2 || "";

                  // 3. MANDATORY DATA GUARANTEE: Check if any required fields are empty
                  if (
                    forceStrings.length === 0 ||
                    !pA1 ||
                    !pA2 ||
                    !pB1 ||
                    !pB2
                  ) {
                    console.error(
                      "Critical Data Missing for Scenario Generation:",
                      {
                        forcesCount: forceStrings.length,
                        pA1: !!pA1,
                        pA2: !!pA2,
                        pB1: !!pB1,
                        pB2: !!pB2,
                      },
                    );
                    // Use the mismatch modal to guide user to retry or go back
                    setMismatchVariant("alignment");
                    setIsMismatch(true);
                    return;
                  }

                  // 4. Construct payload
                  const payload = {
                    company: {
                      name: company.name,
                      industry: company.industry,
                      summary: company.companySummary,
                    },
                    focalQuestion: company.focalQuestion,
                    horizonYear: company.horizonYear,
                    axes: {
                      axisA: {
                        label: axesData.axisA.label,
                        poleA1: pA1,
                        poleA2: pA2,
                      },
                      axisB: {
                        label: axesData.axisB.label,
                        poleB1: pB1,
                        poleB2: pB2,
                      },
                    },
                    forces: forceStrings,
                    conversationHistory: conversationHistory,
                  };

                  console.log(
                    "Generating Scenarios with Validated Payload:",
                    payload,
                  );
                  const response = await generateScenarios(payload);
                  console.log("Scenario Generation Response:", response);

                  if (
                    !response?.data?.scenarios ||
                    response.data.scenarios.length === 0
                  ) {
                    console.error(
                      "Data mismatch: No scenarios returned from AI.",
                    );
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

                  if (response?.success) {
                    addHistory("user", "Build 4 scenarios.");
                    addHistory("assistant", JSON.stringify(response.data));
                    onScenariosGenerated(response.data);
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
            setAxesModal(false);
            setClassificationModal(true);
          }}
        />
      </div>
    </div>
  );
};

export default ScenarioAxesModal;

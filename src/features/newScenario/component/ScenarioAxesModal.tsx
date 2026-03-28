"use client";

import React from "react";
import { X, Layers, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { AxesData, MatrixData } from "../types/newScenario.types";
import { useGenerateMatrix } from "../hooks/useNewScenario";
import { useScenarioStore } from "../store/useScenarioStore";
import StrategicMatrixChart from "./StrategicMatrixChart";

interface ScenarioAxesModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AxesData;
  projectName: string;
  onMatrixGenerated: (data: MatrixData) => void;
}

const ScenarioAxesModal: React.FC<ScenarioAxesModalProps> = ({
  isOpen,
  onClose,
  data: axesData,
  projectName,
  onMatrixGenerated,
}) => {
  const { company, setStep } = useScenarioStore();
  const { mutateAsync: generateMatrix, isPending: isGenerating } =
    useGenerateMatrix();

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

          {/* Strategy Insight Banner */}
          {/* <div className="mt-10 bg-[#0F172A] rounded-3xl p-8 flex items-center justify-between text-white shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex gap-6 items-center relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-blue-300" />
              </div>
              <div className="max-w-2xl">
                <h4 className="text-lg font-black tracking-tight mb-1">
                  Building the Future Framework
                </h4>
                <p className="text-blue-100/70 text-sm font-medium leading-relaxed">
                  These critical uncertainties identify the most impactful and
                  unpredictable drivers for your strategy. Crossing these axes
                  will define the four unique scenario worlds for {projectName}.
                </p>
              </div>
            </div>
            <div className="relative z-10 hidden md:block">
              <div className="text-[10px] font-black text-blue-300/50 uppercase tracking-[0.4em] origin-right rotate-90 whitespace-nowrap">
                STRATEGIC HORIZON
              </div>
            </div>
          </div> */}
        </div>

        {/* High-End Footer */}
        <footer className="px-10 py-8 bg-white border-t border-slate-100 flex items-center justify-between">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest hidden sm:block">
            Step 3 of 4 • Scenario Framework Finalization
          </p>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-8 py-4 rounded-2xl text-sm font-black text-slate-400 hover:text-[#0F172A] hover:bg-slate-50 transition-all uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              disabled={isGenerating}
              onClick={async () => {
                try {
                  const payload = {
                    company,
                    axes: axesData,
                    conversationHistory: [], // Can be expanded to include actual history from previous steps
                  };

                  const response = await generateMatrix(payload);
                  onMatrixGenerated(response.data);
                  onClose();
                  setStep(4);
                } catch (err) {
                  console.error("Matrix generation failed:", err);
                }
              }}
              className="flex-1 sm:flex-none px-10 py-4 rounded-2xl text-sm font-black bg-[#0F172A] text-white flex items-center justify-center gap-3 hover:shadow-[0_20px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              Advance to Matrix
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ScenarioAxesModal;

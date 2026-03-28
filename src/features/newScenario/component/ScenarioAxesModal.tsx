"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Settings2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Sparkles,
  Loader2,
} from "lucide-react";
import { AxesData, AxisResult, MatrixData } from "../types/newScenario.types";
import { useGenerateMatrix } from "../hooks/useNewScenario";
import { useScenarioStore } from "../store/useScenarioStore";

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
  const [copied, setCopied] = useState(false);
  const { company, setStep } = useScenarioStore();
  const { mutateAsync: generateMatrix, isPending: isGenerating } =
    useGenerateMatrix();

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `
Scenario Axes for ${projectName}

Axis A: ${axesData.axisA.label}
- Pole 1: ${axesData.axisA.pole1}
- Pole 2: ${axesData.axisA.pole2}
- Rationale: ${axesData.axisA.reason}

Axis B: ${axesData.axisB.label}
- Pole 1: ${axesData.axisB.pole1}
- Pole 2: ${axesData.axisB.pole2}
- Rationale: ${axesData.axisB.reason}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            {/* <button
              onClick={handleCopy}
              className={`
                flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs font-black transition-all duration-300
                ${copied 
                  ? "bg-emerald-50 text-emerald-600 scale-95" 
                  : "bg-slate-50 text-slate-500 hover:bg-[#0F172A] hover:text-white hover:shadow-lg active:scale-95"
                }
              `}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "SUCCESSFULLY COPIED" : "COPY FRAMEWORK"}
            </button> */}
            <button
              onClick={onClose}
              className="p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all duration-300 text-slate-400 active:rotate-90 group"
            >
              <X className="w-6 h-6 group-hover:scale-110" />
            </button>
          </div>
        </header>

        {/* Main Grid Content */}
        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <AxisCard
              title="Dimension Alpha"
              axis={axesData.axisA}
              accent="blue"
            />
            <AxisCard
              title="Dimension Beta"
              axis={axesData.axisB}
              accent="indigo"
            />
          </div>

          {/* Strategy Insight Banner */}
          <div className="mt-10 bg-[#0F172A] rounded-3xl p-8 flex items-center justify-between text-white shadow-2xl overflow-hidden relative group">
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
          </div>
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
              className="flex-1 sm:flex-none px-10 py-4 rounded-2xl text-sm font-black bg-[#0F172A] text-white flex items-center justify-center gap-3 hover:shadow-[0_20px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed"
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

interface AxisCardProps {
  title: string;
  axis: AxisResult;
  accent: "blue" | "indigo";
}

const AxisCard: React.FC<AxisCardProps> = ({ title, axis, accent }) => {
  return (
    <div
      className={`
      relative bg-white rounded-[2rem] p-10 border-2 border-slate-100 transition-all duration-500 flex flex-col
      hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-transparent group
    `}
    >
      {/* Accent Line */}
      <div
        className={`
        absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3/4 rounded-r-full transition-all duration-500
        ${accent === "blue" ? "bg-blue-600" : "bg-indigo-600"}
      `}
      />

      <div className="flex items-center justify-between mb-10">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          {title}
        </span>
        <div
          className={`
          w-10 h-10 rounded-xl flex items-center justify-center shadow-sm
          ${accent === "blue" ? "bg-blue-50 text-blue-600" : "bg-indigo-50 text-indigo-600"}
        `}
        >
          <Settings2 className="w-5 h-5" />
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-3xl font-black text-[#0F172A] leading-tight tracking-tighter mb-10 min-h-[4.5rem]">
          {axis.label}
        </h3>

        {/* Visual Spectrum */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-full h-20 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors overflow-hidden">
                <span className="text-[10px] font-black text-[#0F172A] text-center px-4 leading-tight uppercase tracking-wider">
                  {axis.pole1}
                </span>
              </div>
              <div className="w-4 h-4 rounded-full border-2 border-slate-200 bg-white" />
              <ChevronDown className="w-4 h-4 text-slate-300" />
            </div>

            <div className="w-16 h-[2px] bg-gradient-to-r from-slate-200 to-slate-200 mt-10" />

            <div className="flex flex-col items-center gap-3 flex-1">
              <div
                className={`
                w-full h-20 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 overflow-hidden
                ${accent === "blue" ? "bg-blue-600" : "bg-indigo-600"}
              `}
              >
                <span className="text-[10px] font-black text-white text-center px-4 leading-tight uppercase tracking-wider">
                  {axis.pole2}
                </span>
              </div>
              <div
                className={`
                w-4 h-4 rounded-full border-2 bg-white transition-colors
                ${accent === "blue" ? "border-blue-600" : "border-indigo-600"}
              `}
              />
              <ChevronUp
                className={`
                w-4 h-4
                ${accent === "blue" ? "text-blue-400" : "text-indigo-400"}
              `}
              />
            </div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
            <span>Low Uncertainty / State A</span>
            <span>High Impact / State B</span>
          </div>
        </div>

        {/* Strategic Rationale */}
        <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-100 group-hover:bg-white transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Strategic Rationale
            </span>
          </div>
          <p className="text-sm text-[#0F172A]/80 leading-relaxed font-semibold">
            {axis.reason}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScenarioAxesModal;

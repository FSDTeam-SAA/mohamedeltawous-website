"use client";

import React from "react";
import {
  X,
  Target,
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import {
  AxesPayload,
  AxesResponse,
  AxesData,
  ClassifyResponse,
  UncertaintyItem,
  PredeterminedItem,
} from "../types/newScenario.types";
import { useScenarioStore } from "../store/useScenarioStore";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

interface ForceClassificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullResponse: ClassifyResponse;
  generateAxes: UseMutateAsyncFunction<
    AxesResponse,
    Error,
    AxesPayload,
    unknown
  >;
  isGeneratingAxes: boolean;
  onAxesGenerated: (data: AxesData) => void;
}

const ForceClassificationModal: React.FC<ForceClassificationModalProps> = ({
  isOpen,
  onClose,
  fullResponse,
  generateAxes,
  isGeneratingAxes,
  onAxesGenerated,
}) => {
  const { data } = fullResponse;
  const { company, setStep, addHistory } = useScenarioStore();
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const predeterminedCount = data.predetermined.length;
  const uncertaintiesCount = data.uncertainties.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm transition-opacity cursor-default"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter") {
            onClose();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <header className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-[#0F172A] tracking-tighter">
              Strategic Force Classification
            </h2>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Analyzing identified patterns and critical uncertainties for your
              scenario planning.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-[#0F172A]"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Summary Bar */}
        <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              {predeterminedCount} Predetermined{" "}
              {predeterminedCount === 1 ? "Force" : "Forces"}
            </span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
              {uncertaintiesCount} Critical{" "}
              {uncertaintiesCount === 1 ? "Uncertainty" : "Uncertainties"}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          {error && (
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 flex flex-col items-center text-center animate-in slide-in-from-top-4 duration-500">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-xl font-black text-rose-900 uppercase tracking-tighter mb-2">
                Mapping Synthesis Failed
              </h4>
              <p className="text-slate-600 font-medium leading-relaxed max-w-md">
                {error}
              </p>
              <div className="mt-8 flex gap-4 w-full justify-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-white border-2 border-rose-100 text-rose-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95 cursor-pointer"
                >
                  Back to Step 3
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-rose-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer"
                >
                  Back to Step 2
                </button>
              </div>
              <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Hint: Refine your company profile or simplify factor
                descriptions.
              </p>
            </div>
          )}

          {/* Predetermined Forces Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Target className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A] tracking-tight">
                Predetermined Forces
              </h3>
            </div>

            <div className="grid gap-4">
              {data.predetermined.map((item, idx) => (
                <ForceCard
                  key={typeof item === "string" ? item : item.force + idx}
                  item={item}
                  type="predetermined"
                />
              ))}
            </div>
          </section>

          {/* Critical Uncertainties Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A] tracking-tight">
                Critical Uncertainties
              </h3>
            </div>

            <div className="grid gap-6">
              {data.uncertainties.map((item, idx) => (
                <ForceCard
                  key={item.force + idx}
                  item={item}
                  type="uncertainty"
                />
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isGeneratingAxes}
            className="px-6 py-3 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to factors
          </button>
          <button
            disabled={isGeneratingAxes}
            onClick={async () => {
              setError(null);
              try {
                const payload = {
                  company: {
                    name: company.name,
                    industry: company.industry,
                    summary: company.companySummary,
                    focalQuestion: company.focalQuestion,
                    horizonYear: company.horizonYear,
                  },
                  classification: fullResponse.data,
                  conversationHistory: fullResponse.history,
                };

                const response = await generateAxes(payload);

                if (response?.data) {
                  addHistory("user", "Select axes.");
                  addHistory("assistant", JSON.stringify(response.data));
                  onAxesGenerated(response.data);
                }
              } catch (err: unknown) {
                console.error("Axes generation failed:", err);
                setError(
                  "We encountered an issue while mapping your strategic axes. This often happens if the uncertainties are too similar. Please try refining your factor descriptions.",
                );
              }
            }}
            className="px-8 py-3 rounded-xl text-sm font-bold bg-[#0F172A] text-white flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed min-w-[180px] justify-center cursor-pointer"
          >
            {isGeneratingAxes ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Confirm & Map Matrix
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </footer>
      </div>
    </div>
  );
};

interface ForceCardProps {
  item: string | UncertaintyItem | PredeterminedItem;
  type: "predetermined" | "uncertainty";
}

const ForceCard: React.FC<ForceCardProps> = ({ item, type }) => {
  const isUncertainty = type === "uncertainty";

  let title = "";
  let text = "";
  let impact = "";

  if (typeof item === "string") {
    const colonIndex = item.indexOf(":");
    if (colonIndex !== -1) {
      title = item.slice(0, colonIndex).trim();
      text = item.slice(colonIndex + 1).trim();
    } else {
      title = item;
    }
  } else if ("unpredictability" in item) {
    // UncertaintyItem
    title = item.force;
    text = item.unpredictability;
    impact = item.impact;
  } else {
    // PredeterminedItem
    title = item.force;
    text = item.rationale;
  }

  return (
    <div
      className={`
      group relative rounded-2xl p-6 border-2 transition-all duration-300
      ${
        isUncertainty
          ? "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-[#0F172A]/10"
          : "bg-slate-50/30 border-slate-100 hover:bg-white hover:border-emerald-100"
      }
    `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <span
            className={`
            px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
            ${
              isUncertainty
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700"
            }
          `}
          >
            {isUncertainty ? "Critical Uncertainty" : "Predetermined"}
          </span>
          <h4 className="text-xl font-black text-[#0F172A] tracking-tight mt-2">
            {title}
          </h4>
        </div>
      </div>

      {text && (
        <p className="text-slate-600 text-sm leading-relaxed font-medium whitespace-pre-wrap">
          {text}
        </p>
      )}

      {isUncertainty && impact && (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-3 items-start">
          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          <div>
            <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-widest block mb-1">
              Probable Impact
            </span>
            <p className="text-xs text-slate-500 font-medium leading-normal italic">
              {impact}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForceClassificationModal;

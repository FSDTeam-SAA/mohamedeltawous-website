"use client";

import React from "react";
import {
  X,
  Target,
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { ClassifyResponse, ForceItem } from "../types/newScenario.types";

interface ForceClassificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ClassifyResponse["data"];
}

const ForceClassificationModal: React.FC<ForceClassificationModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  const predeterminedCount = data.predetermined.length;
  const uncertaintiesCount = data.uncertainties.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        role="button"
        tabIndex={-1}
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
              {data.predetermined.map((item) => (
                <ForceCard key={item.force} item={item} type="predetermined" />
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
              {data.uncertainties.map((item) => (
                <ForceCard key={item.force} item={item} type="uncertainty" />
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-all active:scale-95"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              // In the future, this could trigger step 4 navigation
            }}
            className="px-8 py-3 rounded-xl text-sm font-bold bg-[#0F172A] text-white flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Continue to Matrix
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
};

interface ForceCardProps {
  item: ForceItem;
  type: "predetermined" | "uncertainty";
}

const ForceCard: React.FC<ForceCardProps> = ({ item, type }) => {
  const isUncertainty = type === "uncertainty";

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
            {item.force}
          </h4>
        </div>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed font-medium">
        {item.rationale}
      </p>

      {isUncertainty && item.impact && (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-3 items-start">
          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          <div>
            <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-widest block mb-1">
              Probable Impact
            </span>
            <p className="text-xs text-slate-500 font-medium leading-normal italic">
              {item.impact}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForceClassificationModal;

"use client";
import React from "react";
import {
  X,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";

interface DataMismatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onRestart?: () => void;
  variant?: "alignment" | "processing" | "structural";
  title?: string;
  description?: string;
  backStepLabel?: string;
}

const DataMismatchModal: React.FC<DataMismatchModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  onRestart,
  variant = "alignment",
  title,
  description,
  backStepLabel = "Restart from Step 1",
}) => {
  if (!isOpen) return null;

  // Set default content based on variant if props not provided
  const modalTitle =
    title ||
    (variant === "processing"
      ? "AI Processing Interrupted"
      : variant === "structural"
        ? "Strategy Evolution Mismatch"
        : "Data Mismatch Detected");

  const modalDescription =
    description ||
    (variant === "processing"
      ? "The AI encountered a complex strategic pattern that couldn't be instantly formatted into your framework. This is a temporary processing limitation."
      : variant === "structural"
        ? "The AI returned data from a previous workshop step instead of the expected analysis for this stage. This usually happens if the focal question needs more specificity."
        : "Our scenario engine encountered an alignment issue while synthesizing your strategic framework. This occurs when AI results don't perfectly reconcile with your selected axes.");

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-500 flex flex-col border border-slate-100">
        {/* Top Accent Bar */}
        <div
          className={`h-1.5 w-full bg-gradient-to-r ${variant === "processing" ? "from-indigo-500 via-blue-500 to-emerald-400" : "from-amber-500 via-rose-500 to-slate-400"}`}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-all active:scale-90 z-20 group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content Body */}
        <div className="px-10 py-12 flex flex-col items-center text-center">
          <div
            className={`w-20 h-20 rounded-[2rem] ${
              variant === "processing"
                ? "bg-indigo-50 border-indigo-100/50"
                : variant === "structural"
                  ? "bg-rose-50 border-rose-100/50"
                  : "bg-amber-50 border-amber-100/50"
            } flex items-center justify-center mb-8 shadow-inner border`}
          >
            {variant === "processing" ? (
              <RefreshCw className="w-10 h-10 text-indigo-600" />
            ) : variant === "structural" ? (
              <ArrowLeft className="w-10 h-10 text-rose-600" />
            ) : (
              <ShieldAlert className="w-10 h-10 text-amber-600" />
            )}
          </div>

          <h3 className="text-2xl font-black text-[#0F172A] tracking-tighter mb-4">
            {modalTitle}
          </h3>

          <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-sm">
            {modalDescription}
          </p>

          <div className="flex flex-col w-full gap-4">
            <button
              onClick={onRetry}
              className="w-full py-4 bg-[#0F172A] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-blue-900/20 group cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              Retry Synthesis
            </button>

            {onRestart && (
              <button
                onClick={onRestart}
                className="w-full py-4 bg-white border border-slate-200 text-[#0F172A] hover:bg-slate-50 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-95 shadow-sm group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {backStepLabel}
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-4 bg-slate-50 text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-widest cursor-pointer"
            >
              Close & Stay Here
            </button>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="px-10 py-6 bg-slate-50/50 border-t border-slate-50 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <AlertCircle className="w-3 h-3" />
            {variant === "processing"
              ? "AI Engine Response Timeout Protection"
              : variant === "structural"
                ? "Evolutionary Gap Detected"
                : "Strategic Framework Integrity Protected"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataMismatchModal;

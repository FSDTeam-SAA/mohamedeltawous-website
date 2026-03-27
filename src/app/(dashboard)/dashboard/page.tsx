import React from "react";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { Sparkles } from "lucide-react";

export default function DashboardOverviewPage() {
  const steps = [
    { id: 1, name: "Strategic Question", status: "current" },
    { id: 2, name: "Company Profile", status: "upcoming" },
    { id: 3, name: "Moving Factors", status: "upcoming" },
    { id: 4, name: "Scenario Matrix", status: "upcoming" },
  ];

  return (
    <div className="flex flex-col w-full h-full items-center relative py-12">
      {/* Top Stepper Header */}
      <div className="w-full max-w-4xl px-4 flex justify-between items-center mb-12">
        {steps.map((step) => {
          const isActive = step.status === "current";
          return (
            <div
              key={step.id}
              className="flex flex-col items-center gap-3 w-32 relative"
            >
              <div
                className={`w-8 h-8 rounded shrink-0 flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-[#0f172a] text-white"
                    : "bg-[#cbd5e1] text-white"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-[11px] uppercase font-bold text-center tracking-wide ${
                  isActive ? "text-[#0f172a]" : "text-slate-400"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Content Card */}
      <DashboardPageLayout className="max-w-3xl w-full p-8 md:p-10 !rounded-2xl !border-0 !shadow-sm">
        <h2 className="text-[22px] font-bold text-[#0f172a] mb-2 tracking-tight">
          Define Your Strategic Question
        </h2>
        <p className="text-[#64748b] text-[15px] mb-8">
          Enter the key decision or focal issue you want to explore through
          scenario planning.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#0f172a] mb-2">
              Project Title
            </label>
            <input
              type="text"
              placeholder="Example: Digital Banking Strategy 2030"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 placeholder:text-slate-400 transition-colors"
            />
            <p className="text-[13px] text-slate-500 mt-2">
              This will be the internal name for your analysis report.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0f172a] mb-2">
              Focal Issue / Strategic Question
            </label>
            <textarea
              placeholder="Example: Should we invest in a digital wealth management platform over the next 5 years?"
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 placeholder:text-slate-400 transition-colors resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-[13px] text-slate-500">
                A good strategic question is open-ended and focused on long-term
                value.
              </p>
              <span className="text-[11px] text-slate-400 font-medium">
                0 / 500
              </span>
            </div>
          </div>

          <div className="bg-[#cbd5e1]/30 rounded-xl p-5 border border-slate-300/60 flex gap-4 mt-8 relative overflow-hidden">
            <div className="text-[#0f172a] mt-0.5 z-10">
              <Sparkles size={20} className="fill-[#0f172a]/20" />
            </div>
            <div className="z-10">
              <h4 className="text-[13px] font-bold text-[#0f172a] mb-1 leading-none uppercase tracking-wider">
                AI Assistant Tip
              </h4>
              <p className="text-sm text-[#475569] leading-relaxed">
                Try to include a specific timeframe and a core business metric.
                For example: &quot;How will the rise of decentralized finance
                impact our retail market share in the EU by 2032?&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center mt-12 pt-4">
          <button className="px-8 py-2.5 rounded-lg bg-[#0f172a] text-white text-sm font-semibold hover:bg-[#1e293b] transition-colors shadow-sm">
            Back
          </button>
          <button className="px-8 py-2.5 rounded-lg bg-[#0f172a] text-white text-sm font-semibold hover:bg-[#1e293b] transition-colors shadow-sm">
            Continue
          </button>
        </div>
      </DashboardPageLayout>
    </div>
  );
}

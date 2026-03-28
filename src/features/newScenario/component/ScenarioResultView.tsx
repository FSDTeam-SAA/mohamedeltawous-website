"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  LayoutGrid,
  Target,
  AlertCircle,
  ArrowRight,
  Loader2,
  Search,
  X,
  Plus,
} from "lucide-react";
import { useScenarioStore } from "../store/useScenarioStore";
import { useGenerateScenarios } from "../hooks/useNewScenario";
import { ScenarioResult } from "../types/newScenario.types";

/**
 * Helper to truncate text to exactly N words.
 */
const truncateText = (text: string, limit: number) => {
  const words = text ? text.split(/\s+/) : [];
  if (words.length <= limit) return { truncated: text, needsMore: false };
  return {
    truncated: words.slice(0, limit).join(" ") + "...",
    needsMore: true,
  };
};

const ScenarioResultView: React.FC = () => {
  const { company, axes, forces, conversationHistory } = useScenarioStore();
  const {
    mutateAsync: generateScenarios,
    isPending,
    error,
  } = useGenerateScenarios();

  const [scenarios, setScenarios] = useState<ScenarioResult[]>([]);
  const [activeTabs, setActiveTabs] = useState<Record<number, string>>({});

  // Modal State
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
    type: string;
  }>({
    isOpen: false,
    title: "",
    content: "",
    type: "narrative",
  });

  const openModal = (title: string, content: string, type: string) => {
    setModalData({ isOpen: true, title, content, type });
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  useEffect(() => {
    const triggerGeneration = async () => {
      if (!axes) return;

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
              label: axes.axisA.label,
              poleA1: axes.axisA.pole1 || "",
              poleA2: axes.axisA.pole2 || "",
            },
            axisB: {
              label: axes.axisB.label,
              poleB1: axes.axisB.pole1 || "",
              poleB2: axes.axisB.pole2 || "",
            },
          },
          forces: forces.map((f) => f.title || f.category),
          conversationHistory: conversationHistory,
        };

        const response = await generateScenarios(payload);

        if (response?.success && response?.data?.scenarios) {
          setScenarios(response.data.scenarios);
          const initialTabs: Record<number, string> = {};
          response.data.scenarios.forEach((s) => {
            initialTabs[s.id] = "narrative";
          });
          setActiveTabs(initialTabs);
        }
      } catch (err) {
        console.error("Failed to generate detailed scenarios:", err);
      }
    };

    triggerGeneration();
  }, [axes, company, conversationHistory, forces, generateScenarios]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
        <div className="w-24 h-24 rounded-3xl bg-blue-50 flex items-center justify-center mb-8 animate-pulse shadow-sm">
          <Sparkles className="w-12 h-12 text-blue-600 animate-spin-slow" />
        </div>
        <h2 className="text-3xl font-black text-[#0F172A] mb-4 tracking-tighter">
          Synthesizing Strategic Worlds
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
          Our AI is weaving complex narratives based on your strategic axes.
          This may take up to 2 minutes as we calculate cross-sector
          implications and signposts.
        </p>
        <div className="mt-8 flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">
            Processing Scenario Engine...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
        <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-8 shadow-sm">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-black text-[#0F172A] mb-4">
          Scenario Synthesis Interrupted
        </h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
          We encountered an issue during the AI generation process. This could
          be due to a timeout or connection issue.
        </p>
        <button
          onClick={() => globalThis.location.reload()}
          className="px-10 py-4 bg-[#0F172A] text-white rounded-2xl font-bold flex items-center gap-2 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
        >
          Retry Synthesis
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  const COLORS = [
    {
      border: "border-blue-500",
      bg: "bg-blue-500",
      text: "text-blue-600",
      light: "bg-blue-50",
    },
    {
      border: "border-emerald-500",
      bg: "bg-emerald-500",
      text: "text-emerald-600",
      light: "bg-emerald-50",
    },
    {
      border: "border-amber-500",
      bg: "bg-amber-500",
      text: "text-amber-600",
      light: "bg-amber-50",
    },
    {
      border: "border-rose-500",
      bg: "bg-rose-500",
      text: "text-rose-600",
      light: "bg-rose-50",
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-20 animate-in fade-in duration-700">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shadow-sm">
              <LayoutGrid className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Strategic Output Phase
            </span>
          </div>
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
            Scenario Discovery Board
          </h1>
          <p className="text-slate-500 mt-2 font-medium max-w-2xl">
            Four plausible futures for{" "}
            <span className="text-blue-600 font-bold">{company.name}</span>{" "}
            based on the critical uncertainties of {axes?.axisA.label} vs{" "}
            {axes?.axisB.label}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-4 items-start">
        {scenarios.map((s, idx) => {
          const color = COLORS[idx % COLORS.length];
          const activeTab = activeTabs[s.id] || "narrative";

          return (
            <div
              key={s.id}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden flex flex-col group"
            >
              <div className={`h-2 w-full ${color.bg}`} />

              <div className="p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Scenario {String.fromCodePoint(65 + idx)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-[#0F172A] tracking-tight group-hover:text-blue-600 transition-colors">
                      {s.name}
                    </h2>
                  </div>
                </div>

                {/* Tabs Implementation */}
                <div className="flex gap-1 bg-slate-50 p-1.5 rounded-2xl mb-8 border border-slate-100/50">
                  {[
                    { id: "narrative", label: "Narrative", icon: Sparkles },
                    { id: "implications", label: "Implications", icon: Target },
                    { id: "signposts", label: "Signposts", icon: Search },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() =>
                        setActiveTabs({ ...activeTabs, [s.id]: tab.id })
                      }
                      className={`
                        flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer
                        ${
                          activeTab === tab.id
                            ? "bg-white text-[#0F172A] shadow-sm border border-slate-200"
                            : "text-slate-400 hover:text-slate-600"
                        }
                      `}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 min-h-[300px] flex flex-col">
                  {activeTab === "narrative" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex-1 flex flex-col">
                      <div className="flex-1">
                        <p className="text-slate-600 text-sm leading-relaxed font-medium whitespace-pre-line text-justify italic border-l-4 border-slate-100 pl-6 py-2">
                          {truncateText(s.story, 50).truncated}
                        </p>
                      </div>
                      {truncateText(s.story, 50).needsMore && (
                        <button
                          onClick={() =>
                            openModal(
                              `Scenario ${String.fromCodePoint(65 + idx)}: Full Narrative`,
                              s.story,
                              "narrative",
                            )
                          }
                          className={`mt-4 w-fit flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${color.text} hover:opacity-70 transition-all cursor-pointer`}
                        >
                          <Plus className="w-3 h-3" />
                          See More
                        </button>
                      )}
                    </div>
                  )}

                  {activeTab === "implications" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex-1 flex flex-col">
                      <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 flex-1">
                        <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-widest mb-4">
                          Strategic Implications
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed font-semibold whitespace-pre-line">
                          {truncateText(s.implications, 50).truncated}
                        </p>
                      </div>
                      {truncateText(s.implications, 50).needsMore && (
                        <button
                          onClick={() =>
                            openModal(
                              `Scenario ${String.fromCodePoint(65 + idx)}: Strategic Implications`,
                              s.implications,
                              "implications",
                            )
                          }
                          className={`mt-4 w-fit flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${color.text} hover:opacity-70 transition-all cursor-pointer`}
                        >
                          <Plus className="w-3 h-3" />
                          See More
                        </button>
                      )}
                    </div>
                  )}

                  {activeTab === "signposts" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <ul className="space-y-4">
                        {s.signposts.map((post, pIdx) => (
                          <li key={pIdx} className="flex gap-4 group/item">
                            <div
                              className={`w-6 h-6 rounded-lg ${color.light} flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${color.bg}`}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-600 leading-relaxed">
                              {post}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Text Modal */}
      {modalData.isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 w-full h-full bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 cursor-default border-none outline-none"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-3xl max-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 flex flex-col">
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                  Scenario deep-dive
                </span>
                <h3 className="text-xl font-black text-[#0F172A] tracking-tight">
                  {modalData.title}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-[#0F172A] hover:shadow-md transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-10 py-10 overflow-y-auto flex-1 custom-scrollbar">
              {modalData.type === "narrative" ? (
                <p className="text-slate-600 text-base leading-relaxed font-medium whitespace-pre-line text-justify italic border-l-4 border-blue-500 pl-8">
                  {modalData.content}
                </p>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Target className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">
                      Calculated Impacts
                    </span>
                  </div>
                  <p className="text-slate-700 text-base leading-relaxed font-semibold whitespace-pre-line bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                    {modalData.content}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-10 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-end">
              <button
                onClick={closeModal}
                className="px-8 py-3 bg-[#0F172A] text-white rounded-xl font-bold text-sm hover:shadow-lg cursor-pointer transition-all active:scale-95"
              >
                Close Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default ScenarioResultView;

"use client";

import React from "react";
import { AxisResult, ScenarioResult } from "../types/newScenario.types";
import {
  Info,
  ArrowUp,
  ArrowRight as ArrowRightIcon,
  ArrowDown,
  ArrowLeft,
} from "lucide-react";

interface ScenarioMatrixItem {
  name: string;
  summary?: string;
  implications?: string;
}

interface StrategicMatrixChartProps {
  axisA: AxisResult; // Y-axis (Vertical)
  axisB: AxisResult; // X-axis (Horizontal)
  scenarios?:
    | {
        topRight: { name: string; summary: string; implications?: string };
        topLeft: { name: string; summary: string; implications?: string };
        bottomLeft: { name: string; summary: string; implications?: string };
        bottomRight: { name: string; summary: string; implications?: string };
      }
    | ScenarioResult[];
}

const StrategicMatrixChart: React.FC<StrategicMatrixChartProps> = ({
  axisA,
  axisB,
  scenarios,
}) => {
  // Helper to map flat array to quadrants if necessary
  const getMappedScenarios = () => {
    if (!scenarios) return null;
    if (!Array.isArray(scenarios)) return scenarios;

    // Mapping based on A2/A1 (Vertical) and B2/B1 (Horizontal)
    // Top Left: A2 + B1
    // Top Right: A2 + B2
    // Bottom Left: A1 + B1
    // Bottom Right: A1 + B2
    return {
      topLeft: (scenarios.find(
        (s) => s.combination === "A2+B1",
      ) as ScenarioMatrixItem) || {
        name: "Scenario I",
        summary: "",
        implications: "",
      },
      topRight: (scenarios.find(
        (s) => s.combination === "A2+B2",
      ) as ScenarioMatrixItem) || {
        name: "Scenario II",
        summary: "",
        implications: "",
      },
      bottomLeft: (scenarios.find(
        (s) => s.combination === "A1+B1",
      ) as ScenarioMatrixItem) || {
        name: "Scenario III",
        summary: "",
        implications: "",
      },
      bottomRight: (scenarios.find(
        (s) => s.combination === "A1+B2",
      ) as ScenarioMatrixItem) || {
        name: "Scenario IV",
        summary: "",
        implications: "",
      },
    };
  };

  const mapped = getMappedScenarios();

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-6 overflow-visible min-h-[580px]">
      <div className="relative w-full max-w-[24rem] aspect-square mx-auto">
        {/* Main Matrix Grid */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200">
          {/* Top Left Quadrant */}
          <div className="bg-gradient-to-br from-amber-50/70 to-transparent p-6 flex flex-col items-center justify-center text-center border-b border-r border-slate-100 group relative">
            <h4 className="text-sm sm:text-base font-black text-amber-600 mb-2 uppercase tracking-wide group-hover:scale-105 transition-transform z-10">
              {mapped?.topLeft?.name || "Scenario I"}
            </h4>
            {/* <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 leading-relaxed px-2 sm:px-4 opacity-80 z-10 line-clamp-4">
              {mapped?.topLeft?.summary || mapped?.topLeft?.implications || ""}
            </p> */}
          </div>

          {/* Top Right Quadrant */}
          <div className="bg-gradient-to-bl from-emerald-50/70 to-transparent p-6 flex flex-col items-center justify-center text-center border-b border-slate-100 group relative">
            <h4 className="text-sm sm:text-base font-black text-emerald-600 mb-2 uppercase tracking-wide group-hover:scale-105 transition-transform z-10">
              {mapped?.topRight?.name || "Scenario II"}
            </h4>
            {/* <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 leading-relaxed px-2 sm:px-4 opacity-80 z-10 line-clamp-4">
              {mapped?.topRight?.summary || mapped?.topRight?.implications || ""}
            </p> */}
          </div>

          {/* Bottom Left Quadrant */}
          <div className="bg-gradient-to-tr from-rose-50/70 to-transparent p-6 flex flex-col items-center justify-center text-center border-r border-slate-100 group relative">
            <h4 className="text-sm sm:text-base font-black text-rose-600 mb-2 uppercase tracking-wide group-hover:scale-105 transition-transform z-10">
              {mapped?.bottomLeft?.name || "Scenario III"}
            </h4>
            {/* <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 leading-relaxed px-2 sm:px-4 opacity-80 z-10 line-clamp-4">
              {mapped?.bottomLeft?.summary || mapped?.bottomLeft?.implications || ""}
            </p> */}
          </div>

          {/* Bottom Right Quadrant */}
          <div className="bg-gradient-to-tl from-blue-50/70 to-transparent p-6 flex flex-col items-center justify-center text-center group relative">
            <h4 className="text-sm sm:text-base font-black text-blue-600 mb-2 uppercase tracking-wide group-hover:scale-105 transition-transform z-10">
              {mapped?.bottomRight?.name || "Scenario IV"}
            </h4>
            {/* <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 leading-relaxed px-2 sm:px-4 opacity-80 z-10 line-clamp-4">
              {mapped?.bottomRight?.summary || mapped?.bottomRight?.implications || ""}
            </p> */}
          </div>

          {/* Internal Axes Dividers */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 pointer-events-none" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 pointer-events-none" />
        </div>

        {/* Central Origin Node */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-white -translate-x-1/2 -translate-y-1/2 shadow-sm z-20 pointer-events-none flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>

        {/* =======================
            Y-AXIS (VERTICAL) LABELS
            ======================= */}

        {/* Top Label (High) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+1.5rem)] flex flex-col items-center z-30 w-[280px]">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
            {axisA.label}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[11px] font-black text-emerald-600 flex items-center gap-1.5 uppercase tracking-wide">
              <ArrowUp className="w-3 h-3" />
              {axisA.poleA2 || axisA.pole2}
            </div>
            <div className="mt-1 text-[9px] font-medium text-slate-500 max-w-[220px] text-center italic">
              {axisA.selectedForce}
            </div>
          </div>
        </div>

        {/* Bottom Label (Low) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+1.5rem)] flex flex-col items-center z-30 w-[280px]">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
            {axisA.label}
          </div>
          <div className="text-[11px] font-black text-rose-500 flex items-center gap-1.5 uppercase tracking-wide">
            <ArrowDown className="w-3 h-3" />
            {axisA.poleA1 || axisA.pole1}
          </div>
        </div>

        {/* =======================
            X-AXIS (HORIZONTAL) LABELS
            ======================= */}

        {/* Right Label (High) */}
        <div className="absolute right-0 top-1/2 translate-x-[calc(100%+0.75rem)] -translate-y-1/2 flex flex-col items-start z-30 w-[140px]">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 pl-1">
            {axisB.label}
          </div>
          <div className="flex flex-col items-start">
            <div className="text-[10px] font-black text-emerald-600 flex items-center gap-1 uppercase tracking-wide">
              <ArrowRightIcon className="w-2.5 h-2.5" />
              {axisB.poleB2 || axisB.pole2}
            </div>
            <div className="mt-1 text-[8px] font-medium text-slate-500 max-w-[130px] italic line-clamp-2 leading-tight">
              {axisB.selectedForce}
            </div>
          </div>
        </div>

        {/* Left Label (Low) */}
        <div className="absolute left-0 top-1/2 -translate-x-[calc(100%+0.75rem)] -translate-y-1/2 flex flex-col items-end z-30 w-[140px]">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 pr-1">
            {axisB.label}
          </div>
          <div className="text-[10px] font-black text-rose-500 flex items-center gap-1 uppercase tracking-wide">
            <ArrowLeft className="w-2.5 h-2.5" />
            {axisB.poleB1 || axisB.pole1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicMatrixChart;

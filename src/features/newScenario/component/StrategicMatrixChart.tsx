"use client";

import React from "react";
import { AxisResult } from "../types/newScenario.types";
import {
  Info,
  ArrowUp,
  ArrowRight as ArrowRightIcon,
  ArrowDown,
  ArrowLeft,
} from "lucide-react";

interface StrategicMatrixChartProps {
  axisA: AxisResult; // Y-axis (Vertical)
  axisB: AxisResult; // X-axis (Horizontal)
  scenarios?: {
    topRight: { name: string; summary: string };
    topLeft: { name: string; summary: string };
    bottomLeft: { name: string; summary: string };
    bottomRight: { name: string; summary: string };
  };
}

const StrategicMatrixChart: React.FC<StrategicMatrixChartProps> = ({
  axisA,
  axisB,
  scenarios,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-12 overflow-visible min-h-[700px]">
      <div className="relative w-full max-w-[28rem] aspect-square mx-auto">
        {/* Main Matrix Grid */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200">
          {/* Top Left Quadrant */}
          <div className="bg-gradient-to-br from-amber-50/70 to-transparent p-6 flex flex-col items-center justify-center text-center border-b border-r border-slate-100 group relative">
            <h4 className="text-sm sm:text-base font-black text-amber-600 mb-2 uppercase tracking-wide group-hover:scale-105 transition-transform z-10">
              {scenarios?.topLeft?.name || "Scenario I"}
            </h4>
            {/* <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 leading-relaxed px-2 sm:px-4 opacity-80 z-10 line-clamp-4">
              {scenarios?.topLeft?.summary}
            </p> */}
          </div>

          {/* Top Right Quadrant */}
          <div className="bg-gradient-to-bl from-emerald-50/70 to-transparent p-6 flex flex-col items-center justify-center text-center border-b border-slate-100 group relative">
            <h4 className="text-sm sm:text-base font-black text-emerald-600 mb-2 uppercase tracking-wide group-hover:scale-105 transition-transform z-10">
              {scenarios?.topRight?.name || "Scenario II"}
            </h4>
            {/* <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 leading-relaxed px-2 sm:px-4 opacity-80 z-10 line-clamp-4">
              {scenarios?.topRight?.summary}
            </p> */}
          </div>

          {/* Bottom Left Quadrant */}
          <div className="bg-gradient-to-tr from-rose-50/70 to-transparent p-6 flex flex-col items-center justify-center text-center border-r border-slate-100 group relative">
            <h4 className="text-sm sm:text-base font-black text-rose-600 mb-2 uppercase tracking-wide group-hover:scale-105 transition-transform z-10">
              {scenarios?.bottomLeft?.name || "Scenario III"}
            </h4>
            {/* <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 leading-relaxed px-2 sm:px-4 opacity-80 z-10 line-clamp-4">
              {scenarios?.bottomLeft?.summary}
            </p> */}
          </div>

          {/* Bottom Right Quadrant */}
          <div className="bg-gradient-to-tl from-blue-50/70 to-transparent p-6 flex flex-col items-center justify-center text-center group relative">
            <h4 className="text-sm sm:text-base font-black text-blue-600 mb-2 uppercase tracking-wide group-hover:scale-105 transition-transform z-10">
              {scenarios?.bottomRight?.name || "Scenario IV"}
            </h4>
            {/* <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 leading-relaxed px-2 sm:px-4 opacity-80 z-10 line-clamp-4">
              {scenarios?.bottomRight?.summary}
            </p> */}
          </div>

          {/* Internal Axes Dividers */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 pointer-events-none" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 pointer-events-none" />
        </div>

        {/* Central Origin Node */}
        <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full bg-slate-800 border-4 border-white -translate-x-1/2 -translate-y-1/2 shadow-sm z-20 pointer-events-none flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>

        {/* =======================
            Y-AXIS (VERTICAL) LABELS
            ======================= */}

        {/* Top Label (High) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center group z-30 w-[300px] pb-6">
          {/* Line extending out */}
          <div className="w-1 h-6 bg-slate-800 absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none flex justify-center">
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-slate-800 -mt-1" />
          </div>

          <div className="flex flex-col items-center bg-white/60 backdrop-blur-xl p-3 border border-white/40 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 transition-all group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:-translate-y-1">
            <div className="text-[11px] sm:text-[12px] font-black text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full mt-2 border border-emerald-200 shadow-sm flex items-center gap-1.5">
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              HIGH: {axisA.poleA2 || axisA.pole2}
            </div>
          </div>
        </div>

        {/* Bottom Label (Low) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full flex flex-col items-center z-30 w-[300px] pt-6 group">
          {/* Line extending out */}
          <div className="w-0.5 h-6 bg-slate-300 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none flex justify-center items-end">
            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-300 -mb-1" />
          </div>

          <div className="flex flex-col items-center bg-white/60 backdrop-blur-xl p-3 border border-white/40 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5 transition-all group-hover:-translate-y-1">
            <div className="text-[11px] sm:text-[12px] font-black text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200 shadow-sm flex items-center gap-1.5">
              <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              LOW: {axisA.poleA1 || axisA.pole1}
            </div>
          </div>
        </div>

        {/* =======================
            X-AXIS (HORIZONTAL) LABELS
            ======================= */}

        {/* Right Label (High) */}
        <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 flex flex-col justify-center items-start group z-30 w-[280px] pl-6">
          {/* Line extending out */}
          <div className="h-1 w-6 bg-slate-800 absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-end">
            <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-slate-800 -mr-1" />
          </div>

          <div className="flex flex-col items-start bg-white/60 backdrop-blur-xl p-4 border border-white/40 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 transition-all group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:translate-x-1">
            <div className="text-[11px] sm:text-[12px] font-black text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full mt-2.5 border border-emerald-200 shadow-sm flex items-center gap-1.5 w-fit">
              <ArrowRightIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              HIGH: {axisB.poleB2 || axisB.pole2}
            </div>
          </div>
        </div>

        {/* Left Label (Low) */}
        <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 flex flex-col justify-center items-end z-30 w-[240px] pr-6 group">
          {/* Line extending out */}
          <div className="h-0.5 w-6 bg-slate-300 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-start">
            <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-r-[6px] border-t-transparent border-b-transparent border-r-slate-300 -ml-1" />
          </div>

          <div className="flex flex-col items-end bg-white/60 backdrop-blur-xl p-3 border border-white/40 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5 transition-all group-hover:-translate-x-1">
            <div className="text-[11px] sm:text-[12px] font-black text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200 shadow-sm flex items-center gap-1.5 w-fit">
              <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              LOW: {axisB.poleB1 || axisB.pole1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicMatrixChart;

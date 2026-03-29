"use client";

import React from "react";
import { AxisResult } from "../types/newScenario.types";
import { Info } from "lucide-react";

interface StrategicMatrixChartProps {
  axisA: AxisResult; // X-axis (Regulatory Environment)
  axisB: AxisResult; // Y-axis (Client Trust & Adoption)
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
    <div className="w-full flex flex-col items-center gap-12 py-10">
      {/* Matrix Container */}
      <div className="relative w-full max-w-2xl aspect-square bg-white shadow-2xl rounded-3xl overflow-visible border border-slate-200">
        {/* Horizontal Axis (X) Line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-300 -translate-y-1/2" />
        {/* Vertical Axis (Y) Line */}
        <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-slate-300 -translate-x-1/2" />

        {/* Quadrants Backdrop / Coloring */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-1.5 pt-4">
          {/* Top Left - Yellow */}
          <div className="bg-transparent rounded-tl-2xl flex flex-col items-center justify-center p-4 text-center">
            <h4 className="text-sm font-black text-amber-600 mb-2 uppercase tracking-wider">
              {scenarios?.topLeft?.name || "Scenario I"}
            </h4>
            {scenarios?.topLeft?.summary && (
              <p className="text-[10px] font-bold text-slate-400 leading-snug break-words whitespace-normal px-2">
                {scenarios.topLeft.summary}
              </p>
            )}
          </div>

          {/* Top Right - Green */}
          <div className="bg-transparent rounded-tr-2xl flex flex-col items-center justify-center p-4 text-center">
            <h4 className="text-sm font-black text-emerald-600 mb-2 uppercase tracking-wider">
              {scenarios?.topRight?.name || "Scenario II"}
            </h4>
            {scenarios?.topRight?.summary && (
              <p className="text-[10px] font-bold text-slate-400 leading-snug break-words whitespace-normal px-2">
                {scenarios.topRight.summary}
              </p>
            )}
          </div>

          {/* Bottom Left - Red */}
          <div className="bg-transparent rounded-bl-2xl flex flex-col items-center justify-center p-4 text-center">
            <h4 className="text-sm font-black text-rose-600 mb-2 uppercase tracking-wider">
              {scenarios?.bottomLeft?.name || "Scenario III"}
            </h4>
            {scenarios?.bottomLeft?.summary && (
              <p className="text-[10px] font-bold text-slate-400 leading-snug break-words whitespace-normal px-2">
                {scenarios.bottomLeft.summary}
              </p>
            )}
          </div>

          {/* Bottom Right - Blue */}
          <div className="bg-transparent rounded-br-2xl flex flex-col items-center justify-center p-4 text-center">
            <h4 className="text-sm font-black text-blue-600 mb-2 uppercase tracking-wider">
              {scenarios?.bottomRight?.name || "Scenario IV"}
            </h4>
            {scenarios?.bottomRight?.summary && (
              <p className="text-[10px] font-bold text-slate-400 leading-snug break-words whitespace-normal px-2">
                {scenarios.bottomRight.summary}
              </p>
            )}
          </div>
        </div>

        {/* Pole Labels (X Axis - Horizontal) */}
        {/* Left Pole */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4 w-40 text-right">
          <p className="text-[10px] font-black text-slate-600 leading-tight break-words uppercase tracking-tighter">
            {axisA.poleA1 || axisA.pole1}
          </p>
        </div>

        {/* Right Pole */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4 w-40 text-left">
          <p className="text-[10px] font-black text-slate-600 leading-tight break-words uppercase tracking-tighter">
            {axisA.poleA2 || axisA.pole2}
          </p>
        </div>

        {/* Pole Labels (Y Axis - Vertical) */}
        {/* Top Pole */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-4 w-48 text-center">
          <p className="text-[10px] font-black text-slate-600 leading-tight break-words uppercase tracking-tighter">
            {axisB.poleB2 || axisB.pole2}
          </p>
        </div>

        {/* Bottom Pole */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-4 w-48 text-center">
          <p className="text-[10px] font-black text-slate-600 leading-tight break-words uppercase tracking-tighter">
            {axisB.poleB1 || axisB.pole1}
          </p>
        </div>
      </div>

      {/* Axis Labels (Titles) */}
      <div className="flex flex-col items-center gap-4 w-full px-20 relative">
        {/* X-Axis Title (Bottom Center) */}
        <div className="space-y-1 text-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            X-Axis Variable
          </span>
          <h5 className="text-xl font-black text-[#0F172A] tracking-tight">
            {axisA.label}
          </h5>
        </div>

        {/* Y-Axis Title (Left Side, Rotated) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">
          <div className="space-y-1 text-center translate-x-1/2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Y-Axis Variable
            </span>
            <h5 className="text-lg font-black text-[#0F172A] tracking-tight">
              {axisB.label}
            </h5>
          </div>
        </div>
      </div>

      {/* Rationales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-8">
        {[
          { axis: axisA, type: "Horizontal" },
          { axis: axisB, type: "Vertical" },
        ].map(({ axis, type }) => (
          <div
            key={type}
            className="bg-slate-50/70 p-6 rounded-3xl border border-slate-100 flex flex-col gap-3 group hover:bg-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                {type === "Horizontal" ? "Horizontal" : "Vertical"} Rationale
              </span>
            </div>
            <p className="text-[13px] text-[#0F172A]/80 leading-relaxed font-semibold">
              {axis.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategicMatrixChart;

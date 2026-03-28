"use client";

import React from "react";
import { MatrixData, AxisResult } from "../types/newScenario.types";

interface ScenarioMatrixViewProps {
  matrix: MatrixData;
  axisA: AxisResult; // X-axis (Horizontal: Regulatory Environment)
  axisB: AxisResult; // Y-axis (Vertical: Oil Price Trajectory)
}

const ScenarioMatrixView: React.FC<ScenarioMatrixViewProps> = ({
  matrix,
  axisA,
  axisB,
}) => {
  // Mapping logic based on the minimalist Cartesian reference:
  // X: Regulatory Environment (A1: Closed [Left], A2: Open [Right])
  // Y: Oil Price Trajectory (B2: High [Top], B1: Low [Bottom])
  const quadrants = [
    {
      title: matrix.scenarioB.title, // (X-, Y+) -> Top Left
      narrative: matrix.scenarioB.narrative,
      color: "#D4AF37", // Gilded Gold
      pos: "top-left",
    },
    {
      title: matrix.scenarioA.title, // (X+, Y+) -> Top Right
      narrative: matrix.scenarioA.narrative,
      color: "#2E7D32", // Golden Green
      pos: "top-right",
    },
    {
      title: matrix.scenarioC.title, // (X-, Y-) -> Bottom Left
      narrative: matrix.scenarioC.narrative,
      color: "#C62828", // Desert Red
      pos: "bottom-left",
    },
    {
      title: matrix.scenarioD.title, // (X+, Y-) -> Bottom Right
      narrative: matrix.scenarioD.narrative,
      color: "#1565C0", // Disruptor Blue
      pos: "bottom-right",
    },
  ];

  const stripPole = (text: string) => text.split("(")[0].trim();

  return (
    <div className="w-full py-20 px-4 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto relative h-[800px]">
        {/* Y-Axis Label (Top Center) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
          <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">
            {axisB.label}
          </h3>
          <p className="text-sm font-semibold text-blue-900/60 uppercase tracking-widest">
            {stripPole(axisB.pole2)}
          </p>
        </div>

        {/* X-Axis Label (Vertical Center Right) */}
        <div className="absolute top-1/2 right-0 translate-x-12 -translate-y-1/2 flex items-center h-full">
          <h3 className="text-xl font-bold text-[#0F172A] tracking-tight transform rotate-90 origin-center whitespace-nowrap px-8">
            {axisA.label}
          </h3>
        </div>

        {/* Central Cross Lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[2px] bg-[#0F172A] relative" />{" "}
          {/* X Axis Line */}
          <div className="h-[85%] w-[2px] bg-[#0F172A] absolute" />{" "}
          {/* Y Axis Line */}
        </div>

        {/* End Labels (Extremes) */}
        <div className="absolute top-1/2 left-[3%] -translate-y-1/2">
          <p className="text-sm font-black text-red-900/80 uppercase tracking-widest bg-white pr-4">
            {stripPole(axisA.pole1)}
          </p>
        </div>
        <div className="absolute top-1/2 right-[3%] -translate-y-1/2 text-right">
          <p className="text-sm font-black text-emerald-900/80 uppercase tracking-widest bg-white pl-4">
            {stripPole(axisA.pole2)}
          </p>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm font-black text-blue-900/60 uppercase tracking-widest">
            {stripPole(axisB.pole1)}
          </p>
        </div>

        {/* Quadrants Grid */}
        <div className="absolute inset-x-[10%] inset-y-[10%] grid grid-cols-2 grid-rows-2">
          {quadrants.map((q, idx) => (
            <div
              key={idx}
              className={`p-12 flex flex-col justify-center max-w-[480px] group transition-all duration-300 hover:scale-[1.02]`}
            >
              <h4
                className="text-2xl font-black mb-4 tracking-tighter"
                style={{ color: q.color }}
              >
                {q.title}
              </h4>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                {q.narrative}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Tooltip Legend (Optional but good for UX) */}
      <div className="max-w-4xl mx-auto mt-20 border-t border-slate-100 pt-10 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em]">
          Cartesian Strategic Framework • Final Output
        </p>
      </div>
    </div>
  );
};

export default ScenarioMatrixView;

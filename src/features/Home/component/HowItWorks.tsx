"use client";

import {
  HelpCircle,
  Target,
  Sparkles,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

const steps = [
  {
    icon: HelpCircle,
    title: "Define Question",
    desc: "Input your strategic core inquiry",
    tooltip:
      "Define the core strategic decision you want to explore and clarify your business objective.",
  },
  {
    icon: Target,
    title: "Moving Factors",
    desc: "Input your strategic core inquiry",
    tooltip:
      "Identify key external factors Stirdeeper that could impact your strategy and future outcomes.",
  },
  {
    icon: Sparkles,
    title: "Generate Scenarios",
    desc: "Input your strategic core inquiry",
    tooltip:
      "Create multiple possible future scenarios based on uncertainties and market dynamics.",
  },
  {
    icon: TrendingUp,
    title: "Wind Tunneling",
    desc: "Input your strategic core inquiry",
    tooltip:
      "Test your strategy against each scenario to identify risks, weaknesses, and strengths.",
  },
  {
    icon: Lightbulb,
    title: "Generate Insights",
    desc: "Input your strategic core inquiry",
    tooltip:
      "Get actionable insights, no-regret moves, and strategic recommendations.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            How It Works
          </h2>

          <p className="mt-4 text-sm md:text-lg text-[#6b7280]">
            Five steps from uncertainty to high-conviction decision making.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:justify-between">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="relative group flex flex-col items-center text-center max-w-[160px] cursor-pointer"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1f2937] bg-secondary">
                  <Icon className="h-5 w-5 text-[#1f2937]" />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base font-semibold text-[#1f2937]">
                  {item.title}
                </h3>

                {/* Description */}
                {/* <p className="mt-2 text-sm text-[#6b7280]">{item.desc}</p> */}

                {/* Tooltip */}
                <div className="absolute -top-24 w-64 rounded-lg bg-[#0B1533] text-white text-xs px-4 py-3 opacity-0 group-hover:opacity-100 transition duration-300 shadow-lg pointer-events-none">
                  {item.tooltip}

                  {/* Arrow */}
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0B1533] rotate-45"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Brain, Radar, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Scenario Generator",
    desc: "Leverage LLMs and proprietary data models to instantly visualize multiple divergent futures.",
  },
  {
    icon: Radar,
    title: "Strategy Stress Testing",
    desc: "Run your current roadmap against 10,000+ edge cases to identify hidden vulnerabilities.",
  },
  {
    icon: BarChart3,
    title: "Board-Ready Reports",
    desc: "Synthesize complex data into executive-grade presentations and strategy memos in seconds.",
  },
];

export default function MeetSecondSight() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            Meet Second Sight
          </h2>

          <p className="mt-4 text-sm md:text-lg text-[#6b7280]">
            The ultimate toolkit for high-stakes strategic foresight.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-[#d6dee6] p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="h-5 w-5 text-[#1f2937]" />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-semibold text-[#1f2937]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

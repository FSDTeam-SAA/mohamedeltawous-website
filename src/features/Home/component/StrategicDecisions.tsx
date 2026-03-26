"use client";

import { Users, User, Wallet, Lightbulb } from "lucide-react";

const data = [
  {
    icon: Users,
    title: "Strategy Teams",
    desc: "Transition from static annual plans to dynamic strategic foresight operations.",
  },
  {
    icon: User,
    title: "CEOs",
    desc: "Make high-stakes capital allocation decisions with validated scenario data.",
  },
  {
    icon: Wallet,
    title: "Private Equity",
    desc: "Stress test portfolio companies against macro shocks and competitive shifts.",
  },
  {
    icon: Lightbulb,
    title: "Consulting",
    desc: "Deliver high-velocity intelligence projects with board-ready AI-powered outputs.",
  },
];

export default function StrategicDecisions() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mx-auto container">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1f2937]">
            Strategic decisions are harder than ever.
          </h2>

          <p className="mt-4 text-sm md:text-lg text-[#6b7280]">
            Traditional planning methods fail in the face of modern complexity.
            Move beyond linear forecasts and spreadsheets.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-[#d6dee6] p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
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

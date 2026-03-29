"use client";

import Link from "next/link";

export default function StartExploring() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/StartExploring.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Start Exploring Strategic <br />
            Futures Today.
          </h2>

          <p className="mt-5 text-sm md:text-lg text-white/80 max-w-2xl mx-auto">
            Join elite strategy teams using Second Sight to navigate uncertainty
            with clarity and conviction.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard/new-scenario"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Start Scenario Analysis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

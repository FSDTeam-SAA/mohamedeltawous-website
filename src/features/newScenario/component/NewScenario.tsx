"use client";

export default function NewScenario() {
  return (
    <section className="bg-[#dbeaf4] min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Steps */}
        <div className="flex justify-between items-center mb-10 text-center">
          {[
            "Strategic Question",
            "Company Profile",
            "Moving Factors",
            "Scenario Matrix",
          ].map((step, i) => (
            <div key={i} className="flex-1">
              <div
                className={`mx-auto w-8 h-8 flex items-center justify-center rounded ${
                  i === 0
                    ? "bg-[#0B1533] text-white"
                    : "bg-gray-300 text-gray-600"
                } text-sm font-semibold`}
              >
                {i + 1}
              </div>
              <p className="text-xs mt-2 text-gray-600">{step}</p>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Title */}
          <h2 className="text-xl font-semibold text-[#1f2937]">
            Define Your Strategic Question
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter the key decision or focal issue you want to explore through
            scenario planning.
          </p>

          {/* Project Title */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              placeholder="Example: Digital Banking Strategy 2030"
              className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B1533]"
            />
            <p className="text-xs text-gray-400 mt-1">
              This will be the internal name for your analysis report.
            </p>
          </div>

          {/* Textarea */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Focal Issue / Strategic Question
            </label>
            <textarea
              rows={5}
              placeholder="Example: Should we invest in a digital wealth management platform over the next 5 years?"
              className="mt-2 w-full border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0B1533]"
            />
            <p className="text-xs text-gray-400 mt-1">
              A good strategic question is open-ended and focused on long-term
              value.
            </p>
          </div>

          {/* AI Tip */}
          <div className="mt-6 bg-[#e6f0f7] border border-[#cbd9e6] rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold text-[#1f2937] mb-1">
              ✨ AI ASSISTANT TIP
            </p>
            <p>
              Try to include a specific timeframe and a core business metric.
              For example: “How will the rise of decentralized finance impact
              our retail market share in the EU by 2032?”
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-between">
            <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300">
              Back
            </button>

            <button className="bg-[#0B1533] text-white px-6 py-2 rounded-md hover:opacity-90">
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

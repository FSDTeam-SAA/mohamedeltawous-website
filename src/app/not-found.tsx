"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white p-6">
      <Card className="max-w-lg w-full text-center shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md animate-fadeIn rounded-3xl">
        <CardContent className="py-12">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#0B1533]/10 p-4 rounded-full">
              <Clock className="w-10 h-10 text-[#0B1533]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0B1533]">
            Coming Soon
          </h1>

          {/* Subtitle */}
          <p className="text-md md:text-lg mb-8 text-gray-600 text-center">
            🚀 We’re working hard to bring this feature to life.
            <br />
            Stay tuned — something amazing is on the way!
          </p>

          {/* Button */}
          <Link href="/" className="flex justify-center">
            <Button className="bg-[#0B1533] text-white hover:bg-[#1a2445] px-6 py-3 text-lg font-medium cursor-pointer flex items-center gap-2 transition-transform hover:scale-105">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

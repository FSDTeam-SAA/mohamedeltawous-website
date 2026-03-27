import React, { ReactNode } from "react";

interface DashboardPageLayoutProps {
  readonly children: ReactNode;
  readonly className?: string; // Optional extra classes for the card wrapper
}

export default function DashboardPageLayout({
  children,
  className = "",
}: DashboardPageLayoutProps) {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <div
        className={`bg-card text-card-foreground shadow-sm border border-border/50 rounded-xl p-4 md:p-6 lg:p-8 w-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

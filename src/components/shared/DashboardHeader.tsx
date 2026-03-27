import React, { ReactNode } from "react";

interface DashboardHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly action?: ReactNode;
}

export default function DashboardHeader({
  title,
  subtitle,
  action,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 mb-6 border-b border-border/60">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

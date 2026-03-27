"use client";

import { Suspense, useState } from "react";
import DashboardNavbar from "@/components/shared/DashboardNavbar";
import DashboardSidebar from "@/components/shared/DashboardSidebar";

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#EEF7FC] dark:bg-background">
      <Suspense fallback={<div className="h-[72px] bg-white border-b" />}>
        <DashboardNavbar
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </Suspense>

      <div className="flex flex-1 h-[calc(100vh-72px)] overflow-hidden relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-[280px] shrink-0 h-full">
          <Suspense fallback={<div className="bg-[#0B1525] w-full h-full" />}>
            <DashboardSidebar />
          </Suspense>
        </div>

        {/* Mobile Sidebar overlay */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/50 top-[72px]"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          >
            <div
              className="w-[280px] h-full cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <DashboardSidebar onNavClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main content area */}
        <main className="flex-1 w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

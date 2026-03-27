"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Switch style after 20px of scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-secondary backdrop-blur-lg border-b border-gray-200/50 shadow-sm py-0"
          : "bg-transparent shadow-none py-2 border-b border-gray-200/70"
      }`}
    >
      <div className="container mx-auto flex h-[80px] md:h-[100px] items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Second Sight Logo"
            width={110}
            height={60}
            className="h-auto w-[78px] sm:w-[90px] md:w-[110px]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-[15px] lg:text-[16px] font-medium transition ${
                  active
                    ? "text-[#111827]"
                    : "text-[#334155] hover:text-[#111827]"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-1/2 -bottom-[6px] h-[2px] -translate-x-1/2 bg-[#1f2937] transition-all duration-300 ${
                    active ? "w-[56px]" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-8">
          {/* <Link
            href="/login"
            className="hidden sm:inline-flex text-[15px] font-semibold text-[#111827] hover:opacity-80 transition"
          >
            Login
          </Link> */}

          <Link
            href="/dashboard/new-scenario"
            className="hidden sm:inline-flex rounded-lg bg-[#0f172a] px-5 py-2.5 text-[14px] md:px-6 md:py-3.5 md:text-[15px] font-semibold text-white transition hover:opacity-90 shadow-lg shadow-gray-200"
          >
            Start Scenario Analysis
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-[#111827]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-[#d9e3ea] bg-white transition-all duration-300 md:hidden ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto flex flex-col px-4 py-4">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-3 py-3 text-[15px] font-medium transition ${
                  active
                    ? "bg-[#eef7fc] text-[#111827]"
                    : "text-[#334155] hover:bg-[#f8fbfd] hover:text-[#111827]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="/dashboard/new-scenario"
            onClick={() => setIsOpen(false)}
            className="mt-4 inline-flex justify-center rounded-lg bg-[#0f172a] px-4 py-3 text-[14px] font-semibold text-white transition hover:opacity-90 sm:hidden"
          >
            Start Scenario Analysis
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import { LinkedinIcon, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Left */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo.png"
              alt="Second Sight"
              width={120}
              height={60}
            />

            <p className="mt-5 max-w-md text-sm text-[#5f6b7a] leading-relaxed">
              The intelligence layer for the modern boardroom. Transform
              uncertainty into competitive advantage.
            </p>

            <p className="mt-6 text-sm font-medium text-[#1f2937]">Follow us</p>

            <div className="mt-3 flex items-center gap-3">
              <div className="p-2 bg-[#0B1533] rounded">
                <LinkedinIcon size={14} className="text-white" />
              </div>
              <div className="p-2 bg-[#0B1533] rounded">
                <Twitter size={14} className="text-white" />
              </div>
              <div className="p-2 bg-[#0B1533] rounded">
                <Instagram size={14} className="text-white" />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-[#1f2937]">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5f6b7a]">
              <li>Scenario Builder</li>
              <li>Stress Tester</li>
              <li>Risk Engine</li>
              <li>Reporting</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1f2937]">Platform</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5f6b7a]">
              <li>Enterprise Security</li>
              <li>API Access</li>
              <li>Integrations</li>
              <li>Documentation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1f2937]">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5f6b7a]">
              <li>Strategy Blog</li>
              <li>Case Studies</li>
              <li>Playbooks</li>
              <li>Webinars</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1f2937]">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5f6b7a]">
              <li>Sales</li>
              <li>Support</li>
              <li>Partners</li>
              <li>Legal</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#c9d8e3] pt-6">
          <p className="text-sm text-[#5f6b7a]">
            © 2024 SECOND SIGHT AI Platform. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-[#5f6b7a]">
            <span className="hover:text-[#1f2937] cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#1f2937] cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

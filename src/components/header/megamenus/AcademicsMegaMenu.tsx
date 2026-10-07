"use client";

import React from "react";
import { ACADEMICS_RESEARCH_SECTIONS } from "../data/hospitalData";
import { ArrowRight, ChevronRight, GraduationCap, Microscope } from "lucide-react";

interface AcademicsMegaMenuProps {
  onClose: () => void;
}

export default function AcademicsMegaMenu({ onClose }: AcademicsMegaMenuProps) {
  return (
    <div
      role="region"
      aria-label="Academics and Research Mega Menu"
      className="w-full bg-white py-6 animate-in fade-in duration-150"
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-6 h-6 text-[#E31C59]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#123B63] tracking-tight">
                Academics, Medical Education & Research
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Nurturing next-generation healthcare professionals through DNB programs, Nursing, Allied Sciences & Pharmacy.
              </p>
            </div>
          </div>

          <a
            href="/academics"
            onClick={onClose}
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-[#E31C59] hover:text-[#c4144b]"
          >
            <span>Explore All Programs</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 5 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-5">
          {ACADEMICS_RESEARCH_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#123B63] pb-2 border-b border-gray-100">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-2 px-2.5 rounded-lg text-sm text-gray-800 hover:text-[#E31C59] hover:bg-[#E31C59]/5 transition-colors font-semibold"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#E31C59] group-hover:translate-x-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center space-x-2 text-gray-600 font-medium">
            <Microscope className="w-4.5 h-4.5 text-emerald-600" />
            <span>Recognized by National Board of Examinations (NBE) & KUHS</span>
          </div>

          <a
            href="/academics"
            onClick={onClose}
            className="inline-flex items-center space-x-1.5 font-bold text-[#E31C59] hover:text-[#c4144b] transition-colors"
          >
            <span>Explore Academics</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

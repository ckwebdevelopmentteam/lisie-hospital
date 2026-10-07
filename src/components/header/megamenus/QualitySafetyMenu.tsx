"use client";

import React from "react";
import { QUALITY_SAFETY_ITEMS } from "../data/hospitalData";
import { ChevronRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface QualitySafetyMenuProps {
  onClose: () => void;
}

export default function QualitySafetyMenu({ onClose }: QualitySafetyMenuProps) {
  return (
    <div
      role="region"
      aria-label="Quality and Safety Menu"
      className="w-full bg-white py-6 animate-in fade-in duration-150"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E31C59]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B63]">
                  Quality & Patient Safety
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                NABH and NABL accredited hospital dedicated to continuous safety monitoring and patient protection.
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>NABH Accredited Tertiary Center</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
          {QUALITY_SAFETY_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="p-3 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

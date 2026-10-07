"use client";

import React from "react";
import { MORE_MENU_ITEMS } from "../data/hospitalData";
import { ChevronRight } from "lucide-react";

interface MoreMenuProps {
  onClose: () => void;
}

export default function MoreMenu({ onClose }: MoreMenuProps) {
  return (
    <div
      role="region"
      aria-label="More Menu"
      className="w-full bg-white py-6 animate-in fade-in duration-150"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E31C59]" />
            <h2 className="text-base sm:text-lg font-bold text-[#123B63] tracking-tight">
              More Hospital Resources & Links
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Quick links to careers, tenders, patient forms, downloads, and general hospital communication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-4">
          {MORE_MENU_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="p-3.5 rounded-xl border border-gray-100 hover:border-[#E31C59]/30 hover:bg-[#E31C59]/5 transition-all group flex items-start justify-between"
            >
              <div>
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#E31C59] transition-colors">
                  {item.name}
                </span>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#E31C59] group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

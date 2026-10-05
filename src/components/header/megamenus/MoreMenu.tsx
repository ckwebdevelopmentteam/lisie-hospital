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
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B63]">
            More Hospital Resources & Links
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Quick links to careers, tenders, patient forms, downloads, and general hospital communication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4">
          {MORE_MENU_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all group flex items-start justify-between"
            >
              <div>
                <span className="text-xs font-bold text-gray-900 group-hover:text-[#1677B8] transition-colors">
                  {item.name}
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1677B8] group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { ABOUT_LISIE_SECTIONS } from "../data/hospitalData";
import { ArrowRight, ChevronRight, Heart, Award, MapPin } from "lucide-react";

interface AboutMegaMenuProps {
  onClose: () => void;
}

export default function AboutMegaMenu({ onClose }: AboutMegaMenuProps) {
  return (
    <div
      role="region"
      aria-label="About Lisie Mega Menu"
      className="w-full bg-white py-6 animate-in fade-in duration-150"
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E31C59]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B63]">
                About Lisie Hospital
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Founded in 1956 • A unit of the Archdiocese of Ernakulam-Angamaly • "Care with Love"
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500">
            <Award className="w-4 h-4 text-[#E31C59]" />
            <span>NABH & NABL Accredited Healthcare Institution</span>
          </div>
        </div>

        {/* 3 Columns + Feature Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-5">
          {ABOUT_LISIE_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-1.5 border-b border-gray-100">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-1.5 px-2 rounded text-xs text-gray-700 hover:text-[#E31C59] hover:bg-[#E31C59]/5 transition-colors font-medium"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#E31C59] group-hover:translate-x-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Heritage & Values Card */}
          <div className="bg-[#F8FAFC] border border-gray-200 hover:border-[#E31C59]/30 rounded-lg p-4 flex flex-col justify-between transition-colors">
            <div>
              <div className="w-8 h-8 rounded-full bg-[#E31C59]/10 text-[#E31C59] flex items-center justify-center mb-2.5">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
                Care with Love
              </h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Established with a vision to provide compassionate, high-quality, and ethical healthcare to all segments of society with healing touch.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-200 mt-3 flex items-center space-x-1.5 text-[11px] text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>Ernakulam, Kochi, Kerala</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-gray-500">Over 68 years of healing and compassionate service</span>
          <a
            href="/about-us"
            onClick={onClose}
            className="inline-flex items-center space-x-1 font-semibold text-[#E31C59] hover:text-[#c4144b] transition-colors"
          >
            <span>About Lisie</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

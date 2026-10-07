"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { CampusCard } from "./heroData";

interface OverlappingCardsProps {
  campuses: CampusCard[];
}

export default function OverlappingCards({ campuses }: OverlappingCardsProps) {
  const getInstituteTag = (id: string) => {
    switch (id) {
      case "lisie-heart-institute":
        return "CENTRE OF EXCELLENCE • CARDIAC CARE";
      case "lisie-cancer-centre":
        return "COMPREHENSIVE ONCOLOGY • LCC";
      default:
        return "TERTIARY CARE CAMPUS • 1000+ BEDS";
    }
  };

  return (
    <div className="relative z-30 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28 md:-mt-32 lg:-mt-36">
      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {campuses.map((campus) => {
          const tag = getInstituteTag(campus.id);

          return (
            <Link
              key={campus.id}
              href={campus.link}
              className="group relative w-full aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer block bg-slate-950"
            >
              {/* Full Background Photograph */}
              <img
                src={campus.image}
                alt={campus.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Subtle overall dark overlay for general contrast */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Top-Right Circular Plus Button (Reveals on Hover, like reference design) */}
              <div
                aria-hidden="true"
                className="absolute top-4 right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-[#E31C59] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-md"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>

              {/* Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 transition-all duration-300">
                {/* Default State: Smooth dark gradient over image (Image 1 style) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

                {/* Hover State: Solid brand navy block covering the bottom (Image 2 style) */}
                <div className="absolute inset-0 bg-[#123B63] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg" />

                {/* Content & Arrow Flex Container */}
                <div className="relative z-10 flex items-end justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Small Uppercase Category Tag */}
                    <div className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-slate-300 group-hover:text-blue-200 transition-colors">
                      {tag}
                    </div>

                    {/* Main Title in Bold Uppercase */}
                    <h3 className="mt-1 text-base sm:text-lg lg:text-[19px] font-black uppercase text-white tracking-tight leading-snug line-clamp-2">
                      {campus.name}
                    </h3>

                    {/* Subtitle / Tagline */}
                    <p className="mt-1 text-xs text-slate-300 group-hover:text-slate-200 line-clamp-1 transition-colors">
                      {campus.subTitle}
                    </p>
                  </div>

                  {/* Hover Bottom-Right Arrow ↗ (Reveals on Hover, like reference design) */}
                  <div className="shrink-0 mb-1">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

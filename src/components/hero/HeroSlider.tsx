"use client";

import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import { HeroSlide } from "./heroData";

interface HeroSliderProps {
  slides: HeroSlide[];
  onOpenSpecialtyModal: (badgeText: string) => void;
}

export default function HeroSlider({
  slides,
  onOpenSpecialtyModal,
}: HeroSliderProps) {
  const currentSlide = slides[0];

  if (!currentSlide) return null;

  return (
    <div
      className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] lg:h-[660px] xl:h-[680px] overflow-hidden bg-slate-950 select-none"
      role="region"
      aria-label="Hospital Featured Hero"
    >
      {/* Single Hero Background: Surgery Room only */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero/hero-slide-1.jpg')",
            backgroundPosition: "center 35%",
          }}
        />
        {/* Dark vignette left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        {/* Subtle bottom dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
        {/* Soft clinical blue tint overlay */}
        <div className="absolute inset-0 bg-[#07162c]/30 mix-blend-multiply" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-full h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-8 sm:pt-10 lg:pt-12 pb-24 sm:pb-28 lg:pb-32">
        <div className="w-full max-w-[1536px] mx-auto">
          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            {/* Left Text Block */}
            <div className="max-w-2xl text-white">
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-[50px] lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-lg">
                <span className="block">
                  {currentSlide.titleLine1}
                </span>
                <span className="block mt-1 sm:mt-1.5 text-white">
                  {currentSlide.titleLine2}
                </span>
              </h1>

              {/* Tagline / Descriptive Content */}
              {currentSlide.tagline && (
                <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-slate-200/90 leading-relaxed font-normal">
                  {currentSlide.tagline}
                </p>
              )}

              {/* Real Timing / Stats highlight */}
              {currentSlide.timings && (
                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs sm:text-[13px] text-blue-200 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#67B2E4] shrink-0" />
                  <span>{currentSlide.timings}</span>
                </div>
              )}

              {/* CTA Action Buttons */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={currentSlide.ctaLink || "#departments"}
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 text-xs sm:text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <span>{currentSlide.ctaText || "Explore Departments"}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenSpecialtyModal(currentSlide.badgeText)}
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md border border-white/20 transition-all duration-200"
                >
                  <span>Specialty Overview</span>
                </button>
              </div>
            </div>

            {/* Right Floating Badge / Pill */}
            <div className="flex lg:justify-end items-center mt-2 lg:mt-0">
              <button
                type="button"
                onClick={() => onOpenSpecialtyModal(currentSlide.badgeText)}
                className={`inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full ${currentSlide.badgeColor || "bg-[#E31C59] hover:bg-[#C4144B]"} active:opacity-90 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl hover:shadow-[#E31C59]/40 hover:scale-105 active:scale-95 transition-all duration-200`}
                title="Click for specialty care details"
              >
                <span>{currentSlide.badgeText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

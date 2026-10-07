"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { HeroSlide } from "./heroData";

interface HeroSliderProps {
  slides: HeroSlide[];
  onOpenSpecialtyModal: (badgeText: string) => void;
}

export default function HeroSlider({
  slides,
  onOpenSpecialtyModal,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="relative w-full h-[580px] sm:h-[640px] md:h-[700px] lg:h-[740px] xl:h-[760px] overflow-hidden bg-slate-950 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Hospital Featured Slides"
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
      <div className="relative z-20 w-full h-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-14 sm:pt-16 lg:pt-20 pb-28 sm:pb-36 lg:pb-40">
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Text Block */}
          <div className="max-w-2xl text-white">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-200 mb-3 animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              <span>CARE WITH LOVE • SINCE 1956</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-[50px] lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-lg">
              <span className="block animate-in fade-in slide-in-from-left-4 duration-500">
                {currentSlide.titleLine1}
              </span>
              <span className="block mt-1 sm:mt-1.5 text-white animate-in fade-in slide-in-from-left-6 duration-500 delay-75">
                {currentSlide.titleLine2}
              </span>
            </h1>

            {/* Tagline / Descriptive Content */}
            {currentSlide.tagline && (
              <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-slate-200/90 leading-relaxed font-normal animate-in fade-in slide-in-from-left-6 duration-500 delay-100 line-clamp-3 sm:line-clamp-none">
                {currentSlide.tagline}
              </p>
            )}

            {/* Real Timing / Stats highlight */}
            {currentSlide.timings && (
              <div className="mt-3.5 sm:mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs sm:text-[13px] text-blue-200 font-medium animate-in fade-in duration-500 delay-150">
                <Clock className="w-3.5 h-3.5 text-[#67B2E4] shrink-0" />
                <span>{currentSlide.timings}</span>
              </div>
            )}

            {/* CTA Action Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 animate-in fade-in duration-500 delay-200">
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

          {/* Right Floating Badge / Pill (Exact feature as seen on the screenshot!) */}
          <div className="flex lg:justify-end items-center mt-2 lg:mt-0">
            <button
              type="button"
              onClick={() => onOpenSpecialtyModal(currentSlide.badgeText)}
              className={`inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full ${currentSlide.badgeColor || "bg-[#FF5722] hover:bg-[#F4511E]"} active:opacity-90 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all duration-200`}
              title="Click for specialty care details"
            >
              <span>{currentSlide.badgeText}</span>
            </button>
          </div>
        </div>

        {/* Bottom Left Navigation Pill Arrows & Counter */}
        <div className="flex items-center space-x-3 mb-2 sm:mb-4">
          <div className="inline-flex items-center bg-white/95 backdrop-blur-md rounded-full px-2 py-1 shadow-xl">
            {/* Prev Button */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-800 hover:text-black transition-colors"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
            </button>

            {/* Divider */}
            <span className="h-3 w-px bg-gray-300 mx-0.5" />

            {/* Next Button */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-800 hover:text-black transition-colors"
            >
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Slide Counter */}
          <div className="text-xs font-semibold tracking-wider text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, "0")}</span>
            <span className="mx-1 text-white/40">/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

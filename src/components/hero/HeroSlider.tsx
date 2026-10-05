"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] lg:h-[680px] xl:h-[720px] overflow-hidden bg-slate-950 select-none"
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
      <div className="relative z-20 w-full h-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-32 sm:pb-36 lg:pb-40">
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Text Block */}
          <div className="max-w-2xl text-white">
            {/* Main Headline (matching the screenshot format) */}
            <h1 className="text-3xl sm:text-5xl md:text-[54px] lg:text-[58px] font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-lg">
              <span className="block animate-in fade-in slide-in-from-left-4 duration-500">
                {currentSlide.titleLine1}
              </span>
              <span className="block mt-1 sm:mt-1.5 text-white animate-in fade-in slide-in-from-left-6 duration-500 delay-75">
                {currentSlide.titleLine2}
              </span>
            </h1>
          </div>

          {/* Right Floating Badge / Pill (Exact feature as seen on the screenshot!) */}
          <div className="flex lg:justify-end items-center mt-2 lg:mt-0">
            <button
              type="button"
              onClick={() => onOpenSpecialtyModal(currentSlide.badgeText)}
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#FF5722] hover:bg-[#F4511E] active:bg-[#E64A19] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl hover:shadow-[#FF5722]/50 hover:scale-105 active:scale-95 transition-all duration-200"
              title="Click for specialty care details"
            >
              <span>{currentSlide.badgeText}</span>
            </button>
          </div>
        </div>

        {/* Bottom Left Navigation Pill Arrows (Exact feature as seen on the screenshot!) */}
        <div className="flex items-center space-x-3 mb-2 sm:mb-4">
          <div className="inline-flex items-center bg-white rounded-full px-2 py-1 shadow-xl">
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
        </div>
      </div>
    </div>
  );
}

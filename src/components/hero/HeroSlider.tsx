"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const touchStartX = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play timer (6.5 seconds) paused on user mouse hover
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide, totalSlides]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentSlide = slides[currentIndex] || slides[0];

  if (!currentSlide) return null;

  return (
    <div
      className="relative w-full h-[540px] sm:h-[600px] md:h-[640px] lg:h-[680px] xl:h-[700px] overflow-hidden bg-slate-950 select-none"
      role="region"
      aria-label="Hospital Featured Hero Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with Smooth Cross-Fade Transition */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundPosition: "center 35%",
              }}
            />
            {/* Dark vignette left to right for high contrast text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
            {/* Bottom dark gradient for the overlapping cards */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            {/* Soft clinical blue tint overlay */}
            <div className="absolute inset-0 bg-[#07162c]/35 mix-blend-multiply" />
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-20 w-full h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-8 sm:pt-10 lg:pt-12 pb-28 sm:pb-32 lg:pb-36">
        <div className="w-full max-w-[1536px] mx-auto">
          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            {/* Left Text Block with smooth enter transition keyed to active slide */}
            <div
              key={`text-${currentSlide.id}`}
              className="max-w-2xl text-white animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both"
            >
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-[50px] lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-lg">
                <span className="block">{currentSlide.titleLine1}</span>
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

            {/* Right Floating Badge / Pill with smooth transition */}
            <div
              key={`badge-${currentSlide.id}`}
              className="flex lg:justify-end items-center mt-2 lg:mt-0 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both"
            >
              <button
                type="button"
                onClick={() => onOpenSpecialtyModal(currentSlide.badgeText)}
                className={`inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full ${
                  currentSlide.badgeColor || "bg-[#E31C59] hover:bg-[#C4144B]"
                } active:opacity-90 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl hover:shadow-[#E31C59]/40 hover:scale-105 active:scale-95 transition-all duration-200`}
                title="Click for specialty care details"
              >
                <span>{currentSlide.badgeText}</span>
              </button>
            </div>
          </div>

          {/* Slider Navigation Controls (Prev/Next buttons, Slide Indicator & Counter) */}
          <div className="mt-8 sm:mt-10 flex items-center justify-between sm:justify-start gap-4">
            {/* Arrows & Counter Pill */}
            <div className="inline-flex items-center gap-1.5 bg-black/45 backdrop-blur-md border border-white/20 rounded-full px-2 py-1 shadow-xl">
              {/* Prev Button */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 active:scale-90 transition-all"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Counter */}
              <div className="px-2 text-xs font-semibold tracking-wider text-white/90">
                <span className="text-white font-bold">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="mx-1 text-white/40">/</span>
                <span className="text-white/60">
                  {String(totalSlides).padStart(2, "0")}
                </span>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 active:scale-90 transition-all"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Clickable Progress Dots */}
            <div className="flex items-center gap-2">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-8 bg-[#E31C59] shadow-md shadow-[#E31C59]/50"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

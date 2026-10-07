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
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef<number | null>(null);
  const dragCurrentX = useRef<number | null>(null);

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

  // Auto-play timer (6.5s) paused on mouse hover or active dragging
  useEffect(() => {
    if (isPaused || isDragging || totalSlides <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide, totalSlides]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    dragCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (dragStartX.current !== null && dragCurrentX.current !== null) {
      const diff = dragStartX.current - dragCurrentX.current;
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
    }
    dragStartX.current = null;
    dragCurrentX.current = null;
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on left click and avoid interactive buttons
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragCurrentX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    dragCurrentX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDragging && dragStartX.current !== null && dragCurrentX.current !== null) {
      const diff = dragStartX.current - dragCurrentX.current;
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
    }
    setIsDragging(false);
    dragStartX.current = null;
    dragCurrentX.current = null;
  };

  const currentSlide = slides[currentIndex] || slides[0];

  if (!currentSlide) return null;

  return (
    <div
      className={`relative w-full h-[540px] sm:h-[600px] md:h-[640px] lg:h-[680px] xl:h-[700px] overflow-hidden bg-slate-950 select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      role="region"
      aria-label="Hospital Featured Hero Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) handleMouseUp();
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
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

      {/* Top Center Slide Indicator Pill (Moves smoothly with active slide) */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl pointer-events-auto">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-7 bg-[#E31C59] shadow-md shadow-[#E31C59]/50"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          );
        })}
      </div>

      {/* Left Chevron Button: Vertically Centered at the Left Edge */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-[#E31C59] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 shadow-xl hover:scale-110 active:scale-95 pointer-events-auto"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>

      {/* Right Chevron Button: Vertically Centered at the Right Edge */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-[#E31C59] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 shadow-xl hover:scale-110 active:scale-95 pointer-events-auto"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>

      {/* Hero Content Container */}
      <div className="relative z-20 w-full h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-8 sm:pt-10 lg:pt-12 pb-28 sm:pb-32 lg:pb-36 pointer-events-none">
        <div className="w-full max-w-[1536px] mx-auto">
          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            {/* Left Text Block - Expanded max-w so headings stay strictly 2 lines */}
            <div
              key={`text-${currentSlide.id}`}
              className="max-w-3xl lg:max-w-4xl text-white animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both pointer-events-auto"
            >
              {/* Main Headline: Guaranteed 2-line structure */}
              <h1 className="text-2xl sm:text-[32px] md:text-[38px] lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight text-white leading-[1.14] drop-shadow-lg">
                <span className="block whitespace-normal md:whitespace-nowrap">
                  {currentSlide.titleLine1}
                </span>
                <span className="block mt-1 sm:mt-1.5 text-white whitespace-normal md:whitespace-nowrap">
                  {currentSlide.titleLine2}
                </span>
              </h1>

              {/* Tagline / Descriptive Content */}
              {currentSlide.tagline && (
                <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-slate-200/90 leading-relaxed font-normal max-w-2xl">
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
              className="flex lg:justify-end items-center mt-2 lg:mt-0 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both pointer-events-auto"
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
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

const experiences = [
  { title: "Services Available on 24/7", detail: "Round-the-clock care and support when you need it most.", modal: "emergency" as const },
  { title: "Registration Process & Advance Booking", detail: "Plan your visit and complete your registration with ease.", modal: "appointment" as const },
  { title: "Cashless Insurance Services", detail: "Guidance for insurance, TPA, and cashless treatment support.", modal: "patient-help" as const },
  { title: "Visiting Timings", detail: "Helpful information for family and visitors during a hospital stay.", modal: "patient-help" as const },
  { title: "Admission Policy", detail: "Everything you need to know before admission.", modal: "patient-help" as const },
  { title: "Categories of Beds", detail: "Explore accommodation options for a comfortable stay.", modal: "patient-help" as const },
  { title: "Restrictions Within the Hospital Premises", detail: "A safe, considerate environment for every patient and visitor.", modal: "patient-help" as const },
  { title: "Confidential Suggestion Form", detail: "Share feedback to help us continue improving your experience.", modal: "patient-help" as const },
  { title: "Health Checkup Schemes", detail: "Preventive health packages designed around your needs.", modal: "appointment" as const },
  { title: "Billing and Discharge", detail: "Clear guidance for a smooth, informed discharge process.", modal: "patient-help" as const },
  { title: "May I Help You Volunteers", detail: "Friendly assistance to help you find your way through every visit.", modal: "patient-help" as const },
  { title: "Food Services", detail: "Nourishing meal support throughout your hospital stay.", modal: "patient-help" as const },
  { title: "Pastoral Care Services", detail: "Compassionate spiritual support for patients and families.", modal: "patient-help" as const },
];

const pillars = [
  { number: "01", label: "Listen first" },
  { number: "02", label: "Explain clearly" },
  { number: "03", label: "Preserve the story" },
];

// Duplicated list for seamless forward and backward looping
const TOTAL_ORIGINAL = experiences.length;

export default function PatientExperienceSection() {
  const { openModal } = useModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isAnimatingRef = useRef(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Touch tracking for mobile swipe gestures
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  // Commit slide completion safely
  const finishSlide = useCallback((dir: "next" | "prev") => {
    if (slideTimeoutRef.current) {
      clearTimeout(slideTimeoutRef.current);
      slideTimeoutRef.current = null;
    }
    setIsTransitioning(false);
    setDirection(null);
    if (dir === "next") {
      setActiveIndex((prev) => (prev + 1) % TOTAL_ORIGINAL);
    } else if (dir === "prev") {
      setActiveIndex((prev) => (prev - 1 + TOTAL_ORIGINAL) % TOTAL_ORIGINAL);
    }
    if (trackRef.current) {
      void trackRef.current.offsetHeight; // Force layout reflow synchronously to avoid any frame glitch
    }
    isAnimatingRef.current = false;
  }, []);

  // Slide forward
  const slideNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setDirection("next");

    if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
    slideTimeoutRef.current = setTimeout(() => {
      finishSlide("next");
    }, 550);
  }, [finishSlide]);

  // Slide backward
  const slidePrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setDirection("prev");

    if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
    slideTimeoutRef.current = setTimeout(() => {
      finishSlide("prev");
    }, 550);
  }, [finishSlide]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (direction) {
      finishSlide(direction);
    }
  };

  // Auto-scroll every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      slideNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [slideNext, isPaused]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (slideTimeoutRef.current) {
        clearTimeout(slideTimeoutRef.current);
      }
    };
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null) {
      if (touchDeltaX.current < -35) {
        slideNext();
      } else if (touchDeltaX.current > 35) {
        slidePrev();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setIsPaused(false);
  };

  // Jump to specific dot
  const goToDot = (dotIndex: number) => {
    if (isAnimatingRef.current || dotIndex === activeIndex) return;
    if (dotIndex === (activeIndex + 1) % TOTAL_ORIGINAL) {
      slideNext();
    } else if (dotIndex === (activeIndex - 1 + TOTAL_ORIGINAL) % TOTAL_ORIGINAL) {
      slidePrev();
    } else {
      setActiveIndex(dotIndex);
    }
  };

  const displayedIndex =
    direction === "next"
      ? (activeIndex + 1) % TOTAL_ORIGINAL
      : direction === "prev"
      ? (activeIndex - 1 + TOTAL_ORIGINAL) % TOTAL_ORIGINAL
      : activeIndex;

  const getCard = (offset: number) => {
    const idx = ((activeIndex + offset) % TOTAL_ORIGINAL + TOTAL_ORIGINAL) % TOTAL_ORIGINAL;
    return experiences[idx];
  };

  const slots = [
    getCard(-1),
    getCard(0),
    getCard(1),
    getCard(2),
    getCard(3),
  ];

  return (
    <section
      className="relative bg-white px-4 py-8 sm:py-16 lg:py-20 font-sans overflow-hidden"
      id="patient-experience"
      style={{ fontFamily: "'Inter', 'Outfit', sans-serif" }}
    >
      <div className="w-full max-w-[1536px] mx-auto grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">

        {/* ── LEFT: Auto-rotating Content ── */}
        <div className="flex flex-col lg:min-h-[580px] lg:justify-between">

          {/* Top content */}
          <div>
            <p className="text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#8d173b]">
              Patient Experience
            </p>

            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl md:text-[3.2rem] font-bold leading-[1.12] tracking-tight text-[#1a324c]">
              Thoughtful care,<br />at every step.
            </h2>

            <p className="mt-3 sm:mt-5 text-sm sm:text-[15px] md:text-base leading-relaxed text-slate-600 max-w-xl">
              From planning your visit to returning home, find the services and support that make your time with Lisie simpler.
            </p>

            {/* Divider */}
            <div className="mt-5 sm:mt-8 flex items-center gap-2">
              <span className="h-px w-10 bg-[#8d173b]" />
              <span className="h-px w-4 bg-[#8d173b]/50" />
              <span className="h-px w-2 bg-[#8d173b]/25" />
            </div>
          </div>

          {/* Clean Horizontal Sliding Carousel with Zero Blink */}
          <div
            className="mt-6 sm:mt-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Viewport for slider with responsive step variable */}
            <div className="relative overflow-hidden w-full py-2 [--card-step:100%] sm:[--card-step:50%]">
              <div
                ref={trackRef}
                className="flex will-change-transform"
                style={{
                  transform:
                    direction === "next"
                      ? "translateX(calc(-2 * var(--card-step)))"
                      : direction === "prev"
                      ? "translateX(0%)"
                      : "translateX(calc(-1 * var(--card-step)))",
                  transition: isTransitioning
                    ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                    : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {slots.map((exp, idx) => (
                  <div
                    key={idx}
                    className="w-full sm:w-1/2 flex-shrink-0 px-3 sm:px-8 py-3 sm:py-4 flex flex-col items-center text-center border-r border-slate-200/70"
                  >
                    {/* Pink 24/7 speech bubble icon */}
                    <div className="mb-4 sm:mb-5 flex items-center justify-center">
                      <Image
                        src="/images/24icon.png"
                        alt="24/7"
                        width={76}
                        height={88}
                        unoptimized
                        style={{ width: "auto", height: "auto" }}
                        className="mx-auto drop-shadow-sm transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Bold Service Title */}
                    <h3 className="text-[#1a324c] font-bold text-sm sm:text-lg leading-snug mb-3 sm:mb-5 max-w-[220px] min-h-[40px] sm:min-h-[48px] flex items-center justify-center">
                      {exp.title}
                    </h3>

                    {/* — READ MORE → */}
                    <button
                      type="button"
                      onClick={() => openModal(exp.modal)}
                      className="inline-flex items-center gap-2 sm:gap-2.5 group cursor-pointer"
                    >
                      <span className="h-px w-6 sm:w-7 bg-[#8d173b]/50 group-hover:w-10 transition-all duration-300" />
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#8d173b] group-hover:text-[#6b1030] transition-colors">
                        READ MORE
                      </span>
                      <span className="text-[#8d173b] group-hover:translate-x-1 transition-transform text-xs sm:text-sm font-bold">
                        →
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav controls */}
            <div className="mt-5 sm:mt-8 flex items-center justify-between border-t border-slate-200 pt-4 sm:pt-5">
              {/* Desktop dots */}
              <div className="hidden sm:flex gap-1.5 items-center">
                {experiences.map((exp, index) => (
                  <button
                    key={exp.title}
                    type="button"
                    aria-label={`Go to ${exp.title}`}
                    aria-current={index === displayedIndex}
                    onClick={() => goToDot(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === displayedIndex
                        ? "w-8 bg-[#8d173b]"
                        : "w-2.5 bg-slate-200 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              {/* Mobile compact progress pill */}
              <div className="sm:hidden flex items-center gap-2">
                <span className="text-xs font-bold text-[#8d173b] font-mono">
                  {String(displayedIndex + 1).padStart(2, "0")}
                </span>
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8d173b] rounded-full transition-all duration-300"
                    style={{ width: `${((displayedIndex + 1) / TOTAL_ORIGINAL) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  {String(TOTAL_ORIGINAL).padStart(2, "0")}
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous patient experience service"
                  onClick={slidePrev}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer bg-slate-50 hover:bg-slate-100 rounded-full"
                >
                  <Image src="/images/leftarrow1.png" alt="Previous" width={24} height={24} style={{ width: "auto", height: "auto" }} />
                </button>
                <button
                  type="button"
                  aria-label="Next patient experience service"
                  onClick={slideNext}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer bg-slate-50 hover:bg-slate-100 rounded-full"
                >
                  <Image src="/images/rightarrow.png" alt="Next" width={24} height={24} style={{ width: "auto", height: "auto" }} />
                </button>
              </div>
            </div>

            {/* Bottom pillars */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-10">
              {pillars.map((p) => (
                <div key={p.number} className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs font-bold text-[#8d173b]">{p.number}</span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Responsive Photo Collage ── */}
        <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[620px]">

          {/* Large main image — top left */}
          <div className="absolute left-0 top-3 sm:top-6 h-[72%] w-[66%] overflow-hidden rounded-[1.2rem] sm:rounded-[1.5rem] shadow-[0_20px_50px_rgba(42,34,26,0.13)]">
            <Image
              src="/images/patient-story-1.jpg"
              alt="Lisie nurse caring warmly for a patient"
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 66vw, 38vw"
              className="object-cover object-center"
            />
          </div>

          {/* Top-right small image */}
          <div className="absolute right-0 top-0 h-[36%] w-[42%] overflow-hidden rounded-[1rem] sm:rounded-[1.2rem] border-[3px] sm:border-[5px] border-white shadow-[0_14px_30px_rgba(42,34,26,0.12)]">
            <Image
              src="/images/patient-story-2.jpg"
              alt="Doctor consulting patient family"
              fill
              unoptimized
              sizes="(max-width: 1024px) 42vw, 24vw"
              className="object-cover"
            />
          </div>

          {/* Bottom-right image with label badge */}
          <div className="absolute bottom-0 right-[2%] h-[36%] w-[52%] overflow-hidden rounded-[1rem] sm:rounded-[1.2rem] border-[3px] sm:border-[5px] border-white shadow-[0_14px_30px_rgba(42,34,26,0.12)]">
            <Image
              src="/images/patient-story-3.jpg"
              alt="Lisie Hospital chapel — peaceful care"
              fill
              unoptimized
              sizes="(max-width: 1024px) 52vw, 30vw"
              className="object-cover"
            />
            {/* Animated label badge */}
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-black/60 backdrop-blur-sm rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 max-w-[90%] sm:max-w-[85%]">
              <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-white/60">
                Patient Experience
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-white leading-tight mt-0.5 transition-opacity duration-300 truncate">
                {experiences[displayedIndex].title}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

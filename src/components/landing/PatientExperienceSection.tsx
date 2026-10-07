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

// Tripled list for infinite smooth horizontal looping without snapping
const extendedExperiences = [...experiences, ...experiences, ...experiences];
const TOTAL_ORIGINAL = experiences.length;
const INITIAL_INDEX = TOTAL_ORIGINAL;

export default function PatientExperienceSection() {
  const { openModal } = useModal();
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isJumpingRef = useRef(false);

  // Responsive check for card widths (100% on mobile, 50% on tablet/desktop)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Slide forward one by one
  const slideNext = useCallback(() => {
    if (isJumpingRef.current) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Slide backward one by one
  const slidePrev = useCallback(() => {
    if (isJumpingRef.current) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Seamless reset at borders so infinite scroll never blinks or stutters
  const handleTransitionEnd = () => {
    if (currentIndex >= TOTAL_ORIGINAL * 2) {
      isJumpingRef.current = true;
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - TOTAL_ORIGINAL);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isJumpingRef.current = false;
        });
      });
    } else if (currentIndex < TOTAL_ORIGINAL) {
      isJumpingRef.current = true;
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + TOTAL_ORIGINAL);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isJumpingRef.current = false;
        });
      });
    }
  };

  // Auto-scroll one by one every 4 seconds with smooth slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      slideNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [slideNext, isPaused]);

  // Current active indicator (0 to 12)
  const activeDot = ((currentIndex % TOTAL_ORIGINAL) + TOTAL_ORIGINAL) % TOTAL_ORIGINAL;

  // Jump to specific dot
  const goToDot = (dotIndex: number) => {
    if (isJumpingRef.current) return;
    const diff = dotIndex - activeDot;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + diff);
  };

  return (
    <section
      className="relative bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 font-sans overflow-hidden"
      id="patient-experience"
      style={{ fontFamily: "'Inter', 'Outfit', sans-serif" }}
    >
      <div className="w-full max-w-[1536px] mx-auto grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">

        {/* ── LEFT: Auto-rotating Content ── */}
        <div className="flex flex-col lg:min-h-[580px] lg:justify-between">

          {/* Top content */}
          <div>
            <p className="text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#8d173b]">
              Patient Experience
            </p>

            <h2 className="mt-4 text-4xl sm:text-5xl md:text-[3.4rem] font-bold leading-[1.08] tracking-tight text-[#1a324c]">
              Thoughtful care,<br />at every step.
            </h2>

            <p className="mt-5 text-sm sm:text-[15px] md:text-base leading-relaxed text-slate-600 max-w-xl">
              From planning your visit to returning home, find the services and support that make your time with Lisie simpler.
            </p>

            {/* Divider */}
            <div className="mt-8 flex items-center gap-2">
              <span className="h-px w-10 bg-[#8d173b]" />
              <span className="h-px w-4 bg-[#8d173b]/50" />
              <span className="h-px w-2 bg-[#8d173b]/25" />
            </div>
          </div>

          {/* Clean Horizontal Sliding Carousel — One-by-One Smooth Slide, No White Placeholder Box */}
          <div
            className="mt-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Viewport for slider */}
            <div className="relative overflow-hidden w-full py-2">
              <div
                className="flex will-change-transform"
                style={{
                  transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)`,
                  transition: isTransitioning
                    ? "transform 750ms cubic-bezier(0.25, 1, 0.5, 1)"
                    : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedExperiences.map((exp, idx) => (
                  <div
                    key={`${exp.title}-${idx}`}
                    className="w-full sm:w-1/2 flex-shrink-0 px-4 sm:px-8 py-4 flex flex-col items-center text-center border-r border-slate-200/70"
                  >
                    {/* Pink 24/7 speech bubble icon */}
                    <div className="mb-5 flex items-center justify-center">
                      <Image
                        src="/images/24icon.png"
                        alt="24/7"
                        width={82}
                        height={95}
                        unoptimized
                        className="mx-auto drop-shadow-sm transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Bold Service Title */}
                    <h3 className="text-[#1a324c] font-bold text-base sm:text-lg leading-snug mb-5 max-w-[220px] min-h-[48px] flex items-center justify-center">
                      {exp.title}
                    </h3>

                    {/* — READ MORE → */}
                    <button
                      type="button"
                      onClick={() => openModal(exp.modal)}
                      className="inline-flex items-center gap-2.5 group cursor-pointer"
                    >
                      <span className="h-px w-7 bg-[#8d173b]/50 group-hover:w-11 transition-all duration-300" />
                      <span className="text-xs font-bold uppercase tracking-widest text-[#8d173b] group-hover:text-[#6b1030] transition-colors">
                        READ MORE
                      </span>
                      <span className="text-[#8d173b] group-hover:translate-x-1 transition-transform text-sm font-bold">
                        →
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav controls */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
              <div className="flex gap-1.5 items-center">
                {experiences.map((exp, index) => (
                  <button
                    key={exp.title}
                    type="button"
                    aria-label={`Go to ${exp.title}`}
                    aria-current={index === activeDot}
                    onClick={() => goToDot(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeDot
                        ? "w-8 bg-[#8d173b]"
                        : "w-2.5 bg-slate-200 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous patient experience service"
                  onClick={slidePrev}
                  className="flex h-9 w-9 items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Image src="/images/leftarrow1.png" alt="Previous" width={28} height={28} />
                </button>
                <button
                  type="button"
                  aria-label="Next patient experience service"
                  onClick={slideNext}
                  className="flex h-9 w-9 items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Image src="/images/rightarrow.png" alt="Next" width={28} height={28} />
                </button>
              </div>
            </div>

            {/* Bottom pillars */}
            <div className="mt-6 flex items-center gap-6 sm:gap-10">
              {pillars.map((p) => (
                <div key={p.number} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#8d173b]">{p.number}</span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Sticky Photo Collage ── */}
        <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[620px]">

          {/* Large main image — top left */}
          <div className="absolute left-0 top-6 h-[72%] w-[66%] overflow-hidden rounded-[1.5rem] shadow-[0_20px_50px_rgba(42,34,26,0.13)]">
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
          <div className="absolute right-0 top-0 h-[36%] w-[42%] overflow-hidden rounded-[1.2rem] border-[5px] border-white shadow-[0_14px_30px_rgba(42,34,26,0.12)]">
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
          <div className="absolute bottom-0 right-[2%] h-[36%] w-[52%] overflow-hidden rounded-[1.2rem] border-[5px] border-white shadow-[0_14px_30px_rgba(42,34,26,0.12)]">
            <Image
              src="/images/patient-story-3.jpg"
              alt="Lisie Hospital chapel — peaceful care"
              fill
              unoptimized
              sizes="(max-width: 1024px) 52vw, 30vw"
              className="object-cover"
            />
            {/* Animated label badge */}
            <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-sm rounded-xl px-3 py-2 max-w-[85%]">
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">
                Patient Experience
              </p>
              <p className="text-xs font-semibold text-white leading-tight mt-0.5 transition-opacity duration-300">
                {experiences[activeDot].title}
              </p>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-[#8d173b]/[0.06] pointer-events-none" />
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-[#2378bd]/[0.06] pointer-events-none" />
        </div>

      </div>
    </section>
  );
}

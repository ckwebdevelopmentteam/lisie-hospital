"use client";

import React from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

export default function HeroSection() {
  const { openModal } = useModal();

  return (
    <section className="relative min-h-[86vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-14 px-4 sm:px-8 lg:px-[120px] rounded-b-3xl sm:rounded-b-[2.5rem]">
      {/* Hero Background Image (Human Compassionate Healthcare Scene) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/stitch/lisie-hero-compassion.jpg"
          alt="Doctor comforting an elderly patient with warmth and compassion at Lisie Hospital"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transform motion-safe:animate-pulse-slow"
        />
        {/* Layered Vignette Overlays matching reference aesthetic with warm burgundy mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-stone-900/50 to-stone-900/35" />
        <div className="absolute inset-0 bg-burgundy-900/25 mix-blend-multiply" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white mt-4 sm:mt-6">
        {/* Pre-heading Pill Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/20 frosted-glass px-3.5 py-1 rounded-full mb-4 text-xs font-medium tracking-wide uppercase subtle-ring font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Compassionate Care • Since 1956</span>
        </div>

        {/* Main Heading with Script Flourish */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-white mb-2.5 text-shadow-hero leading-[1.1]">
          Discover the Healing Heart of
          <span className="block font-script text-5xl sm:text-7xl md:text-8xl text-burgundy-100 font-normal leading-none -mt-1 sm:-mt-3">
            Lisie
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-stone-200 font-light leading-relaxed mb-6 text-shadow-hero font-sans">
          For over 68 years, delivering empathetic tertiary healthcare, pioneering advanced cardiology, and providing healing with human warmth across Kochi.
        </p>

        {/* CTA Buttons Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 font-sans">
          <button
            type="button"
            onClick={() => openModal("doctor-search")}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-burgundy-900 hover:bg-stone-100 text-xs sm:text-sm font-semibold px-6 py-2.5 sm:py-3 rounded-full shadow-md transition-transform hover:scale-105 duration-200 active:scale-95"
          >
            <span>Find a Doctor</span>
            <span className="font-bold">↗</span>
          </button>
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/20 frosted-glass hover:bg-white/30 text-white text-xs sm:text-sm font-medium px-6 py-2.5 sm:py-3 rounded-full subtle-ring transition-all duration-200"
          >
            <span>Our Heritage</span>
            <span>↗</span>
          </a>
        </div>

        {/* Quick Trust Indicators */}
        <div className="mt-8 sm:mt-10 pt-5 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-stone-200 font-sans">
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-white">68+</div>
            <div className="text-[11px] uppercase tracking-wider text-stone-300">Years of Service</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-white">1,000+</div>
            <div className="text-[11px] uppercase tracking-wider text-stone-300">Hospital Beds</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-white">25,000+</div>
            <div className="text-[11px] uppercase tracking-wider text-stone-300">Cardiac Surgeries</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-white">99.2%</div>
            <div className="text-[11px] uppercase tracking-wider text-stone-300">Patient Trust</div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

export default function HeroSection() {
  const { openModal } = useModal();

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
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
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white mt-8">
        {/* Pre-heading Pill Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/20 frosted-glass px-4 py-1.5 rounded-full mb-6 text-xs sm:text-sm font-medium tracking-wide uppercase subtle-ring font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Compassionate Care • Since 1956</span>
        </div>

        {/* Main Heading with Script Flourish */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-white mb-3 text-shadow-hero leading-[1.1]">
          Discover the Healing Heart of
          <span className="block font-script text-6xl sm:text-8xl md:text-9xl text-burgundy-100 font-normal leading-none -mt-2 sm:-mt-4">
            Lisie
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-stone-200 font-light leading-relaxed mb-8 text-shadow-hero font-sans">
          For over 68 years, delivering empathetic tertiary healthcare, pioneering advanced cardiology, and providing healing with human warmth across Kochi.
        </p>

        {/* CTA Buttons Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-sans">
          <button
            type="button"
            onClick={() => openModal("doctor-search")}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-burgundy-900 hover:bg-stone-100 text-sm font-semibold px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105 duration-200 active:scale-95"
          >
            <span>Find a Doctor</span>
            <span className="font-bold">↗</span>
          </button>
          <a
            href="#campuses"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/20 frosted-glass hover:bg-white/30 text-white text-sm font-medium px-7 py-3.5 rounded-full subtle-ring transition-all duration-200"
          >
            <span>Our Campuses</span>
            <span>↗</span>
          </a>
        </div>

        {/* Quick Trust Indicators */}
        <div className="mt-14 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-200 font-sans">
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">68+</div>
            <div className="text-xs uppercase tracking-wider text-stone-300">Years of Service</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">1,000+</div>
            <div className="text-xs uppercase tracking-wider text-stone-300">Hospital Beds</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">25,000+</div>
            <div className="text-xs uppercase tracking-wider text-stone-300">Cardiac Surgeries</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">99.2%</div>
            <div className="text-xs uppercase tracking-wider text-stone-300">Patient Trust</div>
          </div>
        </div>
      </div>
    </section>
  );
}

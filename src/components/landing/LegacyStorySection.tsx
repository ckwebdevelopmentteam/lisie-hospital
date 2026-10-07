"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function LegacyStorySection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white font-sans overflow-hidden" id="about">
      <div className="w-full max-w-[1536px] mx-auto">
        {/* Top Section: About Narrative (Left) + Exact Showcase Graphic (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start text-left pr-0 lg:pr-2">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-widest text-slate-500 mb-3 sm:mb-4">
              ABOUT US
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a324c] leading-[1.18] mb-5 sm:mb-6">
              Care with Love, <br />
              <span className="text-[#d11f53]">For a Healthier Tomorrow.</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-[15px] md:text-base leading-relaxed mb-7 sm:mb-8 max-w-xl">
              Lisie Hospital, founded in 1956, as a charitable institution, is the living expression of the apostolic concern and social responsibility of the Archdiocese of Ernakulam-Angamaly. We are committed to providing compassionate, quality healthcare to every individual.
            </p>

            <a
              href="/about-us"
              className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-[#d11f53] hover:bg-[#b81444] text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column: Exact Hospital Showcase Graphic with Background & Floating Cards */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end relative">
            <div className="relative w-full aspect-[969/525] transition-transform duration-500 hover:scale-[1.015]">
              <Image
                src="/images/about/lisie-about-showcase@2x.png"
                alt="Lisie Hospital - Trusted Care, Quality Treatment, People First"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 58vw, 880px"
                className="object-contain lg:object-right select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

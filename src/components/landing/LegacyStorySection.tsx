"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function LegacyStorySection() {
  return (
    <section className="relative py-8 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white font-sans overflow-hidden" id="about">
      <div className="w-full max-w-[1536px] mx-auto">
        {/* Top Section: About Narrative (Left) + Exact Showcase Graphic (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start text-left pr-0 lg:pr-2">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-widest text-slate-500 mb-2 sm:mb-4">
              ABOUT US
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a324c] leading-[1.18] mb-4 sm:mb-6">
              Care with Love, <br />
              <span className="text-[#d11f53]">For a Healthier Tomorrow.</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-[15px] md:text-base leading-relaxed mb-5 sm:mb-8 max-w-xl">
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

        {/* Bottom Strip: Accreditation & Quality Standards (GreenOT & ResCCU) */}
        <div className="mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-24">
            {/* GreenOT */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0 flex items-center justify-center">
                <Image
                  src="/images/about/green-ot.png"
                  alt="GreenOT"
                  width={114}
                  height={44}
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                />
              </div>
              <div className="h-8 sm:h-9 w-px bg-slate-200 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#123B63]">
                  GREENOT
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-tight mt-0.5">
                  Sustainable Operating Theatre
                  <br className="hidden sm:inline" /> Practices
                </p>
              </div>
            </div>

            {/* Center Divider */}
            <div className="hidden sm:block h-10 w-px bg-slate-200/90" aria-hidden="true" />

            {/* ResCCU */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0 flex items-center justify-center">
                <Image
                  src="/images/about/rescuu.png"
                  alt="ResCCU"
                  width={125}
                  height={44}
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                />
              </div>
              <div className="h-8 sm:h-9 w-px bg-slate-200 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#123B63]">
                  RESCCU
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-tight mt-0.5">
                  Responsible Critical Care
                  <br className="hidden sm:inline" /> Unit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

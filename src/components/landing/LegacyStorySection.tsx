"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CountUpNumberProps {
  target: number;
  prefix?: string;
  suffix?: string;
  startFrom?: number;
  duration?: number;
  isFormatted?: boolean;
  isVisible: boolean;
}

function CountUpNumber({
  target,
  prefix = "",
  suffix = "",
  startFrom = 0,
  duration = 2000,
  isFormatted = true,
  isVisible,
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    if (!isVisible || hasEnded) return;

    let startTimestamp: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startFrom + (target - startFrom) * easeOut);

      setCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
        setHasEnded(true);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, target, startFrom, duration, hasEnded]);

  const formattedValue = isFormatted ? count.toLocaleString("en-US") : count.toString();
  const finalDisplay = isFormatted ? target.toLocaleString("en-US") : target.toString();

  return (
    <span className="tabular-nums inline-block font-sans">
      {prefix}
      {hasEnded ? finalDisplay : formattedValue}
      {suffix}
    </span>
  );
}

export default function LegacyStorySection() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

        {/* Bottom Section: Divider & Statistics Row with Animated Count-Up */}
        <div ref={statsRef} className="w-full border-t border-slate-200/80 mt-14 sm:mt-16 lg:mt-20 pt-10 sm:pt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center items-start">
            {/* 1. Since 1956 */}
            <div className="flex flex-col items-center border-r border-slate-200/80 pr-3 sm:pr-6">
              <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight">
                <CountUpNumber target={1956} prefix="Since " isFormatted={false} isVisible={statsVisible} />
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5 sm:mt-2">
                68+ Years of Healing Excellence
              </span>
            </div>

            {/* 2. 1,000+ Inpatient Bed Capacity */}
            <div className="flex flex-col items-center max-lg:border-r-0 lg:border-r border-slate-200/80 px-3 sm:px-6">
              <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#d11f53] tracking-tight">
                <CountUpNumber target={1000} suffix="+" isFormatted={true} isVisible={statsVisible} />
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1.5 sm:mt-2">
                Inpatient Bed Capacity
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                NABH & NABL Accredited Tertiary Care
              </span>
            </div>

            {/* 3. 14,000+ Open Heart Surgeries */}
            <div className="flex flex-col items-center border-r border-slate-200/80 pr-3 sm:pr-6 lg:px-6">
              <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight">
                <CountUpNumber target={14000} suffix="+" isFormatted={true} isVisible={statsVisible} />
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1.5 sm:mt-2">
                Open Heart Surgeries
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Lisie Heart Institute Milestone
              </span>
            </div>

            {/* 4. 30,000+ Yearly Emergency Patients */}
            <div className="flex flex-col items-center pl-3 sm:pl-6">
              <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#d11f53] tracking-tight">
                <CountUpNumber target={30000} suffix="+" isFormatted={true} isVisible={statsVisible} />
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1.5 sm:mt-2">
                Yearly Emergency Patients
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                24/7 Level 1 Trauma Care
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

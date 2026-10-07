"use client";

import React, { useState, useEffect, useRef } from "react";

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

export default function HospitalStatsBar() {
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
    <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 font-sans">
      <div ref={statsRef} className="w-full max-w-[1536px] mx-auto border-t border-slate-200/80 pt-10 sm:pt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center items-start">
          {/* 1. Since 1956 */}
          <div className="flex flex-col items-center border-r border-slate-200/80 pr-3 sm:pr-6">
            <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#1a324c]">
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
            <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1a324c] tracking-tight">
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
  );
}

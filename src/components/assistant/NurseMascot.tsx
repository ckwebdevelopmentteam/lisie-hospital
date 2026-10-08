"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface NurseMascotProps {
  isGreetingVisible?: boolean;
  className?: string;
}

export default function NurseMascot({
  isGreetingVisible = false,
  className = "",
}: NurseMascotProps) {
  return (
    <div
      className={`relative select-none pointer-events-none transition-transform duration-300 ease-out ${className}`}
      aria-hidden="true"
    >
      {/* Floating container with subtle breathing animation */}
      <div
        className={`relative will-change-transform ${
          isGreetingVisible ? "animate-nurse-wave" : "animate-nurse-float"
        }`}
      >
        {/* Soft high-tech AI aura behind mascot */}
        <div className="absolute -inset-3 rounded-full bg-gradient-to-t from-[#123B63]/25 via-[#1677B8]/20 to-transparent blur-lg -z-10" />

        {/* Male Nurse Illustration - Enlarged size */}
        <div className="relative w-[50px] h-[158px] sm:w-[64px] sm:h-[202px] filter drop-shadow-[0_12px_28px_rgba(18,59,99,0.35)]">
          <Image
            src="/images/male-nurse.png"
            alt="Lisie AI Hospital Nurse Mascot"
            fill
            sizes="(max-width: 640px) 50px, 64px"
            priority={false}
            className="object-contain object-bottom pointer-events-none"
          />

          {/* AI Vitality Sparkle Badge placed on chest/coat pocket to avoid head clutter */}
          <div className="absolute top-14 -left-1 sm:top-18 sm:-left-1.5 flex items-center justify-center h-5 w-5 sm:h-5.5 sm:w-5.5 rounded-full bg-gradient-to-tr from-[#1677B8] to-[#67B2E4] text-white shadow-md shadow-[#1677B8]/50 border-2 border-white">
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

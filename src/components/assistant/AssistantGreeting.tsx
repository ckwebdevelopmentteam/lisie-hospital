"use client";

import React from "react";
import { X, Sparkles } from "lucide-react";

export interface CompactMessage {
  id: string;
  line1: string;
  line2: string;
}

export const COMPACT_MESSAGES: CompactMessage[] = [
  {
    id: "consultation",
    line1: "Hi! I'm Lisie AI 👋",
    line2: "Need doctor consultation or OP timings?",
  },
  {
    id: "specialists",
    line1: "Looking for a doctor?",
    line2: "30+ senior specialties available today.",
  },
  {
    id: "emergency-tpa",
    line1: "Patient Support & Care",
    line2: "Insurance desk, admissions & 24/7 trauma.",
  },
  {
    id: "hospital-guide",
    line1: "Lisie Hospital Desk",
    line2: "How can I assist your visit today?",
  },
];

interface AssistantGreetingProps {
  isVisible: boolean;
  messageIndex: number;
  onClose: (e: React.MouseEvent) => void;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function AssistantGreeting({
  isVisible,
  messageIndex,
  onClose,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: AssistantGreetingProps) {
  if (!isVisible) return null;

  const currentMsg = COMPACT_MESSAGES[messageIndex % COMPACT_MESSAGES.length];

  // Precise geometry for the reference speech bubble shape
  const width = 300;
  const height = 70;
  const r = 18;
  const tailDepth = 20;
  const tx2 = width - 26; // vertical edge of tail
  const tx1 = tx2 - 38; // diagonal start

  const bubblePath = `M ${r} 2
L ${width - r} 2
A ${r} ${r} 0 0 1 ${width - 2} ${r}
L ${width - 2} ${height - r}
A ${r} ${r} 0 0 1 ${width - r} ${height}
L ${tx2 + 8} ${height}
Q ${tx2} ${height} ${tx2} ${height + 5}
L ${tx2} ${height + tailDepth - 4}
Q ${tx2} ${height + tailDepth} ${tx2 - 4} ${height + tailDepth}
L ${tx1 + 6} ${height + 3}
Q ${tx1} ${height} ${tx1 - 6} ${height}
L ${r} ${height}
A ${r} ${r} 0 0 1 2 ${height - r}
L 2 ${r}
A ${r} ${r} 0 0 1 ${r} 2
Z`;

  return (
    <div
      role="region"
      aria-label="Lisie AI Assistant Message"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute bottom-[calc(100%+14px)] sm:bottom-[calc(100%+18px)] right-1 sm:right-2 z-30 w-[280px] sm:w-[300px] select-none pointer-events-auto origin-bottom-right animate-greeting-pop filter drop-shadow-[0_12px_32px_rgba(18,59,99,0.42)]"
    >
      {/* SVG Speech Bubble with Lisie Blue theme (#123B63) matching user reference image */}
      <svg
        viewBox={`0 0 ${width} ${height + tailDepth + 2}`}
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lisieBlueBubble" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#123B63" />
            <stop offset="100%" stopColor="#0E2A47" />
          </linearGradient>
        </defs>
        <path
          d={bubblePath}
          fill="url(#lisieBlueBubble)"
          stroke="#1677B8"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      {/* Spacious 2-line WhatsApp-style text inside the blue bubble body */}
      <div
        onClick={onClick}
        className="absolute inset-x-0 top-0 h-[70px] px-4.5 sm:px-5 flex flex-col justify-center cursor-pointer group"
      >
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss message (reopens in 5 seconds)"
          className="absolute top-2.5 right-3 flex h-5 w-5 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/15 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* 2-line content with generous readable typography */}
        <div key={currentMsg.id} className="pr-5">
          {/* Line 1: Bold title */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#67B2E4] shrink-0" />
            <span className="text-[13.5px] sm:text-[14.5px] font-bold text-white leading-none tracking-tight">
              {currentMsg.line1}
            </span>
          </div>

          {/* Line 2: WhatsApp chat subtitle */}
          <p className="text-[12px] sm:text-[13px] text-blue-100 font-medium leading-tight mt-1.5 truncate">
            {currentMsg.line2}
          </p>
        </div>
      </div>
    </div>
  );
}

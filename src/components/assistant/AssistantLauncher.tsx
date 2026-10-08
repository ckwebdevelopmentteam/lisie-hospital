"use client";

import React from "react";

interface AssistantLauncherProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
}

export default function AssistantLauncher({
  children,
  ariaLabel = "Lisie AI Hospital Nurse Mascot",
  onClick,
}: AssistantLauncherProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="relative flex flex-col items-center cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677B8] focus-visible:ring-offset-4 rounded-3xl"
    >
      {children}
    </div>
  );
}

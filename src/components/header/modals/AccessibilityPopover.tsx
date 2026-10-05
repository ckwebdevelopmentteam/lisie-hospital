"use client";

import React, { useEffect, useRef } from "react";
import { TextSize } from "../types";
import { Sliders, Eye, ZapOff, Check, X } from "lucide-react";

interface AccessibilityPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (val: boolean) => void;
}

export default function AccessibilityPopover({
  isOpen,
  onClose,
  textSize,
  setTextSize,
  highContrast,
  setHighContrast,
  reduceMotion,
  setReduceMotion,
}: AccessibilityPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Accessibility Settings"
      className="absolute top-full right-0 mt-1.5 w-72 bg-white text-[#17202A] rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-[#1677B8]" />
          <h3 className="font-semibold text-sm text-[#123B63]">Accessibility</h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Close accessibility options"
          className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Text Size Controls */}
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-2">
            Text Size
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-md">
            <button
              type="button"
              onClick={() => setTextSize("sm")}
              className={`text-xs py-1.5 px-2 rounded font-medium transition-all ${
                textSize === "sm"
                  ? "bg-white text-[#123B63] shadow-sm font-semibold"
                  : "text-gray-600 hover:text-[#123B63]"
              }`}
              title="Text size -"
            >
              Text size -
            </button>
            <button
              type="button"
              onClick={() => setTextSize("md")}
              className={`text-xs py-1.5 px-2 rounded font-medium transition-all ${
                textSize === "md"
                  ? "bg-white text-[#123B63] shadow-sm font-semibold"
                  : "text-gray-600 hover:text-[#123B63]"
              }`}
              title="Default text size"
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => setTextSize("lg")}
              className={`text-xs py-1.5 px-2 rounded font-medium transition-all ${
                textSize === "lg"
                  ? "bg-white text-[#123B63] shadow-sm font-semibold"
                  : "text-gray-600 hover:text-[#123B63]"
              }`}
              title="Text size +"
            >
              Text size +
            </button>
          </div>
        </div>

        {/* High Contrast Toggle */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-700">High contrast</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={highContrast}
            onClick={() => setHighContrast(!highContrast)}
            className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
              highContrast ? "bg-[#1677B8]" : "bg-gray-300"
            }`}
          >
            <span
              className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                highContrast ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Reduce Motion Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ZapOff className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-700">Reduce motion</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={reduceMotion}
            onClick={() => setReduceMotion(!reduceMotion)}
            className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
              reduceMotion ? "bg-[#1677B8]" : "bg-gray-300"
            }`}
          >
            <span
              className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                reduceMotion ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

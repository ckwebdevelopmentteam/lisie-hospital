"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  PhoneCall,
  Clock,
  HelpCircle,
  Sliders,
  Globe,
  ChevronDown,
} from "lucide-react";
import { HOSPITAL_CONTACTS } from "./data/hospitalData";
import { Language, TextSize } from "./types";
import AccessibilityPopover from "./modals/AccessibilityPopover";

interface UtilityBarProps {
  onOpenEmergency: () => void;
  onOpenPatientHelp: () => void;
  onOpenOPTimings: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (val: boolean) => void;
}

export default function UtilityBar({
  onOpenEmergency,
  onOpenPatientHelp,
  onOpenOPTimings,
  language,
  setLanguage,
  textSize,
  setTextSize,
  highContrast,
  setHighContrast,
  reduceMotion,
  setReduceMotion,
}: UtilityBarProps) {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside
      aria-label="Quick Access and Utility Bar"
      className="bg-[#123B63] text-slate-100 border-b border-[#1b4b7c] text-xs font-normal"
    >
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-8 sm:h-9 flex items-center justify-between">
        {/* Left Side: 24/7 Emergency Indicator */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 text-white">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-slate-200">
              Emergency 24/7:
            </span>
          </div>

          <a
            href={`tel:${HOSPITAL_CONTACTS.emergencyPhone}`}
            className="font-semibold text-white hover:text-red-200 tracking-wide transition-colors flex items-center space-x-1 text-[11px] sm:text-xs"
            title="Call Lisie Emergency 24/7"
          >
            <span>{HOSPITAL_CONTACTS.emergencyPhone}</span>
          </a>
        </div>

        {/* Center / Right: Patient Help, OP Timings, Accessibility, Language */}
        <nav
          aria-label="Utility Links"
          className="flex items-center space-x-2.5 sm:space-x-3.5 text-[11px] sm:text-xs text-slate-200"
        >
          {/* Patient Help */}
          <button
            type="button"
            onClick={onOpenPatientHelp}
            className="hover:text-white transition-colors flex items-center space-x-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden xs:inline sm:inline">Patient Help</span>
          </button>

          {/* OP Timings */}
          <button
            type="button"
            onClick={onOpenOPTimings}
            className="hover:text-white transition-colors flex items-center space-x-1"
          >
            <Clock className="w-3.5 h-3.5 text-slate-300" />
            <span>OP Timings</span>
          </button>

          {/* Accessibility with Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
              aria-expanded={isAccessibilityOpen}
              aria-haspopup="dialog"
              className="hover:text-white transition-colors flex items-center space-x-1"
              title="Accessibility Settings"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-300" />
              <span>Accessibility</span>
            </button>

            <AccessibilityPopover
              isOpen={isAccessibilityOpen}
              onClose={() => setIsAccessibilityOpen(false)}
              textSize={textSize}
              setTextSize={setTextSize}
              highContrast={highContrast}
              setHighContrast={setHighContrast}
              reduceMotion={reduceMotion}
              setReduceMotion={setReduceMotion}
            />
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              aria-expanded={isLangDropdownOpen}
              aria-haspopup="listbox"
              className="hover:text-white transition-colors flex items-center space-x-1 py-0.5 px-1.5 rounded hover:bg-white/10"
            >
              <Globe className="w-3 h-3 text-slate-300" />
              <span className="font-medium">
                {language === "en" ? "English" : "മലയാളം"}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </button>

            {isLangDropdownOpen && (
              <ul
                role="listbox"
                aria-label="Language selection"
                className="absolute top-full right-0 mt-1 w-28 bg-white text-gray-800 rounded shadow-lg border border-gray-200 py-1 z-50 text-xs"
              >
                <li>
                  <button
                    type="button"
                    role="option"
                    aria-selected={language === "en"}
                    onClick={() => {
                      setLanguage("en");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors flex items-center justify-between ${language === "en"
                      ? "text-[#1677B8] font-bold bg-blue-50/50"
                      : "text-gray-700"
                      }`}
                  >
                    <span>English</span>
                    {language === "en" && <span className="text-[10px]">✓</span>}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    role="option"
                    aria-selected={language === "ml"}
                    onClick={() => {
                      setLanguage("ml");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors flex items-center justify-between ${language === "ml"
                      ? "text-[#1677B8] font-bold bg-blue-50/50"
                      : "text-gray-700"
                      }`}
                  >
                    <span>മലയാളം</span>
                    {language === "ml" && <span className="text-[10px]">✓</span>}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}

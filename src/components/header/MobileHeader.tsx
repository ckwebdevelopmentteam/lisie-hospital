"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Calendar,
  Stethoscope,
  Siren,
  ChevronDown,
  ChevronRight,
  Clock,
  HelpCircle,
  Sliders,
  Globe,
} from "lucide-react";
import { CLINICAL_SPECIALTIES, SURGICAL_SPECIALTIES, POPULAR_SPECIALTIES, PATIENT_INFO_SECTIONS, ABOUT_LISIE_SECTIONS, ACADEMICS_RESEARCH_SECTIONS, QUALITY_SAFETY_ITEMS } from "./data/hospitalData";
import { Language, TextSize } from "./types";
import AccessibilityPopover from "./modals/AccessibilityPopover";

interface MobileHeaderProps {
  onOpenDoctorSearch: () => void;
  onOpenAppointment: () => void;
  onOpenEmergency: () => void;
  onOpenSearch: () => void;
  onOpenOPTimings: () => void;
  onOpenPatientHelp: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (val: boolean) => void;
}

export default function MobileHeader({
  onOpenDoctorSearch,
  onOpenAppointment,
  onOpenEmergency,
  onOpenSearch,
  onOpenOPTimings,
  onOpenPatientHelp,
  language,
  setLanguage,
  textSize,
  setTextSize,
  highContrast,
  setHighContrast,
  reduceMotion,
  setReduceMotion,
}: MobileHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [drawerSearch, setDrawerSearch] = useState("");
  const [showAccessibility, setShowAccessibility] = useState(false);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="lg:hidden w-full bg-white border-b border-gray-100">
      {/* ========================================================
          TABLET BAR (md to lg: 768px - 1023px)
          Single Clean Row
          ======================================================== */}
      <div className="hidden md:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <img
            src="/images/lisie-hospital-logo.png"
            alt="Lisie Hospital"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1677B8] border border-slate-200 transition-colors shadow-2xs"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenAppointment}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#1677B8] hover:bg-[#125F94] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            className="p-2 rounded-lg text-gray-700 hover:text-[#123B63] hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          MOBILE VIEW (< 768px)
          Single Clean Row
          ======================================================== */}
      <div className="md:hidden px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/images/lisie-hospital-logo.png"
            alt="Lisie Hospital"
            className="h-7 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search site"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1677B8] border border-slate-200 transition-colors shadow-2xs"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenAppointment}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1677B8] text-white text-xs font-semibold shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Navigation Drawer"
            className="p-2 text-gray-700 hover:text-[#123B63] rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          FULL-HEIGHT NAVIGATION DRAWER (Both Tablet & Mobile)
          ======================================================== */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 flex"
        >
          {/* Dimmed backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={closeDrawer}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer Top Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <img
                  src="/images/lisie-hospital-logo.png"
                  alt="Lisie Hospital"
                  className="h-7 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close menu"
                className="p-1.5 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={drawerSearch}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      closeDrawer();
                      onOpenSearch();
                    }
                  }}
                  placeholder="Search doctors, departments, services..."
                  aria-label="Search"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E31C59]"
                />
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="p-3 bg-white border-b border-gray-200 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  onOpenDoctorSearch();
                }}
                className="p-2 rounded-lg bg-blue-50/80 border border-blue-100 text-[#123B63] flex flex-col items-center justify-center text-center group"
              >
                <Stethoscope className="w-4 h-4 text-[#1677B8] mb-1" />
                <span className="text-[11px] font-bold leading-tight">Find Doctor</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  onOpenAppointment();
                }}
                className="p-2 rounded-lg bg-[#E31C59] text-white flex flex-col items-center justify-center text-center shadow-xs"
              >
                <Calendar className="w-4 h-4 text-white mb-1" />
                <span className="text-[11px] font-bold leading-tight">Book Appt</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  onOpenEmergency();
                }}
                className="p-2 rounded-lg bg-red-50 border border-red-200 text-[#C5221F] flex flex-col items-center justify-center text-center"
              >
                <Siren className="w-4 h-4 text-[#C5221F] mb-1" />
                <span className="text-[11px] font-bold leading-tight">Emergency</span>
              </button>
            </div>

            {/* Accordion Navigation (Scrollable) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 divide-y divide-gray-100">
              {/* 1. Departments */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("departments")}
                  className="w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#E31C59] text-left"
                >
                  <span>Departments & Specialties</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedSection === "departments" ? "rotate-180 text-[#E31C59]" : ""
                    }`}
                  />
                </button>
                {expandedSection === "departments" && (
                  <div className="pl-4 pr-2 pb-3 space-y-2 text-xs">
                    <div className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                      Clinical Specialties
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {CLINICAL_SPECIALTIES.slice(0, 8).map((dept) => (
                        <a
                          key={dept.name}
                          href={dept.href}
                          onClick={closeDrawer}
                          className="py-1 px-2 rounded text-gray-700 hover:text-[#E31C59] hover:bg-[#E31C59]/5 flex items-center justify-between"
                        >
                          <span>{dept.name}</span>
                          <ChevronRight className="w-3 h-3 text-gray-300" />
                        </a>
                      ))}
                    </div>
                    <div className="text-[11px] font-bold uppercase text-gray-400 tracking-wider pt-2">
                      Surgical Specialties
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {SURGICAL_SPECIALTIES.slice(0, 6).map((dept) => (
                        <a
                          key={dept.name}
                          href={dept.href}
                          onClick={closeDrawer}
                          className="py-1 px-2 rounded text-gray-700 hover:text-[#E31C59] hover:bg-[#E31C59]/5 flex items-center justify-between"
                        >
                          <span>{dept.name}</span>
                          <ChevronRight className="w-3 h-3 text-gray-300" />
                        </a>
                      ))}
                    </div>
                    <a
                      href="/departments"
                      onClick={closeDrawer}
                      className="block text-center py-2 mt-2 bg-[#E31C59]/10 text-[#E31C59] font-bold rounded"
                    >
                      View All Departments →
                    </a>
                  </div>
                )}
              </div>

              {/* 2. Doctors */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("doctors")}
                  className="w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#E31C59] text-left"
                >
                  <span>Doctors Directory</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedSection === "doctors" ? "rotate-180 text-[#E31C59]" : ""
                    }`}
                  />
                </button>
                {expandedSection === "doctors" && (
                  <div className="pl-4 pr-2 pb-3 space-y-1 text-xs">
                    {POPULAR_SPECIALTIES.map((spec) => (
                      <a
                        key={spec}
                        href={`/doctors?specialty=${encodeURIComponent(spec)}`}
                        onClick={closeDrawer}
                        className="py-1 px-2 rounded text-gray-700 hover:text-[#E31C59] hover:bg-[#E31C59]/5 flex items-center justify-between"
                      >
                        <span>{spec} Doctors</span>
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                      </a>
                    ))}
                    <a
                      href="/doctors"
                      onClick={closeDrawer}
                      className="block text-center py-2 mt-2 bg-[#E31C59]/10 text-[#E31C59] font-bold rounded"
                    >
                      View All Doctors →
                    </a>
                  </div>
                )}
              </div>

              {/* 3. Patient Information */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("patient-info")}
                  className="w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#E31C59] text-left"
                >
                  <span>Patient Information</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedSection === "patient-info" ? "rotate-180 text-[#E31C59]" : ""
                    }`}
                  />
                </button>
                {expandedSection === "patient-info" && (
                  <div className="pl-4 pr-2 pb-3 space-y-2 text-xs">
                    {PATIENT_INFO_SECTIONS.map((section) => (
                      <div key={section.title}>
                        <div className="text-[11px] font-bold text-gray-500 uppercase mt-1 mb-0.5">
                          {section.title}
                        </div>
                        {section.items.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={closeDrawer}
                            className="block py-1 px-2 rounded text-gray-700 hover:text-[#E31C59] hover:bg-[#E31C59]/5"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. About Lisie */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("about")}
                  className="w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#E31C59] text-left"
                >
                  <span>About Lisie</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedSection === "about" ? "rotate-180 text-[#E31C59]" : ""
                    }`}
                  />
                </button>
                {expandedSection === "about" && (
                  <div className="pl-4 pr-2 pb-3 space-y-1 text-xs">
                    {ABOUT_LISIE_SECTIONS.flatMap((s) => s.items).map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={closeDrawer}
                        className="block py-1 px-2 rounded text-gray-700 hover:text-[#E31C59] hover:bg-[#E31C59]/5"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Academics & Research */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("academics")}
                  className="w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#E31C59] text-left"
                >
                  <span>Academics & Research</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedSection === "academics" ? "rotate-180 text-[#E31C59]" : ""
                    }`}
                  />
                </button>
                {expandedSection === "academics" && (
                  <div className="pl-4 pr-2 pb-3 space-y-1 text-xs">
                    {ACADEMICS_RESEARCH_SECTIONS.flatMap((s) => s.items).map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={closeDrawer}
                        className="block py-1 px-2 rounded text-gray-700 hover:text-[#E31C59] hover:bg-[#E31C59]/5"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. Quality & Safety */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("quality")}
                  className="w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#E31C59] text-left"
                >
                  <span>Quality & Safety</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedSection === "quality" ? "rotate-180 text-[#E31C59]" : ""
                    }`}
                  />
                </button>
                {expandedSection === "quality" && (
                  <div className="pl-4 pr-2 pb-3 space-y-1 text-xs">
                    {QUALITY_SAFETY_ITEMS.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={closeDrawer}
                        className="block py-1 px-2 rounded text-gray-700 hover:text-[#E31C59] hover:bg-[#E31C59]/5"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 7. Direct Quick Links */}
              <div>
                <a
                  href="/careers"
                  onClick={closeDrawer}
                  className="w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#E31C59]"
                >
                  <span>Careers</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </div>
              <div>
                <a
                  href="/news-events"
                  onClick={closeDrawer}
                  className="w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#E31C59]"
                >
                  <span>News & Events</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </div>
              <div>
                <a
                  href="/contact-us"
                  onClick={closeDrawer}
                  className="w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#E31C59]"
                >
                  <span>Contact Us</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </div>
            </div>

            {/* Bottom Utilities: OP Timings, Patient Help, Accessibility, Language */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    onOpenOPTimings();
                  }}
                  className="p-2 rounded bg-white border border-gray-200 text-gray-700 font-medium flex items-center justify-center space-x-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-[#1677B8]" />
                  <span>OP Timings</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    onOpenPatientHelp();
                  }}
                  className="p-2 rounded bg-white border border-gray-200 text-gray-700 font-medium flex items-center justify-center space-x-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#1677B8]" />
                  <span>Patient Help</span>
                </button>
              </div>

              {/* Language & Accessibility */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[11px] text-gray-600 font-medium">Language:</span>
                  <button
                    type="button"
                    onClick={() => setLanguage(language === "en" ? "ml" : "en")}
                    className="text-xs font-bold text-[#1677B8] underline"
                  >
                    {language === "en" ? "English (Switch to മലയാളം)" : "മലയാളം (Switch to English)"}
                  </button>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowAccessibility(!showAccessibility)}
                    className="p-1.5 text-gray-600 hover:text-[#123B63] rounded"
                    title="Accessibility"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                  <AccessibilityPopover
                    isOpen={showAccessibility}
                    onClose={() => setShowAccessibility(false)}
                    textSize={textSize}
                    setTextSize={setTextSize}
                    highContrast={highContrast}
                    setHighContrast={setHighContrast}
                    reduceMotion={reduceMotion}
                    setReduceMotion={setReduceMotion}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

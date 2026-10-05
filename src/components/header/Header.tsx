"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Calendar, ChevronDown } from "lucide-react";
import MobileHeader from "./MobileHeader";
import DepartmentsMegaMenu from "./megamenus/DepartmentsMegaMenu";
import DoctorsMegaMenu from "./megamenus/DoctorsMegaMenu";
import PatientInfoMegaMenu from "./megamenus/PatientInfoMegaMenu";
import AboutMegaMenu from "./megamenus/AboutMegaMenu";
import AcademicsMegaMenu from "./megamenus/AcademicsMegaMenu";
import QualitySafetyMenu from "./megamenus/QualitySafetyMenu";
import MoreMenu from "./megamenus/MoreMenu";
import DoctorSearchModal from "./modals/DoctorSearchModal";
import AppointmentModal from "./modals/AppointmentModal";
import EmergencyPanel from "./modals/EmergencyPanel";
import SearchOverlay from "./modals/SearchOverlay";
import OPTimingsModal from "./modals/OPTimingsModal";
import PatientHelpModal from "./modals/PatientHelpModal";
import { ActiveModal, ActiveMegaMenu, Language, TextSize } from "./types";

export default function Header() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [activeMenu, setActiveMenu] = useState<ActiveMegaMenu>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [textSize, setTextSize] = useState<TextSize>("md");
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuName: ActiveMegaMenu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 160);
  };

  // Close menus on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setActiveModal(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync accessibility attributes to html element
  useEffect(() => {
    document.documentElement.setAttribute("data-text-size", textSize);
  }, [textSize]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-high-contrast",
      highContrast ? "true" : "false"
    );
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-reduce-motion",
      reduceMotion ? "true" : "false"
    );
  }, [reduceMotion]);

  const navItems: { id: ActiveMegaMenu; label: string }[] = [
    { id: "departments", label: "Departments" },
    { id: "doctors", label: "Doctors" },
    { id: "patient-info", label: "Patient Info" },
    { id: "about", label: "About" },
    { id: "academics", label: "Academics" },
    { id: "quality", label: "Quality" },
    { id: "more", label: "More" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-md border-b border-gray-100 font-sans">
      {/* ========================================================
          DESKTOP HEADER (≥ 1024px)
          Two-Tier Header:
          Section 1: Logo (left) + Search & Appointment button (right)
          Section 2: Navigation Items / Dropdown triggers (below Section 1)
          ======================================================== */}
      <div
        ref={navContainerRef}
        onMouseLeave={handleMouseLeave}
        className="hidden lg:block w-full relative"
      >
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Lisie Hospital Logo */}
          <a
            href="/"
            className="flex items-center space-x-2 shrink-0 group focus:outline-none focus:ring-2 focus:ring-[#1677B8] rounded"
            aria-label="Lisie Hospital Home"
          >
            <img
              src="/images/lisie-hospital-logo.png"
              alt="Lisie Hospital"
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* Center: Navigation Items */}
          <nav
            aria-label="Main Navigation"
            className="flex-1 flex items-center justify-center space-x-1"
          >
            {navItems.map((item) => {
              const isActive = activeMenu === item.id;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveMenu(isActive ? null : item.id)}
                    aria-expanded={isActive}
                    className={`flex items-center space-x-1 px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors ${
                      isActive
                        ? "text-[#1677B8] bg-blue-50"
                        : "text-gray-700 hover:text-[#1677B8] hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isActive ? "rotate-180 text-[#1677B8]" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right: Search & Book Appointment */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setActiveModal("search")}
              aria-label="Search"
              className="p-2 rounded-md text-gray-500 hover:text-[#123B63] hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1677B8]"
              title="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            <button
              type="button"
              onClick={() => setActiveModal("appointment")}
              className="inline-flex items-center space-x-1.5 px-4.5 py-2 rounded-full bg-[#1677B8] hover:bg-[#125F94] active:bg-[#0E4A74] text-white text-xs xl:text-sm font-semibold shadow-xs hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-[#1677B8] focus:ring-offset-2"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Dropdown / Mega Menu under the header */}
        {activeMenu && (
          <div
            className="absolute top-full left-0 w-full z-50 bg-white border-b border-gray-100 border-t-[3px] border-[#E31C59] shadow-lg animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
          >
            {activeMenu === "departments" && (
              <DepartmentsMegaMenu onClose={() => setActiveMenu(null)} />
            )}
            {activeMenu === "doctors" && (
              <DoctorsMegaMenu
                onClose={() => setActiveMenu(null)}
                onOpenDoctorModal={() => setActiveModal("doctor-search")}
              />
            )}
            {activeMenu === "patient-info" && (
              <PatientInfoMegaMenu
                onClose={() => setActiveMenu(null)}
                onOpenAppointmentModal={() => setActiveModal("appointment")}
                onOpenOPTimingsModal={() => setActiveModal("op-timings")}
              />
            )}
            {activeMenu === "about" && (
              <AboutMegaMenu onClose={() => setActiveMenu(null)} />
            )}
            {activeMenu === "academics" && (
              <AcademicsMegaMenu onClose={() => setActiveMenu(null)} />
            )}
            {activeMenu === "quality" && (
              <QualitySafetyMenu onClose={() => setActiveMenu(null)} />
            )}
            {activeMenu === "more" && (
              <MoreMenu onClose={() => setActiveMenu(null)} />
            )}
          </div>
        )}
      </div>

      {/* ========================================================
          TABLET & MOBILE HEADER (< 1024px)
          ======================================================== */}
      <MobileHeader
        onOpenDoctorSearch={() => setActiveModal("doctor-search")}
        onOpenAppointment={() => setActiveModal("appointment")}
        onOpenEmergency={() => setActiveModal("emergency")}
        onOpenSearch={() => setActiveModal("search")}
        onOpenOPTimings={() => setActiveModal("op-timings")}
        onOpenPatientHelp={() => setActiveModal("patient-help")}
        language={language}
        setLanguage={setLanguage}
        textSize={textSize}
        setTextSize={setTextSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        reduceMotion={reduceMotion}
        setReduceMotion={setReduceMotion}
      />

      {/* ========================================================
          GLOBAL MODALS & OVERLAYS
          ======================================================== */}
      {/* 1. Doctor Search Modal */}
      <DoctorSearchModal
        isOpen={activeModal === "doctor-search"}
        onClose={() => setActiveModal(null)}
        onSelectDoctor={(name) => {
          setActiveModal("appointment");
        }}
      />

      {/* 2. Book Appointment Modal */}
      <AppointmentModal
        isOpen={activeModal === "appointment"}
        onClose={() => setActiveModal(null)}
        onFindDoctorClick={() => setActiveModal("doctor-search")}
      />

      {/* 3. Emergency & Ambulance Panel */}
      <EmergencyPanel
        isOpen={activeModal === "emergency"}
        onClose={() => setActiveModal(null)}
      />

      {/* 4. Full-Width Search Overlay */}
      <SearchOverlay
        isOpen={activeModal === "search"}
        onClose={() => setActiveModal(null)}
        onOpenDoctorModal={() => setActiveModal("doctor-search")}
        onOpenAppointmentModal={() => setActiveModal("appointment")}
        onOpenEmergencyModal={() => setActiveModal("emergency")}
        onOpenOPTimingsModal={() => setActiveModal("op-timings")}
      />

      {/* 5. OP Timings Modal */}
      <OPTimingsModal
        isOpen={activeModal === "op-timings"}
        onClose={() => setActiveModal(null)}
        onBookAppointment={() => setActiveModal("appointment")}
      />

      {/* 6. Patient Help Modal */}
      <PatientHelpModal
        isOpen={activeModal === "patient-help"}
        onClose={() => setActiveModal(null)}
        onEmergencyClick={() => setActiveModal("emergency")}
      />
    </header>
  );
}

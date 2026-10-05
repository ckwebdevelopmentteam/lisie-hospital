"use client";

import React, { useRef } from "react";
import { Search, Calendar, ChevronDown } from "lucide-react";
import { ActiveMegaMenu } from "./types";
import DepartmentsMegaMenu from "./megamenus/DepartmentsMegaMenu";
import DoctorsMegaMenu from "./megamenus/DoctorsMegaMenu";
import PatientInfoMegaMenu from "./megamenus/PatientInfoMegaMenu";
import AboutMegaMenu from "./megamenus/AboutMegaMenu";
import AcademicsMegaMenu from "./megamenus/AcademicsMegaMenu";
import QualitySafetyMenu from "./megamenus/QualitySafetyMenu";
import MoreMenu from "./megamenus/MoreMenu";

interface CompactStickyHeaderProps {
  isVisible: boolean;
  activeMenu: ActiveMegaMenu;
  setActiveMenu: (menu: ActiveMegaMenu) => void;
  onOpenDoctorModal: () => void;
  onOpenAppointmentModal: () => void;
  onOpenOPTimingsModal: () => void;
  onOpenSearch: () => void;
}

export default function CompactStickyHeader({
  isVisible,
  activeMenu,
  setActiveMenu,
  onOpenDoctorModal,
  onOpenAppointmentModal,
  onOpenOPTimingsModal,
  onOpenSearch,
}: CompactStickyHeaderProps) {
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

  if (!isVisible) return null;

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
    <div
      onMouseLeave={handleMouseLeave}
      className="fixed top-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all duration-200 hidden lg:block"
    >
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Compact Logo */}
        <a
          href="/"
          className="flex items-center space-x-2 shrink-0 group focus:outline-none"
          aria-label="Lisie Hospital Home"
        >
          <img
            src="/images/lisie-hospital-logo.png"
            alt="Lisie Hospital"
            className="h-8 w-auto object-contain"
          />
        </a>

        {/* Center: Compact Primary Nav Items */}
        <nav
          aria-label="Sticky Navigation"
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
                  className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                    isActive
                      ? "text-[#1677B8] bg-blue-50"
                      : "text-gray-700 hover:text-[#1677B8] hover:bg-gray-50"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      isActive ? "rotate-180 text-[#1677B8]" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right: Search & Book Appointment */}
        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search"
            className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1677B8] border border-slate-200 hover:border-blue-200 transition-colors shadow-2xs"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenAppointmentModal}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md bg-[#1677B8] hover:bg-[#125F94] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Dropdown / Mega Menu under sticky header */}
      {activeMenu && (
        <div
          className="absolute top-full left-0 w-full z-50 animate-in fade-in slide-in-from-top-1 duration-150"
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
              onOpenDoctorModal={onOpenDoctorModal}
            />
          )}
          {activeMenu === "patient-info" && (
            <PatientInfoMegaMenu
              onClose={() => setActiveMenu(null)}
              onOpenAppointmentModal={onOpenAppointmentModal}
              onOpenOPTimingsModal={onOpenOPTimingsModal}
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
  );
}

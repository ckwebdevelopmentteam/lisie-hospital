"use client";

import React, { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ActiveMegaMenu } from "./types";
import DepartmentsMegaMenu from "./megamenus/DepartmentsMegaMenu";
import DoctorsMegaMenu from "./megamenus/DoctorsMegaMenu";
import PatientInfoMegaMenu from "./megamenus/PatientInfoMegaMenu";
import AboutMegaMenu from "./megamenus/AboutMegaMenu";
import AcademicsMegaMenu from "./megamenus/AcademicsMegaMenu";
import QualitySafetyMenu from "./megamenus/QualitySafetyMenu";
import MoreMenu from "./megamenus/MoreMenu";

interface PrimaryNavigationProps {
  activeMenu: ActiveMegaMenu;
  setActiveMenu: (menu: ActiveMegaMenu) => void;
  onOpenDoctorModal: () => void;
  onOpenAppointmentModal: () => void;
  onOpenOPTimingsModal: () => void;
}

export default function PrimaryNavigation({
  activeMenu,
  setActiveMenu,
  onOpenDoctorModal,
  onOpenAppointmentModal,
  onOpenOPTimingsModal,
}: PrimaryNavigationProps) {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
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
  }, [setActiveMenu]);

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

  const navItems: { id: ActiveMegaMenu; label: string; href: string }[] = [
    { id: "departments", label: "Departments", href: "/departments" },
    { id: "doctors", label: "Doctors", href: "/doctors" },
    { id: "patient-info", label: "Patient Information", href: "/patient-info" },
    { id: "about", label: "About Lisie", href: "/about-us" },
    { id: "academics", label: "Academics & Research", href: "/academics" },
    { id: "quality", label: "Quality & Safety", href: "/quality" },
    { id: "more", label: "More", href: "/more" },
  ];

  return (
    <div
      ref={navContainerRef}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white border-b border-gray-100 z-40 hidden lg:block"
    >
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Main Hospital Navigation"
          className="flex items-center justify-center space-x-1 sm:space-x-2 lg:space-x-3 h-12"
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
                  aria-haspopup="true"
                  className={`flex items-center space-x-1 px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors ${
                    isActive
                      ? "text-[#1677B8] bg-blue-50/70"
                      : "text-[#17202A] hover:text-[#1677B8] hover:bg-gray-50"
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
      </div>

      {/* Render Active Mega Menu Directly Underneath */}
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

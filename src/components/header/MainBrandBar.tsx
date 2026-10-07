"use client";

import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  Calendar,
  Siren,
  Search,
} from "lucide-react";

interface MainBrandBarProps {
  onOpenDoctorSearch: () => void;
  onOpenAppointment: () => void;
  onOpenEmergency: () => void;
  onOpenSearch: () => void;
}

export default function MainBrandBar({
  onOpenDoctorSearch,
  onOpenAppointment,
  onOpenEmergency,
  onOpenSearch,
}: MainBrandBarProps) {
  return (
    <div className="bg-white border-b border-gray-100 h-20 sm:h-22 lg:h-[84px] flex items-center">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Lisie Hospital Logo & Accreditation */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          <Link
            href="/"
            aria-label="Lisie Hospital Home"
            className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-[#1677B8] rounded"
          >
            {/* Logo Image */}
            <div className="relative h-12 sm:h-14 w-auto flex items-center">
              <img
                src="/images/lisie-hospital-logo.png"
                alt="Lisie Hospital - Care with Love"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text brand if image fails
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                style={{ display: "none" }}
                className="flex items-center space-x-2"
              >
                <div className="w-9 h-9 rounded bg-[#123B63] text-white flex items-center justify-center font-bold text-lg">
                  L
                </div>
                <div>
                  <span className="font-bold text-lg text-[#123B63] tracking-tight block">
                    LISIE HOSPITAL
                  </span>
                  <span className="text-[10px] text-gray-500 tracking-wider uppercase block">
                    Care with Love
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* NABH Accreditation Badge */}
          <div className="hidden md:flex items-center pl-2.5 sm:pl-3 border-l border-gray-200">
            <img
              src="/images/nabh-logo.png"
              alt="NABH Accredited Hospital"
              className="h-9 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              title="National Accreditation Board for Hospitals & Healthcare Providers"
            />
          </div>
        </div>

        {/* Right Side: 4 Visual Actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Action 1: Find a Doctor (Secondary Action) */}
          <button
            type="button"
            onClick={onOpenDoctorSearch}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#1677B8] hover:bg-blue-50/40 text-gray-700 hover:text-[#123B63] text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#1677B8]"
            title="Search Doctors Directory"
          >
            <Stethoscope className="w-4 h-4 text-[#1677B8]" />
            <span>Find a Doctor</span>
          </button>

          {/* Action 2: Book Appointment (Primary CTA) */}
          <button
            type="button"
            onClick={onOpenAppointment}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#1677B8] hover:bg-[#125F94] active:bg-[#0E4A74] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow focus:outline-none focus:ring-2 focus:ring-[#1677B8] focus:ring-offset-2"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Book Appointment</span>
          </button>

          {/* Action 3: Emergency (High-Priority Medical Action) */}
          <button
            type="button"
            onClick={onOpenEmergency}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 sm:py-2 rounded-lg bg-red-50 hover:bg-red-100/80 border border-red-200 text-[#C5221F] text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
            title="Emergency & 24/7 Ambulance Dispatch"
          >
            <Siren className="w-4 h-4 text-[#C5221F]" />
            <span className="hidden xs:inline sm:inline">Emergency</span>
          </button>

          {/* Action 4: Search (Icon Button) */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Open search"
            className="w-9 h-9 sm:w-[38px] sm:h-[38px] flex items-center justify-center rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1677B8] border border-slate-200 hover:border-blue-200 transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#1677B8]"
            title="Search doctors, departments, services..."
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

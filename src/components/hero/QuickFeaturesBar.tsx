"use client";

import React from "react";
import {
  Calendar,
  PhoneCall,
  UserCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

interface QuickFeaturesBarProps {
  onOpenAppointment: () => void;
  onOpenDoctorSearch: () => void;
  onOpenOPTimings: () => void;
  onOpenEmergency: () => void;
}

export default function QuickFeaturesBar({
  onOpenAppointment,
  onOpenDoctorSearch,
  onOpenOPTimings,
  onOpenEmergency,
}: QuickFeaturesBarProps) {
  const quickActions = [
    {
      title: "Book Appointment",
      desc: "Advance OPD Booking: 0484 2401141",
      icon: Calendar,
      color: "bg-[#1677B8] text-white",
      hoverBorder: "hover:border-[#1677B8]",
      onClick: onOpenAppointment,
    },
    {
      title: "Find a Doctor",
      desc: "Over 200+ Renowned Specialists",
      icon: UserCheck,
      color: "bg-[#123B63] text-white",
      hoverBorder: "hover:border-[#123B63]",
      onClick: onOpenDoctorSearch,
    },
    {
      title: "24/7 Emergency",
      desc: "Ambulance: +91 9895 756 164",
      icon: PhoneCall,
      color: "bg-[#C5221F] text-white",
      hoverBorder: "hover:border-[#C5221F]",
      onClick: onOpenEmergency,
    },
    {
      title: "OP Timings",
      desc: "Daily Department Schedules",
      icon: Clock,
      color: "bg-[#0E2A47] text-white",
      hoverBorder: "hover:border-[#0E2A47]",
      onClick: onOpenOPTimings,
    },
  ];

  const highlights = [
    { value: "Since 1956", label: "Care with Love", sub: "68+ Years of Healing Excellence" },
    { value: "1,000+", label: "Inpatient Bed Capacity", sub: "NABH & NABL Accredited Tertiary Care" },
    { value: "14,000+", label: "Open Heart Surgeries", sub: "Lisie Heart Institute Milestone" },
    { value: "30,000+", label: "Yearly Emergency Patients", sub: "24/7 Level 1 Trauma Care" },
  ];

  return (
    <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16">
      {/* 4 Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={action.onClick}
              className={`group p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-left flex items-start space-x-4 ${action.hoverBorder} transform hover:-translate-y-1`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform ${action.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#1677B8] transition-colors block">
                  {action.title}
                </span>
                <span className="text-xs text-gray-500 mt-0.5 block">
                  {action.desc}
                </span>
                <span className="mt-2 text-[11px] font-semibold text-[#1677B8] inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Hospital Trust Statistics Row */}
      <div className="mt-12 pt-10 border-t border-gray-200/80 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {highlights.map((h, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#123B63] tracking-tight">
              {h.value}
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
              {h.label}
            </span>
            <span className="text-[11px] text-gray-500 mt-0.5">{h.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

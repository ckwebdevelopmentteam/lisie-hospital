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
      desc: "Mon – Sat: 8:00 AM – 5:00 PM",
      icon: Clock,
      color: "bg-[#0E2A47] text-white",
      hoverBorder: "hover:border-[#0E2A47]",
      onClick: onOpenOPTimings,
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
      <div className="w-full max-w-[1536px] mx-auto">
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
    </div>
  </div>
);
}

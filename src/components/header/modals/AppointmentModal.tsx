"use client";

import React, { useEffect, useRef } from "react";
import {
  Calendar,
  UserCheck,
  Building2,
  Activity,
  Phone,
  Clock,
  X,
  ArrowRight,
} from "lucide-react";
import { HOSPITAL_CONTACTS } from "../data/hospitalData";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFindDoctorClick: () => void;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  onFindDoctorClick,
}: AppointmentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        ref={modalRef}
        role="dialog"
        aria-labelledby="appointment-modal-title"
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-[#1677B8] text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h2 id="appointment-modal-title" className="text-xl font-bold text-white tracking-tight">
                Book an Appointment
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/15 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-blue-100">
            Find your appointment quickly with our certified consultants and clinical departments.
          </p>
        </div>

        {/* 3 Main Action Choices */}
        <div className="p-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            Choose how you would like to proceed
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* 1. Find a Doctor */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onFindDoctorClick();
              }}
              className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#1677B8] hover:bg-blue-50/40 transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#1677B8] flex items-center justify-center group-hover:bg-[#1677B8] group-hover:text-white transition-colors">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#123B63] group-hover:text-[#1677B8] transition-colors">
                    Find a Doctor
                  </h3>
                  <p className="text-xs text-gray-500">
                    Know your specialist's name or choose from our doctors directory.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1677B8] group-hover:translate-x-1 transition-all" />
            </button>

            {/* 2. Find a Department */}
            <a
              href="/departments"
              className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#1677B8] hover:bg-blue-50/40 transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#123B63] group-hover:text-white transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#123B63] group-hover:text-[#1677B8] transition-colors">
                    Find a Department
                  </h3>
                  <p className="text-xs text-gray-500">
                    Select a specialty such as Cardiology, Orthopaedics, or Neurology.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1677B8] group-hover:translate-x-1 transition-all" />
            </a>

            {/* 3. Health Checkup */}
            <a
              href="/health-checkup"
              className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#1677B8] hover:bg-blue-50/40 transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#123B63] group-hover:text-[#1677B8] transition-colors">
                    Health Checkup Packages
                  </h3>
                  <p className="text-xs text-gray-500">
                    Comprehensive master health checkup, cardiac wellness, and executive screening.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1677B8] group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Phone Booking Alternative */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-gray-50 p-3.5 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4 text-[#1677B8]" />
              <span>Prefer phone booking assistance?</span>
            </div>
            <a
              href={`tel:${HOSPITAL_CONTACTS.phoneBooking}`}
              className="font-bold text-[#1677B8] hover:underline flex items-center space-x-1"
            >
              <span>{HOSPITAL_CONTACTS.phoneBooking}</span>
              <span className="text-[10px] text-gray-400 font-normal">(08:00 AM - 05:00 PM)</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>OP consultations available Monday to Saturday</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

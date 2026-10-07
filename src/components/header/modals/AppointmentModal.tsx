"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Calendar,
  UserCheck,
  Building2,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";

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
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl my-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#123B63] to-[#164E81] text-white relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2
                  id="appointment-modal-title"
                  className="text-lg sm:text-xl font-extrabold text-white tracking-tight"
                >
                  Book an Appointment
                </h2>
                <p className="text-xs text-blue-100/90 mt-0.5">
                  Find your appointment quickly with our certified consultants and departments.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors shrink-0 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Action Choices */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
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
              className="w-full p-4 border border-gray-200 rounded-xl hover:border-[#E31C59]/40 hover:bg-[#E31C59]/5 transition-all flex items-center justify-between text-left group shadow-xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#E31C59]/10 text-[#E31C59] flex items-center justify-center group-hover:bg-[#E31C59] group-hover:text-white transition-colors shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#123B63] group-hover:text-[#E31C59] transition-colors">
                    Find a Doctor
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Know your specialist&apos;s name or browse by clinical department.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#E31C59] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>

            {/* 2. Find a Department */}
            <Link
              href="/departments"
              onClick={onClose}
              className="w-full p-4 border border-gray-200 rounded-xl hover:border-[#1677B8]/40 hover:bg-blue-50/40 transition-all flex items-center justify-between text-left group shadow-xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1677B8] flex items-center justify-center group-hover:bg-[#1677B8] group-hover:text-white transition-colors shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#123B63] group-hover:text-[#1677B8] transition-colors">
                    Find a Department
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Select a specialty such as Cardiology, Orthopaedics, or Neurology.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1677B8] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </Link>
          </div>

          {/* Phone Booking Alternative */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center space-x-2.5 text-gray-600">
              <Phone className="w-4 h-4 text-[#E31C59] shrink-0" />
              <span className="font-medium">Prefer phone booking assistance?</span>
            </div>
            <a
              href={`tel:${HOSPITAL_CONTACTS.phoneBooking}`}
              className="font-bold text-[#1677B8] hover:text-[#E31C59] transition-colors flex items-center space-x-1 shrink-0"
            >
              <span>{HOSPITAL_CONTACTS.phoneBooking}</span>
              <span className="text-[11px] text-gray-400 font-normal">
                (08:00 AM - 05:00 PM)
              </span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50/90 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>OP consultations available Monday to Saturday</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors shadow-2xs"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

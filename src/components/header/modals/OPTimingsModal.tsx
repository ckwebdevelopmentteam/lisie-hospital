"use client";

import React, { useEffect, useRef } from "react";
import { Clock, Calendar, AlertCircle, Phone, X } from "lucide-react";
import { HOSPITAL_CONTACTS } from "../data/hospitalData";

interface OPTimingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

export default function OPTimingsModal({
  isOpen,
  onClose,
  onBookAppointment,
}: OPTimingsModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        ref={modalRef}
        role="dialog"
        aria-labelledby="op-timings-title"
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#123B63] text-white">
          <div className="flex items-center space-x-2.5">
            <Clock className="w-5 h-5 text-[#67B2E4]" />
            <div>
              <h2 id="op-timings-title" className="font-semibold text-base leading-tight">
                Outpatient (OP) Timings
              </h2>
              <p className="text-xs text-blue-200">Lisie Hospital, Kaloor, Kochi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Morning OP */}
            <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg p-3.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1677B8] mb-1">
                Morning OP
              </div>
              <div className="text-lg font-bold text-[#123B63]">08:00 AM – 01:00 PM</div>
              <p className="text-xs text-gray-600 mt-1">Monday through Saturday (All departments)</p>
            </div>

            {/* Evening OP */}
            <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg p-3.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1677B8] mb-1">
                Evening OP
              </div>
              <div className="text-lg font-bold text-[#123B63]">02:00 PM – 05:00 PM</div>
              <p className="text-xs text-gray-600 mt-1">Monday through Saturday (Specialty clinics)</p>
            </div>
          </div>

          {/* Sunday & Emergency Details */}
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 text-sm">
            <div className="p-3.5 flex items-start space-x-3">
              <Calendar className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-gray-800">Sunday Consultations: </span>
                <span className="text-gray-600">
                  08:30 AM – 12:30 PM (Selected specialties & Casualty duty doctors).
                </span>
              </div>
            </div>

            <div className="p-3.5 flex items-start space-x-3 bg-red-50/50">
              <AlertCircle className="w-4 h-4 text-[#C5221F] mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-[#C5221F]">Emergency & Trauma: </span>
                <span className="text-gray-700">
                  Open 24 hours a day, 7 days a week including all public holidays.
                </span>
              </div>
            </div>

            <div className="p-3.5 flex items-start space-x-3">
              <Clock className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-gray-800">Registration & Token Counters: </span>
                <span className="text-gray-600">
                  Open from 07:30 AM daily at Main OPD Block counters.
                </span>
              </div>
            </div>
          </div>

          {/* Telephone Help */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-3.5 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-gray-700">
              <Phone className="w-4 h-4 text-[#1677B8]" />
              <span>For phone token assistance:</span>
            </div>
            <a
              href={`tel:${HOSPITAL_CONTACTS.phoneBooking}`}
              className="font-bold text-[#1677B8] hover:underline"
            >
              {HOSPITAL_CONTACTS.phoneBooking}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookAppointment();
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#1677B8] hover:bg-[#125F94] rounded-md transition-colors shadow-xs"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

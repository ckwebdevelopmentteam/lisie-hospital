"use client";

import React, { useEffect, useRef } from "react";
import { HelpCircle, Phone, Clock, FileText, ShieldCheck, X, ChevronRight } from "lucide-react";
import { HOSPITAL_CONTACTS } from "../data/hospitalData";

interface PatientHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmergencyClick: () => void;
}

export default function PatientHelpModal({
  isOpen,
  onClose,
  onEmergencyClick,
}: PatientHelpModalProps) {
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
        aria-labelledby="patient-help-title"
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#123B63] text-white">
          <div className="flex items-center space-x-2.5">
            <HelpCircle className="w-5 h-5 text-[#67B2E4]" />
            <div>
              <h2 id="patient-help-title" className="font-semibold text-base leading-tight">
                Patient Help & Information Desk
              </h2>
              <p className="text-xs text-blue-200">How can we support you today?</p>
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
          {/* Quick Helplines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`tel:${HOSPITAL_CONTACTS.generalEnquiry}`}
              className="p-3.5 bg-gray-50 hover:bg-blue-50/60 border border-gray-200 hover:border-blue-200 rounded-lg transition-colors group flex items-start space-x-3"
            >
              <Phone className="w-4 h-4 text-[#1677B8] mt-1 shrink-0" />
              <div>
                <div className="text-xs text-gray-500">General Enquiry</div>
                <div className="text-sm font-bold text-[#123B63] group-hover:text-[#1677B8]">
                  {HOSPITAL_CONTACTS.generalEnquiry}
                </div>
                <div className="text-xs text-gray-500">Ground floor reception desk</div>
              </div>
            </a>

            <a
              href={`tel:${HOSPITAL_CONTACTS.emergencyPhone}`}
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onEmergencyClick();
              }}
              className="p-3.5 bg-red-50/50 hover:bg-red-50 border border-red-200 rounded-lg transition-colors group flex items-start space-x-3"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#C5221F] mt-1.5 shrink-0 animate-pulse" />
              <div>
                <div className="text-xs text-red-600 font-semibold">24/7 Emergency Line</div>
                <div className="text-sm font-bold text-[#C5221F]">
                  {HOSPITAL_CONTACTS.emergencyPhoneFormatted}
                </div>
                <div className="text-xs text-gray-500">Immediate trauma assistance</div>
              </div>
            </a>
          </div>

          {/* Key Patient Services */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-1">
              Frequent Patient Assistance
            </div>

            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 text-sm">
              <div className="p-3 flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-800">Visiting Hours: </span>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Rooms & Wards: 04:30 PM – 07:00 PM | ICU: 11:00 AM – 12:00 PM & 05:00 PM – 06:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-800">Insurance & TPA Help Desk: </span>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Cashless admission claims assistance available at Counter 11 (08:00 AM – 08:00 PM).
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <FileText className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-800">Patient Relations & Grievances: </span>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {HOSPITAL_CONTACTS.patientRelations} or email contact@lisiehospital.org
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span>Lisie Hospital • Care with Love</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

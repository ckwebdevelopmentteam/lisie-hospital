"use client";

import React from "react";
import { PATIENT_INFO_SECTIONS, HOSPITAL_CONTACTS } from "../data/hospitalData";
import { ArrowRight, ChevronRight, Phone, Clock, FileText } from "lucide-react";

interface PatientInfoMegaMenuProps {
  onClose: () => void;
  onOpenAppointmentModal?: () => void;
  onOpenOPTimingsModal?: () => void;
}

export default function PatientInfoMegaMenu({
  onClose,
  onOpenAppointmentModal,
  onOpenOPTimingsModal,
}: PatientInfoMegaMenuProps) {
  return (
    <div
      role="region"
      aria-label="Patient Information Mega Menu"
      className="w-full bg-white py-6 animate-in fade-in duration-150"
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E31C59]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B63]">
                Patient Information & Services
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Everything you need to plan your outpatient visit, admission, or hospital stay.
            </p>
          </div>
          <a
            href="/patient-guide"
            onClick={onClose}
            className="hidden sm:inline-flex items-center space-x-1 text-xs font-semibold text-[#E31C59] hover:text-[#c4144b]"
          >
            <span>Complete Patient Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-5">
          {PATIENT_INFO_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-1.5 border-b border-gray-100">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isBooking = item.name === "Book Appointment";
                  const isOPTimings = item.name === "OP Timings";

                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (isBooking && onOpenAppointmentModal) {
                            e.preventDefault();
                            onClose();
                            onOpenAppointmentModal();
                          } else if (isOPTimings && onOpenOPTimingsModal) {
                            e.preventDefault();
                            onClose();
                            onOpenOPTimingsModal();
                          } else {
                            onClose();
                          }
                        }}
                        className={`group flex items-center justify-between py-1.5 px-2 rounded text-xs transition-colors ${
                          isBooking
                            ? "bg-[#E31C59]/10 text-[#E31C59] font-bold hover:bg-[#E31C59]/15"
                            : "text-gray-700 hover:text-[#E31C59] hover:bg-[#E31C59]/5 font-medium"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#E31C59] group-hover:translate-x-0.5 transition-all" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Need Help? */}
        <div className="mt-6 pt-4 border-t border-gray-100 bg-[#F8FAFC] -mx-4 -mb-6 px-4 sm:px-6 lg:px-8 py-3.5 rounded-b-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
            <span className="font-bold text-[#123B63] uppercase tracking-wider">
              Need Help?
            </span>
            <div className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E31C59]" />
              <span>Information Desk:</span>
              <a href={`tel:${HOSPITAL_CONTACTS.generalEnquiry}`} className="font-semibold text-gray-900 hover:text-[#E31C59]">
                {HOSPITAL_CONTACTS.generalEnquiry}
              </a>
            </div>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <div>
              <span>Patient Relations:</span>{" "}
              <span className="font-semibold text-gray-900">{HOSPITAL_CONTACTS.patientRelations}</span>
            </div>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <a href="/contact-us" onClick={onClose} className="font-medium text-[#E31C59] hover:underline">
              Contact Us
            </a>
          </div>

          <a
            href="/patient-info/patient-guide"
            onClick={onClose}
            className="inline-flex items-center space-x-1 font-semibold text-[#E31C59] hover:text-[#c4144b] transition-colors"
          >
            <span>View Patient Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

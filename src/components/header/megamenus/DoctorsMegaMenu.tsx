"use client";

import React, { useState } from "react";
import { POPULAR_SPECIALTIES, SAMPLE_DOCTORS } from "../data/hospitalData";
import { ArrowRight, Search, User, ChevronRight } from "lucide-react";

interface DoctorsMegaMenuProps {
  onClose: () => void;
  onOpenDoctorModal?: () => void;
}

export default function DoctorsMegaMenu({ onClose, onOpenDoctorModal }: DoctorsMegaMenuProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = SAMPLE_DOCTORS.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      role="region"
      aria-label="Doctors Mega Menu"
      className="w-full bg-white py-6 animate-in fade-in duration-150"
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Search bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E31C59]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B63]">
                Doctors Directory
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Consult with our eminent physicians, surgeons, and healthcare specialists.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctor name or specialty..."
              aria-label="Search doctor name or specialty"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E31C59] focus:bg-white"
            />
          </div>
        </div>

        {/* Content: Popular Specialties & Featured Specialists */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-5">
          {/* Left: Popular Specialties (5 cols) */}
          <div className="md:col-span-4 border-r border-gray-100 pr-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-2 mb-3 border-b border-gray-100">
              Popular Specialties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {POPULAR_SPECIALTIES.map((spec) => (
                <a
                  key={spec}
                  href={`/doctors?specialty=${encodeURIComponent(spec)}`}
                  onClick={onClose}
                  className="group flex items-center justify-between p-2 rounded hover:bg-slate-50 text-xs text-gray-700 hover:text-[#E31C59] transition-colors"
                >
                  <span className="font-medium">{spec}</span>
                  <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#E31C59] group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>

            <div className="mt-4 p-3 bg-[#E31C59]/5 rounded-lg border border-[#E31C59]/20 text-xs text-gray-600">
              <span className="font-semibold text-[#123B63] block mb-1">
                Need help finding the right doctor?
              </span>
              Use our interactive doctor finder or call our OPD booking counter.
            </div>
          </div>

          {/* Right: Senior Consultants Preview (8 cols) */}
          <div className="md:col-span-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-2 mb-3 border-b border-gray-100 flex items-center justify-between">
              <span>Featured Consultants</span>
              <span className="text-[11px] text-gray-400 font-normal">
                OP Consultations Mon – Sat
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredDoctors.slice(0, 6).map((doc) => (
                <div
                  key={doc.name}
                  className="p-3 border border-gray-100 hover:border-[#E31C59]/30 hover:bg-[#E31C59]/5 rounded-lg transition-colors flex items-start space-x-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-gray-600 group-hover:bg-[#E31C59] group-hover:text-white transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#123B63] group-hover:text-[#E31C59] transition-colors">
                      {doc.name}
                    </h4>
                    <p className="text-[11px] text-gray-500">{doc.designation}</p>
                    <div className="text-[11px] font-medium text-gray-700 mt-0.5">
                      {doc.specialty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom links */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-4 text-gray-600">
            <a
              href="/doctors"
              onClick={onClose}
              className="hover:text-[#E31C59] underline-offset-2 hover:underline font-medium"
            >
              Doctor Directory
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/departments"
              onClick={onClose}
              className="hover:text-[#E31C59] underline-offset-2 hover:underline font-medium"
            >
              Doctors by Department
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/specialties"
              onClick={onClose}
              className="hover:text-[#E31C59] underline-offset-2 hover:underline font-medium"
            >
              Doctors by Specialty
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDoctorModal?.();
              }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded transition-colors"
            >
              Search by Filter
            </button>
            <a
              href="/doctors"
              onClick={onClose}
              className="inline-flex items-center space-x-1 font-semibold text-white bg-[#E31C59] hover:bg-[#c4144b] px-3.5 py-1.5 rounded transition-colors shadow-2xs"
            >
              <span>View All Doctors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

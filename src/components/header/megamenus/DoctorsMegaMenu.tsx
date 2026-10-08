"use client";

import React, { useState } from "react";
import { POPULAR_SPECIALTIES, SAMPLE_DOCTORS } from "../data/hospitalData";
import { DOCTORS_DATABASE } from "@/data/doctorsData";
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
              <span className="w-2.5 h-2.5 rounded-full bg-[#E31C59]" />
              <h2 className="text-base sm:text-lg font-bold text-[#123B63] tracking-tight">
                Doctors Directory & Specialists
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Consult with our eminent physicians, surgeons, and healthcare specialists.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctor name or specialty..."
              aria-label="Search doctor name or specialty"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E31C59] focus:bg-white"
            />
          </div>
        </div>

        {/* Content: Popular Specialties & Featured Specialists */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-5">
          {/* Left: Popular Specialties (5 cols) */}
          <div className="md:col-span-4 border-r border-gray-100 pr-6">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#123B63] pb-2.5 mb-3 border-b border-gray-100">
              Popular Specialties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {POPULAR_SPECIALTIES.map((spec) => (
                <a
                  key={spec}
                  href={`/doctors?specialty=${encodeURIComponent(spec)}`}
                  onClick={onClose}
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-sm text-gray-800 hover:text-[#E31C59] transition-colors"
                >
                  <span className="font-medium">{spec}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#E31C59] group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>

            <div className="mt-4 p-3.5 bg-[#E31C59]/5 rounded-lg border border-[#E31C59]/20 text-xs sm:text-sm text-gray-600">
              <span className="font-bold text-[#123B63] block mb-1">
                Need help finding the right doctor?
              </span>
              Use our interactive doctor finder or call our OPD booking counter.
            </div>
          </div>

          {/* Right: Senior Consultants Preview (8 cols) */}
          <div className="md:col-span-8">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#123B63] pb-2.5 mb-3 border-b border-gray-100 flex items-center justify-between">
              <span>Featured Consultants</span>
              <span className="text-xs text-gray-400 font-normal">
                OP Consultations Mon – Sat
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredDoctors.slice(0, 8).map((doc) => {
                const doctorSlug = (doc as any).slug || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                const matchedDoctor = DOCTORS_DATABASE.find((d) => d.slug === doctorSlug || d.name === doc.name);
                return (
                  <a
                    key={doc.name}
                    href={`/doctor/${doctorSlug}`}
                    onClick={onClose}
                    className="p-3 border border-gray-100 hover:border-[#E31C59]/30 hover:bg-[#E31C59]/5 rounded-lg transition-colors flex items-start space-x-3.5 group cursor-pointer"
                  >
                    {matchedDoctor?.image ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 mt-0.5 border border-gray-200 shadow-2xs">
                        <img
                          src={matchedDoctor.image}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-gray-600 group-hover:bg-[#E31C59] group-hover:text-white transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#123B63] group-hover:text-[#E31C59] transition-colors truncate">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{doc.designation}</p>
                      <div className="text-xs font-semibold text-[#1677B8] mt-0.5 truncate">
                        {doc.specialty}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom links */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center space-x-4 text-gray-700">
            <a
              href="/doctors"
              onClick={onClose}
              className="hover:text-[#E31C59] underline-offset-2 hover:underline font-semibold"
            >
              Doctor Directory
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/departments"
              onClick={onClose}
              className="hover:text-[#E31C59] underline-offset-2 hover:underline font-semibold"
            >
              Doctors by Department
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/specialties"
              onClick={onClose}
              className="hover:text-[#E31C59] underline-offset-2 hover:underline font-semibold"
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
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors text-xs sm:text-sm"
            >
              Search by Filter
            </button>
            <a
              href="/doctors"
              onClick={onClose}
              className="inline-flex items-center space-x-1.5 font-bold text-white bg-[#E31C59] hover:bg-[#c4144b] px-4 py-2 rounded-lg transition-colors shadow-2xs text-xs sm:text-sm"
            >
              <span>View All Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

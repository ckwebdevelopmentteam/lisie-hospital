"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Stethoscope, Search, ArrowRight, X, User } from "lucide-react";
import { POPULAR_SPECIALTIES, SAMPLE_DOCTORS } from "../data/hospitalData";

interface DoctorSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoctor?: (doctorName: string) => void;
}

export default function DoctorSearchModal({
  isOpen,
  onClose,
  onSelectDoctor,
}: DoctorSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setSelectedSpecialty(null);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => inputRef.current?.focus(), 50);

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
      clearTimeout(timer);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const filteredDoctors = SAMPLE_DOCTORS.filter((doc) => {
    const matchesSearch =
      searchTerm === "" ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      !selectedSpecialty ||
      doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()) ||
      doc.department.toLowerCase().includes(selectedSpecialty.toLowerCase());

    return matchesSearch && matchesSpecialty;
  });

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-search-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-labelledby="doctor-search-title"
        className="relative w-full max-w-2xl my-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
      >
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-[#123B63] to-[#164e81] text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-[#8ec8f6]" />
              </div>
              <h2 id="doctor-search-title" className="text-xl font-bold text-white tracking-tight">
                Find a Doctor
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-blue-100 mb-4">
            Search our distinguished team of senior specialists, surgeons, and physicians.
          </p>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctor name or specialty..."
              aria-label="Search doctor name or specialty"
              className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-900 placeholder-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1677B8] shadow-inner"
            />
          </div>
        </div>

        {/* Popular Specialties Pills */}
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Popular Specialties
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedSpecialty(null)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                selectedSpecialty === null
                  ? "bg-[#123B63] text-white border-[#123B63] font-medium"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              All Specialties
            </button>
            {POPULAR_SPECIALTIES.map((spec) => (
              <button
                key={spec}
                onClick={() =>
                  setSelectedSpecialty(selectedSpecialty === spec ? null : spec)
                }
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  selectedSpecialty === spec
                    ? "bg-[#1677B8] text-white border-[#1677B8] font-medium"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Results List */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-3">
          {filteredDoctors.length > 0 ? (
            <div className="space-y-2.5">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.name}
                  className="p-3.5 border border-gray-200 rounded-lg hover:border-[#1677B8] hover:bg-blue-50/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#123B63] shrink-0 mt-0.5">
                      <User className="w-5 h-5 text-[#1677B8]" />
                    </div>
                    <div>
                      <a
                        href={`/doctor/${(doc as any).slug || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        onClick={onClose}
                        className="text-sm font-bold text-[#123B63] hover:text-[#1677B8] transition-colors hover:underline"
                      >
                        {doc.name}
                      </a>
                      <p className="text-xs text-gray-500">{doc.qualification}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-medium text-gray-700">
                          {doc.specialty}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{doc.department}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <a
                      href={`/doctor/${(doc as any).slug || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      onClick={onClose}
                      className="text-xs font-medium text-gray-600 hover:text-[#123B63] bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-md transition-colors"
                    >
                      Profile
                    </a>
                    <a
                      href="/appointments"
                      onClick={(e) => {
                        if (onSelectDoctor) {
                          e.preventDefault();
                          onSelectDoctor(doc.name);
                        }
                      }}
                      className="text-xs font-semibold text-[#1677B8] hover:text-[#125F94] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                    >
                      Consult →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No doctors found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty(null);
                }}
                className="mt-2 text-xs text-[#1677B8] underline"
              >
                Clear search and view all doctors
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation Links */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center space-x-4 text-gray-600">
            <a href="/departments" className="hover:text-[#1677B8] underline-offset-2 hover:underline">
              Doctors by Department
            </a>
            <span className="text-gray-300">•</span>
            <a href="/doctors" className="hover:text-[#1677B8] underline-offset-2 hover:underline">
              All Doctors
            </a>
          </div>

          <a
            href="/doctors"
            className="inline-flex items-center space-x-1.5 font-semibold text-[#1677B8] hover:text-[#125F94] transition-colors"
          >
            <span>View All Doctors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Filter,
  User,
  Clock,
  Calendar,
  ChevronRight,
  Home,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  POPULAR_SPECIALTIES,
  DOCTORS_DATABASE,
  Doctor,
  getDoctorsBySpecialty,
} from "@/data/doctorsData";
import { useModal } from "@/context/ModalContext";

export default function DoctorsDirectoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openModal } = useModal();

  const specialtyParam = searchParams.get("specialty") || "";
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(specialtyParam);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync state with URL parameter if it changes
  useEffect(() => {
    setSelectedSpecialty(specialtyParam);
  }, [specialtyParam]);

  const handleSpecialtyClick = (specialty: string) => {
    const newSpecialty = selectedSpecialty === specialty ? "" : specialty;
    setSelectedSpecialty(newSpecialty);
    if (newSpecialty) {
      router.push(`/doctors?specialty=${encodeURIComponent(newSpecialty)}`);
    } else {
      router.push("/doctors");
    }
  };

  // Filter doctors based on selected specialty and search query
  const displayedDoctors = useMemo(() => {
    let list: Doctor[] = [];

    if (selectedSpecialty) {
      // When a specialty is selected, get exactly 8 doctors for that department/specialty!
      list = getDoctorsBySpecialty(selectedSpecialty);
    } else {
      list = DOCTORS_DATABASE;
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialty.toLowerCase().includes(q) ||
          doc.department.toLowerCase().includes(q) ||
          doc.qualifications.toLowerCase().includes(q) ||
          doc.areaOfExpertise.some((exp) => exp.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedSpecialty, searchQuery]);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen text-[#17202A] font-sans pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center text-xs sm:text-sm text-gray-500 font-medium">
            <Link
              href="/"
              className="flex items-center hover:text-[#123B63] transition-colors"
            >
              <Home className="w-3.5 h-3.5 mr-1" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
            <Link
              href="/doctors"
              className={`hover:text-[#123B63] transition-colors ${
                !selectedSpecialty ? "text-gray-900 font-semibold" : ""
              }`}
            >
              Doctors
            </Link>
            {selectedSpecialty && (
              <>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
                <span className="text-gray-900 font-semibold truncate">
                  {selectedSpecialty}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Directory Hero Banner */}
      <div className="bg-gradient-to-r from-[#123B63] via-[#154674] to-[#123B63] text-white py-10 sm:py-14 relative overflow-hidden">
        {/* Subtle background embellishment */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
              <Stethoscope className="w-3.5 h-3.5 text-[#E31C59]" />
              <span>Lisie Clinical Faculty</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-serif">
              Doctors Directory & Specialists
            </h1>
            <p className="mt-3 text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Consult with Kerala&apos;s leading medical authorities, surgeons, and clinicians.
              Choose from our popular specialties to view senior consultants and book outpatient appointments.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-2xl relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor by name, specialty (e.g. Aiswarya, Cardiology, Ortho)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white text-gray-900 rounded-xl text-sm sm:text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E31C59] placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Popular Specialties Filter Row */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#123B63]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#123B63]">
                Popular Specialties & Departments
              </h2>
            </div>
            <span className="text-xs text-gray-500">
              Select any department to view 8 doctor profiles
            </span>
          </div>

          {/* Specialties Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSpecialtyClick("")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedSpecialty === ""
                  ? "bg-[#123B63] text-white shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Doctors
            </button>
            {POPULAR_SPECIALTIES.map((spec) => {
              const isSelected =
                selectedSpecialty.toLowerCase() === spec.toLowerCase();
              return (
                <button
                  key={spec}
                  onClick={() => handleSpecialtyClick(spec)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#E31C59] text-white shadow-xs scale-102"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[#E31C59] border border-gray-200"
                  }`}
                >
                  <span>{spec}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-200/80 text-gray-600"
                    }`}
                  >
                    8
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => handleSpecialtyClick("Psychiatry & Behavioural Health")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedSpecialty === "Psychiatry & Behavioural Health"
                  ? "bg-[#E31C59] text-white shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Psychiatry
            </button>
          </div>
        </div>

        {/* Section Header: Department Title & Results Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
              {selectedSpecialty ? (
                <span>
                  {selectedSpecialty} Specialists{" "}
                  <span className="text-sm font-normal text-gray-500">
                    (8 Doctor Profiles)
                  </span>
                </span>
              ) : (
                <span>All Hospital Consultants</span>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Showing {displayedDoctors.length} doctors available for outpatient consultation
            </p>
          </div>

          {selectedSpecialty && (
            <button
              onClick={() => handleSpecialtyClick("")}
              className="text-xs font-semibold text-[#1677B8] hover:underline self-start sm:self-auto"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Doctors Grid: List 8 Doctors Profile */}
        {displayedDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-gray-200/90 hover:border-[#1677B8]/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Doctor Headshot / Image */}
                <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover:scale-103 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-[#123B63] shadow-xs flex items-center gap-1 border border-gray-100">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{doc.experienceYears}+ Yrs</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#123B63]/90 text-white px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider backdrop-blur-xs">
                    {doc.department}
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Doctor Name (clickable link to profile) */}
                  <Link
                    href={`/doctor/${doc.slug}`}
                    className="text-base sm:text-lg font-bold text-[#1E293B] group-hover:text-[#123B63] transition-colors leading-snug line-clamp-1"
                    title={doc.name}
                  >
                    {doc.name}
                  </Link>

                  <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-1">
                    {doc.designation}
                  </p>

                  <p className="text-xs font-semibold text-gray-800 mt-1 line-clamp-1">
                    {doc.qualifications}
                  </p>

                  <div className="text-xs text-[#1677B8] font-semibold mt-2.5 line-clamp-1">
                    {doc.specialty}
                  </div>

                  {/* OPD Timings preview */}
                  <div className="mt-3.5 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{doc.opdSchedule.days}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                    <Link
                      href={`/doctor/${doc.slug}`}
                      className="w-full text-center py-2 px-2 bg-gray-50 hover:bg-[#123B63] text-gray-700 hover:text-white rounded-lg text-xs font-bold transition-all border border-gray-200 hover:border-[#123B63]"
                    >
                      View Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => openModal("appointment")}
                      className="w-full text-center py-2 px-2 bg-[#E31C59] hover:bg-[#c4144b] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                    >
                      Book OPD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-base text-gray-600 font-medium">
              No doctors found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("");
              }}
              className="mt-3 px-4 py-2 bg-[#123B63] text-white text-xs font-bold rounded-lg hover:bg-[#0e2f50] transition-colors"
            >
              Reset Search & View All Doctors
            </button>
          </div>
        )}

        {/* Bottom Booking Consultation Card */}
        <div className="mt-12 bg-gradient-to-r from-[#123B63] to-[#164e81] rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E31C59] bg-white px-3 py-1 rounded-full">
              Need OPD Assistance?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif">
              Can&apos;t find the right specialist for your condition?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Our clinical triage desk helps you connect with the appropriate department
              and coordinate your consultation appointments without long waiting times.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openModal("doctor-search")}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors border border-white/20"
            >
              Interactive Doctor Finder
            </button>
            <button
              type="button"
              onClick={() => openModal("appointment")}
              className="px-6 py-3 bg-[#E31C59] hover:bg-[#c4144b] text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-md flex items-center gap-2"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

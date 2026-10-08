"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ArrowRight,
  Home,
  ChevronRight,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  PhoneCall,
  GraduationCap,
  Globe,
  Award,
  Stethoscope,
} from "lucide-react";
import { Doctor } from "@/data/doctorsData";
import { useModal } from "@/context/ModalContext";

interface DoctorProfileViewProps {
  doctor: Doctor;
}

export default function DoctorProfileView({ doctor }: DoctorProfileViewProps) {
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState<
    "overview" | "expertise" | "qualifications" | "languages" | "blogs" | "opd"
  >("overview");

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "expertise", label: "Area Of Expertise" },
    { id: "qualifications", label: "Qualifications" },
    { id: "languages", label: "Language Knew" },
    { id: "blogs", label: "My Blogs" },
    { id: "opd", label: "OPD Schedule" },
  ] as const;

  const scrollToSection = (id: typeof activeTab) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen text-[#17202A] font-sans pb-16">
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
              className="hover:text-[#123B63] transition-colors"
            >
              Doctors
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
            <span className="text-gray-900 font-semibold truncate">
              {doctor.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Doctor Header Banner Card (Replicates Reference UI) */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200/80 p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Doctor Photo */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200 shadow-xs">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 256px"
              />
            </div>

            {/* Doctor Primary Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1E293B] tracking-tight leading-tight">
                {doctor.name}
              </h1>

              <div className="mt-1 text-sm sm:text-base text-gray-500 font-normal">
                {doctor.designation}
              </div>

              <div className="mt-2 text-sm sm:text-base font-bold text-gray-800">
                {doctor.qualifications}
              </div>

              <div className="mt-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">Speciality:</span>{" "}
                {doctor.specialty}
              </div>

              {/* Action Buttons: Booking Assistance & Location */}
              <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                <button
                  type="button"
                  onClick={() => openModal("appointment")}
                  className="inline-flex items-center gap-3 bg-[#4A154B] hover:bg-[#3b113c] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-xs group"
                >
                  <span>Booking Assistance</span>
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#4A154B] group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </span>
                </button>

                <div className="inline-flex items-center text-xs sm:text-sm text-gray-700 font-medium">
                  <MapPin className="w-4 h-4 text-[#123B63] mr-1.5 shrink-0" />
                  <Link
                    href="/contact-us"
                    className="hover:text-[#123B63] hover:underline transition-colors"
                  >
                    {doctor.location}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area with Left Vertical Tabs & Right Content Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Menu (Sticky on Desktop) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs lg:sticky lg:top-24">
              <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible divide-x lg:divide-x-0 lg:divide-y divide-gray-100 custom-scrollbar">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-5 py-3.5 text-left text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center justify-between ${
                        isActive
                          ? "text-[#123B63] bg-gray-50 border-l-4 border-l-[#123B63] font-bold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/60"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 hidden lg:block transition-transform ${
                          isActive ? "text-[#123B63] translate-x-0.5" : "text-gray-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              {/* Quick Helpline Box */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50/40 border-t border-gray-100 hidden lg:block">
                <div className="flex items-center gap-2 text-xs font-bold text-[#123B63] uppercase tracking-wider mb-1">
                  <PhoneCall className="w-3.5 h-3.5 text-[#1677B8]" />
                  <span>OPD Booking Desk</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Call our central appointments helpline:
                </p>
                <a
                  href="tel:04842401141"
                  className="text-sm font-bold text-[#123B63] hover:underline font-mono"
                >
                  0484 240 1141
                </a>
              </div>
            </div>
          </div>

          {/* Right Main Content Sections */}
          <div className="lg:col-span-9 space-y-8">
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6 sm:p-8 divide-y divide-gray-200">
              {/* 1. Overview Section */}
              <section id="overview" className="pb-8 first:pt-0">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="w-5 h-5 text-[#123B63]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
                    Overview
                  </h2>
                </div>
                <p className="text-xs sm:text-sm lg:text-[15px] leading-relaxed text-gray-700">
                  {doctor.overview}
                </p>
              </section>

              {/* 2. Area Of Expertise Section */}
              <section id="expertise" className="py-8">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-[#123B63]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
                    Area Of Expertise
                  </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {doctor.areaOfExpertise.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 p-2.5 rounded-lg bg-gray-50/70 border border-gray-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 3. Qualifications Section */}
              <section id="qualifications" className="py-8">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-[#123B63]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
                    Qualifications
                  </h2>
                </div>
                <div className="space-y-3">
                  {doctor.qualificationsList.map((qual, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 text-[#123B63]">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                          {qual}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Accredited Medical Board / University
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Language Knew Section */}
              <section id="languages" className="py-8">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-[#123B63]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
                    Language Knew
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {doctor.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gray-100 text-gray-800 border border-gray-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </section>

              {/* 5. My Blogs Section */}
              <section id="blogs" className="py-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-[#123B63]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
                    My Blogs & Clinical Insights
                  </h2>
                </div>
                <div className="space-y-4">
                  {doctor.blogs.map((blog, idx) => (
                    <article
                      key={idx}
                      className="p-4 rounded-xl border border-gray-200/80 hover:border-[#1677B8] hover:bg-slate-50/50 transition-all group"
                    >
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{blog.date}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#123B63] group-hover:text-[#1677B8] transition-colors mb-1.5">
                        {blog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                        {blog.summary}
                      </p>
                      <div className="flex items-center text-xs font-semibold text-[#1677B8] group-hover:text-[#123B63]">
                        <span>Read full article</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* 6. OPD Schedule Section */}
              <section id="opd" className="pt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#123B63]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
                    OPD Consultation Schedule
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl p-5 border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Outpatient Days
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#123B63]">
                      {doctor.opdSchedule.days}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-2 pt-1">
                      <span className="font-semibold text-gray-900">
                        {doctor.opdSchedule.timings}
                      </span>
                      <span>•</span>
                      <span>{doctor.opdSchedule.room}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openModal("appointment")}
                    className="px-5 py-2.5 bg-[#E31C59] hover:bg-[#c4144b] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-xs shrink-0"
                  >
                    Book Consultation
                  </button>
                </div>
              </section>
            </div>

            {/* Back to All Doctors Bar */}
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <Link
                href="/doctors"
                className="text-xs sm:text-sm font-bold text-[#123B63] hover:text-[#E31C59] transition-colors inline-flex items-center gap-1.5"
              >
                <span>← Back to All Doctors</span>
              </Link>

              <Link
                href={`/doctors?specialty=${encodeURIComponent(doctor.department)}`}
                className="text-xs sm:text-sm font-semibold text-[#1677B8] hover:underline inline-flex items-center gap-1"
              >
                <span>View all {doctor.department} specialists</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

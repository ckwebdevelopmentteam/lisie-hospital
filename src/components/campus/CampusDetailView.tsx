"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Star,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { LISIE_INSTITUTES } from "@/components/hero/heroData";
import { useModal } from "@/context/ModalContext";

interface CampusDetailViewProps {
  campusId: string;
}

export default function CampusDetailView({ campusId }: CampusDetailViewProps) {
  const { openModal } = useModal();
  const campus = LISIE_INSTITUTES.find((c) => c.id === campusId);

  if (!campus) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Campus Not Found</h1>
        <p className="text-gray-500 mt-2">The requested center could not be located.</p>
        <Link
          href="/"
          className="inline-flex items-center mt-6 px-5 py-2.5 rounded-full bg-[#1677B8] text-white text-sm font-semibold hover:bg-[#125F94] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Home
        </Link>
      </div>
    );
  }

  // Get other centers for quick navigation
  const otherCampuses = LISIE_INSTITUTES.filter((c) => c.id !== campus.id);

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-[#1677B8] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
            Center Profile
          </span>
        </div>

        {/* Hero Banner Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 mb-8">
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900">
            <img
              src={campus.image}
              alt={campus.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

            {/* Bottom info on hero image */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>{campus.location}</span>
                </div>
                <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-semibold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{campus.googleRating.score}</span>
                  <span className="text-gray-300 font-normal">
                    ({campus.googleRating.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
                {campus.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-medium">
                {campus.subTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Essential Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* OPD Timings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1677B8] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                OPD Consultation
              </span>
              <p className="text-sm font-semibold text-gray-900 leading-snug">
                {campus.opdHours}
              </p>
            </div>
          </div>

          {/* Emergency & Helpline */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 block mb-1">
                Emergency & Direct Line
              </span>
              <a
                href={`tel:${campus.phone}`}
                className="text-base font-bold text-gray-900 hover:text-red-600 transition-colors block leading-snug"
              >
                {campus.phone}
              </a>
              <span className="text-xs text-gray-500 mt-0.5 block">{campus.emergency}</span>
            </div>
          </div>

          {/* Address & Directions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Campus Location
              </span>
              <p className="text-xs text-gray-700 leading-relaxed mb-3">
                {campus.address}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  campus.name + " " + campus.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1677B8] hover:underline"
              >
                <span>Open Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Features & Action Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Key Clinical Facilities (2 Columns on large screens) */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center space-x-2.5 mb-6">
              <ShieldCheck className="w-5 h-5 text-[#1677B8]" />
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                Key Facilities & Specialities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {campus.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-800 leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openModal("appointment")}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#1677B8] hover:bg-[#125F94] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <button
                type="button"
                onClick={() => openModal("doctor-search")}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-gray-300 hover:border-gray-400 bg-white text-gray-700 text-sm font-semibold transition-colors"
              >
                <span>Find Doctors</span>
              </button>
            </div>
          </div>

          {/* Other Centers Navigation */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-5 h-5 text-[#E25227]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Other Institutes
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-6">
                Explore specialized tertiary care facilities at Lisie Hospital.
              </p>

              <div className="space-y-4">
                {otherCampuses.map((other) => (
                  <Link
                    key={other.id}
                    href={other.link}
                    className="group block p-4 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-100 hover:border-orange-200 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 group-hover:text-[#E25227] transition-colors uppercase">
                        {other.name}
                      </span>
                      <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-[#E25227] rotate-180 transition-transform group-hover:translate-x-1" />
                    </div>
                    <span className="text-[11px] text-gray-500 line-clamp-1 mt-1 block">
                      {other.subTitle}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <Link
                href="/"
                className="text-xs font-semibold text-[#1677B8] hover:underline"
              >
                ← Back to Main Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

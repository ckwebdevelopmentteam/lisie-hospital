"use client";

import React, { useEffect } from "react";
import {
  X,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Star,
} from "lucide-react";
import { CampusCard } from "./heroData";

interface CampusModalProps {
  campus: CampusCard | null;
  onClose: () => void;
  onOpenAppointment: () => void;
}

export default function CampusModal({
  campus,
  onClose,
  onOpenAppointment,
}: CampusModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (campus) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [campus, onClose]);

  if (!campus) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900">
          <img
            src={campus.image}
            alt={campus.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Campus Title & Rating Overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold mb-2">
              <MapPin className="w-3 h-3 text-[#FF5722]" />
              <span>{campus.location}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight">
              {campus.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-200">{campus.subTitle}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start space-x-3">
              <Clock className="w-5 h-5 text-[#1677B8] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  OPD Consultation
                </span>
                <span className="text-xs font-semibold text-gray-800">
                  {campus.opdHours}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-100 flex items-start space-x-3">
              <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                  Direct Line & Emergency
                </span>
                <a
                  href={`tel:${campus.phone}`}
                  className="text-xs font-bold text-red-700 hover:underline"
                >
                  {campus.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Key Clinical Features */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Key Facilities & Clinical Departments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {campus.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 text-xs text-gray-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Address & Navigation */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-[#1677B8] uppercase tracking-wider block">
                Campus Address
              </span>
              <p className="text-xs text-gray-700 mt-0.5">{campus.address}</p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                campus.name + " " + campus.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white text-[#1677B8] hover:bg-blue-100 text-xs font-semibold shadow-xs shrink-0"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 text-xs text-gray-600">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-gray-900">
              {campus.googleRating.score}
            </span>
            <span className="text-gray-400">
              ({campus.googleRating.reviewsCount} Google reviews)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs font-semibold transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAppointment();
              }}
              className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-full bg-[#1677B8] hover:bg-[#125F94] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

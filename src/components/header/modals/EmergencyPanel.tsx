"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Siren, PhoneCall, AlertTriangle, MapPin, X, ShieldAlert } from "lucide-react";
import { HOSPITAL_CONTACTS } from "../data/hospitalData";

interface EmergencyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyPanel({ isOpen, onClose }: EmergencyPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-panel-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-lg my-auto bg-white rounded-2xl shadow-2xl border border-red-200 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#991B1B] to-[#C5221F] text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Siren className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 id="emergency-panel-title" className="text-xl font-bold text-white tracking-tight">
                  Emergency & Ambulance Services
                </h2>
                <p className="text-xs text-red-100">Lisie Hospital, Kaloor, Kochi</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Blocks */}
        <div className="p-6 space-y-4">
          {/* Emergency Department 24/7 */}
          <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
                  <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                    Emergency Department
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-900 mt-1">
                  Available 24 / 7 Round the Clock
                </div>
              </div>
              <span className="text-xs bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded">
                Always Open
              </span>
            </div>

            <div className="text-2xl font-extrabold text-[#991B1B] tracking-wide">
              {HOSPITAL_CONTACTS.emergencyPhoneFormatted}
            </div>

            <a
              href={`tel:${HOSPITAL_CONTACTS.emergencyPhone}`}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#C5221F] hover:bg-[#A51A18] text-white font-bold text-sm rounded-lg shadow-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Emergency Now</span>
            </a>
          </div>

          {/* Ambulance Dispatch */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Ambulance Dispatch
                </div>
                <div className="text-sm font-semibold text-gray-900 mt-1">
                  Advanced Cardiac & Trauma Life Support
                </div>
              </div>
              <ShieldAlert className="w-5 h-5 text-slate-500" />
            </div>

            <div className="text-xl font-bold text-slate-900">
              {HOSPITAL_CONTACTS.ambulancePhone}
            </div>

            <a
              href={`tel:${HOSPITAL_CONTACTS.ambulancePhone}`}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#123B63] hover:bg-[#0E2A47] text-white font-semibold text-sm rounded-lg transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Ambulance</span>
            </a>
          </div>

          {/* Directions / Location indicator */}
          <div className="flex items-start space-x-2.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800">Direct Emergency Gate Entry:</span>
              <p className="mt-0.5">
                Casualty & Trauma ramp entrance situated on Kaloor - Kathrikadavu Road, Kochi, Kerala.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-100 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span>Level 1 Emergency Care Center</span>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, X, ArrowRight, User, Building2, Stethoscope, Clock, BookOpen } from "lucide-react";
import { SEARCH_INDEX } from "../data/hospitalData";
import { SearchResultItem } from "../types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDoctorModal?: () => void;
  onOpenAppointmentModal?: () => void;
  onOpenEmergencyModal?: () => void;
  onOpenOPTimingsModal?: () => void;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  onOpenDoctorModal,
  onOpenAppointmentModal,
  onOpenEmergencyModal,
  onOpenOPTimingsModal,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => inputRef.current?.focus(), 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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

  const popularSearches = [
    { label: "Doctors", action: () => onOpenDoctorModal?.() },
    { label: "Cardiology", query: "Cardiology" },
    { label: "Emergency", action: () => onOpenEmergencyModal?.() },
    { label: "OP Timings", action: () => onOpenOPTimingsModal?.() },
    { label: "Health Checkup", action: () => onOpenAppointmentModal?.() },
    { label: "Departments", query: "Department" },
  ];

  const results: SearchResultItem[] = query.trim() === ""
    ? []
    : SEARCH_INDEX.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Doctor":
        return <User className="w-4 h-4 text-[#1677B8]" />;
      case "Department":
        return <Building2 className="w-4 h-4 text-emerald-600" />;
      case "Service":
        return <Stethoscope className="w-4 h-4 text-amber-600" />;
      case "Information":
        return <Clock className="w-4 h-4 text-purple-600" />;
      case "Academic":
        return <BookOpen className="w-4 h-4 text-blue-800" />;
      default:
        return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Search"
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex flex-col justify-start animate-in fade-in duration-150"
    >
      {/* Search Bar Container */}
      <div
        ref={containerRef}
        role="dialog"
        aria-label="Site Search"
        className="w-full bg-white shadow-2xl border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          {/* Top Search Input Box */}
          <div className="relative flex items-center">
            <Search className="w-6 h-6 text-[#1677B8] shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search doctors, departments, services..."
              aria-label="Search doctors, departments, services"
              className="w-full text-lg sm:text-2xl font-medium text-gray-900 placeholder-gray-400 border-none outline-none focus:ring-0 bg-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-gray-400 hover:text-gray-600 p-1 mr-2"
                aria-label="Clear search input"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close search overlay"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
            >
              ESC to close
            </button>
          </div>

          {/* Popular Searches */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">
              Popular Searches:
            </span>
            {popularSearches.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.action) {
                    onClose();
                    item.action();
                  } else if (item.query) {
                    setQuery(item.query);
                  }
                }}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-[#1677B8] hover:border-blue-200 text-gray-700 rounded-full border border-gray-200 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search Results Area */}
          {query.trim() !== "" && (
            <div className="mt-6 pt-4 border-t border-gray-200 max-h-[50vh] overflow-y-auto custom-scrollbar">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                <span className="text-[#E31C59] font-bold">{results.length}</span> Results for "{query}"
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {results.map((res) => (
                    <a
                      key={res.id}
                      href={res.url}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        if (res.title.includes("Dr.")) {
                          onOpenDoctorModal?.();
                        } else if (res.title.includes("Appointment")) {
                          onOpenAppointmentModal?.();
                        } else if (res.title.includes("Emergency")) {
                          onOpenEmergencyModal?.();
                        } else if (res.title.includes("OP Timings")) {
                          onOpenOPTimingsModal?.();
                        }
                      }}
                      className="p-3 rounded-lg border border-gray-100 hover:border-[#1677B8] hover:bg-blue-50/40 flex items-start justify-between transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white">
                          {getCategoryIcon(res.category)}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {res.category}
                          </div>
                          <div className="text-sm font-bold text-[#123B63] group-hover:text-[#1677B8] transition-colors">
                            {res.title}
                          </div>
                          {res.subtitle && (
                            <div className="text-xs text-gray-500 mt-0.5">{res.subtitle}</div>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1677B8] group-hover:translate-x-0.5 transition-all mt-1" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No results found for "{query}".</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try searching for a specialty like "Cardiology", or "Dr. Jose Chacko", or "OP Timings".
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quick Concept Coverage Badges */}
          {query.trim() === "" && (
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-semibold text-gray-700">Quick Index:</span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1677B8]" />
                <span>Specialist Doctors</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Clinical & Surgical Departments</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <span>Diagnostics, Labs & Pharmacy</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <span>OP Schedules & Patient Guides</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-800" />
                <span>Nursing & Medical Colleges</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Dimmed backdrop area clicking closes overlay */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />
    </div>,
    document.body
  );
}

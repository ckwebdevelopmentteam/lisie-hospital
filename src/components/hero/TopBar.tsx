"use client";

import React, { useState } from "react";
import { Phone, ChevronDown, Clock, ShieldAlert } from "lucide-react";
import { LISIE_TOP_CONTACTS } from "./heroData";

export default function TopBar() {
  const [selectedLang, setSelectedLang] = useState("English");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = ["English", "Malayalam (മലയാളം)", "Hindi (हिन्दी)", "Arabic (العربية)"];

  return (
    <div className="w-full bg-[#0E2A47] text-gray-200 border-b border-white/10 text-xs select-none px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1536px] mx-auto py-1.5 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Lisie Hospital Phone Contacts */}
        <div className="flex items-center space-x-2 text-[11px] sm:text-xs text-gray-300 flex-wrap justify-center md:justify-start">
          {/* Emergency 24/7 callout */}
          <div className="flex items-center space-x-1.5 bg-red-600/90 text-white px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] tracking-wide">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <ShieldAlert className="w-3 h-3 text-white" />
            <a href="tel:+919895756164" className="hover:underline">
              Emergency: +91 9895 756 164
            </a>
          </div>

          <span className="text-gray-500 hidden sm:inline">|</span>

          {/* Phone Booking */}
          <div className="inline-flex items-center space-x-1 text-gray-300">
            <span className="text-gray-400">Booking:</span>
            <a
              href="tel:04842401141"
              className="text-white hover:text-blue-300 font-semibold transition-colors"
            >
              0484 2401141
            </a>
          </div>

          <span className="text-gray-600 hidden xs:inline">|</span>

          {/* General Enquiry */}
          <div className="inline-flex items-center space-x-1 text-gray-300">
            <span className="text-gray-400">Enquiry:</span>
            <a
              href="tel:04842402044"
              className="text-white hover:text-blue-300 font-semibold transition-colors"
            >
              0484 2402044
            </a>
          </div>
        </div>

        {/* Center / Right: Quick Links, Language & Socials */}
        <div className="flex items-center space-x-3 shrink-0 flex-wrap justify-center">
          {/* Quick Links from Lisie Hospital */}
          <div className="hidden lg:flex items-center space-x-2 text-[11px] text-gray-300 border-r border-white/15 pr-3">
            {LISIE_TOP_CONTACTS.quickLinks.map((item, idx) => (
              <React.Fragment key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
                {idx < LISIE_TOP_CONTACTS.quickLinks.length - 1 && (
                  <span className="text-gray-600">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1.5 bg-white text-gray-800 px-2.5 py-0.5 rounded text-[11px] font-medium hover:bg-gray-100 transition-colors shadow-xs"
              aria-expanded={isLangOpen}
            >
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-gray-600" />
            </button>

            {isLangOpen && (
              <div
                className="absolute right-0 mt-1 w-44 bg-white rounded-md shadow-xl py-1 text-xs text-gray-700 z-50 border border-gray-200 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setIsLangOpen(false)}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang.split(" ")[0]);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-blue-50 hover:text-[#1677B8] transition-colors ${
                      selectedLang === lang.split(" ")[0]
                        ? "font-bold text-[#1677B8] bg-blue-50/50"
                        : ""
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-1.5">
            {/* Facebook */}
            <a
              href="https://facebook.com/lisiehospital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all text-[11px] shadow-xs"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/lisiehospital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/lisiehospital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-5 h-5 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

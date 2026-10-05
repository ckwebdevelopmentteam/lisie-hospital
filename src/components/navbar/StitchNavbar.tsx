"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall, Search } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function StitchNavbar() {
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "About Us", href: "#about" },
    { label: "Centres of Excellence", href: "#specialties" },
    { label: "Patient Services", href: "#services" },
    { label: "Stories", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2 sm:py-2.5 px-4 sm:px-8 lg:px-[120px] transition-all duration-300">
      <div className="w-full">
        <nav
          className={`frosted-glass bg-white/85 border border-white/70 shadow-xs rounded-full px-4 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between transition-all duration-300 ${scrolled ? "shadow-md bg-white/95" : "hover:shadow-md"
            }`}
        >
          {/* Lisie Brand Identity */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-burgundy-700 flex items-center justify-center text-white font-serif font-bold text-base sm:text-lg tracking-tighter shadow-xs group-hover:scale-105 transition-transform">
              LH
            </div>
            <div className="flex flex-col">
              <span className="text-burgundy-900 font-bold text-sm sm:text-base leading-tight tracking-tight font-serif">
                Lisie Hospital
              </span>
              <span className="text-[9px] sm:text-[10px] text-burgundy-700/80 font-medium tracking-widest uppercase font-sans">
                Kochi • Est. 1956
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-xs xl:text-sm font-medium text-stone-700 font-sans">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-burgundy-700 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy-700 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Icon (Triggers existing SearchOverlay) */}
            <button
              type="button"
              onClick={() => openModal("search")}
              aria-label="Search hospital services and doctors"
              className="p-2 text-stone-600 hover:text-burgundy-700 hover:bg-stone-100 rounded-full transition-colors hidden sm:flex items-center justify-center"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Emergency Hotline Trigger */}
            <button
              type="button"
              onClick={() => openModal("emergency")}
              className="hidden xl:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/60 rounded-full transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-red-600 animate-pulse" />
              <span>24/7 Casualty</span>
            </button>

            {/* Appointment Pill Action */}
            <button
              type="button"
              onClick={() => openModal("appointment")}
              className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-burgundy-700 hover:bg-burgundy-800 text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-xs hover:shadow-md group active:scale-95"
            >
              <span className="whitespace-nowrap">Book Appointment</span>
              <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-full text-stone-700 hover:text-burgundy-700 hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy-700"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 frosted-glass bg-white/95 backdrop-blur-xl border border-white/60 rounded-3xl p-5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3 font-sans">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-stone-800 hover:text-burgundy-700 hover:bg-burgundy-50/60 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 border-t border-stone-200/70 flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal("doctor-search");
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:text-burgundy-700 hover:bg-stone-50 rounded-xl flex items-center justify-between"
                >
                  <span>Find a Doctor</span>
                  <span className="text-xs text-stone-400">↗</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal("emergency");
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-red-700 bg-red-50/80 hover:bg-red-100 rounded-xl flex items-center justify-between"
                >
                  <span className="flex items-center space-x-2">
                    <PhoneCall className="w-4 h-4 text-red-600" />
                    <span>24/7 Emergency Casualty</span>
                  </span>
                  <span className="text-xs font-mono">0484 240 2044</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

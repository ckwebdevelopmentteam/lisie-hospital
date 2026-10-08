"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  ArrowUp,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function StitchFooter() {
  const { openModal } = useModal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Exact Support Services Column 1 from reference
  const supportServicesCol1 = [
    { label: "IP Billing", action: () => openModal("patient-help") },
    { label: "Sewage Treatment Plant", href: "#facilities" },
    { label: "Finance Department", action: () => openModal("patient-help") },
    { label: "Dietetics and Nutrition", action: () => openModal("patient-help") },
    { label: "Facility Management & Safety", href: "#facilities" },
    { label: "General Maintenance", href: "#facilities" },
    { label: "Physical Therapy Department", action: () => openModal("doctor-search") },
    { label: "Public Relations & Administration", href: "#about" },
    { label: "Pharmacy", action: () => openModal("patient-help") },
    { label: "Purchase Department", href: "#about" },
    { label: "Housekeeping & Laundry", href: "#facilities" },
  ];

  // Exact Support Services Column 2 from reference
  const supportServicesCol2 = [
    { label: "ANM", href: "#academics" },
    { label: "Security", href: "#facilities" },
    { label: "Central Store", href: "#facilities" },
    { label: "IT Services", href: "#facilities" },
    { label: "Information Technology", href: "#facilities" },
    { label: "Electrical Department", href: "#facilities" },
    { label: "Lisie Diner", href: "#facilities" },
    { label: "HR Department", href: "#about" },
    { label: "Biomedical Department", href: "#facilities" },
    { label: "Application Form", action: () => openModal("patient-help") },
    { label: "Patient Relations Department", action: () => openModal("patient-help") },
    { label: "Quality", href: "#quality" },
    { label: "Bio Medical Waste Report", href: "#biomedical-waste" },
  ];

  return (
    <footer className="relative w-full bg-[#F8FAFD] border-t border-slate-100 font-sans overflow-hidden">
      {/* 1. Extended Ambient Soft Sky-Blue Wave flowing from bottom-left across to center */}
      <div className="absolute left-0 bottom-0 w-full h-[70%] pointer-events-none select-none overflow-hidden z-0 opacity-40">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C 260 90, 560 210, 960 320 L 0 320 Z"
            fill="url(#wave-ambient-gradient)"
          />
          <defs>
            <linearGradient
              id="wave-ambient-gradient"
              x1="0"
              y1="60"
              x2="800"
              y2="320"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E2EFF9" stopOpacity="0.65" />
              <stop offset="0.55" stopColor="#EBF4FB" stopOpacity="0.30" />
              <stop offset="1" stopColor="#F8FAFD" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. Authentic Lisie Hospital Campus Photo spreading smoothly into white, positioned behind bottom bar */}
      <div
        className="absolute left-0 bottom-0 pointer-events-none select-none z-0 w-[58%] max-w-[880px] min-w-[360px] opacity-45 transition-opacity"
        style={{
          maskImage:
            "radial-gradient(ellipse 95% 90% at 0% 100%, black 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.3) 75%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 90% at 0% 100%, black 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.3) 75%, transparent 100%)",
        }}
      >
        <img
          src="/images/footer-building-fade.png"
          alt=""
          className="w-full h-auto object-contain object-left-bottom block"
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 pt-12 sm:pt-14 lg:pt-16 pb-14 sm:pb-18 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_0.85fr_0.85fr_1.15fr_1.35fr] gap-5 xl:gap-7 items-stretch">

          {/* Column 1: Brand & Highlights */}
          <div className="flex flex-col justify-start">
            {/* Lisie Hospital Official Logo */}
            <Link href="/" className="inline-block">
              <img
                src="/images/lisie-hospital-logo.png"
                alt="Lisie Hospital - Care For A Healthier Tomorrow"
                className="h-10 sm:h-11.5 w-auto object-contain"
              />
            </Link>

            {/* Mission paragraph */}
            <p className="mt-3.5 text-[13.5px] sm:text-[14px] text-[#596A7F] leading-relaxed max-w-[310px]">
              Lisie Hospital is a multi-specialty hospital committed to providing
              compassionate, quality and affordable healthcare to our community.
            </p>

            {/* 3 Circular Feature Badges */}


            {/* Accreditation Badge */}
            <div className="mt-4.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E3EFF7] border border-[#D2E4F2] text-[11.5px] sm:text-[12px] font-semibold text-[#0E4A80] w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block shrink-0" />
              <span>NABH &amp; NABL Accredited • Since 1956</span>
            </div>
          </div>

          {/* Column 2: Support Services */}
          <div className="flex flex-col">
            <h4 className="text-[17px] sm:text-[18px] xl:text-[19px] font-bold text-[#123B63] tracking-tight">
              Support Services
            </h4>
            <div className="w-8 h-[2.5px] bg-[#E31C59] rounded-full mt-1.5 mb-3.5" />
            <ul className="space-y-1.5 flex-1">
              {supportServicesCol1.map((item) => (
                <li key={item.label}>
                  {item.action ? (
                    <button
                      type="button"
                      onClick={item.action}
                      className="w-full flex items-center justify-between text-[14px] sm:text-[14.5px] xl:text-[15px] font-medium text-slate-600 hover:text-[#123B63] transition-colors py-0.5 group text-left cursor-pointer"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform leading-snug truncate">
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#123B63] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center justify-between text-[14px] sm:text-[14.5px] xl:text-[15px] font-medium text-slate-600 hover:text-[#123B63] transition-colors py-0.5 group cursor-pointer"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform leading-snug truncate">
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#123B63] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hospital Services */}
          <div className="flex flex-col">
            <h4 className="text-[17px] sm:text-[18px] xl:text-[19px] font-bold text-[#123B63] tracking-tight">
              Hospital Services
            </h4>
            <div className="w-8 h-[2.5px] bg-[#E31C59] rounded-full mt-1.5 mb-3.5" />
            <ul className="space-y-1.5 flex-1">
              {supportServicesCol2.map((item) => (
                <li key={item.label}>
                  {item.action ? (
                    <button
                      type="button"
                      onClick={item.action}
                      className="w-full flex items-center justify-between text-[14px] sm:text-[14.5px] xl:text-[15px] font-medium text-slate-600 hover:text-[#123B63] transition-colors py-0.5 group text-left cursor-pointer"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform leading-snug truncate">
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#123B63] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center justify-between text-[14px] sm:text-[14.5px] xl:text-[15px] font-medium text-slate-600 hover:text-[#123B63] transition-colors py-0.5 group cursor-pointer"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform leading-snug truncate">
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#123B63] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch / We're Here To Help You (Open, Spacious, Not inside a box) */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Tag: — GET IN TOUCH */}
              <div className="flex items-center gap-2 mb-2">
                {/* <span className="w-5 h-[1.5px] bg-[#123B63]/60" />
                <span className="text-[11px] font-bold text-[#567290] tracking-[0.2em] uppercase">
                  GET IN TOUCH
                </span> */}
              </div>

              {/* Main Headline: We're here to help you. */}
              <h4 className="font-serif text-[26px] sm:text-[28px] xl:text-[32px] font-semibold text-[#123B63] leading-[1.15] tracking-tight">
                We&apos;re here
                to help you.
              </h4>

              {/* Subtitle */}
              {/* <p className="mt-2.5 text-[13px] xl:text-[13.5px] text-[#596A7F] leading-relaxed max-w-[310px]">
                For appointments, enquiries or emergency support, our team is available 24 &times; 7.
              </p> */}

              {/* Vertical Timeline of 4 contact channels */}
              <div className="relative mt-5 xl:mt-6 pl-5.5 space-y-4">
                {/* Connecting Vertical Line */}
                <div className="absolute left-[7px] top-[7px] bottom-[14px] w-[1px] bg-[#CFDFED]" />

                {/* 1. Call Us */}
                <div className="relative group">
                  <span className="absolute -left-5.5 top-[5px] w-2.5 h-2.5 rounded-full bg-[#3B82F6] ring-4 ring-[#F8FAFD]" />
                  <span className="text-[10px] font-semibold text-slate-500 block leading-none mb-0.5">
                    Call Us
                  </span>
                  <a
                    href="tel:04842402044"
                    className="text-[15px] xl:text-[16px] font-bold text-[#123B63] hover:text-[#0E5191] transition-colors block leading-tight tracking-tight"
                  >
                    0484 - 2402044
                  </a>
                  <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                    Phone | OPD enquiries
                  </span>
                </div>

                {/* 2. Emergency */}
                <div className="relative group">
                  <span className="absolute -left-5.5 top-[5px] w-2.5 h-2.5 rounded-full bg-[#EF4444] ring-4 ring-[#F8FAFD]" />
                  <span className="text-[10px] font-semibold text-slate-500 block leading-none mb-0.5">
                    Emergency
                  </span>
                  <button
                    type="button"
                    onClick={() => openModal("emergency")}
                    className="text-[15px] xl:text-[16px] font-bold text-[#123B63] hover:text-[#EF4444] transition-colors block leading-tight tracking-tight text-left cursor-pointer"
                  >
                    24 &times; 7 Casualty
                  </button>
                  <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                    Emergency &amp; Trauma Care
                  </span>
                </div>

                {/* 3. Email Us */}
                <div className="relative group">
                  <span className="absolute -left-5.5 top-[5px] w-2.5 h-2.5 rounded-full bg-[#10B981] ring-4 ring-[#F8FAFD]" />
                  <span className="text-[10px] font-semibold text-slate-500 block leading-none mb-0.5">
                    Email Us
                  </span>
                  <a
                    href="mailto:contact@lisiehospital.org"
                    className="text-[13.5px] xl:text-[14px] font-bold text-[#123B63] hover:text-[#0E5191] transition-colors block leading-tight tracking-tight break-all"
                  >
                    contact@lisiehospital.org
                  </a>
                  <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                    Official Correspondence
                  </span>
                </div>

                {/* 4. Visit Us */}
                <div className="relative">
                  <span className="absolute -left-5.5 top-[5px] w-2.5 h-2.5 rounded-full bg-[#F59E0B] ring-4 ring-[#F8FAFD]" />
                  <span className="text-[10px] font-semibold text-slate-500 block leading-none mb-0.5">
                    Visit Us
                  </span>
                  <span className="text-[12.5px] xl:text-[13px] font-bold text-[#123B63] block leading-tight">
                    Lisie Hospital Rd, North Kaloor,
                  </span>
                  <span className="text-[12.5px] xl:text-[13px] font-bold text-[#123B63] block leading-tight">
                    Kochi, Kerala &ndash; 682017
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 5: Our Location & Map (Open, Large, Prominent) */}
          <div className="flex flex-col justify-start">
            {/* Header: Rating & Kaloor */}
            <div className="flex items-start justify-end gap-3">
              <div className="flex flex-col items-end text-right">
                <div className="flex items-center gap-1 text-[11.5px] font-semibold text-[#123B63] mt-0.3">
                  <MapPin className="w-3 h-3 text-[#123B63]" />
                  <span>Kaloor, Kochi</span>
                </div>
              </div>
            </div>

            {/* Map Image Container (Bigger size, high fidelity) */}
            <a
              href="https://maps.google.com/?q=Lisie+Hospital+Kochi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 relative w-full aspect-[16/10.5] rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs block group cursor-pointer"
            >
              <img
                src="/images/footer_map_center_only.png"
                alt="Lisie Hospital Location Map"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </a>

            {/* Bottom Action: Get Directions (just below the map) */}
            <div className="mt-2.5 sm:mt-3 flex justify-start">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Lisie+Hospital+Kochi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#123B63] hover:text-[#0E5191] transition-colors group cursor-pointer"
              >
                <span className="font-serif text-[18px] sm:text-[19px] font-semibold group-hover:underline">Get Directions</span>
                <div className="w-6.5 h-6.5 rounded-full bg-[#E5EEF8] text-[#123B63] group-hover:bg-[#123B63] group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-0.5 shadow-2xs">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Attribution from exact data */}
      <div className="relative z-20 bg-[#073C6E] text-slate-300">
        <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-4 flex flex-col lg:flex-row items-center justify-between text-xs gap-3.5">
          {/* Left: Exact Copyright & Attribution Statement */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-1.5 gap-x-2.5 sm:gap-x-3.5 text-slate-300 text-[12px] sm:text-[12.5px]">
            <span>&copy; 2026 Lisie Hospital. All rights reserved.</span>
            <span className="text-slate-400/40 hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms and Conditions
            </a>
            <span className="text-slate-400/40 hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            {/* <span className="text-slate-400/40 hidden sm:inline">|</span> */}
            {/* <a href="#biomedical-waste" className="hover:text-white transition-colors">
              Bio Medical Waste Report
            </a> */}
            {/* <span className="text-slate-400/40 hidden sm:inline">|</span> */}
            {/* <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a> */}
          </div>

          {/* Right: Follow Us & Social Icons & Back to Top */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            <span className="text-[12.5px] font-medium text-slate-300 mr-1 sm:mr-1.5">
              Follow Us
            </span>

            {/* Facebook */}
            <a
              href="https://facebook.com/lisiehospital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0F4982] hover:bg-[#155A9C] text-white flex items-center justify-center transition-all hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Twitter / X */}
            {/* <a
                href="https://twitter.com/lisiehospital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0F4982] hover:bg-[#155A9C] text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                </svg>
              </a> */}

            {/* YouTube */}
            {/* <a
                href="https://youtube.com/lisiehospital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0F4982] hover:bg-[#155A9C] text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a> */}

            {/* Instagram */}
            <a
              href="https://instagram.com/lisiehospital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0F4982] hover:bg-[#155A9C] text-white flex items-center justify-center transition-all hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* LinkedIn */}
            {/* <a
                href="https://linkedin.com/company/lisiehospital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0F4982] hover:bg-[#155A9C] text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a> */}

            {/* Back to top circle button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-400/60 hover:border-white text-white flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105 ml-1 sm:ml-1.5 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

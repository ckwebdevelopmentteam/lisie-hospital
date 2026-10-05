"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, MapPin, ArrowUpRight, ChevronLeft, ChevronRight, Bed, ShieldCheck } from "lucide-react";
import { useModal } from "@/context/ModalContext";

interface Campus {
  id: string;
  name: string;
  category: string;
  location: string;
  address: string;
  rating: string;
  reviewCount: string;
  beds?: string;
  facilityType: string;
  image: string;
  description: string;
  highlights: string[];
}

const campuses: Campus[] = [
  {
    id: "kaloor",
    name: "Main Super-Specialty",
    category: "Flagship Campus",
    location: "Kathrikadavu, Kaloor",
    address: "Kathrikadavu, Kaloor, Kochi - 682018",
    rating: "4.9",
    reviewCount: "4,250+",
    beds: "1,000+ Beds",
    facilityType: "Quaternary & Emergency",
    image: "/images/stitch/lisie-campus-kaloor.jpg",
    description:
      "1,000-bed tertiary care center housing the Heart Institute, Neurosciences, Nephrology, and 24/7 Level-1 Trauma Care.",
    highlights: ["Heart Institute", "Level-1 Trauma", "Renal Transplant"],
  },
  {
    id: "palarivattom",
    name: "Mother & Child Care",
    category: "Specialty Wing",
    location: "Palarivattom Bypass",
    address: "NH 66 Bypass, Palarivattom, Kochi - 682025",
    rating: "4.9",
    reviewCount: "2,840+",
    beds: "250+ Suites",
    facilityType: "Maternity & Pediatric",
    image: "/images/stitch/lisie-campus-palarivattom.jpg",
    description:
      "Dedicated obstetric suites, high-risk pregnancy monitoring, Level-III NICU, and child psychology center.",
    highlights: ["Level-III NICU", "High-Risk Pregnancy", "Pediatric Surgery"],
  },
  {
    id: "kakkanad",
    name: "Executive Diagnostics",
    category: "OPD & Wellness",
    location: "Infopark Expressway, Kakkanad",
    address: "Infopark Expressway, Kakkanad, Kochi - 682030",
    rating: "4.8",
    reviewCount: "1,920+",
    beds: "Daycare Suites",
    facilityType: "Outpatient & Health Check",
    image: "/images/stitch/lisie-campus-kakkanad.jpg",
    description:
      "Automated high-speed laboratory, preventive corporate wellness checkups, digital imaging, and daycare consultation.",
    highlights: ["Automated Lab", "Executive Checkups", "Daycare Surgery"],
  },
];

export default function CampusesSection() {
  const { openModal } = useModal();
  const [activeCampusIndex, setActiveCampusIndex] = useState(0);

  const handlePrev = () => {
    setActiveCampusIndex((prev) => (prev === 0 ? campuses.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCampusIndex((prev) => (prev === campuses.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 bg-warmgray-100" id="campuses">
      <div className="max-w-7xl mx-auto">
        {/* Section Title & Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-burgundy-100/60 text-burgundy-700 text-xs font-semibold uppercase tracking-wider mb-2 font-sans">
              Network of Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
              Explore Our Specialized Campuses
            </h2>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-6 font-sans">
            <p className="max-w-md text-stone-600 text-xs sm:text-sm">
              Three strategically located facilities in Kochi designed to offer
              seamless primary, tertiary, and executive healthcare.
            </p>
            {/* Slider Navigation Arrows */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous campus"
                className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:bg-burgundy-700 hover:text-white hover:border-burgundy-700 transition-colors shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next campus"
                className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-burgundy-700 transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Campus Cards Grid (CIMAR-Grade Editorial Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {campuses.map((campus, idx) => {
            const isHighlighted = idx === activeCampusIndex;
            return (
              <div
                key={campus.id}
                onClick={() => setActiveCampusIndex(idx)}
                className={`group relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col cursor-pointer ${
                  isHighlighted
                    ? "ring-2 ring-burgundy-700/60 shadow-xl border-burgundy-200"
                    : "border-stone-200/80 shadow-xs hover:shadow-xl hover:border-stone-300"
                }`}
              >
                {/* Large Branch Photography */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
                  <Image
                    src={campus.image}
                    alt={campus.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />

                  {/* Top Badges Row */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    {/* Campus Category Pill */}
                    <span className="frosted-glass bg-white/85 text-burgundy-900 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs font-sans">
                      {campus.category}
                    </span>

                    {/* Action Button Overlay */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal("appointment");
                      }}
                      aria-label={`Book at ${campus.name}`}
                      className="w-9 h-9 rounded-full bg-white/20 frosted-glass text-white flex items-center justify-center text-sm group-hover:bg-burgundy-700 group-hover:text-white transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Content Overlay inside image */}
                  <div className="absolute bottom-5 left-5 right-5 text-white font-sans">
                    {/* Location with Pin */}
                    <div className="flex items-center space-x-1 text-xs text-stone-300 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 text-burgundy-300 shrink-0" />
                      <span>{campus.location}</span>
                    </div>

                    {/* Branch Title */}
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight">
                      {campus.name}
                    </h3>

                    {/* Rating & Review Information */}
                    <div className="flex items-center space-x-2 text-xs mb-2">
                      <div className="flex items-center space-x-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md frosted-glass font-semibold text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{campus.rating}</span>
                      </div>
                      <span className="text-stone-300 text-[11px]">
                        ({campus.reviewCount} Reviews)
                      </span>
                      {campus.beds && (
                        <span className="flex items-center space-x-1 text-stone-300 text-[11px] ml-auto">
                          <Bed className="w-3 h-3 text-burgundy-200" />
                          <span>{campus.beds}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                      {campus.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="p-5 sm:p-6 bg-white flex flex-col justify-between flex-1 border-t border-stone-100 font-sans space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-stone-400 font-medium uppercase tracking-wider">
                        Facility Type
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-stone-800">
                        {campus.facilityType}
                      </span>
                    </div>
                    <span className="inline-flex items-center space-x-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>NABH Ready</span>
                    </span>
                  </div>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {campus.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[10px] bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Row */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal("appointment");
                      }}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-burgundy-700 hover:text-burgundy-900 group/btn"
                    >
                      <span>Explore Branch</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                    <a
                      href="#contact"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] text-stone-500 hover:text-burgundy-700 font-medium"
                    >
                      Book OPD →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Indicator Dots */}
        <div className="flex md:hidden items-center justify-center space-x-2 mt-6">
          {campuses.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveCampusIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeCampusIndex === idx
                  ? "w-6 bg-burgundy-700"
                  : "w-2 bg-stone-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

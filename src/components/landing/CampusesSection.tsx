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
    <section className="py-8 sm:py-10 px-4 sm:px-8 lg:px-[120px] bg-warmgray-50" id="campuses">
      <div className="w-full">
        {/* Section Title & Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 gap-3 sm:gap-4">
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-stone-200/70 text-stone-700 text-[11px] font-semibold uppercase tracking-wider mb-2 font-sans">
              Our Campuses
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Explore Our Specialized Campuses
            </h2>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 font-sans">
            <p className="max-w-xs text-stone-600 text-xs leading-relaxed">
              Three strategically located centers in Kochi delivering primary, tertiary, and executive clinical care.
            </p>
            {/* Slider Navigation Arrows */}
            <div className="flex items-center space-x-1.5 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous campus"
                className="w-7 h-7 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-colors shadow-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next campus"
                className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-burgundy-700 transition-colors shadow-xs"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Campus Cards Grid (Matching Dribbble Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
          {campuses.map((campus, idx) => {
            const isHighlighted = idx === activeCampusIndex;
            return (
              <div
                key={campus.id}
                onClick={() => {
                  setActiveCampusIndex(idx);
                  openModal("appointment");
                }}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Container with rounded-2xl */}
                <div
                  className={`relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 border transition-all duration-300 ${
                    isHighlighted
                      ? "ring-2 ring-burgundy-700/60 shadow-md border-transparent"
                      : "border-stone-200/80 hover:shadow-md"
                  }`}
                >
                  <Image
                    src={campus.image}
                    alt={campus.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top-Right Arrow Action Button matching reference */}
                  <div className="absolute top-3 right-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                        isHighlighted
                          ? "bg-white text-stone-900"
                          : "bg-white/70 frosted-glass text-stone-700 group-hover:bg-white group-hover:text-stone-900"
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Image Overlay Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="frosted-glass bg-black/40 px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-white/20">
                      {campus.beds}
                    </span>
                    <span className="text-[11px] text-stone-200">
                      ★ {campus.rating}
                    </span>
                  </div>
                </div>

                {/* Clean Typography Under Image (Matching Reference: Title + Subtitle) */}
                <div className="mt-2.5 px-0.5">
                  <h3 className="text-sm font-semibold text-stone-900 group-hover:text-burgundy-800 transition-colors">
                    {campus.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {campus.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

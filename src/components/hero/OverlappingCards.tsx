"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { CampusCard } from "./heroData";

interface OverlappingCardsProps {
  campuses: CampusCard[];
}

export default function OverlappingCards({
  campuses,
}: OverlappingCardsProps) {
  return (
    <div className="relative z-30 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28 md:-mt-32 lg:-mt-36">
      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {campuses.map((campus) => (
          <Link
            key={campus.id}
            href={campus.link}
            className="group flex flex-col justify-between"
          >
            {/* Top: Directly Rounded Hospital Photo with Soft Shadow */}
            <div
              className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-slate-900 cursor-pointer"
            >
              <img
                src={campus.image}
                alt={campus.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Bottom Content Area directly on white background */}
            <div className="pt-4 pb-2">
              <div className="flex items-start justify-between gap-2">
                {/* Left: Title & Google Rating */}
                <div>
                  <h2
                    className="text-base sm:text-lg font-black tracking-tight text-[#E25227] hover:text-[#C5221F] cursor-pointer transition-colors uppercase"
                  >
                    {campus.name}
                  </h2>

                  {/* Google Rating Row */}
                  <div
                    className="flex items-center space-x-1.5 mt-1 cursor-pointer"
                    title={`${campus.googleRating.score} Google Rating (${campus.googleRating.reviewsCount} reviews)`}
                  >
                    {/* Authentic Multicolor Google 'G' icon */}
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>

                    {/* 5 Stars */}
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(campus.googleRating.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Rating Score */}
                    <span className="text-xs font-semibold text-gray-700 ml-0.5">
                      {campus.googleRating.score}
                    </span>
                  </div>
                </div>

                {/* Right: 'VISIT US →' Pill Button */}
                <span
                  className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-gray-400/80 group-hover:border-[#E25227] text-gray-800 group-hover:text-[#E25227] text-[11px] sm:text-xs font-semibold group-hover:bg-orange-50/40 transition-all duration-200 shrink-0"
                >
                  <span className="tracking-wider uppercase">VISIT US</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E25227] transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

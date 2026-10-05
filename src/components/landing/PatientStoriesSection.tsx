"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Story {
  id: string;
  initials: string;
  name: string;
  rating: number;
  quote: string;
  department: string;
  location: string;
}

const stories: Story[] = [
  {
    id: "story-1",
    initials: "AK",
    name: "Ananya Kurian",
    rating: 5,
    quote:
      "The warmth of the nursing team at Lisie Heart Institute made our father’s coronary bypass experience reassuring. The surgical skill was unmatched, and he recovered ahead of schedule.",
    department: "Cardiology • Kaloor",
    location: "Kottayam",
  },
  {
    id: "story-2",
    initials: "RM",
    name: "Rahul Menon",
    rating: 5,
    quote:
      "Delivered our baby girl at Lisie Mother and Child. The neonatal care was exemplary, rooms were pristine, and the consultants took personal care every day.",
    department: "Obstetrics & NICU",
    location: "Ernakulam",
  },
  {
    id: "story-3",
    initials: "TJ",
    name: "Thomas Joseph",
    rating: 5,
    quote:
      "Transparent billing and prompt insurance approval without unnecessary delays. Lisie maintains the true spirit of service without commercialization.",
    department: "Nephrology",
    location: "Thrissur",
  },
  {
    id: "story-4",
    initials: "FA",
    name: "Faisal Al-Otaibi",
    rating: 5,
    quote:
      "Traveled from Muscat for knee arthroplasty. The international patient care coordinator handled our visa letter, airport pickup, and post-op follow-ups seamlessly.",
    department: "Orthopaedics",
    location: "Muscat, Oman",
  },
];

export default function PatientStoriesSection() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const handlePrev = () => {
    setActiveStoryIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStoryIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      className="py-8 sm:py-10 px-4 sm:px-8 lg:px-[120px] bg-warmgray-50"
      id="testimonials"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
          <span className="inline-block px-3 py-0.5 rounded-full bg-stone-200/70 text-stone-700 text-[11px] font-semibold uppercase tracking-wider mb-2 font-sans">
            Patient Stories
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-stone-900 tracking-tight">
            Words of Hope and Healing
          </h2>
          <p className="text-stone-500 text-xs mt-1 font-sans">
            Real experiences shared by patients and their families from across India and abroad.
          </p>

          {/* Carousel navigation buttons */}
          <div className="flex items-center justify-center space-x-1.5 mt-3.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-7 h-7 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-colors shadow-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-burgundy-700 transition-colors shadow-xs"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 font-sans">
          {stories.map((story, idx) => {
            const isSelected = idx === activeStoryIndex;
            return (
              <div
                key={story.id}
                onClick={() => setActiveStoryIndex(idx)}
                className={`bg-white p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-burgundy-700/60 border-burgundy-200 shadow-sm"
                    : "border-stone-200/80 shadow-xs hover:shadow-sm hover:border-stone-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-burgundy-100 text-burgundy-700 font-bold flex items-center justify-center text-xs">
                        {story.initials}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-stone-900">
                          {story.name}
                        </h4>
                        <div className="flex items-center space-x-0.5 text-amber-400">
                          {Array.from({ length: story.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-2.5 h-2.5 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Quote className="w-4 h-4 text-stone-300" />
                  </div>

                  <p className="text-stone-600 text-xs leading-relaxed mb-4">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-medium text-stone-600">{story.department}</span>
                  <span className="font-medium text-stone-500">
                    {story.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

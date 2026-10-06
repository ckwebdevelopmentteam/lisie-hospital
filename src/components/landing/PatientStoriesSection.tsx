"use client";

import React from "react";
import { ArrowUpRight, Quote } from "lucide-react";

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
  return (
    <section
      className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      id="testimonials"
    >
      <div className="w-full max-w-[1536px] mx-auto">
        <div className="mb-10 flex items-start justify-between gap-6 sm:mb-12">
          <div className="flex items-start gap-4 sm:gap-6">
            <ArrowUpRight className="mt-1 h-10 w-10 shrink-0 text-[#d11f53] sm:h-12 sm:w-12" strokeWidth={1.5} />
            <div className="font-sans">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Patient Stories
              </span>
              <h2 className="mt-1 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight text-[#233f47] sm:text-4xl lg:text-5xl">
                Words of Hope and Healing
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-500 sm:text-base">
                Real experiences shared by patients and their families from across India and abroad.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#d11f53] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#b81444]"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 font-sans sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((story) => (
            <article
              key={story.id}
              className="flex min-h-[320px] flex-col rounded-[1.35rem] bg-[#29464e] p-6 text-white sm:p-7"
            >
              <Quote className="h-10 w-10 fill-white" strokeWidth={0} />
              <p className="my-auto pt-8 text-sm leading-relaxed text-white sm:text-[15px]">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d11f53] text-sm font-bold text-white">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{story.name}</h3>
                  <p className="mt-0.5 text-xs text-white/65">
                    {story.department} · {story.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";

interface Story {
  id: string;
  name: string;
  quote: string;
  department: string;
  location: string;
}

const stories: Story[] = [
  {
    id: "story-1",
    name: "Ananya Kurian",
    quote: "The warmth of the nursing team at Lisie Heart Institute made our father's coronary bypass experience reassuring. The surgical skill was unmatched.",
    department: "Cardiology",
    location: "Kottayam",
  },
  {
    id: "story-2",
    name: "Rahul Menon",
    quote: "Delivered our baby girl at Lisie Mother and Child. The neonatal care was exemplary, rooms were pristine, and the consultants took personal care every day.",
    department: "Obstetrics & NICU",
    location: "Ernakulam",
  },
  {
    id: "story-3",
    name: "Thomas Joseph",
    quote: "Transparent billing and prompt insurance approval without unnecessary delays. Lisie maintains the true spirit of service without commercialization.",
    department: "Nephrology",
    location: "Thrissur",
  },
  {
    id: "story-4",
    name: "Faisal Al-Otaibi",
    quote: "Traveled from Muscat for knee arthroplasty. The international patient care coordinator handled our stay and post-operative follow-ups seamlessly.",
    department: "Orthopaedics",
    location: "Muscat, Oman",
  },
  {
    id: "story-5",
    name: "Meera Nair",
    quote: "Every question was answered with patience. From admission to discharge, the team made a difficult time feel calm and well cared for.",
    department: "Oncology",
    location: "Kochi",
  },
  {
    id: "story-6",
    name: "George Mathew",
    quote: "The doctors explained every step before my procedure. I felt safe, informed, and back on my feet much sooner than I expected.",
    department: "Gastroenterology",
    location: "Alappuzha",
  },
  {
    id: "story-7",
    name: "Shalini Das",
    quote: "Our family was deeply grateful for the attentive emergency care. The team moved quickly and kept us updated through every moment.",
    department: "Emergency Medicine",
    location: "Kozhikode",
  },
  {
    id: "story-8",
    name: "Vivek Pillai",
    quote: "The physiotherapy team gave me confidence after surgery. Their encouragement and structured care made recovery feel achievable.",
    department: "Rehabilitation",
    location: "Kollam",
  },
  {
    id: "story-9",
    name: "Latha Varghese",
    quote: "The specialist listened carefully and created a plan that truly suited me. The entire visit was organised, kind, and reassuring.",
    department: "Endocrinology",
    location: "Muvattupuzha",
  },
  {
    id: "story-10",
    name: "Nikhil Suresh",
    quote: "From the first consultation to follow-up, every interaction was professional and compassionate. I would confidently recommend Lisie.",
    department: "Neurology",
    location: "Palakkad",
  },
];

export default function PatientStoriesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(1);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    const item = container.querySelector<HTMLElement>('[data-story-index="1"]');
    if (!item) return;
    const scrollLeft = item.offsetLeft - (container.clientWidth - item.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "instant" });
  }, []);

  const scrollStories = (direction: "left" | "right") => {
    setActiveStoryIndex((currentIndex) => {
      const nextIndex = direction === "left"
        ? (currentIndex - 1 + stories.length) % stories.length
        : (currentIndex + 1) % stories.length;

      const container = carouselRef.current;
      if (container) {
        const item = container.querySelector<HTMLElement>(`[data-story-index="${nextIndex}"]`);
        if (item) {
          const scrollLeft = item.offsetLeft - (container.clientWidth - item.clientWidth) / 2;
          container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
        }
      }

      return nextIndex;
    });
  };

  const selectStory = (index: number) => {
    setActiveStoryIndex(index);
    const container = carouselRef.current;
    if (container) {
      const item = container.querySelector<HTMLElement>(`[data-story-index="${index}"]`);
      if (item) {
        const scrollLeft = item.offsetLeft - (container.clientWidth - item.clientWidth) / 2;
        container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#f3f7fc] font-sans overflow-hidden" id="testimonials">
      <div className="relative mx-auto w-full max-w-[1536px]">
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-[#f8fbff] to-[#e9f2fb] px-5 py-11 shadow-[0_22px_60px_rgba(66,100,135,0.10)] sm:min-h-[345px] sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[28px] border-[#d11f53]/[0.05]" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#2378bd]/[0.05]" />
          <Quote className="pointer-events-none absolute left-7 top-10 h-24 w-24 fill-slate-100 text-slate-100 sm:left-12 sm:top-12 sm:h-32 sm:w-32" strokeWidth={0} />

          <div className="relative z-10 text-center font-sans">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d11f53] sm:text-xs">
              Patient Stories
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              What Our Patients Say!
            </h2>
            <div className="mt-3 flex justify-center gap-1" aria-hidden="true">
              <span className="h-0.5 w-11 bg-[#d11f53]" />
              <span className="h-0.5 w-4 bg-[#d11f53]/70" />
              <span className="h-0.5 w-2 bg-[#d11f53]/35" />
            </div>
          </div>
        </div>

        <div className="relative left-1/2 z-20 -mt-24 w-screen -translate-x-1/2 sm:-mt-28">
          <div className="relative mx-auto max-w-[1536px] px-12 sm:px-14">
            <button
              type="button"
              aria-label="Previous patient stories"
              onClick={() => scrollStories("left")}
              className="absolute left-0 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform hover:scale-110 sm:h-16 sm:w-16"
            >
              <Image src="/images/leftarrow1.png" alt="" width={52} height={52} />
            </button>

            <div
              ref={carouselRef}
              className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto pb-10 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
            >
              {stories.map((story, index) => (
                <article
                  key={story.id}
                  data-story-index={index}
                  onClick={() => selectStory(index)}
                  className={`relative flex min-h-[280px] w-[260px] shrink-0 snap-center flex-col rounded-sm bg-white p-8 text-center shadow-[0_12px_30px_rgba(54,83,112,0.13)] transition-all duration-500 cursor-pointer sm:w-[320px] sm:p-9 lg:min-h-[310px] lg:w-[420px] lg:p-10 ${
                    index === activeStoryIndex
                      ? "z-10 scale-[1.04] opacity-100"
                      : "scale-[0.82] opacity-75 hover:opacity-100"
                  }`}
                >
                  {index === activeStoryIndex && (
                    <div className="flex justify-center gap-1 text-[#d11f53]" aria-label="Five star review">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`h-5 w-5 ${starIndex === 4 ? "fill-slate-300 text-slate-300" : "fill-[#d11f53]"}`}
                        />
                      ))}
                    </div>
                  )}
                  <p className={`leading-relaxed text-stone-600 ${index === activeStoryIndex ? "mt-8 text-sm sm:text-base" : "my-auto text-[11px]"}`}>
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <p className={`font-semibold text-stone-800 ${index === activeStoryIndex ? "mt-7 text-sm" : "mt-5 text-[10px]"}`}>
                    {story.name} · {story.location}
                  </p>
                  {index === activeStoryIndex && (
                    <Quote className="pointer-events-none absolute -bottom-7 right-6 h-16 w-16 fill-[#d11f53] text-[#d11f53] sm:h-20 sm:w-20" strokeWidth={0} />
                  )}
                </article>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next patient stories"
              onClick={() => scrollStories("right")}
              className="absolute right-0 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform hover:scale-110 sm:h-16 sm:w-16"
            >
              <Image src="/images/rightarrow.png" alt="" width={52} height={52} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

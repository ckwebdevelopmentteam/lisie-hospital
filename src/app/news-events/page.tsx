import React from "react";
import NewsArticlesSection from "@/components/landing/NewsArticlesSection";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events | Lisie Hospital Kochi",
  description:
    "Explore the latest news, medical breakthroughs, clinical achievements, and health camps at Lisie Hospital, Ernakulam.",
};

export default function NewsEventsPage() {
  return (
    <div className="w-full bg-white font-sans">
      {/* Subpage Header Banner */}
      <section className="relative bg-[#0E2A47] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#1677B8]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-64 w-64 rounded-full bg-[#d11f53]/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1536px]">
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d11f53] mb-3">
            <Bell className="h-4 w-4" />
            <span>Hospital Bulletin</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            News, Events & Medical Articles
          </h1>

          <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Stay connected with the latest healthcare advancements, academic symposia,
            medical research papers, and humanitarian health missions organized by Lisie
            Hospital.
          </p>
        </div>
      </section>

      {/* Main News Section */}
      <NewsArticlesSection />
    </div>
  );
}

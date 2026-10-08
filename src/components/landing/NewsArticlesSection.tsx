"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowRight,
  X,
  Share2,
  Check,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface NewsArticle {
  id: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorShort: string;
  title: string;
  excerpt: string;
  image: string;
  fullContent: string[];
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "cardiac-milestone",
    category: "Cardiac Excellence",
    date: "October 04, 2026",
    readTime: "4 min read",
    author: "Dr. Jose Chacko, Chief Cardiothoracic Surgeon",
    authorShort: "DR. JOSE CHACKO",
    title:
      "Lisie Heart Institute Surpasses 14,000 Open-Heart Surgeries with 99.2% Success Rate",
    excerpt:
      "A landmark achievement in South Indian cardiothoracic surgery, celebrating decades of pioneering clinical outcomes, minimally invasive valve repairs, and dedicated patient-centric healing.",
    image: "/images/news/cardiac-surgery-milestone.jpg",
    tags: ["Cardiology", "Heart Surgery", "Clinical Milestone"],
    fullContent: [
      "The Lisie Heart Institute has reached an extraordinary milestone in cardiac excellence, completing over 14,000 open-heart surgeries since its inception with a documented success rate exceeding 99.2%. This achievement solidifies Lisie's standing as one of the preeminent centers for complex cardiovascular surgical care in South India.",
      "The dedicated cardiothoracic department regularly performs cutting-edge procedures, including beating-heart coronary artery bypass grafting (CABG), minimally invasive mitral valve repairs, aortic aneurysm corrections, and complex pediatric congenital surgeries.",
      "“Our focus has never been solely on numerical milestones, but on restoring healthy tomorrows to families,” noted Chief Cardiothoracic Surgeon Dr. Jose Chacko. “With advanced intraoperative 3D transesophageal echocardiography, dedicated cardiac intensive care bays, and seamless post-op rehabilitation, we continue to push clinical boundaries while adhering strictly to ethical, patient-centered care.”",
    ],
  },
  {
    id: "stroke-thrombectomy",
    category: "Neurosciences",
    date: "September 28, 2026",
    readTime: "5 min read",
    author: "Dr. Jacob Abraham, Senior Interventional Neurologist",
    authorShort: "DR. JACOB ABRAHAM",
    title:
      "Advancing Golden-Hour Stroke Protocol: Biplane Neuro-Intervention Saves Critical Time",
    excerpt:
      "Our newly upgraded 24/7 comprehensive stroke network enables mechanical thrombectomy within minutes of hospital arrival, significantly reversing acute ischemic paralysis.",
    image: "/images/news/stroke-thrombectomy-network.jpg",
    tags: ["Neurosciences", "Emergency", "Stroke Care"],
    fullContent: [
      "Stroke is a medical emergency where every minute lost equates to nearly two million dying neurons. Lisie Hospital's newly commissioned 24/7 Comprehensive Stroke Center and biplane digital subtraction angiography suite are delivering transformative outcomes for acute ischemic stroke patients across Central Kerala.",
      "Through a streamlined ‘Code Stroke’ alert protocol, incoming emergency patients bypass administrative delays to receive immediate multi-phase CT perfusion imaging. If a large vessel occlusion is identified within the golden window, the neuro-interventional team initiates rapid mechanical clot extraction.",
      "“Speed coupled with precision imaging allows us to achieve complete revascularization even in severe strokes, frequently enabling patients who arrived paralyzed to regain motor functions,” explains Dr. Jacob Abraham. “Our multidisciplinary stroke team operates round the clock with dedicated neuro-ICU backup.”",
    ],
  },
  {
    id: "community-outreach",
    category: "Community Outreach",
    date: "September 15, 2026",
    readTime: "3 min read",
    author: "Sr. Mary Grace, Community Health Coordinator",
    authorShort: "SR. MARY GRACE",
    title:
      "Touching Lives Across Kerala: 2,500+ Beneficiaries in Free Medical & Cardiac Screening Camps",
    excerpt:
      "Upholding our founding mission since 1956, our outreach wing conducted multi-specialty diagnostics, pediatric screenings, and subsidized medicine distribution across underserved communities.",
    image: "/images/news/community-health-camp.jpg",
    tags: ["Community Care", "Free Camp", "Compassion"],
    fullContent: [
      "In continuing fidelity to its foundational motto of 'Care Beyond Cure,' Lisie Hospital conducted five comprehensive community health camps across coastal and rural regions of Ernakulam and Thrissur districts this past month, serving more than 2,500 individuals.",
      "The mobile medical units included cardiologist consultations, computerized ECG testing, random blood sugar and lipid profile screenings, general health examinations, and specialized pediatric developmental assessments. Patients requiring advanced surgical treatment or specialized care were enrolled in subsidized tertiary care programs at Lisie Hospital.",
      "“Since our inception in 1956 under the Archdiocese of Ernakulam-Angamaly, healing the underserved has remained the very soul of our institution,” remarked Community Health Coordinator Sr. Mary Grace. “These camps ensure that modern tertiary healthcare reaches the doorsteps of those who need it most.”",
    ],
  },
];

export default function NewsArticlesSection() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeBlogIndex, setActiveBlogIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollToIndex = (index: number) => {
    const nextIdx = Math.max(0, Math.min(newsArticles.length - 1, index));
    setActiveBlogIndex(nextIdx);
    if (carouselRef.current) {
      const card = carouselRef.current.children[nextIdx] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.82;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < newsArticles.length && newIndex !== activeBlogIndex) {
      setActiveBlogIndex(newIndex);
    }
  };

  const handleCopyLink = (id: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/news-events#${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section
      id="news-articles"
      className="relative bg-gradient-to-b from-[#FAFAF8] via-white to-[#F5F5F0] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-t border-slate-200/70"
    >
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-[#d11f53]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-[#1677B8]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1536px]">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            {/* Accent eyebrow line */}
            <div className="mb-3 flex items-center gap-3">
              <span className="h-0.5 w-10 sm:w-14 bg-[#8d173b]" />
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#8d173b]">
                News & Medical Articles
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a324c] leading-[1.18]">
              Advancing Medicine,{" "}
              <span className="text-[#d11f53]">Transforming Lives</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Explore the latest clinical breakthroughs, surgical milestones, and
              community health outreach initiatives directly from the medical specialists
              at Lisie Hospital.
            </p>
          </div>

          {/* Desktop "View All" button */}
          <div className="hidden sm:block shrink-0">
            <Link
              href="/news-events"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#d11f53] hover:bg-[#b81444] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <span>View All News & Articles</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-[#b81444]">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Carousel (md:hidden) */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-3 pt-1 -mx-4 px-4"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {newsArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="w-[84vw] max-w-[325px] shrink-0 snap-center group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 active:scale-[0.99] cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 rounded-t-2xl">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block rounded-full bg-[#d11f53] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-4">
                  {/* Date & Read time */}
                  <div className="mb-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#1677B8]" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold leading-snug text-[#1a324c] line-clamp-2 mb-2">
                    {article.title}
                  </h3>

                  {/* Snippet */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-[11px] font-bold text-[#d11f53]">
                      {article.authorShort}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a324c]">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile Carousel Indicators & Arrows */}
          <div className="mt-3 flex items-center justify-between px-1">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {newsArticles.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to article ${idx + 1}`}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeBlogIndex
                      ? "w-7 bg-[#d11f53]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous article"
                onClick={() => scrollToIndex(activeBlogIndex - 1)}
                disabled={activeBlogIndex === 0}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 disabled:opacity-35 border border-slate-200/80 active:scale-95 transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next article"
                onClick={() => scrollToIndex(activeBlogIndex + 1)}
                disabled={activeBlogIndex === newsArticles.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 disabled:opacity-35 border border-slate-200/80 active:scale-95 transition-all shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop 3 Articles Grid (hidden on mobile, visible on md+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl cursor-pointer"
            >
              {/* Image Container - with slight curve matching card */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 rounded-t-xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                {/* Date Row (only date, tag after date removed) */}
                <div className="mb-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#1677B8]" />
                  <span>{article.date}</span>
                </div>

                {/* Article Title */}
                <h3 className="text-lg sm:text-[19px] font-bold leading-snug text-[#1a324c] transition-colors duration-200 group-hover:text-[#d11f53] line-clamp-2 mb-3">
                  {article.title}
                </h3>

                {/* Article Snippet */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 flex-1">
                  {article.excerpt}
                </p>

                {/* Card Footer: Action link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end mt-auto">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a324c] transition-colors duration-200 group-hover:text-[#d11f53]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/news-events"
            className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#d11f53] hover:bg-[#b81444] text-white text-sm font-semibold transition-all duration-300 shadow-md"
          >
            <span>View All News & Articles</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Interactive Article Modal Reader */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl transition-all font-sans custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-slate-900">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2a47]/90 via-[#0e2a47]/40 to-transparent" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
                aria-label="Close article modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Category & Date on Image */}
              <div className="absolute bottom-4 left-5 sm:left-7 right-5 z-10 text-white">
                <span className="inline-block rounded-full bg-[#d11f53] px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <div className="mt-2 flex items-center gap-3 text-xs text-white/80">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedArticle.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Article Content */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-[#1a324c] mb-4">
                {selectedArticle.title}
              </h2>

              {/* Author attribution info */}
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#123B63] text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1a324c]">
                    {selectedArticle.author}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Lisie Hospital Clinical Communications & Media Desk
                  </p>
                </div>
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                {selectedArticle.fullContent.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(selectedArticle.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    {copiedId === selectedArticle.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Share Article</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1a324c] px-5 py-2 text-xs font-semibold text-white hover:bg-[#d11f53] transition-colors"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import React from "react";
import Image from "next/image";

export default function LegacyStorySection() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-warmgray-50" id="about">
      <div className="w-full max-w-[1536px] mx-auto">
        {/* Section Header Badge & Title */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-stone-200/80 text-stone-700 text-[11px] font-semibold uppercase tracking-wider mb-2.5 font-sans">
            Our Heritage
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-stone-900 tracking-tight leading-snug">
            Your Trusted Healthcare Partner in Kerala
          </h2>
        </div>

        {/* 3-Column Story Grid: Center image height strictly matches left & right columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch lg:h-[430px] xl:h-[450px]">
          {/* Left Column: Narrative text at top (right-aligned towards center), image below */}
          <div className="flex flex-col justify-between h-full space-y-4 lg:space-y-0">
            <div className="text-left lg:text-right font-sans pt-1">
              <p className="text-stone-600 text-sm sm:text-[15px] leading-relaxed">
                Founded in 1956 under the Archdiocese of Ernakulam-Angamaly, Lisie Hospital was built on a singular enduring commitment: delivering world-class compassionate healthcare to every person with medical mastery and selfless dedication.
              </p>
            </div>

            {/* Left Bottom Image */}
            <div className="relative w-full h-[220px] sm:h-[250px] lg:h-[260px] xl:h-[275px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-100 group shrink-0">
              <Image
                src="/images/stitch/lisie-campus-palarivattom.jpg"
                alt="Lisie Mother and Child Hospital Wing"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 frosted-glass bg-black/40 text-white text-xs px-3.5 py-1.5 rounded-full border border-white/20 font-sans">
                99% Patient Satisfaction
              </div>
            </div>
          </div>

          {/* Center Column: Tall Portrait Image spanning full height matching left & right */}
          <div className="relative w-full h-[360px] sm:h-[420px] lg:h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-stone-200/80 bg-stone-100 group">
            <Image
              src="/images/stitch/lisie-campus-kaloor.jpg"
              alt="Lisie Hospital Main Campus building in Kaloor Kochi"
              fill
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-stone-900/10 to-transparent" />
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white font-sans">
              <div className="frosted-glass bg-black/45 text-white text-xs px-3.5 py-1.5 rounded-full border border-white/20">
                1956 Founded • Kaloor
              </div>
              <div className="frosted-glass bg-white/25 text-white text-xs px-3 py-1.5 rounded-full border border-white/20 font-semibold">
                1,000+ Beds
              </div>
            </div>
          </div>

          {/* Right Column: Image at top, narrative text below (left-aligned) */}
          <div className="flex flex-col justify-between h-full space-y-4 lg:space-y-0">
            {/* Right Top Image */}
            <div className="relative w-full h-[220px] sm:h-[250px] lg:h-[260px] xl:h-[275px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-100 group shrink-0">
              <Image
                src="/images/stitch/lisie-campus-kakkanad.jpg"
                alt="Lisie Diagnostics and Wellness Centre"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 frosted-glass bg-black/40 text-white text-xs px-3.5 py-1.5 rounded-full border border-white/20 font-sans">
                68+ Years of Service
              </div>
            </div>

            {/* Right Bottom Text */}
            <div className="text-left font-sans pb-1">
              <p className="text-stone-600 text-sm sm:text-[15px] leading-relaxed">
                With state-of-the-art cath labs, South India&apos;s pioneering cardiac surgical units, and comprehensive organ transplant facilities, Lisie provides healing anchored in ethical care, transparent billing, and clinical excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

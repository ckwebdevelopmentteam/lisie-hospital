import React from "react";
import Image from "next/image";

export default function LegacyStorySection() {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-8 lg:px-[120px] bg-warmgray-50" id="about">
      <div className="w-full">
        {/* Section Header Badge & Title */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
          <span className="inline-block px-3 py-0.5 rounded-full bg-stone-200/70 text-stone-700 text-[11px] font-semibold uppercase tracking-wider mb-2 font-sans">
            Our Heritage
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-stone-900 tracking-tight leading-snug">
            Your Trusted Healthcare Partner in Kerala
          </h2>
        </div>

        {/* Asymmetrical Balanced Story Grid matching reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          {/* Left Column: Narrative text at top, landscape image below */}
          <div className="lg:col-span-4 flex flex-col space-y-5 justify-between">
            <div className="text-left lg:text-right font-sans">
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Founded in 1956 under the Archdiocese of Ernakulam-Angamaly, Lisie Hospital was built on a singular enduring commitment: delivering world-class compassionate healthcare to every person with medical mastery and selfless dedication.
              </p>
            </div>

            {/* Left Bottom Image */}
            <div className="overflow-hidden rounded-2xl shadow-xs border border-stone-200/80 bg-stone-100 aspect-[16/11] relative group">
              <Image
                src="/images/stitch/lisie-campus-palarivattom.jpg"
                alt="Lisie Mother and Child Hospital Wing"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 frosted-glass bg-black/40 text-white text-[11px] px-3 py-1 rounded-full border border-white/20 font-sans">
                99% Patient Satisfaction
              </div>
            </div>
          </div>

          {/* Center Column: Tall Portrait Image of Main Campus */}
          <div className="lg:col-span-4 relative group">
            <div className="overflow-hidden rounded-2xl shadow-sm border border-stone-200/80 bg-stone-100 aspect-[3/4] relative">
              <Image
                src="/images/stitch/lisie-campus-kaloor.jpg"
                alt="Lisie Hospital Main Campus building in Kaloor Kochi"
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-stone-900/10 to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white font-sans">
                <div className="frosted-glass bg-black/45 text-white text-[11px] px-3 py-1 rounded-full border border-white/20">
                  1956 Founded • Kaloor
                </div>
                <div className="frosted-glass bg-white/25 text-white text-[11px] px-2.5 py-1 rounded-full border border-white/20 font-semibold">
                  1,000+ Beds
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Landscape image at top, narrative text below */}
          <div className="lg:col-span-4 flex flex-col space-y-5 justify-between">
            {/* Right Top Image */}
            <div className="overflow-hidden rounded-2xl shadow-xs border border-stone-200/80 bg-stone-100 aspect-[16/11] relative group">
              <Image
                src="/images/stitch/lisie-campus-kakkanad.jpg"
                alt="Lisie Diagnostics and Wellness Centre"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 frosted-glass bg-black/40 text-white text-[11px] px-3 py-1 rounded-full border border-white/20 font-sans">
                68+ Years of Service
              </div>
            </div>

            <div className="text-left font-sans">
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                With state-of-the-art cath labs, South India&apos;s pioneering cardiac surgical units, and comprehensive organ transplant facilities, Lisie provides healing anchored in ethical care, transparent billing, and clinical excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

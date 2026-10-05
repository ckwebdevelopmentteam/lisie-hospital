import React from "react";
import Image from "next/image";

export default function LegacyStorySection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-warmgray-50" id="about">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-burgundy-50 text-burgundy-700 text-xs font-semibold uppercase tracking-wider mb-3 font-sans">
            Our Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight leading-snug">
            Kerala&apos;s Most Trusted Multispecialty Healing Institution
          </h2>
        </div>

        {/* Asymmetrical Balanced Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Story text and stats badge */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-stone-200/70 shadow-xs">
              <h3 className="text-lg font-serif font-semibold text-burgundy-800 mb-3">
                Compassion in Action
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6 font-sans">
                Founded in 1956 under the patronage of the Archdiocese of
                Ernakulam-Angamaly, Lisie Hospital was born from a singular
                vision: to serve suffering humanity irrespective of caste or
                creed with medical mastery and heartfelt kindness.
              </p>
              <div className="pt-4 border-t border-stone-100 flex items-center space-x-4 font-sans">
                <div className="w-12 h-12 rounded-2xl bg-burgundy-50 flex items-center justify-center text-burgundy-700 font-bold text-xl">
                  ✝
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    Affordable Tertiary Care
                  </p>
                  <p className="text-xs text-stone-500">
                    Non-profit healing mission
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-burgundy-700 text-white p-8 rounded-3xl shadow-xs relative overflow-hidden">
              <div className="relative z-10 font-sans">
                <span className="text-xs uppercase tracking-widest text-burgundy-200 font-semibold">
                  Patient Milestone
                </span>
                <div className="text-3xl font-serif font-bold mt-1 mb-2">
                  2.5M+ Smiles
                </div>
                <p className="text-burgundy-100 text-xs leading-relaxed">
                  Treated with dignity, cutting-edge technology, and world-class
                  post-operative care across three specialized centers.
                </p>
              </div>
              {/* Decorative circle */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-burgundy-800/40 pointer-events-none" />
            </div>
          </div>

          {/* Center Column: Tall Photo Card of Main Lisie Campus */}
          <div className="lg:col-span-5 relative group">
            <div className="overflow-hidden rounded-3xl shadow-md border border-stone-200/80 bg-stone-100 aspect-[4/5] relative">
              <Image
                src="/images/stitch/lisie-campus-kaloor.jpg"
                alt="Lisie Hospital Main Campus building in Kaloor Kochi"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              {/* Bottom Floating Tag inside card */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white font-sans">
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                    Main Tertiary Hub
                  </span>
                  <p className="text-xl font-serif font-semibold">
                    Lisie Hospital, Kaloor
                  </p>
                </div>
                <div className="frosted-glass bg-white/20 text-white text-xs px-3.5 py-1.5 rounded-full font-medium border border-white/20">
                  1,000+ Beds
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Secondary facility and clinical highlights */}
          <div className="lg:col-span-3 flex flex-col space-y-6">
            <div className="overflow-hidden rounded-3xl shadow-xs border border-stone-200/70 bg-stone-100 aspect-[4/3] relative group">
              <Image
                src="/images/stitch/lisie-campus-palarivattom.jpg"
                alt="Lisie Mother and Child Hospital Wing"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-sans">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-burgundy-200">
                  Mother &amp; Baby Wing
                </span>
                <p className="text-sm font-semibold">Level-III NICU Care</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200/70 shadow-xs text-stone-600 text-xs leading-relaxed font-sans">
              <h4 className="font-serif font-semibold text-stone-900 text-sm mb-2">
                Pioneering Cardiac Centre
              </h4>
              <p className="mb-3">
                Home to one of South India&apos;s oldest and most renowned
                cardiothoracic surgery institutes, performing complex pediatric
                and adult cardiac interventions daily.
              </p>
              <a
                href="#specialties"
                className="inline-flex items-center text-burgundy-700 font-semibold hover:underline"
              >
                <span>View Surgical Milestones</span>
                <span className="ml-1 text-xs">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

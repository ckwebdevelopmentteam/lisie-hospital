"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function StitchFooter() {
  const { openModal } = useModal();

  return (
    <footer className="pt-16 pb-12 px-4 sm:px-8 bg-warmgray-50 border-t border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-stone-200/80">
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-burgundy-700 flex items-center justify-center text-white font-serif font-bold text-xl">
                LH
              </div>
              <div>
                <span className="text-xl font-bold font-serif text-burgundy-900">
                  Lisie Hospital
                </span>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">
                  Care Beyond Cure • Kochi, Kerala
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed">
              Registered charitable healthcare institution managed by the
              Archdiocese of Ernakulam-Angamaly, setting benchmarks in quality,
              compassion, and surgical excellence since 1956.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#campuses"
                className="inline-flex items-center space-x-1.5 bg-burgundy-700 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-burgundy-800 transition"
              >
                <span>Explore Campuses</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center space-x-1.5 border border-stone-300 text-stone-700 text-xs font-semibold px-4 py-2 rounded-full hover:bg-stone-100 transition"
              >
                <span>Contact Us</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600 font-medium">
              <li>
                <a href="#about" className="hover:text-burgundy-700 transition">
                  About Lisie
                </a>
              </li>
              <li>
                <a href="#campuses" className="hover:text-burgundy-700 transition">
                  Our 3 Campuses
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-burgundy-700 transition">
                  Heart Institute
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-burgundy-700 transition">
                  Neurosciences
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-burgundy-700 transition"
                >
                  Patient Stories
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openModal("doctor-search")}
                  className="hover:text-burgundy-700 transition text-left"
                >
                  Doctor Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Campuses & Locations */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-4">
              Campuses in Kochi
            </h4>
            <ul className="space-y-3 text-xs text-stone-600">
              <li>
                <strong className="text-stone-800 block font-semibold">
                  Main Super-Specialty:
                </strong>
                <span>Kathrikadavu, Kaloor, Kochi - 682018</span>
              </li>
              <li>
                <strong className="text-stone-800 block font-semibold">
                  Mother &amp; Child Care Wing:
                </strong>
                <span>NH 66 Bypass, Palarivattom, Kochi - 682025</span>
              </li>
              <li>
                <strong className="text-stone-800 block font-semibold">
                  Executive Clinic:
                </strong>
                <span>Infopark Expressway, Kakkanad, Kochi - 682030</span>
              </li>
            </ul>
          </div>

          {/* Patient Support & Accreditation */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-4">
              Patient Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => openModal("emergency")}
                  className="hover:text-red-700 flex items-center space-x-1.5 transition text-left"
                >
                  <PhoneCall className="w-3 h-3 text-red-600" />
                  <span>24x7 Casualty: +91 484 240 2044</span>
                </button>
              </li>
              <li>
                <span>Ambulance: +91 484 240 0000</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openModal("patient-help")}
                  className="hover:text-burgundy-700 block transition mt-2 text-left"
                >
                  Cashless TPAs
                </button>
              </li>
              <li>
                <span className="block text-stone-500">NABH Accreditation</span>
              </li>
              <li>
                <span className="block text-stone-500">Ethical Guidelines</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            &copy; 2025 Lisie Hospital Kochi. All rights reserved. A Charitable
            Healing Mission.
          </div>
          <div className="flex items-center space-x-6 text-stone-500">
            <Link href="#" className="hover:text-stone-800">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-stone-800">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-stone-800">
              Patient Rights
            </Link>
            <Link href="#" className="hover:text-stone-800">
              Biomedical Waste Reports
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

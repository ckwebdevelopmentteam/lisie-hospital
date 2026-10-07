"use client";

import React, { useEffect } from "react";
import {
  X,
  Heart,
  PhoneCall,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface SpecialtyModalProps {
  isOpen: boolean;
  specialtyTitle: string;
  onClose: () => void;
  onOpenAppointment: () => void;
}

export default function SpecialtyModal({
  isOpen,
  specialtyTitle,
  onClose,
  onOpenAppointment,
}: SpecialtyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isCardiac =
    specialtyTitle.toLowerCase().includes("heart") ||
    specialtyTitle.toLowerCase().includes("cardiac");

  const isOncology =
    specialtyTitle.toLowerCase().includes("cancer") ||
    specialtyTitle.toLowerCase().includes("oncology") ||
    specialtyTitle.toLowerCase().includes("truebeam");

  const protocols = isCardiac
    ? [
        {
          title: "Comprehensive Heart Transplantation & Mechanical Circulatory Support",
          desc: "Over 14,000 open heart surgeries and landmark living-donor heart transplant programs led by Dr. Jose Chacko Periappuram.",
        },
        {
          title: "24/7 Primary Angioplasty (PPCI) in Dedicated Hybrid Cath Labs",
          desc: "Round-the-clock emergency door-to-balloon interventional cardiology for acute myocardial infarction.",
        },
        {
          title: "Adult & Paediatric Cardiothoracic Surgery (CTVS)",
          desc: "Minimally invasive cardiac surgeries, valve repair/replacement, and congenital defect corrections.",
        },
        {
          title: "Interventional Valve Therapy (TAVI / TAVR & MitraClip)",
          desc: "Advanced non-surgical catheter-based structural heart valve replacements.",
        },
      ]
    : isOncology
    ? [
        {
          title: "Varian TrueBeam Linear Accelerator (SVC) & Radiosurgery",
          desc: "Sub-millimeter targeting with 4D CT simulator precision for tumors of brain, lung, and prostate.",
        },
        {
          title: "Multidisciplinary Tumor Board & Evidence-Based Protocols",
          desc: "Joint clinical evaluation by surgical, medical, and radiation oncologists for optimal patient outcomes.",
        },
        {
          title: "Bone Marrow, Stem Cell Transplant & Cellular Therapy",
          desc: "Comprehensive autologous and allogeneic transplants for leukemia, lymphoma, and myeloma.",
        },
        {
          title: "Nuclear Medicine & Molecular Imaging (PET-CT & SPECT)",
          desc: "Ultra-sensitive molecular staging and targeted radio-isotope cancer therapies.",
        },
      ]
    : [
        {
          title: "Living & Deceased Donor Renal Transplantation",
          desc: "High volume kidney transplant center with pioneering laparoscopic donor nephrectomy and pediatric transplants.",
        },
        {
          title: "Comprehensive Hepato-Pancreato-Biliary & Liver Surgery",
          desc: "Advanced surgical gastroenterology, living donor liver transplantation, and acute liver failure management.",
        },
        {
          title: "24/7 Level-1 Intensive Trauma & Critical Care Unit",
          desc: "Multi-disciplinary emergency resuscitation team available around the clock.",
        },
        {
          title: "NABH & NABL Accredited Ethical Clinical Quality",
          desc: "Strict adherence to international patient safety protocols and clinical audit benchmarks.",
        },
      ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with brand navy / red accent */}
        <div className="bg-gradient-to-r from-[#123B63] to-[#1677B8] p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Lisie Hospital Center of Excellence</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
            {specialtyTitle}
          </h2>
          <p className="text-white/85 text-xs sm:text-sm mt-1">
            Lisie Hospital • Care with Love Since 1956 • Kochi, Kerala
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Advanced Clinical Protocols & Capabilities
            </h3>
            <div className="space-y-2.5">
              {protocols.map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-blue-50/40 border border-blue-100 flex items-start space-x-3"
                >
                  <CheckCircle className="w-4 h-4 text-[#1677B8] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-gray-600 mt-0.5 block leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 24/7 Support Hotline */}
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-900 block">
                  24/7 Emergency & Ambulance Helpline
                </span>
                <span className="text-[11px] text-red-700 font-medium">
                  Direct Line: +91 9895 756 164
                </span>
              </div>
            </div>
            <a
              href="tel:+919895756164"
              className="px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs shrink-0"
            >
              Call 24/7
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs font-semibold"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAppointment();
            }}
            className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-full bg-[#1677B8] hover:bg-[#125F94] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Consult Specialist</span>
          </button>
        </div>
      </div>
    </div>
  );
}

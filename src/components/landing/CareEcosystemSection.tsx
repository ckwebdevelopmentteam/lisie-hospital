"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Siren,
  HeartPulse,
  Brain,
  CreditCard,
  Smartphone,
  PlaneTakeoff,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function CareEcosystemSection() {
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: "emergency",
      title: "24/7 Level-1 Emergency & Trauma",
      description:
        "Rapid response triage, dedicated cardiac arrest teams, critical care resuscitation bays, and round-the-clock neuro-trauma surgical readiness.",
      icon: Siren,
      action: () => openModal("emergency"),
      actionLabel: "Emergency Hotline",
    },
    {
      id: "cardio",
      title: "Lisie Heart Institute",
      description:
        "South India's premier cardiac unit specializing in minimally invasive bypass surgery, robotic valve repair, and advanced heart failure therapies.",
      icon: HeartPulse,
      action: () => openModal("doctor-search"),
      actionLabel: "Cardiac Specialists",
    },
    {
      id: "neuro",
      title: "Advanced Neurosciences & Stroke",
      description:
        "Comprehensive stroke thrombectomy within the golden hour, microsurgical brain tumor excision, and cutting-edge spine navigation systems.",
      icon: Brain,
      action: () => openModal("doctor-search"),
      actionLabel: "Neuro Specialists",
    },
    {
      id: "insurance",
      title: "Cashless Insurance & TPA (45+)",
      description:
        "Dedicated helpdesk partnering with major insurance providers and government schemes to make approvals fast, transparent, and seamless.",
      icon: CreditCard,
      action: () => openModal("patient-help"),
      actionLabel: "Insurance Desk",
    },
    {
      id: "digital",
      title: "Digital Health & Teleconsultation",
      description:
        "Access certified lab reports on WhatsApp, consult senior clinicians remotely from anywhere, and schedule follow-ups effortlessly.",
      icon: Smartphone,
      action: () => openModal("appointment"),
      actionLabel: "Online Consult",
    },
    {
      id: "international",
      title: "International Patient Care",
      description:
        "End-to-end concierge services for global patients, including airport transfers, multi-lingual translators, and customized guest accommodations.",
      icon: PlaneTakeoff,
      action: () => openModal("patient-help"),
      actionLabel: "Global Desk",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden px-4 py-8 text-white sm:px-8 sm:py-12 lg:h-[90vh] lg:min-h-[580px] lg:px-12 lg:py-12"
      id="services"
    >
      <div id="specialties" className="absolute -top-12 left-0" />

      {/* Background Image: Desktop landscape + Mobile portrait */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Mobile portrait background with dark blur overlay for crystal clear contrast */}
        <div className="block sm:hidden relative w-full h-full">
          <Image
            src="/images/lisie-mobile-bg.jpg"
            alt="Lisie Hospital campus mobile"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Mobile dark backdrop blur overlay */}
          <div className="absolute inset-0 bg-[#081e37]/75 backdrop-blur-[5px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081e37]/90 via-[#081e37]/65 to-[#081e37]/95" />
        </div>

        {/* Desktop landscape background (preserved exactly) */}
        <div className="hidden sm:block relative w-full h-full">
          <Image
            src="/images/lisiehospitalbg2.png"
            alt="Lisie Hospital campus"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#081e37]/65 via-[#081e37]/38 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 mr-auto flex h-full w-full max-w-[960px] flex-col">
        <div className="grid grid-cols-1 border-t border-white/35 font-sans sm:grid-cols-2 lg:grid-cols-2">
          <div
            className="border-b border-white/35 py-3.5 sm:py-6 text-shadow-hero sm:px-6 lg:min-h-0 lg:border-r lg:px-0"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 600ms cubic-bezier(0.25, 1, 0.5, 1), transform 600ms cubic-bezier(0.25, 1, 0.5, 1)",
              transitionDelay: isVisible ? "0ms" : "0ms",
            }}
          >
            <div className="mb-2 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-12 sm:w-20 bg-[#d11f53]" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-white">
                Holistic Healthcare
              </span>
            </div>
            <h2 className="max-w-sm font-serif text-xl sm:text-3xl leading-tight tracking-tight">
              <span className="text-white">Comprehensive Medical </span>
              <span className="font-bold">Ecosystem</span>
            </h2>
          </div>

          {services.slice(0, 5).map((service, index) => {
            const Icon = service.icon;
            return (
              <button
                type="button"
                key={service.id}
                onClick={service.action}
                className="group border-b border-white/35 py-3 sm:py-6 text-left transition-colors duration-200 hover:bg-white/10 sm:px-6 lg:min-h-0 lg:px-6 lg:py-6 lg:[&:nth-child(odd)]:border-r"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 600ms cubic-bezier(0.25, 1, 0.5, 1), transform 600ms cubic-bezier(0.25, 1, 0.5, 1)",
                  transitionDelay: isVisible ? `${(index + 1) * 150}ms` : "0ms",
                }}
              >
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="mt-0.5 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 transition-transform duration-200 group-hover:scale-110">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold leading-snug text-white sm:text-lg sm:font-medium">
                      {service.title}
                    </h3>
                    <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm leading-relaxed text-white/90 line-clamp-2 sm:line-clamp-none">
                      {service.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100">
                      {service.actionLabel}
                      <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      <div
        className="mt-6 mb-2 sm:mt-0 sm:absolute sm:inset-x-0 sm:bottom-12 z-10 text-center font-sans"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 600ms cubic-bezier(0.25, 1, 0.5, 1), transform 600ms cubic-bezier(0.25, 1, 0.5, 1)",
          transitionDelay: isVisible ? "900ms" : "0ms",
        }}
      >
        <button
          type="button"
          onClick={() => openModal("doctor-search")}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-burgundy-900 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-stone-100 active:scale-95"
        >
          <span className="text-black">Consult Our Senior Specialists</span>
          <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black text-white">
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
        </button>
      </div>
    </section>
  );
}

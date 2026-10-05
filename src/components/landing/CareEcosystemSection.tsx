"use client";

import React from "react";
import Image from "next/image";
import { Siren, HeartPulse, Brain, CreditCard, Smartphone, PlaneTakeoff } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function CareEcosystemSection() {
  const { openModal } = useModal();

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
      className="relative py-24 px-4 sm:px-8 bg-burgundy-900 text-white overflow-hidden"
      id="services"
    >
      <div id="specialties" className="absolute -top-12 left-0" />

      {/* Subtle background image tint */}
      <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none">
        <Image
          src="/images/stitch/lisie-campus-kaloor.jpg"
          alt="Lisie Hospital Architecture"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 frosted-glass text-burgundy-100 text-xs font-semibold uppercase tracking-wider mb-3 font-sans">
            Holistic Healthcare
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">
            Comprehensive Medical Ecosystem
          </h2>
          <p className="text-burgundy-100/80 text-sm mt-3 font-sans leading-relaxed">
            From preventative screenings to complex heart transplants,
            experience coordinated patient journeys backed by compassionate
            experts.
          </p>
        </div>

        {/* 6-Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={service.action}
                className="group bg-white/10 frosted-glass p-8 rounded-3xl border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-burgundy-200 mb-5 group-hover:scale-110 group-hover:bg-burgundy-700 transition-all duration-200">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-burgundy-100/80 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-burgundy-200 group-hover:text-white transition-colors">
                  <span>{service.actionLabel}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Consultation CTA */}
        <div className="mt-14 text-center font-sans">
          <button
            type="button"
            onClick={() => openModal("doctor-search")}
            className="inline-flex items-center space-x-2 bg-white text-burgundy-900 hover:bg-burgundy-50 text-sm font-semibold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 duration-200 active:scale-95"
          >
            <span>Consult Our Senior Specialists</span>
            <span className="font-bold">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}

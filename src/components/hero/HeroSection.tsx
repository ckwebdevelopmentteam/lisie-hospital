"use client";

import React, { useState } from "react";
import HeroSlider from "./HeroSlider";
import OverlappingCards from "./OverlappingCards";
import QuickFeaturesBar from "./QuickFeaturesBar";
import DepartmentExplorer from "./DepartmentExplorer";
import SpecialtyModal from "./SpecialtyModal";
import { useModal } from "@/context/ModalContext";
import {
  LISIE_HERO_SLIDES,
  LISIE_INSTITUTES,
} from "./heroData";

export default function HeroSection() {
  const { openModal } = useModal();
  const [specialtyModalTitle, setSpecialtyModalTitle] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-white font-sans overflow-hidden">
      {/* 1. Hero Slider Banner with Surgery OT background, Headline & Floating Pill */}
      <HeroSlider
        slides={LISIE_HERO_SLIDES}
        onOpenSpecialtyModal={(badgeText) => setSpecialtyModalTitle(badgeText)}
      />

      {/* 2. The 3 Overlapping Campus / Center Cards bridging into the white section */}
      <OverlappingCards
        campuses={LISIE_INSTITUTES}
      />

      {/* 3. Quick Features & Hospital Statistics Row */}
      <QuickFeaturesBar
        onOpenAppointment={() => openModal("appointment")}
        onOpenDoctorSearch={() => openModal("doctor-search")}
        onOpenOPTimings={() => openModal("op-timings")}
        onOpenEmergency={() => openModal("emergency")}
      />

      <DepartmentExplorer />

      {specialtyModalTitle && (
        <SpecialtyModal
          isOpen={!!specialtyModalTitle}
          specialtyTitle={specialtyModalTitle}
          onClose={() => setSpecialtyModalTitle(null)}
          onOpenAppointment={() => openModal("appointment")}
        />
      )}
    </section>
  );
}

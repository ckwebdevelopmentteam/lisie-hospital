"use client";

import React, { useState } from "react";
import HeroSlider from "./HeroSlider";
import OverlappingCards from "./OverlappingCards";
import QuickFeaturesBar from "./QuickFeaturesBar";
import CampusModal from "./CampusModal";
import SpecialtyModal from "./SpecialtyModal";
import AppointmentModal from "../header/modals/AppointmentModal";
import DoctorSearchModal from "../header/modals/DoctorSearchModal";
import EmergencyPanel from "../header/modals/EmergencyPanel";
import OPTimingsModal from "../header/modals/OPTimingsModal";
import {
  LISIE_HERO_SLIDES,
  LISIE_INSTITUTES,
  CampusCard,
} from "./heroData";

export default function HeroSection() {
  const [selectedCampus, setSelectedCampus] = useState<CampusCard | null>(null);
  const [specialtyModalTitle, setSpecialtyModalTitle] = useState<string | null>(null);

  // Modals
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isDoctorSearchOpen, setIsDoctorSearchOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isOPTimingsOpen, setIsOPTimingsOpen] = useState(false);

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
        onSelectCampus={(campus) => setSelectedCampus(campus)}
      />

      {/* 3. Quick Features & Hospital Statistics Row */}
      <QuickFeaturesBar
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenDoctorSearch={() => setIsDoctorSearchOpen(true)}
        onOpenOPTimings={() => setIsOPTimingsOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Interactive Modals */}
      {selectedCampus && (
        <CampusModal
          campus={selectedCampus}
          onClose={() => setSelectedCampus(null)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />
      )}

      {specialtyModalTitle && (
        <SpecialtyModal
          isOpen={!!specialtyModalTitle}
          specialtyTitle={specialtyModalTitle}
          onClose={() => setSpecialtyModalTitle(null)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />
      )}

      {/* Reusable Header Modals */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        onFindDoctorClick={() => {
          setIsAppointmentOpen(false);
          setIsDoctorSearchOpen(true);
        }}
      />

      <DoctorSearchModal
        isOpen={isDoctorSearchOpen}
        onClose={() => setIsDoctorSearchOpen(false)}
        onSelectDoctor={() => {
          setIsDoctorSearchOpen(false);
          setIsAppointmentOpen(true);
        }}
      />

      <EmergencyPanel
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <OPTimingsModal
        isOpen={isOPTimingsOpen}
        onClose={() => setIsOPTimingsOpen(false)}
        onBookAppointment={() => {
          setIsOPTimingsOpen(false);
          setIsAppointmentOpen(true);
        }}
      />
    </section>
  );
}

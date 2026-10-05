"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import DoctorSearchModal from "@/components/header/modals/DoctorSearchModal";
import AppointmentModal from "@/components/header/modals/AppointmentModal";
import EmergencyPanel from "@/components/header/modals/EmergencyPanel";
import SearchOverlay from "@/components/header/modals/SearchOverlay";
import OPTimingsModal from "@/components/header/modals/OPTimingsModal";
import PatientHelpModal from "@/components/header/modals/PatientHelpModal";
import { ActiveModal } from "@/components/header/types";

interface ModalContextType {
  activeModal: ActiveModal;
  openModal: (modal: ActiveModal) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const openModal = useCallback((modal: ActiveModal) => {
    setActiveModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}

      {/* Global Hospital Modals */}
      <DoctorSearchModal
        isOpen={activeModal === "doctor-search"}
        onClose={closeModal}
        onSelectDoctor={() => {
          setActiveModal("appointment");
        }}
      />

      <AppointmentModal
        isOpen={activeModal === "appointment"}
        onClose={closeModal}
        onFindDoctorClick={() => {
          setActiveModal("doctor-search");
        }}
      />

      <EmergencyPanel
        isOpen={activeModal === "emergency"}
        onClose={closeModal}
      />

      <SearchOverlay
        isOpen={activeModal === "search"}
        onClose={closeModal}
        onOpenDoctorModal={() => setActiveModal("doctor-search")}
        onOpenAppointmentModal={() => setActiveModal("appointment")}
        onOpenEmergencyModal={() => setActiveModal("emergency")}
        onOpenOPTimingsModal={() => setActiveModal("op-timings")}
      />

      <OPTimingsModal
        isOpen={activeModal === "op-timings"}
        onClose={closeModal}
        onBookAppointment={() => setActiveModal("appointment")}
      />

      <PatientHelpModal
        isOpen={activeModal === "patient-help"}
        onClose={closeModal}
        onEmergencyClick={() => setActiveModal("emergency")}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

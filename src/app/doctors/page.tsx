import React, { Suspense } from "react";
import DoctorsDirectoryContent from "@/components/doctor/DoctorsDirectoryContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors Directory & Specialists | Lisie Hospital Kochi",
  description:
    "Find and consult with top doctors, surgeons, and healthcare specialists across Cardiology, Neurology, Orthopaedics, Gynaecology, Paediatrics, Oncology, and ENT at Lisie Hospital, Kochi.",
};

export default function DoctorsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[60vh] flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#123B63] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-gray-600">
              Loading Doctors Directory...
            </p>
          </div>
        </div>
      }
    >
      <DoctorsDirectoryContent />
    </Suspense>
  );
}

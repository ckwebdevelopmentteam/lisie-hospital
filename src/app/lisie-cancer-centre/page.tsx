import React from "react";
import CampusDetailView from "@/components/campus/CampusDetailView";

export const metadata = {
  title: "Lisie Cancer Centre (LCC) | Oncology Care",
  description: "Advanced Comprehensive Medical, Surgical & Radiation Oncology at Lisie Hospital, Kochi.",
};

export default function CancerCentrePage() {
  return <CampusDetailView campusId="lisie-cancer-centre" />;
}

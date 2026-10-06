import React from "react";
import CampusDetailView from "@/components/campus/CampusDetailView";

export const metadata = {
  title: "Lisie Main Hospital | Tertiary Care Centre",
  description: "1000+ Bedded NABH & NABL Tertiary Care Centre at Lisie Hospital, Kochi.",
};

export default function MainHospitalPage() {
  return <CampusDetailView campusId="lisie-main-hospital" />;
}

import React from "react";
import { notFound } from "next/navigation";
import { getDoctorBySlug, getAllDoctors } from "@/data/doctorsData";
import DoctorProfileView from "@/components/doctor/DoctorProfileView";
import type { Metadata } from "next";

interface DoctorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const doctors = getAllDoctors();
  return doctors.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: DoctorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    return {
      title: "Doctor Not Found | Lisie Hospital",
    };
  }

  return {
    title: `${doctor.name} - ${doctor.designation} | Lisie Hospital Kochi`,
    description: `${doctor.name}, ${doctor.designation} in ${doctor.specialty} at Lisie Hospital, Kochi. ${doctor.qualifications}. Book OPD appointments and consultations online.`,
  };
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    notFound();
  }

  return <DoctorProfileView doctor={doctor} />;
}

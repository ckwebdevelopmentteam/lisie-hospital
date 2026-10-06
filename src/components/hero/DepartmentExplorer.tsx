"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Brain,
  Bone,
  Activity,
  ShieldAlert,
  Pill,
  Microscope,
  Baby,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUpRight,
  Search,
  X,
  Calendar,
  Sparkles,
  Users,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import NotchedProjectCard from "@/components/ui/NotchedProjectCard";

// ==========================================
// 1. DATA: FLAGSHIP CENTERS OF EXCELLENCE (CAROUSEL)
// ==========================================
interface CenterOfExcellence {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
  stats: { label: string; value: string }[];
  procedures: string[];
  icon: React.ElementType;
}

const FLAGSHIP_CENTERS: CenterOfExcellence[] = [
  {
    id: "heart-institute",
    name: "Lisie Heart Institute",
    badge: "Flagship Cardiac Center",
    tagline: "South India's Pioneer in Adult & Paediatric Cardiac Care",
    description:
      "Renowned for breakthrough open heart surgeries, heart transplantation, and 24/7 primary angioplasty backed by advanced electrophysiology and dedicated cardiac ICUs.",
    image: "/images/hero/card-heart-institute.jpg",
    href: "/institutes/heart-institute",
    stats: [
      { value: "25,000+", label: "Heart Surgeries" },
      { value: "24/7", label: "Primary Cath Lab" },
      { value: "State 1st", label: "Heart Transplant" },
    ],
    procedures: [
      "Heart Transplantation",
      "Coronary Artery Bypass (CABG)",
      "TAVR & Valve Replacements",
      "Complex Angioplasty & Stenting",
      "Paediatric Cardiac Surgery",
      "Pacemaker & ICD Implantation",
    ],
    icon: Heart,
  },
  {
    id: "neurosciences",
    name: "Lisie Institute of Neurosciences & Spine",
    badge: "Advanced Neuro Care",
    tagline: "Comprehensive Brain, Spine & 24/7 Acute Stroke Center",
    description:
      "A multidisciplinary neurological hub offering cutting-edge micro-neurosurgery, endoscopic spine procedures, dedicated stroke care, and round-the-clock neuro-trauma management.",
    image: "/images/hero/hero-slide-3.jpg",
    href: "/institutes/neurosciences",
    stats: [
      { value: "24/7", label: "Stroke Code Team" },
      { value: "20-Bed", label: "Neuro ICU" },
      { value: "Advanced", label: "Brain & Spine Suite" },
    ],
    procedures: [
      "Microvascular Brain Tumor Surgery",
      "Minimally Invasive Spine Surgery (MISS)",
      "Stroke Thrombolysis (24/7)",
      "Endoscopic Skull Base Surgery",
      "Epilepsy & Seizure Clinic",
      "Deep Brain Stimulation (DBS)",
    ],
    icon: Brain,
  },
  {
    id: "bone-joint",
    name: "Center for Bone, Joint Surgery & Robotic Orthopaedics",
    badge: "Robotic Joint Pioneer",
    tagline: "State-of-the-Art Robotic Knee & Hip Replacement",
    description:
      "Empowering patients to regain pain-free mobility through high-precision robotic joint replacements, sports injury arthroscopy, and complex fracture trauma care.",
    image: "/images/hero/card-kochi.jpg",
    href: "/institutes/bone-joint",
    stats: [
      { value: "Fully Robotic", label: "Joint Replacements" },
      { value: "15,000+", label: "Orthopaedic Surgeries" },
      { value: "Rapid", label: "Recovery Protocols" },
    ],
    procedures: [
      "Robotic Total Knee Replacement",
      "Total Hip Arthroplasty",
      "Arthroscopic ACL & Meniscus Repair",
      "Sports Injury Rehabilitation",
      "Pelvic & Complex Trauma Care",
      "Paediatric Orthopaedic Care",
    ],
    icon: Bone,
  },
  {
    id: "cancer-centre",
    name: "Lisie Comprehensive Cancer Care (Oncology)",
    badge: "Multidisciplinary Oncology",
    tagline: "Evidence-Based Cancer Treatment with Compassion & Hope",
    description:
      "Offering personalized treatment plans guided by a multidisciplinary tumor board, combining surgical oncology, systemic chemotherapy, immunotherapy, and pain management.",
    image: "/images/hero/card-cancer-centre.jpg",
    href: "/institutes/oncology",
    stats: [
      { value: "Tumor Board", label: "Multidisciplinary Review" },
      { value: "Daycare", label: "Chemotherapy Suite" },
      { value: "Targeted", label: "Immunotherapy" },
    ],
    procedures: [
      "Surgical Oncology & Tumor Resection",
      "Systemic Chemotherapy Protocols",
      "Targeted Immunotherapy & Biologicals",
      "Oncoplastic & Reconstructive Surgery",
      "Comprehensive Cancer Screening",
      "Palliative Care & Pain Management",
    ],
    icon: Activity,
  },
  {
    id: "kidney-transplant",
    name: "Renal Sciences & Kidney Transplantation Center",
    badge: "Renowned Kidney Care",
    tagline: "Pioneering Living-Donor & Deceased Renal Transplants",
    description:
      "A premier kidney care institution providing holistic nephrology, living and cadaveric transplants, laser urology stone surgeries, and a 60-bed round-the-clock dialysis center.",
    image: "/images/hero/card-main-hospital.jpg",
    href: "/institutes/kidney-transplant",
    stats: [
      { value: "1,000+", label: "Kidney Transplants" },
      { value: "60-Bed", label: "24/7 Hemodialysis Unit" },
      { value: "Advanced", label: "Laser Urology Center" },
    ],
    procedures: [
      "Living & Cadaveric Kidney Transplant",
      "Laser Kidney Stone Surgery (RIRS / PCNL)",
      "Holmium Laser Enucleation (HoLEP)",
      "Automated Hemodialysis & CRRT",
      "Glomerular & Autoimmune Kidney Care",
      "Paediatric Nephrology Services",
    ],
    icon: Microscope,
  },
  {
    id: "emergency-care",
    name: "Critical Care, Emergency & Level-1 Trauma",
    badge: "24/7 Lifesaving Care",
    tagline: "Round-the-Clock Emergency Resuscitation & Mobile ICU",
    description:
      "Immediate golden-hour medical intervention for acute heart attacks, strokes, polytrauma, and critical illness backed by dedicated emergency physicians and 100+ ICU beds.",
    image: "/images/hero/hero-slide-1.jpg",
    href: "/institutes/emergency-critical-care",
    stats: [
      { value: "24/7", label: "Emergency Hotline" },
      { value: "Level-1", label: "Trauma Care Protocols" },
      { value: "100+", label: "Advanced ICU Beds" },
    ],
    procedures: [
      "Golden Hour Polytrauma Management",
      "Acute STEMI & Cath Lab Activation",
      "Advanced Mechanical Ventilation & ECMO",
      "24/7 Mobile ICU Ambulance Service",
      "Continuous Renal Replacement (CRRT)",
      "Toxicology & Poison Emergency Care",
    ],
    icon: ShieldAlert,
  },
];

// ==========================================
// 2. DATA: ALL 33+ CLINICAL DEPARTMENTS DIRECTORY
// ==========================================
export type DepartmentCategory =
  | "all"
  | "clinical"
  | "surgical"
  | "centers"
  | "diagnostics";

interface DirectoryDepartment {
  name: string;
  category: "clinical" | "surgical" | "centers" | "diagnostics";
  categoryLabel: string;
  description: string;
  href: string;
  image: string;
  icon: React.ElementType;
  procedures: string[];
}

const ALL_DEPARTMENTS_DATA: DirectoryDepartment[] = [
  // Clinical Specialties (12)
  {
    name: "Cardiology",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Comprehensive interventional and preventive cardiac wellness and diagnosis.",
    href: "/departments/cardiology",
    image: "/images/hero/card-heart-institute.jpg",
    icon: Heart,
    procedures: ["Coronary Angiography", "Angioplasty & Stenting", "2D Echo & TMT", "Pacemaker Implantation"],
  },
  {
    name: "General Medicine",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Internal medicine, adult lifestyle disorders, infectious diseases, and wellness.",
    href: "/departments/general-medicine",
    image: "/images/hero/hero-slide-2.jpg",
    icon: Stethoscope,
    procedures: ["Diabetes Care", "Hypertension Management", "Infectious Disease Control", "Executive Health Checks"],
  },
  {
    name: "Paediatrics & Neonatology",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Dedicated child care, Level-III NICU/PICU, and holistic development clinics.",
    href: "/departments/paediatrics",
    image: "/images/stitch/campus-palarivattom.jpg",
    icon: Baby,
    procedures: ["Neonatal Intensive Care", "Childhood Immunization", "Developmental Paediatrics", "Paediatric Asthma"],
  },
  {
    name: "Dermatology & Cosmetology",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Clinical skin therapies, hair disorder treatments, and aesthetic cosmetology.",
    href: "/departments/dermatology",
    image: "/images/hero/card-kochi.jpg",
    icon: Sparkles,
    procedures: ["Skin Allergy Testing", "Laser Skin Therapy", "Acne & Scar Treatments", "Phototherapy"],
  },
  {
    name: "ENT (Otorhinolaryngology)",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Medical ear, nose, throat, audiology, balance, and voice disorder clinics.",
    href: "/departments/ent",
    image: "/images/stitch/campus-kakkanad.jpg",
    icon: Stethoscope,
    procedures: ["Audiometry & Hearing Aids", "Endoscopic Sinus Screening", "Vertigo & Balance Clinic", "Snoring Evaluation"],
  },
  {
    name: "Obstetrics & Gynaecology",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Women's healthcare, high-risk maternity, painless childbirth, and fertility.",
    href: "/departments/gynaecology",
    image: "/images/hero/hero-slide-1.jpg",
    icon: Baby,
    procedures: ["Painless Normal Delivery", "High-Risk Pregnancy Unit", "Laparoscopic Hysterectomy", "Infertility Care"],
  },
  {
    name: "Endocrinology & Diabetology",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Advanced diabetes care, thyroid disorders, and hormonal metabolic treatments.",
    href: "/departments/endocrinology",
    image: "/images/hero/card-edappal.jpg",
    icon: Activity,
    procedures: ["Type 1 & 2 Diabetes Care", "Thyroid Nodule Assessment", "Obesity & Weight Program", "Pituitary Disorders"],
  },
  {
    name: "Nephrology",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Kidney disease management, hemodialysis, and pre/post-transplant care.",
    href: "/departments/nephrology",
    image: "/images/hero/card-main-hospital.jpg",
    icon: Microscope,
    procedures: ["Hemodialysis (24/7)", "Peritoneal Dialysis", "Glomerular Disease Care", "Kidney Biopsy"],
  },
  {
    name: "Pulmonology & Chest Medicine",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Respiratory health, asthma, COPD, sleep apnea, and allergy therapies.",
    href: "/departments/pulmonology",
    image: "/images/stitch/campus-kaloor.jpg",
    icon: Activity,
    procedures: ["Diagnostic Bronchoscopy", "Sleep Apnea Polysomnography", "Pulmonary Function Tests (PFT)", "Allergy Testing"],
  },
  {
    name: "Psychiatry & Behavioural Health",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Holistic mental wellbeing, psychotherapies, de-addiction, and family counselling.",
    href: "/departments/psychiatry",
    image: "/images/hero/card-thrissur.jpg",
    icon: Brain,
    procedures: ["Clinical Psychotherapy", "De-Addiction Support", "Stress & Anxiety Relief", "Memory & Dementia Clinic"],
  },
  {
    name: "Medical Oncology",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Chemotherapy, targeted biological therapy, and cancer prevention programs.",
    href: "/departments/oncology",
    image: "/images/hero/card-cancer-centre.jpg",
    icon: Activity,
    procedures: ["Systemic Chemotherapy", "Targeted Immunotherapy", "Daycare Infusion Center", "Cancer Screening"],
  },
  {
    name: "Gastroenterology & Hepatology",
    category: "clinical",
    categoryLabel: "Clinical Specialty",
    description: "Digestive system care, liver disorder management, and diagnostic endoscopy.",
    href: "/departments/gastroenterology",
    image: "/images/hero/card-kochi.jpg",
    icon: Stethoscope,
    procedures: ["Diagnostic Endoscopy", "Colonoscopy & Polypectomy", "ERCP Stone Removal", "Hepatitis & Cirrhosis Clinic"],
  },

  // Surgical Specialties (9)
  {
    name: "General & Laparoscopic Surgery",
    category: "surgical",
    categoryLabel: "Surgical Specialty",
    description: "Minimally invasive keyhole procedures for abdominal, hernia, and acute conditions.",
    href: "/departments/general-surgery",
    image: "/images/hero/hero-slide-1.jpg",
    icon: Activity,
    procedures: ["Laparoscopic Gallbladder Surgery", "Hernia Mesh Repair", "Appendix Removal", "Thyroid & GI Surgery"],
  },
  {
    name: "Neurosurgery & Spine Center",
    category: "surgical",
    categoryLabel: "Surgical Specialty",
    description: "Complex brain tumor surgery, neuro-vascular clipping, and spinal corrections.",
    href: "/departments/neurosurgery",
    image: "/images/hero/hero-slide-3.jpg",
    icon: Brain,
    procedures: ["Brain Tumor Micro-Surgery", "Minimally Invasive Spine Fixation", "Cervical & Lumbar Discectomy", "Aneurysm Clipping"],
  },
  {
    name: "Orthopaedics & Joint Replacement",
    category: "surgical",
    categoryLabel: "Surgical Specialty",
    description: "Robotic knee and hip arthroplasty, sports arthroscopy, and trauma surgery.",
    href: "/departments/orthopaedics",
    image: "/images/hero/card-kochi.jpg",
    icon: Bone,
    procedures: ["Robotic Knee Replacement", "Total Hip Arthroplasty", "Arthroscopic ACL Repair", "Rotator Cuff Reconstruction"],
  },
  {
    name: "Urology & Renal Transplantation",
    category: "surgical",
    categoryLabel: "Surgical Specialty",
    description: "Laser kidney stone removal, prostate endoscopic surgeries, and transplantations.",
    href: "/departments/urology",
    image: "/images/hero/card-main-hospital.jpg",
    icon: Microscope,
    procedures: ["RIRS Laser Stone Surgery", "HoLEP & TURP for Prostate", "Renal Transplantation Surgery", "Reconstructive Urology"],
  },
  {
    name: "Cardiothoracic & Vascular (CTVS)",
    category: "surgical",
    categoryLabel: "Surgical Specialty",
    description: "Open heart surgeries, arterial bypass grafts, valve repairs, and vascular fixes.",
    href: "/departments/cardiothoracic-surgery",
    image: "/images/hero/card-heart-institute.jpg",
    icon: Heart,
    procedures: ["CABG Coronary Bypass", "Valve Repair & Replacement", "Aortic Aneurysm Repair", "Peripheral Vascular Surgery"],
  },
  {
    name: "ENT & Head-Neck Surgery",
    category: "surgical",
    categoryLabel: "Surgical Specialty",
    description: "Micro-ear procedures, endoscopic sinus surgeries, and head-neck oncologic care.",
    href: "/departments/ent-surgery",
    image: "/images/stitch/campus-kakkanad.jpg",
    icon: Stethoscope,
    procedures: ["Endoscopic FESS Sinus Surgery", "Tympanoplasty & Mastoid Surgery", "Head & Neck Cancer Surgery", "Microlaryngeal Surgery"],
  },
  {
    name: "Surgical Gastroenterology",
    category: "surgical",
    categoryLabel: "Surgical Specialty",
    description: "Complex hepatobiliary surgery, GI oncology, and pancreatic resections.",
    href: "/departments/surgical-gastroenterology",
    image: "/images/hero/hero-slide-2.jpg",
    icon: Activity,
    procedures: ["Whipple's Pancreatic Surgery", "Hepatectomy (Liver Resection)", "Colorectal Cancer Surgery", "Biliary Repair"],
  },
  {
    name: "Plastic & Reconstructive Surgery",
    category: "surgical",
    categoryLabel: "Surgical Specialty",
    description: "Trauma reconstruction, burns management, cosmetic surgeries, and micro-vascular flap.",
    href: "/departments/plastic-surgery",
    image: "/images/hero/card-edappal.jpg",
    icon: Sparkles,
    procedures: ["Microvascular Free Tissue Transfer", "Burn Reconstruction", "Hand & Tendon Surgery", "Cosmetic Surgery"],
  },
  {
    name: "Paediatric Surgery",
    category: "surgical",
    categoryLabel: "Surgical Specialty",
    description: "Surgical corrections for neonates, congenital anomalies, and pediatric emergencies.",
    href: "/departments/paediatric-surgery",
    image: "/images/stitch/campus-palarivattom.jpg",
    icon: Baby,
    procedures: ["Neonatal Emergency Surgeries", "Congenital Anomaly Corrections", "Paediatric Laparoscopy", "Hypospadias Repair"],
  },

  // Centers of Excellence (6)
  {
    name: "Lisie Heart Institute",
    category: "centers",
    categoryLabel: "Centre of Excellence",
    description: "Premier cardiology and cardiothoracic hospital center with adult and pediatric programs.",
    href: "/institutes/heart-institute",
    image: "/images/hero/card-heart-institute.jpg",
    icon: Heart,
    procedures: ["Heart Transplantation", "Primary Angioplasty (24/7)", "Minimally Invasive Heart Surgery", "TAVR"],
  },
  {
    name: "Lisie Institute of Neurosciences",
    category: "centers",
    categoryLabel: "Centre of Excellence",
    description: "Comprehensive stroke unit, neuro-intensive care, and advanced spine institute.",
    href: "/institutes/neurosciences",
    image: "/images/hero/hero-slide-3.jpg",
    icon: Brain,
    procedures: ["Acute Stroke Thrombolysis", "Brain Tumor Center", "Endoscopic Spine Program", "Epilepsy Surgery"],
  },
  {
    name: "Comprehensive Cancer Care (Oncology)",
    category: "centers",
    categoryLabel: "Centre of Excellence",
    description: "Multidisciplinary tumor board, surgical and medical oncology under one roof.",
    href: "/institutes/oncology",
    image: "/images/hero/card-cancer-centre.jpg",
    icon: Activity,
    procedures: ["Multidisciplinary Tumor Board", "Targeted Immunotherapy", "Organ-Preserving Cancer Surgery", "Palliative Care"],
  },
  {
    name: "Critical Care & Emergency Medicine",
    category: "centers",
    categoryLabel: "Centre of Excellence",
    description: "Level-1 emergency, round-the-clock intensive trauma care, and resuscitation.",
    href: "/institutes/emergency-critical-care",
    image: "/images/hero/hero-slide-1.jpg",
    icon: ShieldAlert,
    procedures: ["Golden Hour Trauma Resuscitation", "Acute STEMI Intervention", "Advanced ECMO Support", "Mobile ICU Ambulance"],
  },
  {
    name: "Kidney Transplantation Center",
    category: "centers",
    categoryLabel: "Centre of Excellence",
    description: "Renowned living-donor and cadaveric renal transplant unit with dedicated ICU.",
    href: "/institutes/kidney-transplant",
    image: "/images/hero/card-main-hospital.jpg",
    icon: Microscope,
    procedures: ["Cadaver & Live Donor Transplants", "ABO-Incompatible Kidney Transplant", "Laser Stone Surgery", "Hemodialysis (60 Beds)"],
  },
  {
    name: "Center for Bone & Joint Surgery",
    category: "centers",
    categoryLabel: "Centre of Excellence",
    description: "Robotic knee replacement, hip arthroplasty, and sports medicine center.",
    href: "/institutes/bone-joint",
    image: "/images/hero/card-kochi.jpg",
    icon: Bone,
    procedures: ["Robotic Knee Replacement", "Total Hip Arthroplasty", "Sports Ligament Reconstruction", "Pediatric Orthopaedics"],
  },

  // Diagnostics & Support (6)
  {
    name: "Radiology & Imaging",
    category: "diagnostics",
    categoryLabel: "Diagnostic Service",
    description: "High-precision 3T MRI, 128-Slice Dual CT scan, 4D Doppler, and digital mammography.",
    href: "/services/radiology",
    image: "/images/stitch/campus-kaloor.jpg",
    icon: Microscope,
    procedures: ["3T MRI Diagnostics", "128-Slice Cardiac CT", "4D Color Ultrasound", "Digital Mammography"],
  },
  {
    name: "NABL Clinical Laboratory",
    category: "diagnostics",
    categoryLabel: "Diagnostic Service",
    description: "Accredited automated pathology, microbiology, clinical biochemistry, and molecular testing.",
    href: "/services/laboratory",
    image: "/images/hero/card-main-hospital.jpg",
    icon: Microscope,
    procedures: ["Clinical Biochemistry", "Automated Hematology", "Microbiology & Cultures", "Histopathology Biopsies"],
  },
  {
    name: "24/7 In-House Pharmacy",
    category: "diagnostics",
    categoryLabel: "Support Service",
    description: "Round-the-clock dispensing of 100% genuine medications, vaccines, and surgical supplies.",
    href: "/services/pharmacy",
    image: "/images/hero/card-edappal.jpg",
    icon: Pill,
    procedures: ["Prescription Medication Dispensing", "Cold-Chain Vaccine Storage", "Inpatient Ward Supply", "Emergency Drug Stock"],
  },
  {
    name: "Physiotherapy & Physical Rehabilitation",
    category: "diagnostics",
    categoryLabel: "Support Service",
    description: "Advanced post-surgical mobility recovery, sports injury rehab, and stroke therapy.",
    href: "/services/physiotherapy",
    image: "/images/stitch/campus-kakkanad.jpg",
    icon: Activity,
    procedures: ["Post-Joint Replacement Rehab", "Neuro & Stroke Rehabilitation", "Cardiopulmonary Exercise Therapy", "Sports Recovery"],
  },
  {
    name: "Clinical Dietetics & Nutrition Therapy",
    category: "diagnostics",
    categoryLabel: "Support Service",
    description: "Therapeutic dietary planning for cardiac, diabetic, renal, and post-operative patients.",
    href: "/services/dietetics",
    image: "/images/hero/hero-slide-2.jpg",
    icon: Activity,
    procedures: ["Diabetic Diet Planning", "Cardiac Therapeutic Nutrition", "Renal Care Meal Programs", "Weight Management"],
  },
  {
    name: "Licensed Blood Center & Transfusion",
    category: "diagnostics",
    categoryLabel: "Support Service",
    description: "24/7 automated blood component separation, safe donor units, and cross-matching.",
    href: "/services/blood-bank",
    image: "/images/stitch/campus-palarivattom.jpg",
    icon: Activity,
    procedures: ["Blood Component Separation", "Single Donor Platelet (SDP)", "NAT Screening for Safety", "24/7 Emergency Crossmatching"],
  },
];

export default function DepartmentExplorer() {
  const { openModal } = useModal();

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = FLAGSHIP_CENTERS.length;

  // Auto-play carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slideCount]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);

  // Directory filter & search state
  const [activeTab, setActiveTab] = useState<DepartmentCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const directoryRef = useRef<HTMLDivElement>(null);

  // Filtered departments
  const filteredDepartments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ALL_DEPARTMENTS_DATA.filter((dept) => {
      const matchesCategory =
        activeTab === "all" || dept.category === activeTab;

      if (!matchesCategory) return false;

      if (!query) return true;

      const nameMatch = dept.name.toLowerCase().includes(query);
      const descMatch = dept.description.toLowerCase().includes(query);
      const procedureMatch = dept.procedures.some((proc) =>
        proc.toLowerCase().includes(query)
      );

      return nameMatch || descMatch || procedureMatch;
    });
  }, [activeTab, searchQuery]);

  const isFiltering = searchQuery.trim().length > 0;
  const displayedDepartments =
    showAllDepartments || isFiltering
      ? filteredDepartments
      : filteredDepartments.slice(0, 6);

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: ALL_DEPARTMENTS_DATA.length,
      clinical: ALL_DEPARTMENTS_DATA.filter((d) => d.category === "clinical").length,
      surgical: ALL_DEPARTMENTS_DATA.filter((d) => d.category === "surgical").length,
      centers: ALL_DEPARTMENTS_DATA.filter((d) => d.category === "centers").length,
      diagnostics: ALL_DEPARTMENTS_DATA.filter((d) => d.category === "diagnostics").length,
    };
  }, []);

  const currentCenter = FLAGSHIP_CENTERS[currentSlide];
  const IconComponent = currentCenter.icon;

  return (
    <section id="departments" className="w-full bg-[#F8FAFC] py-16 sm:py-20 lg:py-24 border-t border-slate-100 overflow-hidden">
      <div className="mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-8">

        {/* ---------------------------------------------------- */}
        {/* SECTION HEADER                                       */}
        {/* ---------------------------------------------------- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200/80">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E31C59]/10 text-[#E31C59] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E31C59] animate-pulse" />
              <span>Centres of Excellence & Clinical Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123B63] tracking-tight">
              World-Class Specialties, Dedicated to Every Life.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Experience the harmony of compassionate healthcare and surgical precision.
              Explore our 6 flagship institutes and over 35 specialized medical departments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openModal("appointment")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#E31C59] hover:bg-[#c4144b] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book OPD Token</span>
            </button>
            <button
              type="button"
              onClick={() => openModal("doctor-search")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-[#123B63] border border-slate-200 text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all"
            >
              <Users className="w-4 h-4 text-[#E31C59]" />
              <span>Find Doctor</span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PART 1: INTERACTIVE VISUAL CAROUSEL OF KEY CENTERS   */}
        {/* ---------------------------------------------------- */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E31C59] block">
                Spotlight Showcase
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#123B63]">
                Flagship Centers of Excellence
              </h3>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous center"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#E31C59] hover:border-[#E31C59] shadow-xs hover:shadow flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next center"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#E31C59] hover:border-[#E31C59] shadow-xs hover:shadow flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Card Container */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative rounded-2xl overflow-hidden bg-[#123B63] shadow-xl border border-slate-800"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCenter.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]"
              >
                {/* Left Showcase Details (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between z-10 text-white">
                  <div>
                    {/* Badge & Icon */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#E31C59] text-white flex items-center justify-center shadow-md">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-pink-200 border border-white/10">
                        {currentCenter.badge}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h4 className="mt-3.5 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
                      {currentCenter.name}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-pink-300/90">
                      {currentCenter.tagline}
                    </p>
                    <p className="mt-2 text-xs sm:text-xs text-slate-300 leading-relaxed max-w-xl">
                      {currentCenter.description}
                    </p>

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-4 pt-4 border-t border-white/10 max-w-xl">
                      {currentCenter.stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 border border-white/10">
                          <span className="block text-sm sm:text-base font-black text-white">
                            {stat.value}
                          </span>
                          <span className="block text-[10px] sm:text-[11px] text-slate-300 font-medium">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* KEY PROCEDURES & TREATMENT TAGS */}
                    <div className="mt-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3 h-3 text-[#E31C59]" />
                        Key Procedures & Advanced Treatments
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentCenter.procedures.map((proc, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-[#E31C59]/30 text-white text-[11px] font-medium backdrop-blur-md border border-white/15 transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#E31C59]" />
                            {proc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Carousel Indicators */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => openModal("appointment")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E31C59] hover:bg-[#c4144b] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Consultation</span>
                      </button>
                      <Link
                        href={currentCenter.href}
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all"
                      >
                        <span>Explore Institute</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Indicators */}
                    <div className="flex items-center space-x-1.5">
                      {FLAGSHIP_CENTERS.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setCurrentSlide(dotIdx)}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            dotIdx === currentSlide
                              ? "w-6 bg-[#E31C59]"
                              : "w-1.5 bg-white/30 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Image Banner (5 cols) */}
                <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full">
                  <Image
                    src={currentCenter.image}
                    alt={currentCenter.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#123B63] via-[#123B63]/40 to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PART 2: ORGANIZED MULTI-COLUMN NOTCHED CARDS GRID   */}
        {/* ---------------------------------------------------- */}
        <div ref={directoryRef} className="mt-16 pt-10 border-t border-slate-200/90">
          
          {/* Header & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E31C59] block">
                Comprehensive Directory
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#123B63]">
                Browse All Medical Disciplines
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Find specialties, sub-specialty clinics, and common treatment procedures.
              </p>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full lg:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specialty or treatment..."
                aria-label="Search departments or procedures"
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-lg shadow-xs focus:outline-none focus:ring-1.5 focus:ring-[#E31C59] focus:border-transparent transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pb-3 mb-6 border-b border-slate-200/80">
            {[
              { id: "all", label: "All Disciplines", count: counts.all },
              { id: "clinical", label: "Clinical Specialties", count: counts.clinical },
              { id: "surgical", label: "Surgical Disciplines", count: counts.surgical },
              { id: "centers", label: "Centers of Excellence", count: counts.centers },
              { id: "diagnostics", label: "Diagnostics & Support", count: counts.diagnostics },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as DepartmentCategory);
                    setShowAllDepartments(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#123B63] text-white shadow-xs"
                      : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/70"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-[#E31C59] text-white"
                        : "bg-slate-100 text-[#E31C59]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
            <span>
              Showing <strong className="text-[#123B63]">{displayedDepartments.length}</strong> of{" "}
              <strong className="text-[#123B63]">{filteredDepartments.length}</strong>{" "}
              specialties {searchQuery ? `matching "${searchQuery}"` : ""}
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#E31C59] font-semibold hover:underline"
              >
                Reset Search
              </button>
            )}
          </div>

          {/* Multi-Column Notched Department Cards Grid */}
          {displayedDepartments.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {displayedDepartments.map((dept, index) => (
                  <NotchedProjectCard
                    key={`${dept.name}-${index}`}
                    href={dept.href}
                    title={dept.name}
                    description={dept.description}
                    image={dept.image}
                    badge={dept.categoryLabel}
                    departmentNumber={String(index + 1).padStart(2, "0")}
                    tags={dept.procedures}
                    surface="#F8FAFC"
                    accent="#E31C59"
                    accentForeground="#ffffff"
                    onBookClick={() => openModal("appointment")}
                  />
                ))}
              </div>

              {/* View All / Show Less Toggle Button */}
              {filteredDepartments.length > 6 && !isFiltering && (
                <div className="mt-12 flex flex-col items-center justify-center text-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (showAllDepartments && directoryRef.current) {
                        directoryRef.current.scrollIntoView({ behavior: "smooth" });
                      }
                      setShowAllDepartments((prev) => !prev);
                    }}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#123B63] hover:text-[#E31C59] border-2 border-[#123B63]/15 hover:border-[#E31C59] text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95 group"
                  >
                    <span>
                      {showAllDepartments
                        ? "Show Less Departments"
                        : `View All Departments (${filteredDepartments.length})`}
                    </span>
                    {showAllDepartments ? (
                      <ChevronUp className="w-4 h-4 text-[#E31C59] group-hover:-translate-y-0.5 transition-transform" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#E31C59] group-hover:translate-y-0.5 transition-transform" />
                    )}
                  </button>
                  {!showAllDepartments && (
                    <p className="text-xs text-slate-500 mt-2.5">
                      Displaying 6 of {filteredDepartments.length} departments. Click above to view all.
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Empty Search State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#123B63]">No departments found</h4>
              <p className="text-xs text-slate-500 mt-1">
                We couldn't find any specialties matching "{searchQuery}". Try searching for another term like "Heart", "Knee", or "Surgery".
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 rounded-full bg-[#123B63] text-white text-xs font-bold hover:bg-[#0e2c4a] transition-colors"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

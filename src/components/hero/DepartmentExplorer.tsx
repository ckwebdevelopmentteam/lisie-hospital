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
  Search,
  X,
  Calendar,
  Sparkles,
  Users,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import NotchedProjectCard from "@/components/ui/NotchedProjectCard";

// ==========================================
// 1. DATA: PROMOTIONAL SHOWCASE BANNERS
// ==========================================
interface PromoBanner {
  id: string;
  title: string;
  image: string;
  alt: string;
  href: string;
}

const PROMO_BANNERS: PromoBanner[] = [
  {
    id: "liver-transplant",
    title: "More Than 90% Success Rate in Liver Transplant",
    image: "/images/banners/banner-1.jpg",
    alt: "Lisie Hospital - More Than 90% Success Rate in Liver Transplant",
    href: "/institutes",
  },
  {
    id: "heart-transplant",
    title: "Successfully Performed 33 Heart Transplants",
    image: "/images/banners/banner-2.jpg",
    alt: "Lisie Heart Institute - Successfully Performed 33 Heart Transplants",
    href: "/institutes/heart-institute",
  },
  {
    id: "care-with-love",
    title: "Care with Love - World-Class Healthcare",
    image: "/images/banners/banner-3.jpg",
    alt: "Lisie Hospital - Care with Love",
    href: "/about",
  },
  {
    id: "campus-panoramic",
    title: "Lisie Hospital Main Campus Overview",
    image: "/images/banners/banner-4.jpg",
    alt: "Lisie Hospital Main Campus Ernakulam",
    href: "/contact",
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

  // Banner Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = PROMO_BANNERS.length;

  // Auto-play banner slider
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slideCount]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
  };

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


  return (
    <section id="departments" className="relative w-full py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-slate-100 overflow-hidden">
      <div className="w-full max-w-[1536px] mx-auto">

        {/* ---------------------------------------------------- */}
        {/* SECTION HEADER                                       */}
        {/* ---------------------------------------------------- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 pb-8 sm:pb-10 border-b border-slate-200/80">
          <div className="max-w-3xl">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-widest text-slate-500 mb-2 sm:mb-4 block">
              Centres of Excellence & Clinical Departments
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#123B63] tracking-tight">
              World-Class Medical Departments, Dedicated to Every Life.
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
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
        {/* PART 1: PURE BANNER IMAGE SLIDER (ZERO CONTENT OVERLAY) */}
        {/* ---------------------------------------------------- */}
        <div className="mt-8 sm:mt-10">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="group relative w-full aspect-[1920/446] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200/90 bg-slate-950"
            style={{ aspectRatio: "1920 / 446" }}
          >
            {/* Banner Slide with smooth crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Link
                  href={PROMO_BANNERS[currentSlide].href}
                  className="block relative w-full h-full cursor-pointer focus:outline-none"
                  aria-label={PROMO_BANNERS[currentSlide].title}
                >
                  <Image
                    src={PROMO_BANNERS[currentSlide].image}
                    alt={PROMO_BANNERS[currentSlide].alt}
                    fill
                    priority={currentSlide === 0}
                    sizes="(max-width: 1536px) 100vw, 1536px"
                    className="object-cover object-center select-none"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Left Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous banner"
              className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white shadow-lg backdrop-blur-md flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next banner"
              className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white shadow-lg backdrop-blur-md flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20">
              {PROMO_BANNERS.map((banner, dotIdx) => (
                <button
                  key={banner.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentSlide(dotIdx);
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === currentSlide
                      ? "w-5 sm:w-7 bg-[#E31C59] shadow-xs"
                      : "w-1.5 sm:w-2 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
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
                Clinical Departments & Specialties
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#123B63]">
                Explore Our Medical & Surgical Departments
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Discover expert healthcare across 35+ specialized departments, diagnostic units, and surgical excellence centres.
              </p>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full lg:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search department, specialty or treatment..."
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

          {/* Category Tabs: Smooth horizontal swipe reel on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-200/80 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: "all", label: "All Departments", count: counts.all },
              { id: "clinical", label: "Clinical Specialties", count: counts.clinical },
              { id: "surgical", label: "Surgical Specialties", count: counts.surgical },
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
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
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
              departments {searchQuery ? `matching "${searchQuery}"` : ""}
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
                We couldn&apos;t find any specialties matching &quot;{searchQuery}&quot;. Try searching for another term like &quot;Heart&quot;, &quot;Knee&quot;, or &quot;Surgery&quot;.
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

export interface HeroSlide {
  id: string;
  titleLine1: string;
  titleLine2: string;
  tagline?: string;
  badgeText: string;
  badgeColor: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  timings?: string;
  statsHighlight?: string;
}

export interface CampusCard {
  id: string;
  name: string;
  subTitle: string;
  location: string;
  phone: string;
  image: string;
  googleRating: {
    score: number;
    stars: number;
    reviewsCount: string;
  };
  link: string;
  features: string[];
  opdHours: string;
  emergency: string;
  address: string;
}

export const LISIE_TOP_CONTACTS = {
  phones: [
    { label: "Emergency & Ambulance", number: "+91 9895 756 164", tel: "+919895756164", isEmergency: true },
    { label: "Phone Booking", number: "0484 2401141", tel: "04842401141", isEmergency: false },
    { label: "General Enquiry", number: "0484 2402044", tel: "04842402044", isEmergency: false },
    { label: "Information Desk", number: "0484 6155555", tel: "04846155555", isEmergency: false },
  ],
  quickLinks: [
    { label: "Health Checkup Booking", href: "/health-checkup" },
    { label: "OP Timings", href: "/op-timings" },
    { label: "Advance Booking", href: "/appointments" },
    { label: "Cashless Insurance", href: "/cashless-insurance" },
    { label: "Complaints & Feedback", href: "/feedback" },
  ],
  socials: {
    facebook: "https://facebook.com/TheLisieHospitals",
    instagram: "https://instagram.com/lisie_hospital",
    youtube: "https://youtube.com/channel/UCtRLKebX3IoHByUcKdBPO2g",
    twitter: "https://twitter.com/lisie_hospital",
    linkedin: "https://linkedin.com/company/lisie-hospitalsnew",
  },
};

export const LISIE_HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    titleLine1: "Welcome to Lisie Hospital,",
    titleLine2: "Care with Love Since 1956",
    tagline:
      "Premier 1,000+ bedded NABH & NABL accredited tertiary multi-super specialty hospital in Kochi, Kerala. Living expression of apostolic concern, delivering compassionate, ethical, and advanced healing to millions.",
    badgeText: "HEART TRANSPLANT & CARDIAC CARE",
    badgeColor: "bg-[#FF5722] hover:bg-[#F4511E]",
    image: "/images/hero/hero-slide-1.jpg",
    timings: "Emergency & Casualty 24/7 • OPD: Mon–Sat 8:00 AM – 5:00 PM",
    statsHighlight: "1,000+ Beds • 45+ Specialties",
    ctaText: "Explore Departments",
    ctaLink: "#departments",
  },
];

export const LISIE_INSTITUTES: CampusCard[] = [
  {
    id: "lisie-heart-institute",
    name: "LISIE HEART INSTITUTE",
    subTitle: "14,000+ Heart Surgeries & South India's Premier Cardiac Centre",
    location: "Kaloor, Kochi",
    phone: "0484 2401141",
    image: "/images/hero/card-heart-institute.jpg",
    googleRating: {
      score: 4.9,
      stars: 5,
      reviewsCount: "6,800+",
    },
    link: "/lisie-heart-institute",
    features: [
      "Over 14,000 Open Heart Surgeries",
      "Heart Transplantation & ECMO Unit",
      "Adult & Paediatric CTVS Surgery",
      "24/7 Primary Angioplasty (PPCI) Cath Lab",
    ],
    opdHours: "Mon – Sat: 8:00 AM – 6:00 PM | Emergency 24/7",
    emergency: "24/7 Acute Coronary Emergency Line: 0484 2401141",
    address: "Lisie Heart Institute, Lisie Hospital Road, Kaloor, Kochi, Kerala - 682017",
  },
  {
    id: "lisie-main-hospital",
    name: "LISIE MAIN HOSPITAL",
    subTitle: "1,000+ Bedded NABH & NABL Tertiary Care Centre Since 1956",
    location: "Kaloor, Kochi",
    phone: "0484 2402044",
    image: "/images/hero/card-main-hospital.jpg",
    googleRating: {
      score: 4.8,
      stars: 5,
      reviewsCount: "12,500+",
    },
    link: "/lisie-main-hospital",
    features: [
      "Level 1 Trauma & 24/7 Emergency Casualty",
      "Renal & Liver Transplantation Centre",
      "45+ Super Specialty & Clinical Departments",
      "NABH & NABL Accredited Hospital Systems",
    ],
    opdHours: "Daily Outpatient (OPD): Mon – Sat 8:00 AM – 5:00 PM",
    emergency: "24/7 Emergency & Ambulance Service: +91 9895 756 164",
    address: "Lisie Hospital Road, Kaloor, Ernakulam, Kochi, Kerala - 682017",
  },
  {
    id: "lisie-cancer-centre",
    name: "LISIE CANCER CENTRE (LCC)",
    subTitle: "Advanced Varian TrueBeam Radiotherapy & Comprehensive Oncology",
    location: "Super Specialty Wing, Kochi",
    phone: "0484 2402044",
    image: "/images/hero/card-cancer-centre.jpg",
    googleRating: {
      score: 4.8,
      stars: 5,
      reviewsCount: "4,100+",
    },
    link: "/lisie-cancer-centre",
    features: [
      "Varian TrueBeam SVC Linear Accelerator",
      "4D CT Simulator & Multi-Disciplinary Tumor Board",
      "Nuclear Medicine & Molecular Imaging PET-CT",
      "Stem Cell Transplant & Cellular Therapy",
    ],
    opdHours: "Mon – Sat: 8:30 AM – 5:30 PM | Emergency 24/7",
    emergency: "24/7 Oncology Emergency Care: 0484 2402044",
    address: "Lisie Cancer Centre, Super Specialty Block, Kaloor, Kochi - 682017",
  },
];

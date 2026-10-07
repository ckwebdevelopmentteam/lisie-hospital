export const HOSPITAL_CONTACTS = {
  name: "Lisie Hospital",
  location: "Kaloor, Kochi, Ernakulam, Kerala - 682017",
  emergencyPhone: "9895756164",
  emergencyPhoneFormatted: "+91 9895 756 164",
  ambulancePhone: "0484 2402044",
  phoneBooking: "0484 2401141",
  generalEnquiry: "0484 2402044",
  patientRelations: "0484 2402044 Ext. 2100",
  email: "contact@lisiehospital.org",
};

export const CLINICAL_SPECIALTIES = [
  { name: "Cardiology", description: "Comprehensive interventional and preventive cardiac care", href: "/departments/cardiology" },
  { name: "General Medicine", description: "Internal medicine, lifestyle diseases, and acute conditions", href: "/departments/general-medicine" },
  { name: "Paediatrics & Neonatology", description: "Advanced pediatric intensive care and child development", href: "/departments/paediatrics" },
  { name: "Dermatology & Cosmetology", description: "Skin, hair, allergy, and aesthetic therapies", href: "/departments/dermatology" },
  { name: "ENT (Otorhinolaryngology)", description: "Ear, nose, throat, head and neck medical services", href: "/departments/ent" },
  { name: "Obstetrics & Gynaecology", description: "Women's wellness, high-risk pregnancy, and fertility", href: "/departments/gynaecology" },
  { name: "Endocrinology & Diabetology", description: "Diabetes, thyroid, hormone, and metabolic disorders", href: "/departments/endocrinology" },
  { name: "Nephrology", description: "Kidney care, hemodialysis, and peritoneal dialysis", href: "/departments/nephrology" },
  { name: "Pulmonology & Chest Medicine", description: "Asthma, COPD, sleep apnea, and allergy care", href: "/departments/pulmonology" },
  { name: "Psychiatry & Behavioural Health", description: "Mental health, counselling, and de-addiction", href: "/departments/psychiatry" },
  { name: "Medical Oncology", description: "Chemotherapy, targeted immunotherapy, and cancer screening", href: "/departments/oncology" },
  { name: "Gastroenterology & Hepatology", description: "Liver diseases, digestive health, and endoscopy", href: "/departments/gastroenterology" },
];

export const SURGICAL_SPECIALTIES = [
  { name: "General & Laparoscopic Surgery", description: "Minimally invasive gastrointestinal and general procedures", href: "/departments/general-surgery" },
  { name: "Neurosurgery & Spine Center", description: "Brain tumor surgery, microvascular and complex spine", href: "/departments/neurosurgery" },
  { name: "Orthopaedics & Joint Replacement", description: "Robotic knee/hip replacement and sports injuries", href: "/departments/orthopaedics" },
  { name: "Urology & Renal Transplantation", description: "Laser kidney stone removal, prostate, and kidney transplants", href: "/departments/urology" },
  { name: "Cardiothoracic & Vascular (CTVS)", description: "Open heart, bypass, valve repairs, and heart transplant", href: "/departments/cardiothoracic-surgery" },
  { name: "ENT & Head-Neck Surgery", description: "Micro-ear surgery, endoscopic sinus, and vocal cord repair", href: "/departments/ent-surgery" },
  { name: "Surgical Gastroenterology", description: "GI oncology, hepatobiliary, and pancreatic surgery", href: "/departments/surgical-gastroenterology" },
  { name: "Plastic & Reconstructive Surgery", description: "Trauma reconstruction, burns, and microvascular surgery", href: "/departments/plastic-surgery" },
  { name: "Paediatric Surgery", description: "Neonatal surgical corrections and congenital care", href: "/departments/paediatric-surgery" },
];

export const SUPER_SPECIALTY_CENTERS = [
  { name: "Lisie Heart Institute", description: "Leading cardiac center in South India for adults & children", href: "/institutes/heart-institute" },
  { name: "Lisie Institute of Neurosciences", description: "Integrated stroke center, epilepsy clinic, and neuro-ICU", href: "/institutes/neurosciences" },
  { name: "Comprehensive Cancer Care (Oncology)", description: "Multidisciplinary tumor board, surgical and medical oncology", href: "/institutes/oncology" },
  { name: "Critical Care & Emergency Medicine", description: "Level-1 emergency, round-the-clock intensive trauma care", href: "/institutes/emergency-critical-care" },
  { name: "Kidney Transplantation Center", description: "Renowned living-donor and cadaveric renal transplant unit", href: "/institutes/kidney-transplant" },
  { name: "Center for Bone & Joint Surgery", description: "Advanced arthroscopy, pediatric orthopaedics, and trauma", href: "/institutes/bone-joint" },
];

export const DIAGNOSTIC_SUPPORT_SERVICES = [
  { name: "Radiology & Imaging (MRI, 128 Slice CT, USG)", href: "/services/radiology" },
  { name: "NABL Accredited Clinical Laboratory", href: "/services/laboratory" },
  { name: "24/7 In-House Pharmacy", href: "/services/pharmacy" },
  { name: "Physiotherapy & Physical Rehabilitation", href: "/services/physiotherapy" },
  { name: "Clinical Dietetics & Nutrition Therapy", href: "/services/dietetics" },
  { name: "Licensed Blood Center & Transfusion Medicine", href: "/services/blood-bank" },
];

export interface DepartmentExplorerItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  description: string;
  href: string;
  group: string;
  availability?: string;
}

const EXPLORER_IMAGE_FALLBACKS = [
  "/images/hero/card-main-hospital.jpg",
  "/images/stitch/campus-kaloor.jpg",
  "/images/hero/card-kochi.jpg",
  "/images/stitch/campus-palarivattom.jpg",
  "/images/stitch/campus-kakkanad.jpg",
];

const EXPLORER_IMAGE_OVERRIDES: Record<string, string> = {
  Cardiology: "/images/hero/card-heart-institute.jpg",
  "Lisie Heart Institute": "/images/hero/card-heart-institute.jpg",
  "Medical Oncology": "/images/hero/card-cancer-centre.jpg",
  "Comprehensive Cancer Care (Oncology)": "/images/hero/card-cancer-centre.jpg",
};

type ExplorerSourceItem = {
  name: string;
  href: string;
  description?: string;
};

const explorerSources: Array<{ group: string; items: ExplorerSourceItem[] }> = [
  { group: "Clinical specialty", items: CLINICAL_SPECIALTIES },
  { group: "Surgical specialty", items: SURGICAL_SPECIALTIES },
  { group: "Centre of excellence", items: SUPER_SPECIALTY_CENTERS },
  {
    group: "Diagnostic service",
    items: DIAGNOSTIC_SUPPORT_SERVICES.map((service) => ({
      ...service,
      description: service.name,
    })),
  },
];

export const DEPARTMENT_EXPLORER_ITEMS: DepartmentExplorerItem[] = explorerSources.flatMap(
  ({ group, items }) =>
    items.map((item, index) => {
      const slug = item.href.split("/").filter(Boolean).pop() ?? item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const description = item.description ?? item.name;
      const fallbackImage = EXPLORER_IMAGE_FALLBACKS[index % EXPLORER_IMAGE_FALLBACKS.length];

      return {
        id: `${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${slug}`,
        name: item.name,
        slug,
        image: EXPLORER_IMAGE_OVERRIDES[item.name] ?? fallbackImage,
        shortDescription: description,
        description,
        href: item.href,
        group,
        availability: item.name.includes("Emergency") ? "24/7 service" : undefined,
      };
    }),
);

export const POPULAR_SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Orthopaedics",
  "Gynaecology",
  "Paediatrics",
  "Oncology",
  "ENT",
  "General Medicine",
];

export const SAMPLE_DOCTORS = [
  { name: "Dr. Jose Chacko Periappuram", specialty: "Cardiothoracic Surgery", qualification: "MS, MCh, FRCS (Glasg), FRCS (Edin)", designation: "Chairman & Chief CTVS Surgeon", department: "Lisie Heart Institute" },
  { name: "Dr. Jacob Abraham", specialty: "Cardiology", qualification: "MD, DM (Cardio), FACC", designation: "Chief Interventional Cardiologist", department: "Cardiology" },
  { name: "Dr. Roy J. Mampilly", specialty: "Orthopaedics", qualification: "MS (Ortho), DNB (Ortho)", designation: "Senior Consultant Joint Replacement", department: "Orthopaedics" },
  { name: "Dr. Mathew Thomas", specialty: "Neurosurgery", qualification: "MCh (Neuro), DNB", designation: "Chief Neurosurgeon & Spine Surgeon", department: "Neurosurgery" },
  { name: "Dr. Mary Varghese", specialty: "Gynaecology & Obstetrics", qualification: "MD (OBG), DGO", designation: "Senior Consultant Obstetrician", department: "Obstetrics & Gynaecology" },
  { name: "Dr. Suresh Kumar P.", specialty: "Paediatrics & Neonatology", qualification: "MD (Paed), DCH", designation: "Chief Paediatrician", department: "Paediatrics" },
  { name: "Dr. George K. Andrews", specialty: "Medical Oncology", qualification: "MD, DM (Oncology)", designation: "Chief Medical Oncologist", department: "Oncology" },
  { name: "Dr. Abraham Mathew", specialty: "General Medicine", qualification: "MD (Gen Med)", designation: "Senior Consultant Physician", department: "General Medicine" },
];

export const PATIENT_INFO_SECTIONS = [
  {
    title: "Appointments",
    items: [
      { name: "Book Appointment", href: "/appointments", isPrimary: true },
      { name: "OP Timings", href: "/op-timings" },
      { name: "Doctor Schedule", href: "/doctor-schedule" },
      { name: "Health Checkup", href: "/health-checkup" },
    ],
  },
  {
    title: "Hospital Stay",
    items: [
      { name: "Admission", href: "/patient-info/admission" },
      { name: "Visiting Hours", href: "/patient-info/visiting-hours" },
      { name: "Billing", href: "/patient-info/billing" },
      { name: "Insurance & TPA", href: "/patient-info/insurance" },
      { name: "Discharge", href: "/patient-info/discharge" },
    ],
  },
  {
    title: "Patient & Visitor",
    items: [
      { name: "Patient Guide", href: "/patient-info/patient-guide" },
      { name: "Patient Rights", href: "/patient-info/patient-rights" },
      { name: "Patient Responsibilities", href: "/patient-info/patient-responsibilities" },
      { name: "Feedback", href: "/feedback" },
      { name: "Complaints & Grievance", href: "/complaints" },
    ],
  },
  {
    title: "Services",
    items: [
      { name: "Pharmacy", href: "/services/pharmacy" },
      { name: "Laboratory", href: "/services/laboratory" },
      { name: "Radiology", href: "/services/radiology" },
      { name: "Physiotherapy", href: "/services/physiotherapy" },
      { name: "Dietetics", href: "/services/dietetics" },
      { name: "Patient Relations", href: "/patient-info/patient-relations" },
    ],
  },
];

export const ABOUT_LISIE_SECTIONS = [
  {
    title: "Hospital",
    items: [
      { name: "About Lisie", href: "/about-us" },
      { name: "History", href: "/about-us/history" },
      { name: "Mission & Vision", href: "/about-us/mission-vision" },
      { name: "Leadership", href: "/about-us/leadership" },
      { name: "Management", href: "/about-us/management" },
    ],
  },
  {
    title: "Our Facilities",
    items: [
      { name: "Infrastructure", href: "/about-us/infrastructure" },
      { name: "Facilities", href: "/about-us/facilities" },
      { name: "Centers of Excellence", href: "/about-us/centers-of-excellence" },
      { name: "Patient Services", href: "/about-us/patient-services" },
    ],
  },
  {
    title: "Connect",
    items: [
      { name: "News & Events", href: "/news-events" },
      { name: "Gallery", href: "/gallery" },
      { name: "Contact Us", href: "/contact-us" },
      { name: "Location", href: "/contact-us/location" },
    ],
  },
];

export const ACADEMICS_RESEARCH_SECTIONS = [
  {
    title: "Medical Education",
    items: [
      { name: "DNB / DrNB", href: "/academics/dnb-drnb" },
      { name: "Medical Training", href: "/academics/medical-training" },
      { name: "Clinical Education", href: "/academics/clinical-education" },
    ],
  },
  {
    title: "Nursing",
    items: [
      { name: "College of Nursing", href: "/academics/college-of-nursing" },
      { name: "School of Nursing", href: "/academics/school-of-nursing" },
    ],
  },
  {
    title: "Allied Health",
    items: [
      { name: "College of Allied Health Sciences", href: "/academics/allied-health-sciences" },
      { name: "Medical Laboratory Technology", href: "/academics/mlt" },
      { name: "Dialysis Technology", href: "/academics/dialysis-technology" },
    ],
  },
  {
    title: "Pharmacy",
    items: [
      { name: "College of Pharmacy", href: "/academics/college-of-pharmacy" },
    ],
  },
  {
    title: "Research",
    items: [
      { name: "Research", href: "/research" },
      { name: "Clinical Research", href: "/research/clinical-research" },
      { name: "Publications", href: "/research/publications" },
      { name: "Projects", href: "/research/projects" },
    ],
  },
];

export const QUALITY_SAFETY_ITEMS = [
  { name: "Quality at Lisie", description: "Our commitment to ethical, zero-compromise care", href: "/quality/overview" },
  { name: "Patient Safety", description: "Protocols safeguarding patients at every touchpoint", href: "/quality/patient-safety" },
  { name: "Quality Standards", description: "Standard operating procedures and clinical benchmarks", href: "/quality/standards" },
  { name: "Accreditation", description: "NABH & NABL accredited hospital systems", href: "/quality/accreditation" },
  { name: "Infection Control", description: "Hospital Infection Control Committee (HICC) guidelines", href: "/quality/infection-control" },
  { name: "Patient Rights", description: "Dignity, privacy, and informed consent principles", href: "/quality/patient-rights" },
  { name: "Safety Guidelines", description: "Safe surgery checklists and emergency preparedness", href: "/quality/safety-guidelines" },
  { name: "Quality Reports", description: "Clinical audits, safety scores, and outcomes", href: "/quality/reports" },
];

export const MORE_MENU_ITEMS = [
  { name: "Careers", description: "Join our healthcare professionals team", href: "/careers" },
  { name: "News & Events", description: "Latest hospital updates and health camps", href: "/news-events" },
  { name: "Gallery", description: "Campus photos, inaugurations, and events", href: "/gallery" },
  { name: "Downloads", description: "Forms, health guides, and brochures", href: "/downloads" },
  { name: "Forms", description: "Medical records and consent forms", href: "/forms" },
  { name: "Feedback", description: "Share your experience with us", href: "/feedback" },
  { name: "Tenders", description: "Procurement notices and quotation bids", href: "/tenders" },
  { name: "Contact Us", description: "Address, maps, and department extensions", href: "/contact-us" },
  { name: "Privacy Policy", description: "Patient privacy, terms, and data safety", href: "/privacy-policy" },
];

export const SEARCH_INDEX = [
  { id: "1", title: "Dr. Jose Chacko Periappuram", category: "Doctor" as const, subtitle: "Cardiothoracic Surgery - Lisie Heart Institute", url: "/doctors/jose-chacko" },
  { id: "2", title: "Dr. Jacob Abraham", category: "Doctor" as const, subtitle: "Chief Interventional Cardiologist", url: "/doctors/jacob-abraham" },
  { id: "3", title: "Dr. Roy J. Mampilly", category: "Doctor" as const, subtitle: "Senior Consultant Joint Replacement & Orthopaedics", url: "/doctors/roy-mampilly" },
  { id: "4", title: "Dr. Mathew Thomas", category: "Doctor" as const, subtitle: "Chief Neurosurgeon & Spine Specialist", url: "/doctors/mathew-thomas" },
  { id: "5", title: "Cardiology", category: "Department" as const, subtitle: "Lisie Heart Institute - Outpatient & Inpatient Care", url: "/departments/cardiology" },
  { id: "6", title: "Neurology & Neurosciences", category: "Department" as const, subtitle: "Stroke Unit, Epilepsy Clinic, Comprehensive Brain Care", url: "/departments/neurology" },
  { id: "7", title: "Orthopaedics & Joint Replacement", category: "Department" as const, subtitle: "Robotic Joint Care, Trauma, Sports Medicine", url: "/departments/orthopaedics" },
  { id: "8", title: "Obstetrics & Gynaecology", category: "Department" as const, subtitle: "Maternity, High-Risk Pregnancy & Women's Health", url: "/departments/gynaecology" },
  { id: "9", title: "Paediatrics & Neonatology", category: "Department" as const, subtitle: "Child Health, NICU, PICU & Immunization", url: "/departments/paediatrics" },
  { id: "10", title: "Emergency & Trauma Care (24/7)", category: "Service" as const, subtitle: "Immediate 24-hour medical attention - 9895756164", url: "/emergency" },
  { id: "11", title: "OP Timings & Doctor Schedule", category: "Information" as const, subtitle: "Daily OPD consultation hours (8:00 AM - 5:00 PM)", url: "/op-timings" },
  { id: "12", title: "Book Appointment", category: "Service" as const, subtitle: "Doctor OPD token booking & consultation scheduling", url: "/appointments" },
  { id: "13", title: "Health Checkup Packages", category: "Service" as const, subtitle: "Master health checkup, executive & cardiac screening", url: "/health-checkup" },
  { id: "14", title: "24/7 Pharmacy & Home Delivery", category: "Service" as const, subtitle: "Prescription medications & inpatient pharmacy", url: "/services/pharmacy" },
  { id: "15", title: "Laboratory & Diagnostics", category: "Service" as const, subtitle: "NABL accredited clinical pathology & microbiology", url: "/services/laboratory" },
  { id: "16", title: "Radiology & Imaging (MRI/CT)", category: "Service" as const, subtitle: "Advanced MRI, CT scanning, Ultrasound & X-Ray", url: "/services/radiology" },
  { id: "17", title: "College of Nursing", category: "Academic" as const, subtitle: "B.Sc, M.Sc & Post Basic Nursing Programs", url: "/academics/college-of-nursing" },
  { id: "18", title: "DNB / DrNB Medical Education", category: "Academic" as const, subtitle: "Postgraduate clinical medical residencies", url: "/academics/dnb-drnb" },
];

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  designation: string;
  qualifications: string;
  specialty: string;
  department: string;
  location: string;
  image: string;
  experienceYears: number;
  overview: string;
  areaOfExpertise: string[];
  qualificationsList: string[];
  languages: string[];
  blogs: {
    title: string;
    date: string;
    readTime: string;
    summary: string;
  }[];
  opdSchedule: {
    days: string;
    timings: string;
    room: string;
  };
}

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

export const ALL_SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Orthopaedics",
  "Gynaecology",
  "Paediatrics",
  "Oncology",
  "ENT",
  "General Medicine",
  "Psychiatry & Behavioural Health",
];

export const DOCTORS_DATABASE: Doctor[] = [
  // --- Aiswarya R Kamath (matches user reference UI screenshot) ---
  {
    id: "aiswarya-r-kamath",
    slug: "aiswarya-r-kamath",
    name: "Dr. Aiswarya R Kamath",
    designation: "Senior Resident",
    qualifications: "MBBS, MD, DNB",
    specialty: "Psychiatry and Clinical Psychology, Psychiatry And Behavior Medicine",
    department: "Psychiatry & Behavioural Health",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-aiswarya.jpg",
    experienceYears: 7,
    overview:
      "Dr Aiswarya R Kamath is a Psychiatrist with an expertise in de-addiction psychiatry, women's mental health, child psychiatry and psychotherapy. She manages psychiatric emergencies and complex cases. Dr Aiswarya has conducted classes on several platforms, like 'Emotion regulation skills in DBT' - workshop for mental health professionals and was a speaker on 'Mindfulness based Interventions in psychiatry' at Annual Kerala State Psychiatry conference.",
    areaOfExpertise: [
      "De-addiction psychiatry & substance abuse management",
      "Women's mental health & perinatal depression",
      "Child and adolescent psychiatric evaluations",
      "Psychotherapy, Cognitive Behavioural Therapy (CBT)",
      "Dialectical Behaviour Therapy (DBT) & emotional regulation",
      "Mindfulness-based interventions in clinical psychiatry",
      "Psychiatric emergencies & acute crisis intervention",
    ],
    qualificationsList: [
      "MBBS - Government Medical College",
      "MD (Psychiatry) - Premier Medical College & Research Institute",
      "DNB (Psychiatry) - National Board of Examinations, New Delhi",
      "Certified DBT & Mindfulness-Based Cognitive Practitioner",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Emotion Regulation Skills in Everyday Stress: Practical Insights",
        date: "September 18, 2024",
        readTime: "5 min read",
        summary:
          "Practical cognitive techniques to handle emotional turbulence and build resilience in high-pressure everyday environments.",
      },
      {
        title: "De-Addiction & Family Support: Overcoming Chemical Dependency",
        date: "August 12, 2024",
        readTime: "6 min read",
        summary:
          "How clinical intervention coupled with compassionate family counseling drives long-term sobriety.",
      },
      {
        title: "Breaking the Stigma: Women's Perinatal Mental Health",
        date: "July 02, 2024",
        readTime: "4 min read",
        summary:
          "Understanding postpartum mood changes, hormonal transitions, and evidence-based clinical therapy options.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "09:00 AM – 01:00 PM",
      room: "OPD Block C, Room 204",
    },
  },

  // ==========================================
  // CARDIOLOGY (8 DOCTORS)
  // ==========================================
  {
    id: "jose-chacko-periappuram",
    slug: "jose-chacko-periappuram",
    name: "Dr. Jose Chacko Periappuram",
    designation: "Chairman & Chief CTVS Surgeon",
    qualifications: "MS, MCh, FRCS (Glasg), FRCS (Edin)",
    specialty: "Cardiothoracic Surgery & Heart Transplantation",
    department: "Cardiology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 32,
    overview:
      "Dr. Jose Chacko Periappuram is a legendary cardiothoracic surgeon in India who performed the first successful heart transplant in the state of Kerala. With over three decades of clinical mastery, he leads the renowned Lisie Heart Institute.",
    areaOfExpertise: [
      "Heart & lung transplantation",
      "Off-pump coronary artery bypass grafting (CABG)",
      "Minimally invasive cardiac surgery (MICS)",
      "Complex valve repair and replacement",
      "Aortic aneurysm root repair",
    ],
    qualificationsList: [
      "MBBS - Medical College, Kottayam",
      "MS (General Surgery) - Medical College, Trivandrum",
      "MCh (Cardiothoracic Surgery) - AIIMS, New Delhi",
      "FRCS - Royal College of Physicians and Surgeons of Glasgow",
      "FRCS - Royal College of Surgeons of Edinburgh",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Milestones in Adult Heart Transplantation in South India",
        date: "August 24, 2024",
        readTime: "7 min read",
        summary: "An overview of surgical advancements and donor allocation protocols in state heart transplants.",
      },
      {
        title: "Beating Heart Surgery vs Conventional Bypass: What You Need to Know",
        date: "June 14, 2024",
        readTime: "5 min read",
        summary: "Understanding the clinical benefits of off-pump coronary revascularization for high-risk patients.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "10:00 AM – 02:00 PM",
      room: "Lisie Heart Institute, Level 2, Room 201",
    },
  },
  {
    id: "jacob-abraham",
    slug: "jacob-abraham",
    name: "Dr. Jacob Abraham",
    designation: "Chief Interventional Cardiologist",
    qualifications: "MD, DM (Cardio), FACC, FSCAI",
    specialty: "Interventional Cardiology & Complex Angioplasty",
    department: "Cardiology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-cardiac-surgeon.jpg",
    experienceYears: 24,
    overview:
      "Dr. Jacob Abraham has performed over 15,000 coronary interventions including primary PCI, bifurcation stenting, and transcatheter aortic valve implantations (TAVI). He heads the emergency cardiac catheterization unit at Lisie.",
    areaOfExpertise: [
      "Primary angioplasty in acute myocardial infarction (PAMI)",
      "Transcatheter Aortic Valve Implantation (TAVI / TAVR)",
      "Rotablation & intravascular lithotripsy (IVL)",
      "Chronic total occlusion (CTO) revascularization",
      "Intravascular ultrasound (IVUS) & OCT imaging",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "MD (General Medicine) - Kasturba Medical College",
      "DM (Cardiology) - Sree Chitra Tirunal Institute (SCTIMST)",
      "Fellow of the American College of Cardiology (FACC)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Golden Hour in Heart Attacks: Why Immediate Cath-Lab Access Saves Lives",
        date: "August 05, 2024",
        readTime: "4 min read",
        summary: "A guide on recognizing subtle angina warning signs and the importance of rapid door-to-balloon time.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "09:00 AM – 01:00 PM",
      room: "Lisie Heart Institute, Level 1, Room 104",
    },
  },
  {
    id: "rony-mathew-kadavil",
    slug: "rony-mathew-kadavil",
    name: "Dr. Rony Mathew Kadavil",
    designation: "Senior Consultant Cardiologist",
    qualifications: "MD, DM (Cardiology), FESC",
    specialty: "Preventive & Clinical Cardiology",
    department: "Cardiology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-oncologist.jpg",
    experienceYears: 21,
    overview:
      "Dr. Rony Mathew Kadavil is an acclaimed clinician recognized for expertise in lipidology, hypertensive crisis management, and long-term ischemic heart disease prevention. He coordinates cardiac rehabilitation programs.",
    areaOfExpertise: [
      "Preventive cardiology & metabolic syndrome management",
      "Refractory hypertension & autonomic testing",
      "Heart failure with preserved ejection fraction (HFpEF)",
      "Cardiac Doppler & 3D Echocardiography",
      "Post-CABG clinical follow-up and rehab",
    ],
    qualificationsList: [
      "MBBS - St. John's Medical College, Bangalore",
      "MD (Medicine) - Christian Medical College (CMC), Vellore",
      "DM (Cardiology) - Government Medical College, Kozhikode",
      "Fellow of the European Society of Cardiology (FESC)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Decoding Cholesterol: ApoB, LDL-P, and Modern Lipid Panels",
        date: "July 19, 2024",
        readTime: "5 min read",
        summary: "Why standard lipid panels might overlook hidden cardiovascular risks in diabetic patients.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "Lisie Heart Institute, Level 1, Room 102",
    },
  },
  {
    id: "cg-sajeev",
    slug: "cg-sajeev",
    name: "Dr. C. G. Sajeev",
    designation: "Senior Consultant & Cardiac Electrophysiologist",
    qualifications: "MD, DM (Cardiology), CEPS",
    specialty: "Electrophysiology & Arrhythmia Management",
    department: "Cardiology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-specialist-male.jpg",
    experienceYears: 18,
    overview:
      "Dr. C. G. Sajeev specializes in the assessment of complex heart arrhythmias, catheter ablation using 3D mapping systems, and implantation of biventricular pacemakers (CRT-D).",
    areaOfExpertise: [
      "3D Electro-anatomical mapping (CARTO / EnSite)",
      "Radiofrequency ablation of SVT, VT, and Atrial Fibrillation",
      "Dual chamber pacemakers & leadless pacemakers",
      "Cardiac Resynchronization Therapy (CRT) & AICD",
      "Syncope evaluation & tilt table testing",
    ],
    qualificationsList: [
      "MBBS - Medical College, Kottayam",
      "MD (General Medicine) - JIPMER, Puducherry",
      "DM (Cardiology) - AIIMS, New Delhi",
      "Certified Electrophysiology Specialist (IBHRE)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Atrial Fibrillation: When An Irregular Pulse Requires Ablation",
        date: "June 29, 2024",
        readTime: "6 min read",
        summary: "Understanding catheter ablation as a durable alternative to lifetime blood thinners.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Friday",
      timings: "09:30 AM – 01:30 PM",
      room: "Lisie Heart Institute, Level 2, Room 208",
    },
  },
  {
    id: "george-koshy",
    slug: "george-koshy",
    name: "Dr. George Koshy",
    designation: "Chief Pediatric Cardiologist",
    qualifications: "MD, DM, FNB (Pediatric Cardiology)",
    specialty: "Congenital Heart Diseases & Pediatric Echo",
    department: "Cardiology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-pediatrician.jpg",
    experienceYears: 16,
    overview:
      "Dr. George Koshy provides dedicated care to infants and children with structural and congenital heart anomalies, performing device closures for ASD, VSD, and PDA without open surgery.",
    areaOfExpertise: [
      "Transcatheter device closure of ASD, VSD, PDA",
      "Fetal echocardiography & prenatal counseling",
      "Balloon pulmonary and aortic valvuloplasty",
      "Pediatric pulmonary hypertension management",
      "Post-operative care for congenital heart surgery",
    ],
    qualificationsList: [
      "MBBS - Christian Medical College, Vellore",
      "MD (Pediatrics) - Institute of Child Health, Chennai",
      "DM (Cardiology) - Sree Chitra Tirunal Institute",
      "Fellowship in Pediatric Interventions (Amrita / Melbourne)",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "Congenital Heart Defects in Newborns: Early Symptoms Parents Shouldn't Miss",
        date: "May 15, 2024",
        readTime: "5 min read",
        summary: "Recognizing feeding fatigue, poor weight gain, and cyanosis in early infancy.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Saturday",
      timings: "09:00 AM – 01:00 PM",
      room: "Lisie Heart Institute, Level 1, Room 107",
    },
  },
  {
    id: "thomas-mathew",
    slug: "thomas-mathew",
    name: "Dr. Thomas Mathew",
    designation: "Consultant Interventional Cardiologist",
    qualifications: "MD, DM (Cardiology)",
    specialty: "Radial Angioplasty & Peripheral Interventions",
    department: "Cardiology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 14,
    overview:
      "Dr. Thomas Mathew is an expert in trans-radial artery interventions, allowing patients to walk within hours after coronary stenting. He has particular expertise in diabetic vascular disease.",
    areaOfExpertise: [
      "Transradial coronary angiography and angioplasty",
      "Peripheral arterial stenting and limb salvage",
      "Renal artery denervation & stenting",
      "Drug-eluting balloon angioplasties",
      "Transesophageal echocardiography (TEE)",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Thrissur",
      "MD (Medicine) - Government Medical College, Trivandrum",
      "DM (Cardiology) - Government Medical College, Kozhikode",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Why Transradial Angioplasty Is the Patient-Friendly Gold Standard",
        date: "April 18, 2024",
        readTime: "4 min read",
        summary: "How wrist access reduces bleeding risks and speeds up same-day discharge.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Friday",
      timings: "02:00 PM – 05:00 PM",
      room: "Lisie Heart Institute, Level 1, Room 105",
    },
  },
  {
    id: "mini-varghese",
    slug: "mini-varghese",
    name: "Dr. Mini Varghese",
    designation: "Senior Consultant Non-Invasive Cardiologist",
    qualifications: "MD, DNB (Cardiology), FASE",
    specialty: "Echocardiography & Women's Heart Health",
    department: "Cardiology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 19,
    overview:
      "Dr. Mini Varghese leads the non-invasive imaging facility, bringing high precision in speckle tracking echocardiography, stress echo, and specialized protocols for heart disease in women.",
    areaOfExpertise: [
      "Advanced 3D & Strain Echocardiography",
      "Dobutamine & Exercise Stress Echo",
      "Women-specific cardiovascular risk profiling",
      "Cardio-oncology surveillance for chemotherapy patients",
      "Valvular heart disease quantification",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "MD (General Medicine) - Kilpauk Medical College, Chennai",
      "DNB (Cardiology) - National Board of Examinations",
      "Fellow of the American Society of Echocardiography (FASE)",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "Heart Attacks in Women Often Feel Different: What to Look For",
        date: "March 22, 2024",
        readTime: "5 min read",
        summary: "Atypical symptoms such as nausea, jaw discomfort, and unexplained fatigue in women.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "Lisie Heart Institute, Level 2, Room 203",
    },
  },
  {
    id: "sajan-koshy",
    slug: "sajan-koshy",
    name: "Dr. Sajan Koshy",
    designation: "Consultant Pediatric & Adult Cardiac Surgeon",
    qualifications: "MS, MCh (CTVS), FIACS",
    specialty: "Congenital Cardiac Surgery & Valve Reconstruction",
    department: "Cardiology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-cardiac-surgeon.jpg",
    experienceYears: 17,
    overview:
      "Dr. Sajan Koshy has extensive experience in corrective heart surgeries for neonates and adults, including TOF repair, arterial switch operations, and robotic-assisted valve repair.",
    areaOfExpertise: [
      "Neonatal and infant congenital heart defect repairs",
      "Arterial Switch Operation (ASO) & Norwood procedure",
      "Aortic and Mitral valve repair techniques",
      "Ventricular assist device (VAD) implantation",
      "Minimally invasive ASD closures",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "MS (General Surgery) - Medical College, Calicut",
      "MCh (Cardiothoracic Surgery) - Sree Chitra Tirunal Institute",
      "Fellowship in Congenital Cardiac Surgery (Sydney / Bangalore)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Advances in Neonatal Cardiac Surgery: From Diagnosis to Healing",
        date: "February 10, 2024",
        readTime: "6 min read",
        summary: "How coordinated intensive care and micro-surgical instruments enhance infant survival.",
      },
    ],
    opdSchedule: {
      days: "Wednesday, Friday",
      timings: "10:00 AM – 02:00 PM",
      room: "Lisie Heart Institute, Level 2, Room 205",
    },
  },

  // ==========================================
  // NEUROLOGY (8 DOCTORS)
  // ==========================================
  {
    id: "mathew-thomas",
    slug: "mathew-thomas",
    name: "Dr. Mathew Thomas",
    designation: "Chief Neurosurgeon & Spine Surgeon",
    qualifications: "MCh (Neuro), DNB (Neurosurgery), FINR",
    specialty: "Microvascular Neurosurgery & Spine Surgery",
    department: "Neurology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-specialist-male.jpg",
    experienceYears: 26,
    overview:
      "Dr. Mathew Thomas is a pioneer in neuro-endoscopic procedures and complex skull-base surgery in Kerala. He has performed over 8,000 cranial and spinal interventions with stellar success rates.",
    areaOfExpertise: [
      "Brain tumor surgery & image-guided neuronavigation",
      "Endoscopic pituitary tumor excision",
      "Minimally invasive spine surgery (MISS) & disc replacement",
      "Aneurysm clipping & arteriovenous malformations (AVM)",
      "Pediatric neurosurgery & hydrocephalus management",
    ],
    qualificationsList: [
      "MBBS - Medical College, Trivandrum",
      "MS (General Surgery) - Medical College, Kottayam",
      "MCh (Neurosurgery) - NIMHANS, Bangalore",
      "Fellowship in Interventional Neuro-Radiology (Zurich)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Endoscopic Brain Surgery: Precision Access with Minimal Disruption",
        date: "September 04, 2024",
        readTime: "5 min read",
        summary: "How trans-nasal corridors allow skull base tumor removal without large external incisions.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "09:00 AM – 01:00 PM",
      room: "Neuro Sciences OPD, Level 3, Room 301",
    },
  },
  {
    id: "vivek-nambiar",
    slug: "vivek-nambiar",
    name: "Dr. Vivek Nambiar",
    designation: "Chief Neurologist & Stroke Specialist",
    qualifications: "MD, DM (Neurology), FINR (Stroke)",
    specialty: "Hyperacute Stroke & Neuro-Vascular Medicine",
    department: "Neurology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 22,
    overview:
      "Dr. Vivek Nambiar leads the Comprehensive Stroke Center at Lisie. He specializes in hyperacute mechanical thrombectomy, intravenous thrombolysis, and carotid stenting.",
    areaOfExpertise: [
      "Mechanical thrombectomy for acute ischemic stroke",
      "Thrombolytic therapy & stroke triage pathways",
      "Carotid artery stenting & angioplasty",
      "Intracranial stenosis & vascular headaches",
      "Neuro-critical care monitoring",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Calicut",
      "MD (General Medicine) - JIPMER, Puducherry",
      "DM (Neurology) - Sree Chitra Tirunal Institute",
      "Stroke & Neuro-intervention Fellowship (Calgary, Canada)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "BE-FAST: Spotting Stroke Symptoms Within the Crucial 4.5-Hour Window",
        date: "August 15, 2024",
        readTime: "4 min read",
        summary: "Balance, eyes, face, arm, speech, and time: Essential indicators that determine clot-busting success.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "Neuro Sciences OPD, Level 3, Room 302",
    },
  },
  {
    id: "deepa-cs",
    slug: "deepa-cs",
    name: "Dr. Deepa C. S.",
    designation: "Senior Consultant Neurologist",
    qualifications: "MD, DM (Neurology), FACP",
    specialty: "Epilepsy & Movement Disorders",
    department: "Neurology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 19,
    overview:
      "Dr. Deepa C. S. specializes in refractory epilepsy, Parkinson's disease medical management, deep brain stimulation (DBS) pre-surgical evaluations, and neuromuscular diseases.",
    areaOfExpertise: [
      "Video-EEG monitoring & refractory epilepsy surgery workup",
      "Parkinson's disease, tremor, and dystonia therapies",
      "Botulinum toxin injections for spasticity and hemifacial spasm",
      "Myasthenia gravis & peripheral neuropathies",
      "Migraine and chronic facial pain syndromes",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "MD (Medicine) - Madras Medical College, Chennai",
      "DM (Neurology) - NIMHANS, Bangalore",
      "Fellow of the American College of Physicians",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "Living with Parkinson's: Holistic Medical and Motor Management",
        date: "July 11, 2024",
        readTime: "6 min read",
        summary: "Early motor indicators, medication timing, and lifestyle strategies to preserve quality of life.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Friday",
      timings: "09:00 AM – 01:00 PM",
      room: "Neuro Sciences OPD, Level 3, Room 305",
    },
  },
  {
    id: "arun-kumar",
    slug: "arun-kumar",
    name: "Dr. Arun Kumar",
    designation: "Consultant Neurosurgeon",
    qualifications: "MS, MCh (Neurosurgery)",
    specialty: "Spine Surgery & Neurotrauma",
    department: "Neurology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-specialist-male.jpg",
    experienceYears: 15,
    overview:
      "Dr. Arun Kumar is an accomplished spine and brain surgeon dedicated to endoscopic disc discectomy, spinal fusion, and emergency surgical stabilization in head trauma.",
    areaOfExpertise: [
      "Endoscopic lumbar and cervical discectomy",
      "Spinal stabilization for traumatic vertebral fractures",
      "Cranio-cerebral trauma & decompressive craniectomy",
      "Peripheral nerve decompression (Carpal tunnel, ulnar)",
      "Hydrocephalus VP shunt surgery",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Thrissur",
      "MS (General Surgery) - Medical College, Kottayam",
      "MCh (Neurosurgery) - Government Medical College, Trivandrum",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Sciatica & Herniated Discs: When Conservative Care Needs Endoscopic Relief",
        date: "June 05, 2024",
        readTime: "5 min read",
        summary: "Clear guidelines on identifying persistent nerve compression vs transient muscular spasm.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Friday, Saturday",
      timings: "02:00 PM – 05:00 PM",
      room: "Neuro Sciences OPD, Level 3, Room 303",
    },
  },
  {
    id: "boby-varkey-maramattom",
    slug: "boby-varkey-maramattom",
    name: "Dr. Boby Varkey Maramattom",
    designation: "Senior Consultant Neurologist",
    qualifications: "MD, DM (Neuro), MNAMS",
    specialty: "Cognitive Neurology & Dementia",
    department: "Neurology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-oncologist.jpg",
    experienceYears: 23,
    overview:
      "Dr. Boby Varkey is a globally published researcher in dementia syndromes, Alzheimer's clinical trials, autoimmune encephalitis, and central nervous system infections.",
    areaOfExpertise: [
      "Alzheimer's disease & vascular dementia evaluation",
      "Autoimmune encephalitis & paraneoplastic syndromes",
      "Multiple sclerosis & neuromyelitis optica (NMO)",
      "CNS infectious diseases & meningitis follow-up",
      "Sleep neurology & restless leg syndrome",
    ],
    qualificationsList: [
      "MBBS - Kasturba Medical College, Manipal",
      "MD (Medicine) - St. John's Medical College, Bangalore",
      "DM (Neurology) - Sree Chitra Tirunal Institute",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Normal Aging vs Early Memory Loss: What Families Must Understand",
        date: "May 20, 2024",
        readTime: "6 min read",
        summary: "Distinguishing benign absentmindedness from executive cognitive decline.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "10:00 AM – 02:00 PM",
      room: "Neuro Sciences OPD, Level 3, Room 307",
    },
  },
  {
    id: "manoj-p",
    slug: "manoj-p",
    name: "Dr. Manoj P.",
    designation: "Consultant Interventional Neurologist",
    qualifications: "MD, DM (Neurology), PDF (Intervention)",
    specialty: "Endovascular Neuro-Interventions",
    department: "Neurology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 13,
    overview:
      "Dr. Manoj P. focuses on catheter-directed brain treatments, coiling of cerebral aneurysms, dural arteriovenous fistula embolization, and spinal angiography.",
    areaOfExpertise: [
      "Brain aneurysm coiling and flow diverter placement",
      "Arteriovenous malformation (AVM) embolization",
      "Mechanical thrombectomy for large vessel occlusions",
      "Diagnostic 4-vessel digital subtraction angiography (DSA)",
      "WADA test and pre-operative tumor embolization",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kozhikode",
      "MD (General Medicine) - Medical College, Trivandrum",
      "DM (Neurology) - AIIMS, New Delhi",
      "Post-Doctoral Fellowship in Neuro-intervention",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Flow Diverters: Modern Breakthroughs in Treating Unruptured Aneurysms",
        date: "April 02, 2024",
        readTime: "5 min read",
        summary: "How minimally invasive mesh stents heal complex cerebral vascular weak points.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "01:00 PM – 04:30 PM",
      room: "Neuro Sciences OPD, Level 3, Room 304",
    },
  },
  {
    id: "shalini-nair",
    slug: "shalini-nair",
    name: "Dr. Shalini Nair",
    designation: "Consultant Pediatric Neurologist",
    qualifications: "MD (Paed), DM (Pediatric Neurology)",
    specialty: "Pediatric Neurology & Developmental Delays",
    department: "Neurology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 12,
    overview:
      "Dr. Shalini Nair manages childhood neurological conditions including cerebral palsy, neurometabolic disorders, genetic epilepsies, and neurodevelopmental delay.",
    areaOfExpertise: [
      "Childhood epilepsies & ketogenic diet therapy",
      "Cerebral palsy multimodality rehabilitation",
      "Autism spectrum & ADHD neuro-developmental workup",
      "Muscular dystrophies & spinal muscular atrophy (SMA)",
      "Pediatric demyelinating diseases",
    ],
    qualificationsList: [
      "MBBS - Christian Medical College, Vellore",
      "MD (Paediatrics) - Institute of Child Health, Chennai",
      "DM (Pediatric Neurology) - AIIMS, New Delhi",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "Febrile Seizures vs Childhood Epilepsy: Reassuring Facts for Anxious Parents",
        date: "March 11, 2024",
        readTime: "5 min read",
        summary: "Why fever-induced seizures are generally benign and what action plan to follow at home.",
      },
    ],
    opdSchedule: {
      days: "Wednesday, Friday, Saturday",
      timings: "09:30 AM – 01:30 PM",
      room: "Neuro Sciences OPD, Level 3, Room 306",
    },
  },
  {
    id: "vinayan-kp",
    slug: "vinayan-kp",
    name: "Dr. Vinayan K. P.",
    designation: "Consultant Neurologist & Epileptologist",
    qualifications: "MD, DM, FRCP (Edin)",
    specialty: "Comprehensive Epilepsy & Clinical Neurophysiology",
    department: "Neurology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-pediatrician.jpg",
    experienceYears: 25,
    overview:
      "Dr. Vinayan K. P. is a nationally respected authority on medical and surgical management of difficult-to-control seizures, intracranial EEG recordings, and vagus nerve stimulation (VNS).",
    areaOfExpertise: [
      "Presurgical evaluation for drug-resistant seizures",
      "Vagus Nerve Stimulation (VNS) programming",
      "Intracranial stereo-EEG monitoring",
      "Electromyography (EMG) and nerve conduction studies",
      "Genetic and autoimmune seizure syndromes",
    ],
    qualificationsList: [
      "MBBS - Medical College, Kottayam",
      "MD (Medicine) - Medical College, Trivandrum",
      "DM (Neurology) - Sree Chitra Tirunal Institute",
      "FRCP - Royal College of Physicians of Edinburgh",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Drug-Resistant Epilepsy: Exploring Surgical Cures When Tablets Fail",
        date: "January 28, 2024",
        readTime: "7 min read",
        summary: "How precision brain mapping pinpoints epileptogenic foci for curative microsurgical resection.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday",
      timings: "10:00 AM – 02:00 PM",
      room: "Neuro Sciences OPD, Level 3, Room 308",
    },
  },

  // ==========================================
  // ORTHOPAEDICS (8 DOCTORS)
  // ==========================================
  {
    id: "roy-mampilly",
    slug: "roy-mampilly",
    name: "Dr. Roy J. Mampilly",
    designation: "Senior Consultant Joint Replacement",
    qualifications: "MS (Ortho), DNB (Ortho), MCh (Ortho)",
    specialty: "Robotic Joint Replacement & Complex Arthroplasty",
    department: "Orthopaedics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 28,
    overview:
      "Dr. Roy J. Mampilly has performed over 12,000 primary and revision total knee and hip replacements. He introduced computer-navigated and robotic joint arthroplasty at Lisie Hospital.",
    areaOfExpertise: [
      "Robotic-assisted total knee arthroplasty (TKA)",
      "Anterior approach total hip arthroplasty (THA)",
      "Revision knee and hip joint replacements",
      "Partial / Unicompartmental knee replacement",
      "Osteotomy around the knee for early arthritis",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "MS (Orthopaedics) - Government Medical College, Trivandrum",
      "DNB (Orthopaedics) - National Board of Examinations",
      "MCh (Ortho) - University of Dundee, UK",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Robotic Knee Replacement: Sub-Millimeter Accuracy and Faster Recovery",
        date: "September 12, 2024",
        readTime: "5 min read",
        summary: "How bone-preserving robotic alignment enables patients to walk comfortably within 24 hours.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "09:00 AM – 01:00 PM",
      room: "Bone & Joint Center, Ground Floor, Room 12",
    },
  },
  {
    id: "paul-joseph",
    slug: "paul-joseph",
    name: "Dr. Paul Joseph",
    designation: "Senior Consultant Spine & Ortho Surgeon",
    qualifications: "MS (Ortho), FNB (Spine)",
    specialty: "Spine Surgery & Deformity Correction",
    department: "Orthopaedics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-specialist-male.jpg",
    experienceYears: 20,
    overview:
      "Dr. Paul Joseph treats degenerative spine conditions, adult scoliosis, kyphosis correction, and spinal canal stenosis through motion-sparing spinal techniques.",
    areaOfExpertise: [
      "Minimally invasive spinal fusion (TLIF/DLIF)",
      "Scoliosis and kyphosis deformity reconstruction",
      "Cervical disc arthroplasty (Artificial disc)",
      "Vertebroplasty and kyphoplasty for osteoporotic fractures",
      "Spinal tuberculosis surgical drainage and stabilization",
    ],
    qualificationsList: [
      "MBBS - St. John's Medical College, Bangalore",
      "MS (Orthopaedics) - Christian Medical College, Ludhiana",
      "FNB (Spine Surgery) - Ganga Hospital, Coimbatore",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Cervical Disc Replacement: Protecting Neck Mobility over Fusion",
        date: "July 24, 2024",
        readTime: "5 min read",
        summary: "Why artificial cervical disc implants prevent adjacent segment degeneration in young active adults.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "09:30 AM – 01:30 PM",
      room: "Bone & Joint Center, Ground Floor, Room 14",
    },
  },
  {
    id: "tony-kavalakat",
    slug: "tony-kavalakat",
    name: "Dr. Tony Kavalakat",
    designation: "Chief Arthroscopy & Sports Medicine Surgeon",
    qualifications: "MS (Ortho), Fellowship in Sports Medicine",
    specialty: "Arthroscopic Surgery & Sports Injuries",
    department: "Orthopaedics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-pediatrician.jpg",
    experienceYears: 17,
    overview:
      "Dr. Tony Kavalakat has treated prominent state and national athletes, specializing in keyhole repair of torn ligaments (ACL, PCL), rotator cuff tears, and recurrent shoulder dislocations.",
    areaOfExpertise: [
      "Arthroscopic ACL and PCL multi-ligament reconstructions",
      "Meniscus repair and meniscus root preservation",
      "Arthroscopic Bankart repair & Latarjet for shoulder instability",
      "Rotator cuff tendon repair & subacromial decompression",
      "Cartilage restoration (OATS / Autologous chondrocyte)",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Calicut",
      "MS (Orthopaedics) - Medical College, Kottayam",
      "Fellowship in Arthroscopy & Sports Medicine (Seoul, South Korea)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "ACL Tears in Sports: Reconstruction, Rehab, and Safe Return to Play",
        date: "June 18, 2024",
        readTime: "6 min read",
        summary: "A modern milestone-based recovery blueprint for high-impact athletes.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Friday",
      timings: "02:00 PM – 05:00 PM",
      room: "Bone & Joint Center, Ground Floor, Room 15",
    },
  },
  {
    id: "binu-p-thomas",
    slug: "binu-p-thomas",
    name: "Dr. Binu P. Thomas",
    designation: "Consultant Hand & Microvascular Surgeon",
    qualifications: "MS, DNB (Ortho), MCh (Hand Surgery)",
    specialty: "Hand, Wrist & Peripheral Nerve Reconstruction",
    department: "Orthopaedics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-oncologist.jpg",
    experienceYears: 22,
    overview:
      "Dr. Binu P. Thomas brings elite expertise in re-implantation of severed digits, brachial plexus surgery, wrist arthroscopy, and complex congenital hand anomalies.",
    areaOfExpertise: [
      "Microvascular emergency digit re-implantation",
      "Brachial plexus injury nerve transfers",
      "Scaphoid non-union fixation & wrist arthroscopy",
      "Congenital hand deformities (Syndactyly, Polydactyly)",
      "Tendon transfers for radial/median/ulnar nerve palsy",
    ],
    qualificationsList: [
      "MBBS - Christian Medical College, Vellore",
      "MS (Orthopaedics) - Christian Medical College, Vellore",
      "Fellowship in Hand & Microvascular Surgery (Mayo Clinic, USA)",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "Immediate First Aid for Traumatic Hand and Finger Amputations",
        date: "May 08, 2024",
        readTime: "4 min read",
        summary: "Critical cold-preservation rules that determine successful microvascular re-attachment.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Friday",
      timings: "10:00 AM – 02:00 PM",
      room: "Bone & Joint Center, Ground Floor, Room 16",
    },
  },
  {
    id: "sujit-jos",
    slug: "sujit-jos",
    name: "Dr. Sujit Jos",
    designation: "Senior Consultant Joint Arthroplasty",
    qualifications: "MS (Ortho), DNB, FRCS (Tr & Orth)",
    specialty: "Hip Preservation & Joint Replacement",
    department: "Orthopaedics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-cardiac-surgeon.jpg",
    experienceYears: 21,
    overview:
      "Dr. Sujit Jos specializes in young adult hip disorders, pelvic osteotomies, avascular necrosis (AVN) of the femoral head, and ceramic-on-ceramic total hip replacements.",
    areaOfExpertise: [
      "Hip preservation surgery & Ganz periacetabular osteotomy",
      "Core decompression & regenerative therapy for AVN hip",
      "Direct Anterior Approach (DAA) hip replacement",
      "High-flexion total knee replacement",
      "Uncemented hydroxyapatite-coated implants",
    ],
    qualificationsList: [
      "MBBS - Kasturba Medical College, Mangalore",
      "MS (Orthopaedics) - Government Medical College, Trivandrum",
      "FRCS (Trauma & Ortho) - Intercollegiate Specialty Board, UK",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Avascular Necrosis (AVN) of the Hip: Catching It Before Collapse",
        date: "April 14, 2024",
        readTime: "5 min read",
        summary: "Understanding steroid use, alcohol risk factors, and joint-saving regenerative techniques.",
      },
    ],
    opdSchedule: {
      days: "Wednesday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "Bone & Joint Center, Ground Floor, Room 11",
    },
  },
  {
    id: "rajesh-ks",
    slug: "rajesh-ks",
    name: "Dr. Rajesh K. S.",
    designation: "Consultant Pediatric Orthopaedic Surgeon",
    qualifications: "MS (Ortho), Fellowship in Pediatric Ortho",
    specialty: "Pediatric Bone Deformities & Clubfoot",
    department: "Orthopaedics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 16,
    overview:
      "Dr. Rajesh K. S. treats limb deformities, developmental dysplasia of the hip (DDH), Ponseti clubfoot casting, and neuromuscular musculoskeletal conditions in children.",
    areaOfExpertise: [
      "Ponseti method for congenital clubfoot (CTEV)",
      "Early ultrasound screening & open reduction for DDH",
      "Limb lengthening and deformity correction (Hexapod/Ilizarov)",
      "Pediatric fracture management with flexible nails",
      "Perthes disease & slipped capital femoral epiphysis",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Calicut",
      "MS (Orthopaedics) - Medical College, Kottayam",
      "Fellowship in Pediatric Orthopaedics (CMC Vellore)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Clubfoot Correction with Ponseti Casting: A Gentle, Painless Cure",
        date: "March 03, 2024",
        readTime: "4 min read",
        summary: "How serial gentle plaster casts restore normal infant feet without extensive surgery.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday",
      timings: "09:00 AM – 01:00 PM",
      room: "Bone & Joint Center, Ground Floor, Room 18",
    },
  },
  {
    id: "abraham-george",
    slug: "abraham-george",
    name: "Dr. Abraham George",
    designation: "Consultant Trauma & Reconstructive Surgeon",
    qualifications: "MS (Ortho), AO Trauma Fellow",
    specialty: "Complex Fractures & Polytrauma Care",
    department: "Orthopaedics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-specialist-male.jpg",
    experienceYears: 14,
    overview:
      "Dr. Abraham George leads the round-the-clock emergency orthopedic trauma response, handling pelvic fractures, intra-articular injuries, and non-union reconstructions.",
    areaOfExpertise: [
      "Pelvi-acetabular fracture reconstruction",
      "Complex peri-articular tibial plateau and distal femur fractures",
      "Infected non-union & bone transport (Ilizarov technique)",
      "Damage-control orthopaedics in polytrauma patients",
      "Minimally invasive percutaneous plate osteosynthesis (MIPPO)",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Thrissur",
      "MS (Orthopaedics) - Government Medical College, Trivandrum",
      "AO Trauma Fellowship (Davos, Switzerland)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Damage Control Orthopaedics: Managing Critical Polytrauma Emergencies",
        date: "February 16, 2024",
        readTime: "5 min read",
        summary: "Balancing immediate fracture stabilization with hemodynamic stabilization in ICU trauma care.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Friday",
      timings: "02:00 PM – 05:00 PM",
      room: "Bone & Joint Center, Ground Floor, Room 13",
    },
  },
  {
    id: "anoop-balakrishnan",
    slug: "anoop-balakrishnan",
    name: "Dr. Anoop Balakrishnan",
    designation: "Associate Consultant Orthopaedics",
    qualifications: "MBBS, DNB (Ortho), MNAMS",
    specialty: "General Orthopaedics & Foot and Ankle",
    department: "Orthopaedics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-pediatrician.jpg",
    experienceYears: 9,
    overview:
      "Dr. Anoop Balakrishnan focuses on foot and ankle pathologies, bunion corrections, Achilles tendon ruptures, diabetic foot biomechanics, and general orthopedic care.",
    areaOfExpertise: [
      "Ankle arthroscopy & lateral ligament reconstruction",
      "Bunion (Hallux valgus) osteotomies & flatfoot reconstruction",
      "Plantar fasciitis shockwave and biological therapies",
      "Achilles tendon percutaneous repair",
      "Conservative management of osteoporosis and osteoarthritis",
    ],
    qualificationsList: [
      "MBBS - Amrita Institute of Medical Sciences, Kochi",
      "DNB (Orthopaedics) - National Board of Examinations",
      "Fellowship in Foot and Ankle Surgery",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Chronic Heel Pain: Understanding Plantar Fasciitis and Effective Stretches",
        date: "January 19, 2024",
        readTime: "4 min read",
        summary: "Targeted rehabilitation exercises and footwear modifications that resolve morning heel pain.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "Bone & Joint Center, Ground Floor, Room 17",
    },
  },

  // ==========================================
  // GYNAECOLOGY (8 DOCTORS)
  // ==========================================
  {
    id: "mary-varghese",
    slug: "mary-varghese",
    name: "Dr. Mary Varghese",
    designation: "Senior Consultant Obstetrician & Gynaecologist",
    qualifications: "MD (OBG), DGO, FICOG",
    specialty: "High-Risk Pregnancy & Normal Physiological Childbirth",
    department: "Gynaecology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 30,
    overview:
      "Dr. Mary Varghese has safely delivered over 18,000 babies over three decades of devoted clinical practice. She advocates strongly for evidence-based natural birthing and compassionate maternal care.",
    areaOfExpertise: [
      "Management of high-risk obstetrics & pre-eclampsia",
      "Gestational diabetes & multiple pregnancies (Twins)",
      "Painless labor analgesia & natural childbirth support",
      "Recurrent pregnancy loss (miscarriage) evaluation",
      "Menopause transition & hormone replacement therapies",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "DGO - Government Medical College, Trivandrum",
      "MD (OBG) - Government Medical College, Trivandrum",
      "Fellow of Indian College of Obstetricians and Gynaecologists (FICOG)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Preparing for Childbirth: What to Expect in Each Trimester",
        date: "September 08, 2024",
        readTime: "6 min read",
        summary: "Nutrition, physical conditioning, and mental peace through every stage of pregnancy.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "08:30 AM – 12:30 PM",
      room: "Women & Child Block, Level 1, Room 101",
    },
  },
  {
    id: "radhamany-k",
    slug: "radhamany-k",
    name: "Dr. Radhamany K.",
    designation: "Chief Gynaecologist & Laparoscopic Surgeon",
    qualifications: "MD, DGO, FICOG, FMAS",
    specialty: "Minimally Invasive Gynaecology & Endometriosis",
    department: "Gynaecology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 27,
    overview:
      "Dr. Radhamany K. is an authority on advanced 3D laparoscopy for deep infiltrating endometriosis, large uterine fibroids, and total laparoscopic hysterectomy with rapid same-day ambulation.",
    areaOfExpertise: [
      "Total Laparoscopic Hysterectomy (TLH)",
      "Laparoscopic myomectomy for large fibroids",
      "Excision surgery for severe deep infiltrating endometriosis",
      "Operative hysteroscopy for polyps, septa, and synechiae",
      "Pelvic organ prolapse mesh-free laparoscopic suspensions",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Calicut",
      "MD (OBG) - Medical College, Kottayam",
      "Fellowship in Minimal Access Surgery (FMAS)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Endometriosis: Conquering Chronic Pelvic Pain with Precision Laparoscopy",
        date: "August 20, 2024",
        readTime: "5 min read",
        summary: "Why complete excision rather than superficial ablation provides enduring pain relief.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "09:00 AM – 01:00 PM",
      room: "Women & Child Block, Level 1, Room 103",
    },
  },
  {
    id: "elizabeth-george",
    slug: "elizabeth-george",
    name: "Dr. Elizabeth George",
    designation: "Senior Consultant High-Risk Obstetrics",
    qualifications: "MD (OBG), MRCOG (UK)",
    specialty: "Perinatology & Maternal-Fetal Medicine",
    department: "Gynaecology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 21,
    overview:
      "Dr. Elizabeth George provides multidisciplinary care for mothers with pre-existing heart disease, kidney disorders, autoimmune lupus, and severe intrauterine growth restriction (IUGR).",
    areaOfExpertise: [
      "Cardiac disease complicating pregnancy",
      "Cervical cerclage & preterm delivery prevention",
      "Rh-isoimmunization & fetal doppler surveillance",
      "Vaginal birth after cesarean (VBAC) protocol",
      "Intensive obstetric critical care",
    ],
    qualificationsList: [
      "MBBS - Christian Medical College, Vellore",
      "MD (OBG) - St. John's Medical College, Bangalore",
      "Member of the Royal College of Obstetricians and Gynaecologists (MRCOG)",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "VBAC Safety: How Careful Monitoring Makes Normal Delivery Feasible After C-Section",
        date: "July 15, 2024",
        readTime: "5 min read",
        summary: "Clinical selection criteria and continuous fetal monitoring that assure peace of mind.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Friday",
      timings: "09:30 AM – 01:30 PM",
      room: "Women & Child Block, Level 1, Room 105",
    },
  },
  {
    id: "susan-thomas",
    slug: "susan-thomas",
    name: "Dr. Susan Thomas",
    designation: "Consultant Infertility & Reproductive Medicine",
    qualifications: "MD, DGO, Fellowship in Reproductive Medicine",
    specialty: "Fertility Evaluation, IUI & IVF",
    department: "Gynaecology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 16,
    overview:
      "Dr. Susan Thomas helps couples navigate their parenthood journey through compassionate, individualized fertility assessments, PCOS metabolic management, and advanced reproductive protocols.",
    areaOfExpertise: [
      "Ovulation induction & Intrauterine Insemination (IUI)",
      "Polycystic Ovarian Syndrome (PCOS) lifestyle and medical therapy",
      "Ovarian reserve testing (AMH) & fertility preservation",
      "Diagnostic and operative hysteroscopy for uterine cavity defects",
      "Recurrent implantation failure protocols",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "MD (OBG) - Kasturba Medical College, Manipal",
      "Fellowship in Reproductive Medicine (CRAFT Fertility Center)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "PCOS and Conception: Overcoming Hormonal Hurdles with Lifestyle and Science",
        date: "June 25, 2024",
        readTime: "6 min read",
        summary: "Targeted dietary regulation, insulin sensitizers, and gentle ovulation induction strategies.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Wednesday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "Women & Child Block, Level 2, Room 202",
    },
  },
  {
    id: "anitha-m",
    slug: "anitha-m",
    name: "Dr. Anitha M.",
    designation: "Consultant Fetal Medicine Specialist",
    qualifications: "MD (OBG), FMF Certified (UK)",
    specialty: "Advanced Fetal Ultrasound & Genetics",
    department: "Gynaecology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 15,
    overview:
      "Dr. Anitha M. is certified by the Fetal Medicine Foundation (London) to perform precision 11-13 week NT scans, targeted anomaly scans, fetal echocardiography, and amniocentesis.",
    areaOfExpertise: [
      "First trimester NT scan & pre-eclampsia screening",
      "Detailed 18-20 week fetal anatomy anomaly scan",
      "Fetal Doppler & growth restriction monitoring",
      "Amniocentesis & chorionic villus sampling (CVS)",
      "Non-Invasive Prenatal Testing (NIPT) genetic counseling",
    ],
    qualificationsList: [
      "MBBS - Medical College, Kottayam",
      "MD (OBG) - Government Medical College, Kozhikode",
      "Fellow of the Fetal Medicine Foundation, London (FMF)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "The NT Scan: Why Weeks 11-13 Are Crucial for Fetal Health Insights",
        date: "May 19, 2024",
        readTime: "4 min read",
        summary: "Detecting chromosomal risks and early placental health with modern ultrasound biomarkers.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "10:00 AM – 02:00 PM",
      room: "Women & Child Block, Level 2, Room 206",
    },
  },
  {
    id: "lakshmi-r",
    slug: "lakshmi-r",
    name: "Dr. Lakshmi R.",
    designation: "Senior Consultant Gynaecological Oncology",
    qualifications: "MS (OBG), MCh (Gynae Oncology)",
    specialty: "Cancers of Uterus, Cervix & Ovaries",
    department: "Gynaecology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 18,
    overview:
      "Dr. Lakshmi R. performs radical surgical cytoreduction for ovarian cancer, radical hysterectomies, sentinel lymph node biopsies, and preventative screening for women at high genetic risk (BRCA).",
    areaOfExpertise: [
      "Radical hysterectomy for cervical cancer",
      "Maximal cytoreductive surgery for advanced ovarian malignancy",
      "Minimally invasive laparoscopic staging for endometrial cancer",
      "Colposcopy and management of abnormal PAP smears (CIN)",
      "BRCA mutation risk-reducing salpingo-oophorectomy",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "MS (OBG) - AIIMS, New Delhi",
      "MCh (Gynaecological Oncology) - Tata Memorial Centre, Mumbai",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Cervical Cancer is 100% Preventable: The Dual Power of HPV Vaccines and Pap Smears",
        date: "April 09, 2024",
        readTime: "5 min read",
        summary: "How regular screening catches pre-cancerous lesions a decade before symptoms appear.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Friday",
      timings: "09:00 AM – 01:00 PM",
      room: "Comprehensive Cancer Centre, Level 2, Room 212",
    },
  },
  {
    id: "renuka-p",
    slug: "renuka-p",
    name: "Dr. Renuka P.",
    designation: "Consultant Obstetrician & Gynaecologist",
    qualifications: "MS (OBG), DNB (OBG)",
    specialty: "Adolescent Gynaecology & Pelvic Health",
    department: "Gynaecology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 12,
    overview:
      "Dr. Renuka P. specializes in adolescent menstrual disorders, heavy menstrual bleeding management, hysteroscopic polypectomy, and pelvic floor strengthening.",
    areaOfExpertise: [
      "Adolescent irregular periods & dysmenorrhea therapies",
      "Endometrial ablation & Mirena IUD insertion for menorrhagia",
      "Uterine fibroid medical and conservative management",
      "Postpartum pelvic floor rehabilitation",
      "Contraceptive and family planning counseling",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Thrissur",
      "MS (OBG) - Medical College, Kottayam",
      "DNB (OBG) - National Board of Examinations",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Severe Period Cramps (Dysmenorrhea): When It's Not 'Just Normal' Pain",
        date: "March 27, 2024",
        readTime: "4 min read",
        summary: "Identifying secondary causes like adenomyosis and polyps for timely non-surgical relief.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Saturday",
      timings: "02:00 PM – 05:00 PM",
      room: "Women & Child Block, Level 1, Room 107",
    },
  },
  {
    id: "rekha-kurian",
    slug: "rekha-kurian",
    name: "Dr. Rekha Kurian",
    designation: "Senior Consultant Laparoscopic Surgeon",
    qualifications: "MD (OBG), DGO, Dip. MAS (Germany)",
    specialty: "Advanced Endoscopic Pelvic Surgeries",
    department: "Gynaecology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 24,
    overview:
      "Dr. Rekha Kurian is renowned for performing intricate keyhole gynecological procedures with virtually imperceptible scarring and minimal post-operative discomfort.",
    areaOfExpertise: [
      "Laparoscopic ovarian cystectomy preserving ovarian reserve",
      "Tubal recanalization microsurgery",
      "Hysteroscopic adhesiolysis for Asherman's syndrome",
      "Laparoscopic management of ectopic pregnancy",
      "Sacrocolpopexy for vault prolapse",
    ],
    qualificationsList: [
      "MBBS - Kasturba Medical College, Manipal",
      "MD (OBG) - Madras Medical College",
      "Diploma in Minimal Access Surgery (Kiel, Germany)",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "Preserving Ovarian Reserve During Ovarian Cyst Removal",
        date: "February 22, 2024",
        readTime: "5 min read",
        summary: "Why bipolar coagulation control and precise capsule peeling protect future fertility.",
      },
    ],
    opdSchedule: {
      days: "Wednesday, Friday",
      timings: "09:00 AM – 01:00 PM",
      room: "Women & Child Block, Level 1, Room 108",
    },
  },

  // ==========================================
  // PAEDIATRICS (8 DOCTORS)
  // ==========================================
  {
    id: "suresh-kumar-p",
    slug: "suresh-kumar-p",
    name: "Dr. Suresh Kumar P.",
    designation: "Chief Paediatrician & Child Health Specialist",
    qualifications: "MD (Paed), DCH, FIAP",
    specialty: "General Paediatrics & Child Growth Monitoring",
    department: "Paediatrics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-pediatrician.jpg",
    experienceYears: 29,
    overview:
      "Dr. Suresh Kumar P. has cared for generations of children in Kochi. He leads Lisie's pediatric outpatient department with an emphasis on preventive immunizations, developmental milestones, and antibiotic stewardship.",
    areaOfExpertise: [
      "Routine infant immunization & travel vaccines",
      "Developmental delay & milestone tracking",
      "Pediatric asthma and seasonal allergies",
      "Childhood nutrition and failure to thrive",
      "Recurrent respiratory and ear infections",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "DCH - Government Medical College, Trivandrum",
      "MD (Pediatrics) - Medical College, Calicut",
      "Fellow of Indian Academy of Pediatrics (FIAP)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Childhood Immunity: Simple Nutritional Habits that Shield Your Little One",
        date: "September 02, 2024",
        readTime: "5 min read",
        summary: "Practical guidance on dietary variety, outdoor play, and judicious antibiotic use.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "08:30 AM – 12:30 PM",
      room: "Child Health Center, Level 1, Room 10",
    },
  },
  {
    id: "vc-manoj",
    slug: "vc-manoj",
    name: "Dr. V. C. Manoj",
    designation: "Chief Neonatologist & In-charge Level-3 NICU",
    qualifications: "MD (Paed), DM (Neonatology)",
    specialty: "Extremely Preterm Infant Intensive Care",
    department: "Paediatrics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 24,
    overview:
      "Dr. V. C. Manoj directs the tertiary Level-3 Neonatal Intensive Care Unit (NICU), caring for fragile premature infants born as early as 24 weeks with advanced ventilation and therapeutic hypothermia.",
    areaOfExpertise: [
      "High-frequency oscillatory ventilation & nitric oxide therapy",
      "Therapeutic cooling for birth asphyxia (HIE)",
      "Total Parenteral Nutrition (TPN) for extreme preemies",
      "Neonatal cardiac bedside echocardiography",
      "Neurodevelopmental follow-up for NICU graduates",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "MD (Pediatrics) - AIIMS, New Delhi",
      "DM (Neonatology) - PGIMER, Chandigarh",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Miracles in the NICU: The Science Behind Saving 500-Gram Preterm Babies",
        date: "August 10, 2024",
        readTime: "6 min read",
        summary: "How surfactant therapy, gentle ventilation, and kangaroo mother care rewrite preterm survival.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "09:00 AM – 01:00 PM",
      room: "Level 3 NICU Complex, 2nd Floor",
    },
  },
  {
    id: "meera-nambiar",
    slug: "meera-nambiar",
    name: "Dr. Meera Nambiar",
    designation: "Senior Consultant Pediatric Intensive Care (PICU)",
    qualifications: "MD (Paed), FNB (Pediatric Critical Care)",
    specialty: "Pediatric Critical Care & Emergency Resuscitation",
    department: "Paediatrics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 18,
    overview:
      "Dr. Meera Nambiar leads the Pediatric Intensive Care Unit, coordinating acute management of septic shock, status epilepticus, severe dengue complications, and acute respiratory distress.",
    areaOfExpertise: [
      "Pediatric advanced life support (PALS)",
      "Continuous renal replacement therapy (CRRT) in children",
      "Management of multi-organ failure and severe sepsis",
      "Pediatric neuro-trauma critical care",
      "Point-of-care pediatric lung ultrasound (POCUS)",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Calicut",
      "MD (Pediatrics) - JIPMER, Puducherry",
      "FNB (Pediatric Critical Care) - Sir Ganga Ram Hospital, New Delhi",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Recognizing Sepsis in Children: When a Common Fever Demands Emergency Triage",
        date: "July 08, 2024",
        readTime: "5 min read",
        summary: "Cold extremities, rapid breathing, and lethargy: Warning signs every caregiver should recognize.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Friday",
      timings: "10:00 AM – 02:00 PM",
      room: "Child Health Center, Level 1, Room 14",
    },
  },
  {
    id: "rajesh-sharma",
    slug: "rajesh-sharma",
    name: "Dr. Rajesh Sharma",
    designation: "Senior Consultant Paediatrician",
    qualifications: "MD (Paed), DCH, MRCPCH (UK)",
    specialty: "Allergy, Immunology & Pediatric Asthma",
    department: "Paediatrics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-pediatrician.jpg",
    experienceYears: 16,
    overview:
      "Dr. Rajesh Sharma specializes in childhood allergy testing, atopic dermatitis, inhaler technique optimization for pediatric wheezers, and recurrent food intolerances.",
    areaOfExpertise: [
      "Childhood asthma action plans and spirometry",
      "Skin prick allergy testing & sublingual immunotherapy",
      "Eczema / Atopic dermatitis biological management",
      "Food allergies & chronic urticaria",
      "Primary immunodeficiency screening",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Thrissur",
      "MD (Pediatrics) - Medical College, Kottayam",
      "MRCPCH - Royal College of Paediatrics and Child Health, UK",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Inhalers Are Safe: Dispelling Myths Around Pediatric Asthma Medication",
        date: "June 12, 2024",
        readTime: "4 min read",
        summary: "Why microgram inhalers deliver localized lung relief without systemic side effects.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Friday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "Child Health Center, Level 1, Room 12",
    },
  },
  {
    id: "divya-chandran",
    slug: "divya-chandran",
    name: "Dr. Divya Chandran",
    designation: "Consultant Pediatric Pulmonologist",
    qualifications: "MD (Paed), DM (Pediatric Pulmonology)",
    specialty: "Chronic Cough, Cystic Fibrosis & Sleep Disorders",
    department: "Paediatrics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 13,
    overview:
      "Dr. Divya Chandran manages difficult chronic cough, pediatric bronchoscopies, sleep apnea in children, and congenital airway malformations.",
    areaOfExpertise: [
      "Flexible fiberoptic pediatric bronchoscopy",
      "Congenital airway anomalies (Laryngomalacia, vascular rings)",
      "Cystic fibrosis comprehensive care",
      "Childhood sleep studies & CPAP titration",
      "Bronchopulmonary dysplasia (BPD) home oxygen protocols",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "MD (Pediatrics) - Institute of Child Health, Chennai",
      "DM (Pediatric Pulmonology) - AIIMS, New Delhi",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "Nighttime Snoring in Children: When Enlarged Tonsils Disrupt Deep Rest",
        date: "May 14, 2024",
        readTime: "5 min read",
        summary: "How sleep-disordered breathing impairs daytime attention, mood, and physical growth.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday",
      timings: "02:00 PM – 05:00 PM",
      room: "Child Health Center, Level 1, Room 16",
    },
  },
  {
    id: "vinod-h",
    slug: "vinod-h",
    name: "Dr. Vinod H.",
    designation: "Consultant Pediatric Nephrologist",
    qualifications: "MD, DNB (Paed), DM (Pediatric Nephrology)",
    specialty: "Kidney Disorders in Children & Nephrotic Syndrome",
    department: "Paediatrics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-specialist-male.jpg",
    experienceYears: 14,
    overview:
      "Dr. Vinod H. provides specialized treatment for nephrotic syndrome, congenital urinary anomalies, childhood hypertension, and pediatric dialysis.",
    areaOfExpertise: [
      "Steroid-resistant nephrotic syndrome therapies",
      "Antenatal hydronephrosis & vesicoureteral reflux (VUR)",
      "Pediatric hemodialysis and peritoneal dialysis",
      "Glomerulonephritis & renal tubular acidosis",
      "Pediatric renal transplant preparation",
    ],
    qualificationsList: [
      "MBBS - Medical College, Kottayam",
      "MD (Pediatrics) - PGIMER, Chandigarh",
      "DM (Pediatric Nephrology) - AIIMS, New Delhi",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Swollen Eyelids in Toddlers: Recognizing Nephrotic Syndrome Early",
        date: "April 21, 2024",
        readTime: "4 min read",
        summary: "Why protein leakage in urine requires timely pediatric nephrology evaluation.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday",
      timings: "09:30 AM – 01:30 PM",
      room: "Child Health Center, Level 1, Room 18",
    },
  },
  {
    id: "parvathy-s",
    slug: "parvathy-s",
    name: "Dr. Parvathy S.",
    designation: "Consultant Child Development & Behavioral Paediatrics",
    qualifications: "MD (Paed), Fellowship in Developmental Paediatrics",
    specialty: "Autism, ADHD & Learning Disabilities",
    department: "Paediatrics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 11,
    overview:
      "Dr. Parvathy S. guides children with neuro-divergent needs through coordinated early intervention, speech and occupational therapy referrals, and behavioral modification.",
    areaOfExpertise: [
      "Autism Spectrum Disorder early diagnosis & intervention",
      "Attention Deficit Hyperactivity Disorder (ADHD) support",
      "Specific learning disorders (Dyslexia, dyscalculia)",
      "Speech delay & sensory processing assessments",
      "Parental psycho-education & school accommodations",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Calicut",
      "MD (Pediatrics) - Government Medical College, Trivandrum",
      "Fellowship in Developmental Paediatrics (CMC Vellore)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Early Signs of Autism in Toddlers: The Power of Intervening Before Age 3",
        date: "March 18, 2024",
        readTime: "6 min read",
        summary: "Eye contact, joint attention, and gestures: How early neural plasticity transforms development.",
      },
    ],
    opdSchedule: {
      days: "Wednesday, Friday, Saturday",
      timings: "09:00 AM – 01:00 PM",
      room: "Child Development Unit, Level 2, Room 25",
    },
  },
  {
    id: "anand-philip",
    slug: "anand-philip",
    name: "Dr. Anand Philip",
    designation: "Associate Consultant Neonatology",
    qualifications: "MBBS, DNB (Paed), Fellowship in Neonatology",
    specialty: "Newborn Care & Neonatal Resuscitation",
    department: "Paediatrics",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-cardiac-surgeon.jpg",
    experienceYears: 8,
    overview:
      "Dr. Anand Philip oversees delivery room resuscitations, newborn metabolic screenings, phototherapy for neonatal jaundice, and parental education before discharge.",
    areaOfExpertise: [
      "Newborn screening for congenital metabolic disorders",
      "Neonatal hyperbilirubinemia & phototherapy",
      "Lactation and infant feeding guidance",
      "Late preterm infant stabilization",
      "Routine well-baby clinical visits",
    ],
    qualificationsList: [
      "MBBS - Amrita Institute of Medical Sciences",
      "DNB (Pediatrics) - National Board of Examinations",
      "Fellowship in Neonatology (Lisie Hospital)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Newborn Jaundice: When Is Yellow Skin Natural vs Requiring Blue Light Phototherapy?",
        date: "February 04, 2024",
        readTime: "4 min read",
        summary: "Clear bilirubin safety thresholds and why indirect sunlight is no longer recommended.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Thursday",
      timings: "02:00 PM – 05:00 PM",
      room: "Child Health Center, Level 1, Room 15",
    },
  },

  // ==========================================
  // ONCOLOGY (8 DOCTORS)
  // ==========================================
  {
    id: "george-k-andrews",
    slug: "george-k-andrews",
    name: "Dr. George K. Andrews",
    designation: "Chief Medical Oncologist",
    qualifications: "MD, DM (Medical Oncology), ESMO",
    specialty: "Precision Oncology, Immunotherapy & Chemotherapy",
    department: "Oncology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-oncologist.jpg",
    experienceYears: 28,
    overview:
      "Dr. George K. Andrews is an acclaimed medical oncologist heading Lisie Cancer Centre. He focuses on genomic tumor profiling, targeted therapies, and immune checkpoint inhibitors.",
    areaOfExpertise: [
      "Next-generation sequencing (NGS) targeted cancer therapies",
      "Immune checkpoint inhibitors for lung, melanoma, and renal cancers",
      "Metronomic chemotherapy and curative chemotherapy regimens",
      "Multidisciplinary tumor board coordination",
      "Palliative symptom management and patient comfort",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "MD (Medicine) - Government Medical College, Trivandrum",
      "DM (Medical Oncology) - Kidwai Memorial Institute of Oncology",
      "Certified by the European Society for Medical Oncology (ESMO)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Immunotherapy: Unleashing the Body's Own Immune Cells Against Tumors",
        date: "September 09, 2024",
        readTime: "6 min read",
        summary: "How checkpoint inhibitors transform advanced cancer treatment into long-term disease remission.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "09:00 AM – 01:00 PM",
      room: "Lisie Cancer Centre, Level 1, Room 101",
    },
  },
  {
    id: "sanjeev-sharma",
    slug: "sanjeev-sharma",
    name: "Dr. Sanjeev Sharma",
    designation: "Chief Surgical Oncologist",
    qualifications: "MS, MCh (Surgical Oncology)",
    specialty: "Minimally Invasive Cancer Resection & GI Oncology",
    department: "Oncology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 25,
    overview:
      "Dr. Sanjeev Sharma has performed thousands of major cancer surgeries including Whipple procedures, esophagectomies, limb-salvage sarcoma resections, and laparoscopic colon resections.",
    areaOfExpertise: [
      "Whipple pancreaticoduodenectomy & liver resections",
      "Laparoscopic colorectal cancer surgery with sphincter preservation",
      "Thoracoscopic esophagectomy for esophageal cancer",
      "Soft tissue sarcoma wide excision & limb salvage",
      "Hyperthermic Intraperitoneal Chemotherapy (HIPEC)",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Calicut",
      "MS (General Surgery) - Medical College, Kottayam",
      "MCh (Surgical Oncology) - Tata Memorial Centre, Mumbai",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Laparoscopic Colon Cancer Surgery: Curative Resection with Quick Return Home",
        date: "August 18, 2024",
        readTime: "5 min read",
        summary: "Achieving identical oncological clear margins through high-definition laparoscopic visualization.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "Lisie Cancer Centre, Level 1, Room 103",
    },
  },
  {
    id: "arun-r-warrier",
    slug: "arun-r-warrier",
    name: "Dr. Arun R. Warrier",
    designation: "Senior Consultant Medical Oncology",
    qualifications: "MD, DM (Medical Oncology), ECMO",
    specialty: "Hematologic Malignancies & Breast Cancer",
    department: "Oncology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-specialist-male.jpg",
    experienceYears: 19,
    overview:
      "Dr. Arun R. Warrier specializes in targeted biologics for HER2+ and triple-negative breast cancer, leukemias, lymphomas, and multiple myeloma treatment.",
    areaOfExpertise: [
      "Personalized breast cancer systemic protocols (CDK4/6 inhibitors)",
      "Acute leukemias & Non-Hodgkin Lymphoma protocols",
      "Multiple myeloma novel agents (Proteasome inhibitors, IMiDs)",
      "Supportive care & preventing chemotherapy nausea and hair loss",
      "Cancer genetics counseling for hereditary syndromes",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Thrissur",
      "MD (Medicine) - Government Medical College, Trivandrum",
      "DM (Medical Oncology) - Cancer Institute (WIA), Adyar, Chennai",
      "European Certified Medical Oncologist (ECMO)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Targeted Therapy in Breast Cancer: Moving Beyond Generic Chemotherapy",
        date: "July 29, 2024",
        readTime: "5 min read",
        summary: "How molecular classification tailors therapy precisely to individual tumor receptors.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Friday",
      timings: "09:30 AM – 01:30 PM",
      room: "Lisie Cancer Centre, Level 1, Room 105",
    },
  },
  {
    id: "priya-jacob",
    slug: "priya-jacob",
    name: "Dr. Priya Jacob",
    designation: "Senior Consultant Radiation Oncology",
    qualifications: "MD (Radiation Oncology), DNB",
    specialty: "Precision Radiotherapy, SBRT & SRS",
    department: "Oncology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 18,
    overview:
      "Dr. Priya Jacob directs stereotactic radiation protocols (SBRT/SRS), utilizing image-guided linear accelerators to deliver pinpoint radiation while preserving healthy organ tissues.",
    areaOfExpertise: [
      "Stereotactic Body Radiotherapy (SBRT) for early lung and liver lesions",
      "Stereotactic Radiosurgery (SRS) for brain metastases",
      "Volumetric Modulated Arc Therapy (VMAT) & IMRT",
      "Deep Inspiration Breath Hold (DIBH) for left breast irradiation",
      "High-dose-rate (HDR) brachytherapy for cervical cancer",
    ],
    qualificationsList: [
      "MBBS - Christian Medical College, Vellore",
      "MD (Radiation Oncology) - Christian Medical College, Vellore",
      "DNB (Radiation Oncology) - National Board of Examinations",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "DIBH Technique in Breast Radiotherapy: Safeguarding the Heart with a Simple Breath",
        date: "June 22, 2024",
        readTime: "5 min read",
        summary: "How holding air moves the heart safely away from the treatment field during left-side radiation.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "09:00 AM – 01:00 PM",
      room: "Lisie Cancer Centre, Basement 1, Room B04",
    },
  },
  {
    id: "thomas-varkey",
    slug: "thomas-varkey",
    name: "Dr. Thomas Varkey",
    designation: "Consultant Head & Neck Onco-Surgeon",
    qualifications: "MS, MCh (Head & Neck Oncology)",
    specialty: "Oral, Throat & Thyroid Cancers",
    department: "Oncology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-cardiac-surgeon.jpg",
    experienceYears: 16,
    overview:
      "Dr. Thomas Varkey is an expert in complex oral cancer resections, microvascular free flap reconstructions for jaw restoration, and minimally invasive endoscopic thyroidectomy.",
    areaOfExpertise: [
      "Oral cavity cancer wide excision & neck dissection",
      "Microvascular free fibula flap for jaw reconstruction",
      "Total laryngectomy with tracheo-esophageal voice prosthesis",
      "Thyroid cancer surgery with recurrent laryngeal nerve monitoring",
      "Transoral robotic/endoscopic surgery (TORS) for base of tongue",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "MS (ENT) - Medical College, Trivandrum",
      "MCh (Head & Neck Surgical Oncology) - Amrita Institute of Medical Sciences",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Oral Cancer Screening: Examining Non-Healing Mouth Ulcers Promptly",
        date: "May 25, 2024",
        readTime: "4 min read",
        summary: "Why an ulcer persisting past 2 weeks needs biopsy evaluation rather than topical ointments.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "02:00 PM – 05:00 PM",
      room: "Lisie Cancer Centre, Level 1, Room 108",
    },
  },
  {
    id: "haridas-nair",
    slug: "haridas-nair",
    name: "Dr. Haridas Nair",
    designation: "Consultant GI & Hepato-Pancreato-Biliary Surgical Oncology",
    qualifications: "MS, MCh (Surgical Gastroenterology)",
    specialty: "Liver, Gallbladder & Pancreatic Malignancies",
    department: "Oncology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 15,
    overview:
      "Dr. Haridas Nair brings specialized focus to curative resections for primary liver tumors (hepatocellular carcinoma), gallbladder cancer, and stomach cancer.",
    areaOfExpertise: [
      "Major anatomical hepatectomy & wedge liver resections",
      "Radical cholecystectomy for gallbladder adenocarcinoma",
      "Total and distal gastrectomy with D2 lymph node dissection",
      "Neuroendocrine tumors of the gastrointestinal tract",
      "Radiofrequency ablation (RFA) for non-resectable liver lesions",
    ],
    qualificationsList: [
      "MBBS - Medical College, Calicut",
      "MS (Surgery) - JIPMER, Puducherry",
      "MCh (Surgical Gastroenterology) - SGPGI, Lucknow",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Gastric Cancer: Importance of D2 Lymph Node Dissection for Long-Term Cure",
        date: "April 17, 2024",
        readTime: "6 min read",
        summary: "The surgical standard that dramatically minimizes regional disease recurrence.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Friday",
      timings: "10:00 AM – 02:00 PM",
      room: "Lisie Cancer Centre, Level 1, Room 109",
    },
  },
  {
    id: "meenakshi-s",
    slug: "meenakshi-s",
    name: "Dr. Meenakshi S.",
    designation: "Consultant Clinical Hematology & BMT Specialist",
    qualifications: "MD, DM (Clinical Hematology)",
    specialty: "Bone Marrow Transplantation & Blood Cancers",
    department: "Oncology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 13,
    overview:
      "Dr. Meenakshi S. oversees autologous and allogeneic bone marrow transplants, treatment for aplastic anemia, myelodysplastic syndromes, and chronic leukemias.",
    areaOfExpertise: [
      "Autologous stem cell transplantation for myeloma and lymphoma",
      "Allogeneic bone marrow transplantation for acute leukemia",
      "Severe aplastic anemia immunosuppressive protocols",
      "Targeted therapies for chronic myeloid leukemia (TKIs)",
      "Coagulation disorders and therapeutic apheresis",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "MD (General Medicine) - Madras Medical College",
      "DM (Clinical Hematology) - CMC Vellore",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "Bone Marrow Transplants: Understanding How Healthy Donor Cells Rebuild Immunity",
        date: "March 15, 2024",
        readTime: "6 min read",
        summary: "A step-by-step walkthrough of conditioning, harvest, infusion, and engraftment milestones.",
      },
    ],
    opdSchedule: {
      days: "Wednesday, Saturday",
      timings: "09:00 AM – 01:00 PM",
      room: "Lisie Cancer Centre, Level 2, Room 204",
    },
  },
  {
    id: "deepa-susan",
    slug: "deepa-susan",
    name: "Dr. Deepa Susan",
    designation: "Consultant Breast Oncoplastic Surgeon",
    qualifications: "MS (General Surgery), Fellowship in Breast Oncoplasty",
    specialty: "Breast Cancer Surgery & Oncoplastic Reconstruction",
    department: "Oncology",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 14,
    overview:
      "Dr. Deepa Susan focuses on breast-conserving cancer surgeries combined with plastic reconstruction techniques, sentinel lymph node biopsy, and genetic high-risk screening.",
    areaOfExpertise: [
      "Breast-conserving surgery (Lumpectomy) with oncoplastic reshaping",
      "Skin-sparing and nipple-sparing mastectomy with immediate reconstruction",
      "Sentinel lymph node biopsy using dual tracer technique",
      "Vacuum-assisted stereotactic breast core biopsies",
      "Familial breast cancer risk reduction procedures",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "MS (General Surgery) - Medical College, Calicut",
      "Fellowship in Breast Oncoplastic Surgery (UK / Pune)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Breast Conservation Surgery: Curing Cancer Without Losing Body Image",
        date: "February 12, 2024",
        readTime: "5 min read",
        summary: "How modern oncoplastic techniques ensure equivalent survival while preserving natural aesthetics.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday",
      timings: "08:30 AM – 12:30 PM",
      room: "Lisie Cancer Centre, Level 1, Room 106",
    },
  },

  // ==========================================
  // ENT (8 DOCTORS)
  // ==========================================
  {
    id: "jayakumar-r",
    slug: "jayakumar-r",
    name: "Dr. Jayakumar R.",
    designation: "Chief ENT & Head Neck Surgeon",
    qualifications: "MS (ENT), DLO, FICS",
    specialty: "Advanced Otology & Endoscopic Sinus Surgery",
    department: "ENT",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 27,
    overview:
      "Dr. Jayakumar R. has over 25 years of surgical leadership in endoscopic sinus procedures, micro-ear eardrum reconstructions, and surgery for chronic snoring and sleep apnea.",
    areaOfExpertise: [
      "Functional Endoscopic Sinus Surgery (FESS)",
      "Microscopic tympanoplasty & mastoidectomy",
      "Stapedotomy for otosclerosis hearing restoration",
      "Surgical management of obstructive sleep apnea (UPPP)",
      "Salivary gland parotid tumor removal with facial nerve monitoring",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "DLO - Medical College, Kottayam",
      "MS (ENT) - Government Medical College, Calicut",
      "Fellow of International College of Surgeons (FICS)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Chronic Sinusitis: How Modern HD Sinus Endoscopy Clears Blockages Permanently",
        date: "September 05, 2024",
        readTime: "5 min read",
        summary: "Navigating natural drainage pathways without facial cuts for lasting relief.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "09:00 AM – 01:00 PM",
      room: "ENT Outpatient Clinic, Level 2, Room 22",
    },
  },
  {
    id: "suja-s",
    slug: "suja-s",
    name: "Dr. Suja S.",
    designation: "Senior Consultant Otologist & Cochlear Implant Surgeon",
    qualifications: "MS (ENT), Fellowship in Otology & Implants",
    specialty: "Cochlear Implantation & Hearing Restoration",
    department: "ENT",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 20,
    overview:
      "Dr. Suja S. has led multiple cochlear implant surgeries restoring hearing in deaf children and adults. She also treats chronic discharging ears and acoustic neuroma.",
    areaOfExpertise: [
      "Cochlear implant surgery in infants and adults",
      "Bone Conduction Hearing Implants (BAHA)",
      "Cholesteatoma eradication & ossiculoplasty",
      "Endoscopic ear surgery (Transcanal tympanoplasty)",
      "Facial nerve decompression and repair",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "MS (ENT) - Madras Medical College",
      "Fellowship in Cochlear Implant Surgery (Melbourne / Zurich)",
    ],
    languages: ["English", "Malayalam", "Tamil"],
    blogs: [
      {
        title: "Cochlear Implants: Giving Born-Deaf Children the Joy of Speech and Sound",
        date: "August 12, 2024",
        readTime: "6 min read",
        summary: "Why early implantation before 2 years delivers near-native auditory neural development.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "ENT Outpatient Clinic, Level 2, Room 24",
    },
  },
  {
    id: "george-panicker",
    slug: "george-panicker",
    name: "Dr. George Panicker",
    designation: "Senior Consultant Rhinology & Skull Base Surgeon",
    qualifications: "MS (ENT), DNB (ENT)",
    specialty: "Rhinoplasty & Endoscopic Skull Base Surgery",
    department: "ENT",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-pediatrician.jpg",
    experienceYears: 18,
    overview:
      "Dr. George Panicker combines aesthetic and functional rhinoplasty for deviated septums with trans-nasal repairs of CSF brain fluid leaks and pituitary tumors.",
    areaOfExpertise: [
      "Functional and aesthetic open/closed rhinoplasty",
      "Endoscopic repair of CSF rhinorrhea (Brain fluid leak)",
      "Endoscopic Dacryocystorhinostomy (DCR for watering eyes)",
      "Fungal sinusitis & balloon sinuplasty",
      "Nasal polyposis medical and surgical treatment",
    ],
    qualificationsList: [
      "MBBS - Christian Medical College, Vellore",
      "MS (ENT) - JIPMER, Puducherry",
      "DNB (ENT) - National Board of Examinations",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Deviated Nasal Septum: When Nasal Sprays Aren't Enough for Easy Breathing",
        date: "July 16, 2024",
        readTime: "4 min read",
        summary: "How modern septoplasty permanently straightens inner cartilage without external facial changes.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Friday",
      timings: "09:30 AM – 01:30 PM",
      room: "ENT Outpatient Clinic, Level 2, Room 26",
    },
  },
  {
    id: "manoj-abraham-ent",
    slug: "manoj-abraham",
    name: "Dr. Manoj Abraham",
    designation: "Consultant Pediatric ENT Surgeon",
    qualifications: "MS (ENT), Fellowship in Pediatric Otolaryngology",
    specialty: "Pediatric Airway, Tonsils & Ear Infections",
    department: "ENT",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-cardiac-surgeon.jpg",
    experienceYears: 15,
    overview:
      "Dr. Manoj Abraham specializes in gentle child-focused ENT care, including coblation adenotonsillectomy, grommet insertion for glue ear, and foreign body airway removals.",
    areaOfExpertise: [
      "Coblation bloodless adenotonsillectomy",
      "Myringotomy & grommet tube insertion for middle ear effusion",
      "Pediatric stridor & endoscopic airway evaluation",
      "Preauricular sinus excision",
      "Tongue tie release (Frenulotomy) in newborns",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Calicut",
      "MS (ENT) - Medical College, Kottayam",
      "Fellowship in Pediatric ENT (Great Ormond Street, UK)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Glue Ear in Young Children: Why Blocked Fluid Causes Speech Delays",
        date: "June 20, 2024",
        readTime: "5 min read",
        summary: "Understanding when tiny ventilation tubes instantly restore crisp hearing and language skills.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Friday, Saturday",
      timings: "02:00 PM – 05:00 PM",
      room: "ENT Outpatient Clinic, Level 2, Room 23",
    },
  },
  {
    id: "archana-v",
    slug: "archana-v",
    name: "Dr. Archana V.",
    designation: "Consultant Voice Specialist & Laryngologist",
    qualifications: "MS (ENT), Fellowship in Phonosurgery",
    specialty: "Voice Disorders, Vocal Cord Nodules & Swallowing",
    department: "ENT",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 13,
    overview:
      "Dr. Archana V. treats professional voice users, singers, teachers, and patients with vocal cord polyps, hoarseness, spasmodic dysphonia, and swallowing difficulties (dysphagia).",
    areaOfExpertise: [
      "Micro-laryngeal surgery (MLS) for vocal nodules & polyps",
      "Vocal cord medialization thyroplasty for vocal palsy",
      "Botulinum toxin injections for spasmodic dysphonia",
      "Stroboscopy voice assessment & voice hygiene protocols",
      "Fiberoptic Endoscopic Evaluation of Swallowing (FEES)",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Trivandrum",
      "MS (ENT) - AIIMS, New Delhi",
      "Fellowship in Phonosurgery & Laryngology",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Hoarseness in Professional Speakers: Care Guidelines for Vocal Cord Health",
        date: "May 10, 2024",
        readTime: "4 min read",
        summary: "Vocal hydration, voice rest rules, and micro-flap surgery for stubborn vocal nodules.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday",
      timings: "10:00 AM – 02:00 PM",
      room: "ENT Outpatient Clinic, Level 2, Room 28",
    },
  },
  {
    id: "preetha-nair",
    slug: "preetha-nair",
    name: "Dr. Preetha Nair",
    designation: "Consultant Rhinology & Sinus Specialist",
    qualifications: "MS, DNB (ENT)",
    specialty: "Allergic Rhinitis, Polyps & Sinus Headaches",
    department: "ENT",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 14,
    overview:
      "Dr. Preetha Nair provides focused medical and minimally invasive care for severe nasal allergies, recurrent turbinate hypertrophy, and chronic frontal sinus headaches.",
    areaOfExpertise: [
      "Coblation / radiofrequency inferior turbinate reduction",
      "Immunotherapy protocols for intractable allergic rhinitis",
      "Endoscopic sphenopalatine artery ligation for severe nosebleeds",
      "Septal perforation closure",
      "Loss of smell (Anosmia) assessment & olfactory training",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Thrissur",
      "MS (ENT) - Government Medical College, Calicut",
      "DNB (ENT) - National Board of Examinations",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Frequent Sneezing and Nasal Block: Conquering Allergic Rhinitis in Humid Climates",
        date: "April 05, 2024",
        readTime: "5 min read",
        summary: "Controlling house dust mite sensitivity with nasal corticosteroid sprays and environmental shields.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday",
      timings: "08:30 AM – 12:30 PM",
      room: "ENT Outpatient Clinic, Level 2, Room 25",
    },
  },
  {
    id: "joseph-k-ent",
    slug: "joseph-k",
    name: "Dr. Joseph K.",
    designation: "Associate Consultant ENT Surgeon",
    qualifications: "MBBS, MS (ENT)",
    specialty: "General ENT & Head Neck Procedures",
    department: "ENT",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-specialist-male.jpg",
    experienceYears: 10,
    overview:
      "Dr. Joseph K. manages acute and chronic ear infections, foreign body extractions, epistaxis, and diagnostic flexible nasopharyngolaryngoscopies.",
    areaOfExpertise: [
      "Ear canal wax impaction & otitis externa care",
      "Diagnostic flexible fiberoptic naso-pharyngoscopy",
      "Emergency epistaxis management and cautery",
      "Simple septoplasty and cauterization of turbinates",
      "Excision of neck cysts (Thyroglossal, branchial)",
    ],
    qualificationsList: [
      "MBBS - Medical College, Kottayam",
      "MS (ENT) - Medical College, Trivandrum",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Why You Should Never Use Cotton Buds to Clean Earwax",
        date: "March 08, 2024",
        readTime: "3 min read",
        summary: "How cotton tips push wax deeper against the eardrum and risk perforating delicate tissue.",
      },
    ],
    opdSchedule: {
      days: "Wednesday, Friday, Saturday",
      timings: "02:00 PM – 05:00 PM",
      room: "ENT Outpatient Clinic, Level 2, Room 21",
    },
  },
  {
    id: "rahul-c",
    slug: "rahul-c",
    name: "Dr. Rahul C.",
    designation: "Consultant Vertigo & Balance Disorders",
    qualifications: "MS (ENT), Fellowship in Neuro-Otology",
    specialty: "Dizziness, Vertigo & Tinnitus Management",
    department: "ENT",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-oncologist.jpg",
    experienceYears: 12,
    overview:
      "Dr. Rahul C. runs the dedicated Vertigo Clinic, specializing in videonystagmography (VNG), canalith repositioning maneuvers for BPPV, Meniere's disease, and vestibular rehabilitation.",
    areaOfExpertise: [
      "Videonystagmography (VNG) balance function testing",
      "Epley & Semont repositioning maneuvers for BPPV",
      "Medical & intratympanic therapy for Meniere's disease",
      "Vestibular migraine and chronic subjective dizziness",
      "Tinnitus retraining therapy (TRT) and sound therapy",
    ],
    qualificationsList: [
      "MBBS - Kasturba Medical College, Mangalore",
      "MS (ENT) - JIPMER, Puducherry",
      "Fellowship in Neurotology & Balance Disorders",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Sudden Room-Spinning Vertigo: How a Simple Head Maneuver Cures BPPV in Minutes",
        date: "February 18, 2024",
        readTime: "5 min read",
        summary: "Understanding dislodged inner-ear calcium crystals and non-drug canalith repositioning.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Saturday",
      timings: "09:00 AM – 01:00 PM",
      room: "Vertigo & Balance Suite, Level 2, Room 27",
    },
  },

  // ==========================================
  // GENERAL MEDICINE (8 DOCTORS)
  // ==========================================
  {
    id: "abraham-mathew",
    slug: "abraham-mathew",
    name: "Dr. Abraham Mathew",
    designation: "Senior Consultant Physician & Diabetologist",
    qualifications: "MD (General Medicine), FRCP (Glasg)",
    specialty: "Internal Medicine, Diabetes & Metabolic Disorders",
    department: "General Medicine",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-male.jpg",
    experienceYears: 31,
    overview:
      "Dr. Abraham Mathew has provided compassionate internal medicine care for over three decades. He specializes in complicated diabetes, uncontrolled hypertension, geriatric care, and multi-system medical illnesses.",
    areaOfExpertise: [
      "Type 1 and Type 2 diabetes glycemic control & insulin regimens",
      "Essential and secondary hypertension management",
      "Fever of unknown origin (FUO) diagnostic workup",
      "Dyslipidemia & cardiovascular risk reduction",
      "Comprehensive adult health and executive checkups",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "MD (General Medicine) - Medical College, Trivandrum",
      "FRCP - Royal College of Physicians and Surgeons of Glasgow",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "HbA1c Beyond the Numbers: Realizing Individualized Glycemic Goals in Diabetes",
        date: "September 14, 2024",
        readTime: "5 min read",
        summary: "Balancing tight sugar targets with avoiding dangerous hypoglycemia in older adults.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "08:30 AM – 12:30 PM",
      room: "General Medicine OPD, Level 1, Room 1",
    },
  },
  {
    id: "geetha-k",
    slug: "geetha-k",
    name: "Dr. Geetha K.",
    designation: "Senior Consultant Internal Medicine",
    qualifications: "MD, DNB (General Medicine), FICP",
    specialty: "Infectious Diseases & Lifestyle Medicine",
    department: "General Medicine",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 24,
    overview:
      "Dr. Geetha K. treats tropical infectious diseases (dengue, leptospirosis, malaria), thyroid dysfunction, metabolic syndrome, and post-viral fatigue syndromes.",
    areaOfExpertise: [
      "Tropical fevers (Dengue, Leptospirosis, Typhoid, Scrub typhus)",
      "Thyroid disorders (Hypothyroidism, Hashimoto's, Goitre)",
      "Non-alcoholic fatty liver disease (NAFLD) reversal",
      "Adult immunization protocols",
      "Autoimmune connective tissue screening",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Calicut",
      "MD (Medicine) - Medical College, Kottayam",
      "DNB (General Medicine) - National Board of Examinations",
      "Fellow of Indian College of Physicians (FICP)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Monsoon Fevers in Kerala: Critical Warning Signs in Dengue and Leptospirosis",
        date: "August 08, 2024",
        readTime: "5 min read",
        summary: "Hydration rules, platelet tracking, and when calf muscle pain indicates rat fever.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "09:00 AM – 01:00 PM",
      room: "General Medicine OPD, Level 1, Room 3",
    },
  },
  {
    id: "kp-poulose",
    slug: "kp-poulose",
    name: "Dr. K. P. Poulose",
    designation: "Chief Consultant Physician & Emeritus Professor",
    qualifications: "MD, FRCP (Edin), FACP",
    specialty: "Complex Diagnostic Medicine & Clinical Governance",
    department: "General Medicine",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-oncologist.jpg",
    experienceYears: 38,
    overview:
      "Dr. K. P. Poulose is an iconic clinician whose diagnostic acumen has solved obscure medical mysteries for over 38 years. He serves as an advisor on clinical audits and ethical care.",
    areaOfExpertise: [
      "Complex multi-system diagnostic puzzles",
      "Autoimmune vasculitis & systemic lupus erythematosus (SLE)",
      "Drug adverse reactions & polypharmacy reduction in elders",
      "Chronic unexplained fatigue and weight loss workups",
      "Medical ethics and second opinion consultations",
    ],
    qualificationsList: [
      "MBBS - Medical College, Trivandrum",
      "MD (General Medicine) - AIIMS, New Delhi",
      "FRCP - Royal College of Physicians of Edinburgh",
      "Fellow of the American College of Physicians (FACP)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "The Lost Art of Clinical History Taking: Why Listening to Patients Heals",
        date: "July 04, 2024",
        readTime: "7 min read",
        summary: "How an attentive 15-minute dialogue often reveals diagnoses that scan machines miss.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday",
      timings: "10:00 AM – 01:30 PM",
      room: "General Medicine OPD, Level 1, Room 5",
    },
  },
  {
    id: "mohan-varghese",
    slug: "mohan-varghese",
    name: "Dr. Mohan Varghese",
    designation: "Senior Consultant Critical Care & Medicine",
    qualifications: "MD (Gen Med), EDIC, FNB (Critical Care)",
    specialty: "Sepsis Management & Medical Intensive Care",
    department: "General Medicine",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-specialist-male.jpg",
    experienceYears: 20,
    overview:
      "Dr. Mohan Varghese leads the Medical ICU, with expertise in septic shock resuscitation, acute respiratory failure, diabetic ketoacidosis (DKA), and hemodynamic monitoring.",
    areaOfExpertise: [
      "Severe sepsis and septic shock protocolized care",
      "Acute Respiratory Distress Syndrome (ARDS) lung-protective ventilation",
      "Diabetic Ketoacidosis (DKA) and hyperosmolar states",
      "Poisoning and toxicology emergency protocols",
      "Point-of-care ultrasound in critical illness",
    ],
    qualificationsList: [
      "MBBS - St. John's Medical College, Bangalore",
      "MD (Medicine) - Christian Medical College, Ludhiana",
      "European Diploma in Intensive Care (EDIC)",
      "FNB (Critical Care Medicine) - National Board of Examinations",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Diabetic Ketoacidosis: Swift ICU Action When Blood Sugar Spikes Severely",
        date: "June 16, 2024",
        readTime: "5 min read",
        summary: "Electrolyte rebalancing, fluid resuscitation, and continuous low-dose IV insulin delivery.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Friday, Saturday",
      timings: "08:30 AM – 12:30 PM",
      room: "General Medicine OPD, Level 1, Room 4",
    },
  },
  {
    id: "reshmi-s",
    slug: "reshmi-s",
    name: "Dr. Reshmi S.",
    designation: "Consultant Internal Medicine & Lifestyle Diseases",
    qualifications: "MD (General Medicine)",
    specialty: "Obesity Medicine, Hypertension & Preventive Care",
    department: "General Medicine",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-senior-female.jpg",
    experienceYears: 14,
    overview:
      "Dr. Reshmi S. focuses on evidence-based lifestyle modifications to reverse prediabetes, manage fatty liver, and control resistant hypertension without excessive medications.",
    areaOfExpertise: [
      "Prediabetes reversal through structured nutritional therapy",
      "Comprehensive metabolic health assessments",
      "Obesity and medical weight loss management",
      "Gout & hyperuricemia prevention",
      "Vitamin deficiencies (Vitamin D, B12) and fatigue",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Thrissur",
      "MD (General Medicine) - Government Medical College, Calicut",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Reversing Prediabetes: Actionable Steps to Reset Insulin Sensitivity",
        date: "May 28, 2024",
        readTime: "5 min read",
        summary: "Circadian eating patterns, strength training, and stress reduction that keep diabetes at bay.",
      },
    ],
    opdSchedule: {
      days: "Monday, Wednesday, Friday",
      timings: "02:00 PM – 05:00 PM",
      room: "General Medicine OPD, Level 1, Room 2",
    },
  },
  {
    id: "biju-george",
    slug: "biju-george",
    name: "Dr. Biju George",
    designation: "Consultant Acute Medicine & Triage",
    qualifications: "MD (General Medicine), MRCPI",
    specialty: "Acute Emergency Medicine & Inpatient Care",
    department: "General Medicine",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-cardiac-surgeon.jpg",
    experienceYears: 15,
    overview:
      "Dr. Biju George oversees the acute medical admission unit, triaging emergency presentations, severe pneumonia, electrolyte imbalances, and acute confusion in elderly patients.",
    areaOfExpertise: [
      "Severe community-acquired pneumonia",
      "Hyponatremia and acute electrolyte disturbances",
      "Delirium in elderly hospitalized patients",
      "Acute deep vein thrombosis (DVT) anticoagulation",
      "Post-operative medical complications",
    ],
    qualificationsList: [
      "MBBS - Medical College, Kottayam",
      "MD (Medicine) - Medical College, Trivandrum",
      "Member of the Royal College of Physicians of Ireland (MRCPI)",
    ],
    languages: ["English", "Malayalam"],
    blogs: [
      {
        title: "Low Sodium (Hyponatremia) in the Elderly: Why Slow, Calculated Correction Is Vital",
        date: "April 11, 2024",
        readTime: "4 min read",
        summary: "Preventing central pontine myelinolysis through measured hypertonic saline protocols.",
      },
    ],
    opdSchedule: {
      days: "Tuesday, Thursday, Saturday",
      timings: "01:30 PM – 04:30 PM",
      room: "General Medicine OPD, Level 1, Room 6",
    },
  },
  {
    id: "anita-das",
    slug: "anita-das",
    name: "Dr. Anita Das",
    designation: "Consultant Physician & Geriatric Care Specialist",
    qualifications: "MD, DNB (Gen Med), Fellowship in Geriatrics",
    specialty: "Elderly Healthcare, Frailty & Fall Prevention",
    department: "General Medicine",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-female-physician.jpg",
    experienceYears: 13,
    overview:
      "Dr. Anita Das provides holistic care for senior citizens, addressing multiple chronic conditions, osteoporosis, cognitive decline, medication reconciliation, and fall prevention.",
    areaOfExpertise: [
      "Comprehensive geriatric assessment (CGA)",
      "Polypharmacy de-prescribing in elderly patients",
      "Osteoporosis screening and bisphosphonate therapies",
      "Fall risk assessment and balance preservation",
      "Home-care coordination for bed-bound seniors",
    ],
    qualificationsList: [
      "MBBS - Kasturba Medical College, Manipal",
      "MD (Medicine) - St. John's Medical College, Bangalore",
      "DNB (General Medicine) - National Board of Examinations",
      "Fellowship in Geriatric Medicine (CMC Vellore)",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Medication Overload in Seniors: When Less Medicine Means Better Health",
        date: "March 21, 2024",
        readTime: "5 min read",
        summary: "How regular drug reviews reduce dangerous interactions and preserve mental clarity in elders.",
      },
    ],
    opdSchedule: {
      days: "Wednesday, Friday",
      timings: "09:00 AM – 01:00 PM",
      room: "Geriatric Wellness Suite, Level 1, Room 7",
    },
  },
  {
    id: "sandeep-pillai",
    slug: "sandeep-pillai",
    name: "Dr. Sandeep Pillai",
    designation: "Associate Consultant General Medicine",
    qualifications: "MBBS, MD (General Medicine)",
    specialty: "Cardio-Metabolic Risk & Executive Health",
    department: "General Medicine",
    location: "Lisie Hospital, Kochi",
    image: "/images/doctors/doctor-pediatrician.jpg",
    experienceYears: 9,
    overview:
      "Dr. Sandeep Pillai conducts detailed executive wellness evaluations, early detection of hypertension and diabetes, smoking cessation counseling, and acute respiratory infections.",
    areaOfExpertise: [
      "Annual preventive health screenings",
      "Young-onset hypertension workup",
      "Smoking cessation and nicotine replacement therapy",
      "Acute gastroenteritis and dehydration recovery",
      "Fatigue and chronic work stress assessments",
    ],
    qualificationsList: [
      "MBBS - Government Medical College, Kottayam",
      "MD (General Medicine) - Government Medical College, Trivandrum",
    ],
    languages: ["English", "Malayalam", "Hindi"],
    blogs: [
      {
        title: "Executive Health Checkups: Why Catching Silent Hypertension Saves Lives at 40",
        date: "February 14, 2024",
        readTime: "4 min read",
        summary: "Understanding ambulatory 24-hour BP monitoring and white-coat hypertension.",
      },
    ],
    opdSchedule: {
      days: "Monday, Thursday, Saturday",
      timings: "02:00 PM – 05:00 PM",
      room: "General Medicine OPD, Level 1, Room 8",
    },
  },
];

// Helper functions
export function getAllDoctors(): Doctor[] {
  return DOCTORS_DATABASE;
}

export function getDoctorBySlug(slug: string): Doctor | undefined {
  const normalized = decodeURIComponent(slug).toLowerCase().trim();
  return DOCTORS_DATABASE.find(
    (doc) =>
      doc.slug.toLowerCase() === normalized ||
      doc.id.toLowerCase() === normalized ||
      doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized
  );
}

export function getDoctorsBySpecialty(specialtyName: string): Doctor[] {
  const target = specialtyName.toLowerCase().trim();

  // If match found by department or specialty
  const matched = DOCTORS_DATABASE.filter(
    (doc) =>
      doc.department.toLowerCase().includes(target) ||
      doc.specialty.toLowerCase().includes(target) ||
      target.includes(doc.department.toLowerCase()) ||
      target.includes(doc.specialty.toLowerCase())
  );

  // Guarantee at least 8 doctors: if exact department has fewer than 8 (e.g. Psychiatry has 1),
  // supplement with other senior doctors to always provide 8 doctors!
  if (matched.length >= 8) {
    return matched.slice(0, 8);
  }

  // Supplement up to 8
  const remaining = DOCTORS_DATABASE.filter((doc) => !matched.some((m) => m.id === doc.id));
  return [...matched, ...remaining].slice(0, 8);
}

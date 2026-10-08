export interface DoctorRecommendation {
  id: string;
  slug: string;
  name: string;
  designation: string;
  qualifications: string;
  department: string;
  image: string;
  experienceYears: number;
  room: string;
  availableSlot: string;
  conditionMatch?: string;
}

export interface BookingConfirmation {
  patientName: string;
  phone: string;
  doctorName: string;
  department: string;
  time: string;
  token: string;
  room: string;
}

export interface ChatAction {
  label: string;
  icon?: string;
  type: "modal" | "link" | "call" | "message" | "book_doctor" | "next_doctor" | "show_booking";
  payload: string;
  doctor?: DoctorRecommendation;
}

export interface BotResponse {
  text: string;
  actions?: ChatAction[];
  quickReplies?: string[];
  doctor?: DoctorRecommendation;
  showBookingForm?: boolean;
  bookingTargetDoctor?: DoctorRecommendation;
  bookingConfirmation?: BookingConfirmation;
  isInitialGreeting?: boolean;
}

export interface IntroCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  query: string;
}

export const INTRO_CARDS: IntroCard[] = [
  {
    id: "find-doctor",
    title: "Find a Doctor",
    subtitle: "Search by specialty or name",
    icon: "Stethoscope",
    query: "Find a Doctor",
  },
  {
    id: "book-appointment",
    title: "Book an Appointment",
    subtitle: "Reserve OPD slot & token",
    icon: "Calendar",
    query: "Book an Appointment",
  },
  {
    id: "find-department",
    title: "Find a Department",
    subtitle: "Explore 35+ departments",
    icon: "Building2",
    query: "Find a Department",
  },
  {
    id: "describe-problem",
    title: "Describe a Problem",
    subtitle: "Tell us symptoms like fever",
    icon: "MessageSquareHeart",
    query: "Describe a Problem",
  },
];

export const INITIAL_QUICK_REPLIES = [
  "Find a Doctor",
  "Book an Appointment",
  "Find a Department",
  "Describe a Problem",
];

// Curated list of doctors for interactive recommendations
export const RECOMMENDED_DOCTORS: Record<string, DoctorRecommendation[]> = {
  fever: [
    {
      id: "abraham-mathew",
      slug: "abraham-mathew",
      name: "Dr. Abraham Mathew",
      designation: "Senior Consultant Physician & Diabetologist",
      qualifications: "MD (General Medicine), FRCP (Glasg)",
      department: "General Medicine",
      image: "/images/doctors/doctor-senior-male.jpg",
      experienceYears: 31,
      room: "General Medicine OPD, Level 1, Room 1",
      availableSlot: "Today at 06:00 PM",
      conditionMatch: "Fever & Internal Medicine",
    },
    {
      id: "geetha-k",
      slug: "geetha-k",
      name: "Dr. Geetha K.",
      designation: "Senior Consultant Internal Medicine",
      qualifications: "MD, DNB (General Medicine), FICP",
      department: "General Medicine",
      image: "/images/doctors/doctor-female-physician.jpg",
      experienceYears: 24,
      room: "General Medicine OPD, Level 1, Room 3",
      availableSlot: "Today at 06:30 PM",
      conditionMatch: "Infectious Diseases & Fevers",
    },
  ],
  heart: [
    {
      id: "jacob-joseph",
      slug: "jacob-joseph",
      name: "Dr. Jacob Joseph",
      designation: "Chief Interventional Cardiologist",
      qualifications: "MD, DM (Cardiology), FACC",
      department: "Cardiology",
      image: "/images/doctors/doctor-cardiac-surgeon.jpg",
      experienceYears: 28,
      room: "Lisie Heart Institute, Level 2, Room 12",
      availableSlot: "Today at 05:30 PM",
      conditionMatch: "Chest Pain & Heart Care",
    },
    {
      id: "ronney-thomas",
      slug: "ronney-thomas",
      name: "Dr. Ronney Thomas",
      designation: "Senior Consultant Cardiologist",
      qualifications: "MD, DM (Cardiology), FSCAI",
      department: "Cardiology",
      image: "/images/doctors/doctor-specialist-male.jpg",
      experienceYears: 19,
      room: "Lisie Heart Institute, Level 2, Room 14",
      availableSlot: "Today at 06:00 PM",
      conditionMatch: "Cardiology",
    },
  ],
  neuro: [
    {
      id: "mathew-thomas",
      slug: "mathew-thomas",
      name: "Dr. Mathew Thomas",
      designation: "Chief Neurosurgeon & Spine Specialist",
      qualifications: "MCh (Neurosurgery), DNB, FINR",
      department: "Neurosciences",
      image: "/images/doctors/doctor-specialist-male.jpg",
      experienceYears: 22,
      room: "Neurosciences Centre, Level 3, Room 5",
      availableSlot: "Today at 05:00 PM",
      conditionMatch: "Headache & Neurological Issues",
    },
  ],
  ortho: [
    {
      id: "thomas-mathew",
      slug: "thomas-mathew",
      name: "Dr. Thomas Mathew",
      designation: "Senior Consultant Orthopaedic Surgeon",
      qualifications: "MS (Ortho), DNB, MCh (Ortho UK)",
      department: "Orthopaedics",
      image: "/images/doctors/doctor-specialist-male.jpg",
      experienceYears: 26,
      room: "Orthopaedics OPD, Level 2, Room 8",
      availableSlot: "Today at 06:00 PM",
      conditionMatch: "Bone, Knee & Joint Pain",
    },
  ],
  child: [
    {
      id: "suresh-kumar-p",
      slug: "suresh-kumar-p",
      name: "Dr. Suresh Kumar P.",
      designation: "Senior Consultant Paediatrician",
      qualifications: "MD (Paediatrics), DCH, FIAP",
      department: "Paediatrics",
      image: "/images/doctors/doctor-pediatrician.jpg",
      experienceYears: 25,
      room: "Paediatrics OPD, Level 1, Room 10",
      availableSlot: "Today at 05:00 PM",
      conditionMatch: "Child Health & Paediatrics",
    },
  ],
};

// Global index tracking to alternate doctors when "Find Another Doctor" is clicked
let currentDoctorIndex = 0;

export function getBotResponse(userQuery: string): BotResponse {
  const query = userQuery.toLowerCase().trim();

  // ========================================================
  // 1. FEVER & SYMPTOM SEARCH (User says "fever" during demo)
  // ========================================================
  if (
    query.includes("fever") ||
    query.includes("temperature") ||
    query.includes("chills") ||
    query.includes("pyrexia") ||
    query.includes("body hot")
  ) {
    currentDoctorIndex = 0;
    const doctor = RECOMMENDED_DOCTORS.fever[0];
    return {
      text: `🌡️ **You have a fever?**\n\nHere is a doctor recommended from our **General Medicine** department to diagnose and treat your condition:`,
      doctor,
      actions: [
        {
          label: "📅 Book Appointment",
          type: "show_booking",
          payload: "abraham-mathew",
          doctor,
        },
        {
          label: "🔄 Find Another Doctor",
          type: "next_doctor",
          payload: "fever:1",
        },
        {
          label: "👨‍⚕️ View Doctor Profile",
          type: "link",
          payload: `/doctor/${doctor.slug}`,
        },
      ],
      quickReplies: ["📅 Book Appointment", "🔄 Find Another Doctor", "🕒 OP Timings"],
    };
  }

  // ========================================================
  // 2. FIND ANOTHER DOCTOR (Toggles to Dr. Geetha K. or next doctor)
  // ========================================================
  if (
    query.includes("another doctor") ||
    query.includes("next doctor") ||
    query.includes("different doctor") ||
    query.startsWith("next_doctor")
  ) {
    currentDoctorIndex = currentDoctorIndex === 0 ? 1 : 0;
    const doctor = RECOMMENDED_DOCTORS.fever[currentDoctorIndex];
    return {
      text: `👨‍⚕️ **Here is another senior specialist from General Medicine:**`,
      doctor,
      actions: [
        {
          label: "📅 Book Appointment",
          type: "show_booking",
          payload: doctor.id,
          doctor,
        },
        {
          label: "🔄 Find Another Doctor",
          type: "next_doctor",
          payload: `fever:${currentDoctorIndex === 0 ? 1 : 0}`,
        },
        {
          label: "👨‍⚕️ View Doctor Profile",
          type: "link",
          payload: `/doctor/${doctor.slug}`,
        },
      ],
      quickReplies: ["📅 Book Appointment", "🔄 Find Another Doctor", "🕒 OP Timings"],
    };
  }

  // ========================================================
  // 3. DESCRIBE A PROBLEM / SYMPTOM INTAKE
  // ========================================================
  if (
    query.includes("describe a problem") ||
    query.includes("describe problem") ||
    query.includes("problem") ||
    query.includes("symptom") ||
    query.includes("sick") ||
    query.includes("not feeling well")
  ) {
    return {
      text: `🩺 **Please describe your symptom or health issue:**\n\nYou can type your symptom in the chat (for example: **fever**, **cough**, **chest pain**, **headache**, **knee pain**) or choose a common symptom below:`,
      actions: [
        { label: "🤒 Fever & Chills", type: "message", payload: "I have a fever" },
        { label: "❤️ Chest Pain", type: "message", payload: "I have chest pain" },
        { label: "🧠 Severe Headache", type: "message", payload: "Severe headache" },
        { label: "🦴 Joint & Knee Pain", type: "message", payload: "Knee and joint pain" },
        { label: "👶 Child Health", type: "message", payload: "Child health issue" },
      ],
      quickReplies: [
        "🤒 Fever & Chills",
        "❤️ Chest Pain",
        "🧠 Headache",
        "🦴 Joint Pain",
        "👶 Child Health",
      ],
    };
  }

  // ========================================================
  // 4. FIND A DOCTOR (Specialty Selection)
  // ========================================================
  if (
    query.includes("find a doctor") ||
    query.includes("find doctor") ||
    query.includes("search doctor") ||
    query.includes("specialist")
  ) {
    return {
      text: `👨‍⚕️ **Which specialty or doctor are you looking for?**\n\nSelect a clinical department below or type the doctor's name or symptom (e.g. *fever*, *cardiology*):`,
      actions: [
        { label: "🤒 General Medicine (Fever/Cold)", type: "message", payload: "fever" },
        { label: "❤️ Cardiology (Heart)", type: "message", payload: "Cardiology" },
        { label: "🧠 Neurosciences (Brain & Spine)", type: "message", payload: "Neurology" },
        { label: "🦴 Orthopaedics (Bones & Joints)", type: "message", payload: "Orthopaedics" },
        { label: "👶 Paediatrics (Child Care)", type: "message", payload: "Paediatrics" },
      ],
      quickReplies: [
        "🤒 General Medicine (Fever)",
        "❤️ Cardiology",
        "🧠 Neurosciences",
        "🦴 Orthopaedics",
      ],
    };
  }

  // ========================================================
  // 5. FIND A DEPARTMENT
  // ========================================================
  if (
    query.includes("find a department") ||
    query.includes("find department") ||
    query.includes("department") ||
    query.includes("specialt")
  ) {
    return {
      text: `🏥 **Centers of Clinical Excellence at Lisie Hospital:**\n\nChoose a department to view specialists, treatments, and outpatient timings:`,
      actions: [
        { label: "🩺 General Medicine", type: "message", payload: "fever" },
        { label: "❤️ Lisie Heart Institute", type: "message", payload: "Cardiology" },
        { label: "🧠 Neurosciences & Spine", type: "message", payload: "Neurology" },
        { label: "🦴 Bone & Joint Care", type: "message", payload: "Orthopaedics" },
        { label: "🎗️ Oncology (Cancer Care)", type: "modal", payload: "doctor-search" },
        { label: "🚨 24/7 Emergency", type: "modal", payload: "emergency" },
      ],
      quickReplies: [
        "🩺 General Medicine",
        "❤️ Heart Institute",
        "🧠 Neurosciences",
        "🦴 Orthopaedics",
      ],
    };
  }

  // ========================================================
  // 6. BOOK AN APPOINTMENT (Opens inline booking form)
  // ========================================================
  if (
    query.includes("book an appointment") ||
    query.includes("book appointment") ||
    query.includes("book op") ||
    query === "book" ||
    query.startsWith("book_doctor")
  ) {
    const doctor = RECOMMENDED_DOCTORS.fever[0];
    return {
      text: `📅 **Book an Outpatient Appointment:**\n\nPlease fill in the quick details below to reserve your OPD token and confirmed time slot:`,
      showBookingForm: true,
      bookingTargetDoctor: doctor,
      actions: [
        { label: "👨‍⚕️ Search Other Doctors", type: "modal", payload: "doctor-search" },
        { label: "🕒 Check OP Timings", type: "modal", payload: "op-timings" },
      ],
      quickReplies: ["🕒 OP Timings", "👨‍⚕️ Find a Doctor", "💳 Insurance & TPA"],
    };
  }

  // ========================================================
  // 7. CHEST PAIN & CARDIOLOGY
  // ========================================================
  if (
    query.includes("chest pain") ||
    query.includes("heart") ||
    query.includes("cardio") ||
    query.includes("palpitation")
  ) {
    const doctor = RECOMMENDED_DOCTORS.heart[0];
    return {
      text: `❤️ **Cardiac Care Recommendation:**\n\nFor chest discomfort or cardiac concerns, we recommend our **Lisie Heart Institute** specialists:`,
      doctor,
      actions: [
        {
          label: "📅 Book Cardiac Consultation",
          type: "show_booking",
          payload: doctor.id,
          doctor,
        },
        {
          label: "📞 Emergency Helpline (+91 9895 756 164)",
          type: "call",
          payload: "+919895756164",
        },
        {
          label: "👨‍⚕️ View Doctor Profile",
          type: "link",
          payload: `/doctor/${doctor.slug}`,
        },
      ],
      quickReplies: ["📅 Book Appointment", "🚨 Emergency Line", "🕒 OP Timings"],
    };
  }

  // ========================================================
  // 8. HEADACHE & NEUROLOGY
  // ========================================================
  if (
    query.includes("headache") ||
    query.includes("migraine") ||
    query.includes("brain") ||
    query.includes("neuro") ||
    query.includes("spine")
  ) {
    const doctor = RECOMMENDED_DOCTORS.neuro[0];
    return {
      text: `🧠 **Neurosciences Recommendation:**\n\nFor persistent headaches, spine pain, or neurological symptoms, we recommend:`,
      doctor,
      actions: [
        {
          label: "📅 Book Neuro Consultation",
          type: "show_booking",
          payload: doctor.id,
          doctor,
        },
        {
          label: "👨‍⚕️ View Doctor Profile",
          type: "link",
          payload: `/doctor/${doctor.slug}`,
        },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "👨‍⚕️ Find Doctor"],
    };
  }

  // ========================================================
  // 9. JOINT & KNEE PAIN (ORTHOPAEDICS)
  // ========================================================
  if (
    query.includes("joint") ||
    query.includes("knee") ||
    query.includes("bone") ||
    query.includes("ortho") ||
    query.includes("fracture")
  ) {
    const doctor = RECOMMENDED_DOCTORS.ortho[0];
    return {
      text: `🦴 **Orthopaedics & Joint Care Recommendation:**\n\nFor joint pain, knee stiffness, or bone injuries, we recommend:`,
      doctor,
      actions: [
        {
          label: "📅 Book Ortho Consultation",
          type: "show_booking",
          payload: doctor.id,
          doctor,
        },
        {
          label: "👨‍⚕️ View Doctor Profile",
          type: "link",
          payload: `/doctor/${doctor.slug}`,
        },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "👨‍⚕️ Find Doctor"],
    };
  }

  // ========================================================
  // 10. CHILD & PAEDIATRICS
  // ========================================================
  if (query.includes("child") || query.includes("baby") || query.includes("pediatric") || query.includes("paediatric")) {
    const doctor = RECOMMENDED_DOCTORS.child[0];
    return {
      text: `👶 **Paediatrics & Child Health Care:**\n\nFor paediatric consultations and infant care, we recommend:`,
      doctor,
      actions: [
        {
          label: "📅 Book Paediatric Slot",
          type: "show_booking",
          payload: doctor.id,
          doctor,
        },
        {
          label: "👨‍⚕️ View Doctor Profile",
          type: "link",
          payload: `/doctor/${doctor.slug}`,
        },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "👨‍⚕️ Find Doctor"],
    };
  }

  // ========================================================
  // 11. EMERGENCY & CASUALTY
  // ========================================================
  if (
    query.includes("emergency") ||
    query.includes("ambulance") ||
    query.includes("casualty") ||
    query.includes("trauma") ||
    query.includes("urgent") ||
    query.includes("stroke")
  ) {
    return {
      text: `🚨 **24/7 Emergency & Trauma Helpline:**\n\nFor immediate emergency assistance, contact our Emergency Care team:\n\n• **Emergency Direct Line:** +91 9895 756 164\n• **Ambulance Service:** 0484 2402044\n• **Location:** Ground Floor, Lisie Hospital, Kaloor, Kochi\n\nOur Level-1 Emergency Department is equipped with specialized resuscitation bays, advanced life-support ambulances, and round-the-clock emergency physicians.`,
      actions: [
        { label: "📞 Call Emergency (+91 9895 756 164)", type: "call", payload: "+919895756164" },
        { label: "🚑 Call Ambulance (0484 2402044)", type: "call", payload: "04842402044" },
        { label: "🚨 View Emergency Panel", type: "modal", payload: "emergency" },
      ],
      quickReplies: ["📅 Book OP Appointment", "👨‍⚕️ Find Doctor", "📍 Hospital Location"],
    };
  }

  // ========================================================
  // 12. OP TIMINGS
  // ========================================================
  if (
    query.includes("timing") ||
    query.includes("timings") ||
    query.includes("op timing") ||
    query.includes("opd") ||
    query.includes("working hour")
  ) {
    return {
      text: `🕒 **Outpatient (OP) Timings:**\n\n• **Morning Session:** Monday to Saturday: 8:00 AM – 1:00 PM\n• **Evening Session:** Monday to Saturday: 3:00 PM – 5:00 PM\n• **Registration Counters:** Open from 7:00 AM onwards\n• **Emergency & Trauma:** Open 24 Hours, 365 Days\n• **Pharmacy & Clinical Lab:** Open 24/7`,
      actions: [
        { label: "🕒 View Detailed OP Timings", type: "modal", payload: "op-timings" },
        { label: "📅 Book Appointment", type: "show_booking", payload: "abraham-mathew" },
        { label: "👨‍⚕️ Search Doctors", type: "modal", payload: "doctor-search" },
      ],
      quickReplies: ["📅 Book Appointment", "👨‍⚕️ Find a Doctor", "📍 Visiting Hours"],
    };
  }

  // ========================================================
  // 13. LOCATION & ADDRESS
  // ========================================================
  if (
    query.includes("location") ||
    query.includes("address") ||
    query.includes("where") ||
    query.includes("reach") ||
    query.includes("metro") ||
    query.includes("kaloor")
  ) {
    return {
      text: `📍 **Hospital Location & Accessibility:**\n\n• **Address:** Lisie Hospital, Lisie Hospital Road, Kaloor, Kochi, Kerala - 682017\n• **Metro Station:** Town Hall Metro Station (Just 200m walking distance)\n• **Railway Stations:** Ernakulam Town (North) ~1.2 km, Ernakulam Junction ~3.5 km\n• **Airport:** Cochin International Airport (COK): ~27 km\n• **Parking:** Multi-level and visitor car parking available within hospital premises.`,
      actions: [
        {
          label: "🗺️ Open in Google Maps",
          type: "link",
          payload: "https://maps.google.com/?q=Lisie+Hospital+Kochi",
        },
        { label: "📞 Call Reception", type: "call", payload: "04842402044" },
      ],
      quickReplies: ["🕒 Visiting Hours", "📅 Book Appointment", "🕒 OP Timings"],
    };
  }

  // ========================================================
  // 14. INSURANCE & TPA
  // ========================================================
  if (
    query.includes("insurance") ||
    query.includes("tpa") ||
    query.includes("cashless") ||
    query.includes("mediclaim") ||
    query.includes("ayushman") ||
    query.includes("karunya")
  ) {
    return {
      text: `💳 **Insurance & Cashless Hospitalization (TPA Desk):**\n\nLisie Hospital is empanelled with all major private and public insurance providers:\n\n• **Private TPAs:** Star Health, Medi Assist, ICICI Lombard, Vidal Health, MDIndia, Paramount.\n• **Government Schemes:** Ayushman Bharat (PM-JAY), Karunya Health Scheme (KASP), ECHS, CGHS.\n• **TPA Desk:** Located at Main Admission Lounge (Ground Floor).\n• **Contact TPA Desk:** 0484 2402044 Ext. 2150`,
      actions: [
        { label: "ℹ️ Patient Help & Billing", type: "modal", payload: "patient-help" },
        { label: "📞 Call TPA Desk", type: "call", payload: "04842402044" },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "📍 Location"],
    };
  }

  // ========================================================
  // 15. GREETINGS (Hi / Hello)
  // ========================================================
  if (
    query === "hi" ||
    query === "hello" ||
    query === "hey" ||
    query.includes("good morning") ||
    query.includes("good afternoon") ||
    query.includes("good evening") ||
    query.includes("help")
  ) {
    return {
      text: `👋 **Hello and welcome to Lisie Hospital!**\n\nI am your AI Care Assistant. How can I assist you today? Please choose an option below or type your query:`,
      isInitialGreeting: true,
      actions: [
        { label: "👨‍⚕️ Find a Doctor", type: "message", payload: "Find a Doctor" },
        { label: "📅 Book an Appointment", type: "message", payload: "Book an Appointment" },
        { label: "🏥 Find a Department", type: "message", payload: "Find a Department" },
        { label: "💬 Describe a Problem", type: "message", payload: "Describe a Problem" },
      ],
      quickReplies: INITIAL_QUICK_REPLIES,
    };
  }

  // ========================================================
  // 16. GRATITUDE & FAREWELL
  // ========================================================
  if (
    query.includes("thank") ||
    query.includes("thx") ||
    query.includes("goodbye") ||
    query.includes("bye")
  ) {
    return {
      text: `🙏 **You're very welcome!**\n\nThank you for choosing Lisie Hospital. Wishing you and your loved ones good health. If you need anything else, feel free to ask anytime!\n\n*Care Beyond Cure Since 1956.*`,
      actions: [
        { label: "📅 Book Appointment", type: "show_booking", payload: "abraham-mathew" },
        { label: "👨‍⚕️ Find a Doctor", type: "message", payload: "Find a Doctor" },
      ],
      quickReplies: ["Find a Doctor", "Book an Appointment", "🕒 OP Timings"],
    };
  }

  // ========================================================
  // 17. DEFAULT FALLBACK
  // ========================================================
  return {
    text: `Thank you for reaching out to Lisie Hospital. Regarding **"${userQuery}"**, how would you like to proceed?`,
    actions: [
      { label: "👨‍⚕️ Find a Doctor", type: "message", payload: "Find a Doctor" },
      { label: "📅 Book an Appointment", type: "show_booking", payload: "abraham-mathew" },
      { label: "🏥 Find a Department", type: "message", payload: "Find a Department" },
      { label: "💬 Describe a Problem", type: "message", payload: "Describe a Problem" },
    ],
    quickReplies: INITIAL_QUICK_REPLIES,
  };
}

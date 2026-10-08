export interface ChatAction {
  label: string;
  icon?: string;
  type: "modal" | "link" | "call" | "message";
  payload: string; // modal name (e.g. 'appointment', 'doctor-search') or URL or phone number or query
}

export interface BotResponse {
  text: string;
  actions?: ChatAction[];
  quickReplies?: string[];
}

export const INITIAL_QUICK_REPLIES = [
  "📅 Book Appointment",
  "👨‍⚕️ Find a Doctor",
  "🕒 OP Timings",
  "🚨 24/7 Emergency",
  "🏥 Specialties",
  "📍 Location & Metro",
  "💳 Insurance & TPA",
  "🧪 Lab & Diagnostics",
];

export function getBotResponse(userQuery: string): BotResponse {
  const query = userQuery.toLowerCase().trim();

  // 1. Emergency & Urgent Care
  if (
    query.includes("emergency") ||
    query.includes("ambulance") ||
    query.includes("casualty") ||
    query.includes("trauma") ||
    query.includes("urgent") ||
    query.includes("accident") ||
    query.includes("chest pain") ||
    query.includes("stroke") ||
    query.includes("heart attack")
  ) {
    return {
      text: "🚨 **24/7 Emergency & Trauma Helpline:**\n\nFor immediate emergency assistance, contact our Emergency Care team:\n\n• **Emergency Direct Line:** +91 9895 756 164\n• **Ambulance Service:** 0484 2402044\n• **Location:** Ground Floor, Lisie Hospital, Kaloor, Kochi\n\nOur Level-1 Emergency Department is equipped with specialized resuscitation bays, advanced life-support ambulances, and round-the-clock emergency physicians and trauma surgeons.",
      actions: [
        { label: "📞 Call Emergency (+91 9895 756 164)", type: "call", payload: "+919895756164" },
        { label: "🚑 Call Ambulance (0484 2402044)", type: "call", payload: "04842402044" },
        { label: "🚨 View Emergency Panel", type: "modal", payload: "emergency" },
      ],
      quickReplies: ["📅 Book OP Appointment", "👨‍⚕️ Find Doctor", "📍 Hospital Location"],
    };
  }

  // 2. Appointments & Consultations
  if (
    query.includes("appointment") ||
    query.includes("book") ||
    query.includes("consult") ||
    query.includes("token") ||
    query.includes("schedule") ||
    query.includes("register")
  ) {
    return {
      text: "📅 **Doctor Appointment Booking:**\n\nYou can book appointments at Lisie Hospital through multiple convenient options:\n\n1. **Online Instant Booking:** Click below to open our interactive booking portal.\n2. **Telephone Booking:** Call **0484 2401141** or **0484 2402044** (Mon–Sat, 7:00 AM – 7:00 PM).\n3. **Hospital Counter:** Registration counters open daily at 7:00 AM on the Ground Floor.\n\n*Would you like to open the booking form right now?*",
      actions: [
        { label: "📅 Book Appointment Now", type: "modal", payload: "appointment" },
        { label: "👨‍⚕️ Search Doctors First", type: "modal", payload: "doctor-search" },
        { label: "🕒 Check OP Timings", type: "modal", payload: "op-timings" },
        { label: "📞 Call Desk (0484 2401141)", type: "call", payload: "04842401141" },
      ],
      quickReplies: ["🕒 OP Timings", "👨‍⚕️ Find a Doctor", "💳 Insurance & TPA"],
    };
  }

  // 3. OP Timings & Doctor Schedule
  if (
    query.includes("timing") ||
    query.includes("timings") ||
    query.includes("op timing") ||
    query.includes("opd") ||
    query.includes("working hour") ||
    query.includes("open") ||
    query.includes("close")
  ) {
    return {
      text: "🕒 **Outpatient (OP) Timings:**\n\n• **Morning Session:** Monday to Saturday: 8:00 AM – 1:00 PM\n• **Evening Session:** Monday to Saturday: 3:00 PM – 5:00 PM\n• **Registration Counters:** Open from 7:00 AM onwards\n• **Emergency & Trauma:** Open 24 Hours, 365 Days\n• **Pharmacy & Clinical Lab:** Open 24/7\n\n*Note: Timings for super-specialty consultants may vary based on operative schedules.*",
      actions: [
        { label: "🕒 View Detailed OP Timings", type: "modal", payload: "op-timings" },
        { label: "📅 Book Appointment", type: "modal", payload: "appointment" },
        { label: "👨‍⚕️ View Doctor Schedule", type: "modal", payload: "doctor-search" },
      ],
      quickReplies: ["📅 Book Appointment", "👨‍⚕️ Find a Doctor", "📍 Visiting Hours"],
    };
  }

  // 4. Visiting Hours
  if (
    query.includes("visiting") ||
    query.includes("visit hour") ||
    query.includes("visitor") ||
    query.includes("see patient")
  ) {
    return {
      text: "🕒 **Patient Visiting Hours:**\n\n• **General Wards & Private Rooms:**\n  - Evening: 4:30 PM – 7:00 PM (Daily)\n• **Intensive Care Units (ICUs / CCU / CICU):**\n  - Morning: 11:00 AM – 12:00 PM\n  - Evening: 5:00 PM – 6:00 PM\n\n*Please note:* Only one visitor per patient is allowed in the ICUs at a time to ensure infection control and patient rest.",
      actions: [
        { label: "📍 Hospital Directions", type: "modal", payload: "patient-help" },
        { label: "📞 Reception Desk", type: "call", payload: "04842402044" },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "📍 Location & Metro"],
    };
  }

  // 5. Doctors & Specialists
  if (
    query.includes("doctor") ||
    query.includes("physician") ||
    query.includes("surgeon") ||
    query.includes("specialist") ||
    query.includes("consultant")
  ) {
    return {
      text: "👨‍⚕️ **Renowned Specialists at Lisie Hospital:**\n\nWe have over 150+ senior consultants and surgeons across 35+ departments:\n\n• **Cardiology:** Dr. Jacob Joseph, Dr. Ronney Thomas\n• **Neurosurgery & Spine:** Dr. Mathew Thomas\n• **Medical Oncology:** Dr. George K. Andrews\n• **Obstetrics & Gynaecology:** Dr. Mary Varghese\n• **Paediatrics & Neonatology:** Dr. Suresh Kumar P.\n• **General Medicine:** Dr. Abraham Mathew\n\nYou can search for doctors by specialty, name, or qualification below.",
      actions: [
        { label: "🔍 Search All Doctors", type: "modal", payload: "doctor-search" },
        { label: "📅 Book an Appointment", type: "modal", payload: "appointment" },
      ],
      quickReplies: ["❤️ Cardiology", "🎗️ Cancer Care", "🧠 Neurosciences", "🦴 Orthopaedics"],
    };
  }

  // 6. Cardiology & Lisie Heart Institute
  if (
    query.includes("heart") ||
    query.includes("cardio") ||
    query.includes("cardiac") ||
    query.includes("ecg") ||
    query.includes("angio") ||
    query.includes("bypass")
  ) {
    return {
      text: "❤️ **Lisie Heart Institute:**\n\nOne of South India's premier cardiac centers with state-of-the-art cath labs and pioneering heart care:\n\n• Advanced Interventional Cardiology (Angiography, Angioplasty, TAVI)\n• Cardiothoracic & Vascular Surgery (Adult & Paediatric Open Heart, CABG)\n• Heart Failure & Heart Transplant Programme\n• 24/7 Dedicated Cardiac Emergency & Intensive Care\n\n**Key Doctors:** Dr. Jacob Joseph, Dr. Ronney Thomas",
      actions: [
        { label: "📅 Book Cardiac Consultation", type: "modal", payload: "appointment" },
        { label: "👨‍⚕️ View Cardiologists", type: "modal", payload: "doctor-search" },
      ],
      quickReplies: ["🕒 OP Timings", "🚨 Emergency Line", "📅 Book Appointment"],
    };
  }

  // 7. Cancer / Oncology
  if (
    query.includes("cancer") ||
    query.includes("oncol") ||
    query.includes("chemo") ||
    query.includes("tumor") ||
    query.includes("radiation")
  ) {
    return {
      text: "🎗️ **Comprehensive Cancer Care at Lisie:**\n\nOur Cancer Centre provides compassionate, multidisciplinary oncology services:\n\n• **Medical Oncology:** Targeted chemotherapy, immunotherapy, precision regimens.\n• **Surgical Oncology:** Organ-preserving and minimally invasive cancer surgeries.\n• **Tumor Board:** Multi-specialist case discussions for personalized treatment plans.\n• **Daycare Chemotherapy Unit & Cancer Screening**\n\n**Lead Oncologist:** Dr. George K. Andrews",
      actions: [
        { label: "📅 Book Oncology Appointment", type: "modal", payload: "appointment" },
        { label: "🔍 View Oncology Team", type: "modal", payload: "doctor-search" },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "💳 Insurance & TPA"],
    };
  }

  // 8. Neurosciences & Spine
  if (
    query.includes("neuro") ||
    query.includes("brain") ||
    query.includes("spine") ||
    query.includes("stroke") ||
    query.includes("paralysis") ||
    query.includes("neurology")
  ) {
    return {
      text: "🧠 **Lisie Institute of Neurosciences & Spine:**\n\nExpert neurological care for acute and chronic conditions:\n\n• Microscopic Brain & Spine Surgery\n• Rapid Intervention Acute Stroke Unit (24/7 Thrombolysis)\n• Epilepsy, Parkinson's & Movement Disorder Clinic\n• Dedicated Neuro-Intensive Care Unit (Neuro-ICU)\n\n**Chief Neurosurgeon:** Dr. Mathew Thomas",
      actions: [
        { label: "📅 Book Neuro Consultation", type: "modal", payload: "appointment" },
        { label: "👨‍⚕️ Search Specialists", type: "modal", payload: "doctor-search" },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "🚨 Emergency Line"],
    };
  }

  // 9. Nephrology & Kidney Transplant
  if (
    query.includes("kidney") ||
    query.includes("nephro") ||
    query.includes("dialysis") ||
    query.includes("transplant") ||
    query.includes("urology") ||
    query.includes("stone")
  ) {
    return {
      text: "💧 **Nephrology & Renal Transplant Center:**\n\n• NABH accredited kidney care and renal transplantation programme\n• State-of-the-art Dialysis Center operating around the clock\n• Laser Endourology & Kidney Stone Management\n• Paediatric and adult nephrology services",
      actions: [
        { label: "📅 Book Nephrology Visit", type: "modal", payload: "appointment" },
        { label: "🔍 View Specialists", type: "modal", payload: "doctor-search" },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "💳 Insurance & TPA"],
    };
  }

  // 10. Orthopaedics & Joint Replacement
  if (
    query.includes("ortho") ||
    query.includes("bone") ||
    query.includes("joint") ||
    query.includes("knee") ||
    query.includes("fracture") ||
    query.includes("hip")
  ) {
    return {
      text: "🦴 **Center for Bone & Joint Surgery:**\n\n• Computer-navigated & Robotic Knee & Hip Replacement\n• Arthroscopy & Sports Medicine (ACL/Ligament reconstruction)\n• 24/7 Complex Trauma & Polytrauma Care\n• Paediatric Orthopaedics & Spine Surgery",
      actions: [
        { label: "📅 Book Orthopaedic Appointment", type: "modal", payload: "appointment" },
        { label: "👨‍⚕️ Find Orthopaedic Doctors", type: "modal", payload: "doctor-search" },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "🧪 Lab & Scans"],
    };
  }

  // 11. Location, Address & Metro
  if (
    query.includes("location") ||
    query.includes("address") ||
    query.includes("where") ||
    query.includes("reach") ||
    query.includes("metro") ||
    query.includes("kaloor") ||
    query.includes("direction") ||
    query.includes("map")
  ) {
    return {
      text: "📍 **Hospital Location & Accessibility:**\n\n• **Address:** Lisie Hospital, Lisie Hospital Road, Kaloor, Kochi, Ernakulam, Kerala - 682017\n• **Metro Station:** Town Hall Metro Station (Just 200m walking distance)\n• **Railway Stations:**\n  - Ernakulam Town (North) Station: ~1.2 km\n  - Ernakulam Junction (South) Station: ~3.5 km\n• **Airport:** Cochin International Airport (COK): ~27 km\n• **Parking:** Multi-level and visitor car parking available within hospital premises.",
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

  // 12. Insurance & Cashless / TPA
  if (
    query.includes("insurance") ||
    query.includes("tpa") ||
    query.includes("cashless") ||
    query.includes("mediclaim") ||
    query.includes("claim") ||
    query.includes("karunya") ||
    query.includes("ayushman") ||
    query.includes("pmjay") ||
    query.includes("echs") ||
    query.includes("cghs")
  ) {
    return {
      text: "💳 **Insurance & Cashless Hospitalization (TPA Desk):**\n\nLisie Hospital is empanelled with all major private and public insurance providers:\n\n• **Private TPAs:** Star Health, Medi Assist, ICICI Lombard, Vidal Health, MDIndia, Heritage, Paramount, etc.\n• **Government Schemes:** Ayushman Bharat (PM-JAY), Karunya Health Scheme (KASP), ECHS, CGHS, and government pensioner schemes.\n• **Insurance Helpdesk:** Located at the Main Admission Lounge (Ground Floor).\n• **Contact TPA Desk:** 0484 2402044 Ext. 2150",
      actions: [
        { label: "ℹ️ Patient Help & Billing", type: "modal", payload: "patient-help" },
        { label: "📞 Call TPA Desk", type: "call", payload: "04842402044" },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "📍 Location"],
    };
  }

  // 13. Lab, Pharmacy, Diagnostics
  if (
    query.includes("lab") ||
    query.includes("test") ||
    query.includes("blood") ||
    query.includes("mri") ||
    query.includes("ct scan") ||
    query.includes("x-ray") ||
    query.includes("ultrasound") ||
    query.includes("pharmacy") ||
    query.includes("medicine")
  ) {
    return {
      text: "🧪 **Diagnostic & Support Services (24/7):**\n\n• **NABL Clinical Laboratory:** 24/7 high-precision automated pathology, biochemistry & microbiology.\n• **Radiology & Imaging:** 128-Slice CT, 1.5 Tesla MRI, 3D/4D Ultrasound, Digital X-Ray, Mammography.\n• **24/7 In-House Pharmacy:** Fully stocked pharmacy counters at Ground Floor and Inpatient blocks.\n• **Blood Center:** Licensed component blood bank with round-the-clock availability.",
      actions: [
        { label: "🕒 View OP Timings", type: "modal", payload: "op-timings" },
        { label: "📞 Lab Enquiry Desk", type: "call", payload: "04842402044" },
      ],
      quickReplies: ["📅 Book Appointment", "👨‍⚕️ Find Doctor", "📍 Location"],
    };
  }

  // 14. Health Checkups
  if (
    query.includes("checkup") ||
    query.includes("package") ||
    query.includes("master health") ||
    query.includes("executive")
  ) {
    return {
      text: "🩺 **Comprehensive Preventive Health Checkups:**\n\nInvest in your health with customized screening packages:\n\n• **Executive Health Checkup** (Complete lipid, renal, liver, ECG, ultrasound, physician consult)\n• **Master Cardiac Screening** (Echo, TMT, lipid profile, cardiologist consultation)\n• **Diabetic Wellness Package** (HbA1c, microalbumin, retina check, diet counseling)\n• **Senior Citizen & Well-Woman Health Packages**\n\n*Advance appointment is recommended for fasting lab parameters.*",
      actions: [
        { label: "📅 Book Health Checkup", type: "modal", payload: "appointment" },
        { label: "📞 Enquire at Checkup Desk", type: "call", payload: "04842402044" },
      ],
      quickReplies: ["🕒 OP Timings", "👨‍⚕️ Find Doctor", "💳 Insurance & TPA"],
    };
  }

  // 15. Hospital History & About
  if (
    query.includes("about") ||
    query.includes("history") ||
    query.includes("who") ||
    query.includes("founder") ||
    query.includes("since") ||
    query.includes("1956")
  ) {
    return {
      text: "🏥 **About Lisie Hospital – 'Care Beyond Cure Since 1956':**\n\nFounded in 1956 by Msgr. Antony Chiramel, Lisie Hospital has grown from a humble clinic into one of Kerala's most trusted tertiary healthcare institutions.\n\n• Accredited by **NABH** and **NABL** for clinical quality and patient safety.\n• Non-profit healthcare mission serving over 1 million patients annually.\n• Home to leading institutes of excellence in Cardiac Sciences, Oncology, Neurosciences, and Organ Transplantation.",
      actions: [
        { label: "👨‍⚕️ Explore Doctors", type: "modal", payload: "doctor-search" },
        { label: "📅 Book Appointment", type: "modal", payload: "appointment" },
      ],
      quickReplies: ["🏥 Specialties", "🕒 OP Timings", "📍 Location & Metro"],
    };
  }

  // 16. Contact & Helpline
  if (
    query.includes("contact") ||
    query.includes("phone") ||
    query.includes("number") ||
    query.includes("call") ||
    query.includes("email") ||
    query.includes("helpline")
  ) {
    return {
      text: "📞 **Important Hospital Helplines:**\n\n• **24/7 Emergency Line:** +91 9895 756 164\n• **General Enquiry / Board:** 0484 2402044 / 2400200\n• **Appointment Desk:** 0484 2401141\n• **Patient Relations:** 0484 2402044 Ext. 2100\n• **Email:** contact@lisiehospital.org\n• **Website:** www.lisiehospital.org",
      actions: [
        { label: "📞 Call General Enquiry", type: "call", payload: "04842402044" },
        { label: "🚨 Call 24/7 Emergency", type: "call", payload: "+919895756164" },
        { label: "📅 Book Appointment", type: "modal", payload: "appointment" },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "👨‍⚕️ Find a Doctor"],
    };
  }

  // 17. Greetings
  if (
    query === "hi" ||
    query === "hello" ||
    query === "hey" ||
    query.includes("good morning") ||
    query.includes("good afternoon") ||
    query.includes("good evening") ||
    query === "namaste" ||
    query.includes("help")
  ) {
    return {
      text: "👋 **Hello and welcome to Lisie Hospital!**\n\nI am your virtual healthcare assistant, here 24/7 to help you navigate our services, find the right doctors, check outpatient timings, or book an appointment.\n\nHow can I help you today?",
      actions: [
        { label: "📅 Book Appointment", type: "modal", payload: "appointment" },
        { label: "👨‍⚕️ Find a Doctor", type: "modal", payload: "doctor-search" },
        { label: "🕒 View OP Timings", type: "modal", payload: "op-timings" },
      ],
      quickReplies: [
        "📅 Book Appointment",
        "👨‍⚕️ Find a Doctor",
        "🕒 OP Timings",
        "🚨 Emergency Line",
      ],
    };
  }

  // 18. Gratitude / Farewell
  if (
    query.includes("thank") ||
    query.includes("thx") ||
    query.includes("goodbye") ||
    query.includes("bye")
  ) {
    return {
      text: "🙏 **You're very welcome!**\n\nThank you for choosing Lisie Hospital. Wishing you and your loved ones good health. If you need anything else, feel free to ask anytime!\n\n*Care with Love & Ethics Since 1956.*",
      actions: [
        { label: "📅 Book Appointment", type: "modal", payload: "appointment" },
      ],
      quickReplies: ["📅 Book Appointment", "🕒 OP Timings", "📍 Location"],
    };
  }

  // Default fallback response
  return {
    text: `Thank you for reaching out to Lisie Hospital. Regarding **"${userQuery}"**, here are the best ways we can assist you:\n\n• Check doctor availability and book outpatient slots online\n• View specialty department services and timings\n• Connect directly with our patient relations helpdesk at **0484 2402044**\n\n*Please select one of the quick options below or rephrase your question.*`,
    actions: [
      { label: "📅 Book an Appointment", type: "modal", payload: "appointment" },
      { label: "👨‍⚕️ Search Doctors", type: "modal", payload: "doctor-search" },
      { label: "🕒 Check OP Timings", type: "modal", payload: "op-timings" },
      { label: "📞 Call Reception", type: "call", payload: "04842402044" },
    ],
    quickReplies: [
      "📅 Book Appointment",
      "👨‍⚕️ Find a Doctor",
      "🕒 OP Timings",
      "🚨 24/7 Emergency",
    ],
  };
}

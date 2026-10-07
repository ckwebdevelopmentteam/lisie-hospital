"use client";

import React, { useState } from "react";
import { CheckCircle2, PhoneCall, ShieldCheck, Clock } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function BookingConsultationSection() {
  const { openModal } = useModal();
  const [selectedCampus, setSelectedCampus] = useState("Main Campus (Kaloor)");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    department: "Lisie Heart Institute (Cardiology)",
    clinicalNote: "",
    termsAgreed: false,
  });

  const campusesList = [
    "Main Campus (Kaloor)",
    "Mother & Child (Palarivattom)",
    "Diagnostics (Kakkanad)",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-950 via-burgundy-950 to-stone-900 text-white overflow-hidden font-sans"
      id="contact"
    >
      <div className="w-full max-w-[1536px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 frosted-glass text-burgundy-200 text-xs font-semibold uppercase tracking-wider mb-3">
                Priority Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight mb-3 text-white leading-tight">
                Schedule Your Appointment with a Specialist
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                Have questions regarding specialized treatments, surgery second
                opinions, or bed admissions? Our clinical coordinators are on
                duty 24/7.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-stone-200">
                <li className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-burgundy-700/80 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>NABH &amp; NABL accredited healthcare standards</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-burgundy-700/80 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>Fast response within 30 minutes for emergency triage</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-burgundy-700/80 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>Transparent billing with no hidden institutional charges</span>
                </li>
                <li className="flex items-center space-x-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => openModal("emergency")}
                    className="inline-flex items-center space-x-2 text-white hover:text-red-300 transition-colors group text-left"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center shrink-0 animate-pulse">
                      <PhoneCall className="w-3 h-3 text-white" />
                    </div>
                    <span>
                      Emergency Hotline:{" "}
                      <strong className="underline underline-offset-4 font-mono font-bold">
                        0484 240 2044
                      </strong>
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Booking Form Column */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="bg-white/10 frosted-glass border border-white/20 rounded-2xl p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-1.5">
                    Consultation Request Received
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto mb-5 leading-relaxed">
                    Thank you, {formData.firstName || "valued patient"}. Our
                    clinical coordination desk at Lisie Hospital will contact you
                    within 30 minutes to confirm your appointment time and
                    specialist.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition"
                    >
                      Book Another Request
                    </button>
                    <button
                      type="button"
                      onClick={() => openModal("appointment")}
                      className="px-5 py-2 rounded-full bg-burgundy-700 hover:bg-burgundy-600 text-white text-xs font-semibold transition"
                    >
                      Open Full Appointment System ↗
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/5 frosted-glass border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-inner"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-300 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        placeholder="e.g. Anand"
                        className="w-full bg-white text-stone-900 placeholder-stone-400 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border-0 focus:ring-2 focus:ring-burgundy-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        placeholder="e.g. Varma"
                        className="w-full bg-white text-stone-900 placeholder-stone-400 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border-0 focus:ring-2 focus:ring-burgundy-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="anand@example.com"
                        className="w-full bg-white text-stone-900 placeholder-stone-400 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border-0 focus:ring-2 focus:ring-burgundy-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-300 mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98470 00000"
                        className="w-full bg-white text-stone-900 placeholder-stone-400 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border-0 focus:ring-2 focus:ring-burgundy-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-300 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="w-full bg-white text-stone-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border-0 focus:ring-2 focus:ring-burgundy-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-300 mb-1">
                        Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            department: e.target.value,
                          })
                        }
                        className="w-full bg-white text-stone-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border-0 focus:ring-2 focus:ring-burgundy-600 outline-none"
                      >
                        <option>Lisie Heart Institute (Cardiology)</option>
                        <option>Neurosciences &amp; Stroke Unit</option>
                        <option>Mother &amp; Child (Pediatrics/OBG)</option>
                        <option>Nephrology &amp; Renal Transplant</option>
                        <option>Orthopaedics &amp; Joint Replacement</option>
                        <option>Executive Health Checkup</option>
                      </select>
                    </div>
                  </div>

                  {/* Campus Selection Pills */}
                  <div>
                    <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                      Preferred Campus
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {campusesList.map((campus) => (
                        <button
                          key={campus}
                          type="button"
                          onClick={() => setSelectedCampus(campus)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedCampus === campus
                              ? "bg-burgundy-700 text-white shadow-xs ring-1 ring-white/30"
                              : "bg-white/10 hover:bg-white/20 text-stone-200"
                            }`}
                        >
                          {campus}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-300 mb-1">
                      Clinical Note / Medical History (Optional)
                    </label>
                    <textarea
                      rows={2.5}
                      value={formData.clinicalNote}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clinicalNote: e.target.value,
                        })
                      }
                      placeholder="Briefly describe your symptoms or reason for visit..."
                      className="w-full bg-white text-stone-900 placeholder-stone-400 text-xs sm:text-sm rounded-xl px-3.5 py-2 border-0 focus:ring-2 focus:ring-burgundy-600 outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      checked={formData.termsAgreed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          termsAgreed: e.target.checked,
                        })
                      }
                      className="rounded bg-white/20 border-white/30 text-burgundy-600 focus:ring-burgundy-500 w-4 h-4"
                    />
                    <label htmlFor="terms" className="text-[11px] text-stone-300 cursor-pointer">
                      I agree to be contacted by Lisie clinical coordination team.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-burgundy-700 hover:bg-burgundy-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-burgundy-700/50 text-sm active:scale-95"
                  >
                    Submit Consultation Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

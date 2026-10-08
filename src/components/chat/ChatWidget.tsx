"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Calendar,
  MapPin,
  ShieldCheck,
  Bot,
  Heart,
  CheckCircle2,
} from "lucide-react";

let messageIdCounter = 0;
function createMsgId(prefix: string): string {
  messageIdCounter += 1;
  return `${prefix}-${messageIdCounter}`;
}
import { useModal } from "@/context/ModalContext";
import {
  getBotResponse,
  BotResponse,
  ChatAction,
  DoctorRecommendation,
  BookingConfirmation,
  INITIAL_QUICK_REPLIES,
} from "./chatKnowledge";
import { ActiveModal } from "@/components/header/types";

interface MessageItem {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actions?: ChatAction[];
  quickReplies?: string[];
  doctor?: DoctorRecommendation;
  showBookingForm?: boolean;
  bookingTargetDoctor?: DoctorRecommendation;
  bookingConfirmation?: BookingConfirmation;
  isInitialGreeting?: boolean;
}

function getFormattedTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function playSound(type: "send" | "receive", isMuted: boolean) {
  if (isMuted || typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "send") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(560, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
    }
  } catch {
    // Ignore audio autoplay restrictions
  }
}

// Inline markdown renderer for bold and italic text
function renderFormattedInline(text: string) {
  const boldParts = text.split(/(\*\*.*?\*\*)/g);
  return boldParts.map((bPart, bIdx) => {
    if (bPart.startsWith("**") && bPart.endsWith("**")) {
      return (
        <strong key={bIdx} className="font-semibold text-[#123B63]">
          {bPart.slice(2, -2)}
        </strong>
      );
    }
    const italicParts = bPart.split(/(\*.*?\*)/g);
    return (
      <React.Fragment key={bIdx}>
        {italicParts.map((iPart, iIdx) => {
          if (iPart.startsWith("*") && iPart.endsWith("*") && iPart.length > 2) {
            return (
              <em key={iIdx} className="italic text-slate-600 font-medium">
                {iPart.slice(1, -1)}
              </em>
            );
          }
          return iPart;
        })}
      </React.Fragment>
    );
  });
}

// Markdown renderer for bold, italics, numbered lists, bullet lists, and paragraphs
function RenderBotText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start space-x-2 pl-0.5 mt-1">
              <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1677B8] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                {numMatch[1]}
              </span>
              <span className="flex-1">{renderFormattedInline(numMatch[2])}</span>
            </div>
          );
        }

        const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-");
        if (isBullet) {
          const cleanContent = trimmed.replace(/^[•-]\s*/, "");
          return (
            <div key={idx} className="flex items-start space-x-1.5 pl-1">
              <span className="text-[#1677B8] font-bold select-none">•</span>
              <span className="flex-1">{renderFormattedInline(cleanContent)}</span>
            </div>
          );
        }

        return <p key={idx}>{renderFormattedInline(line)}</p>;
      })}
    </div>
  );
}

// Subcomponent: Inline Interactive Booking Form
function InlineBookingForm({
  targetDoctor,
  onConfirmBooking,
}: {
  targetDoctor?: DoctorRecommendation;
  onConfirmBooking: (booking: {
    patientName: string;
    phone: string;
    slot: string;
    doctor: DoctorRecommendation;
  }) => void;
}) {
  const doctor = targetDoctor || {
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
  };

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("Today at 06:00 PM");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slotOptions = [
    "Today at 06:00 PM",
    "Today at 06:30 PM",
    "Today at 07:00 PM",
    "Tomorrow at 10:00 AM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmBooking({
        patientName: patientName.trim() || "Patient",
        phone: phone.trim() || "9895 756 164",
        slot: selectedSlot,
        doctor,
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="mt-2.5 bg-gradient-to-br from-white to-blue-50/50 border border-blue-200/90 rounded-2xl p-3.5 sm:p-4 shadow-sm text-slate-800">
      {/* Target Doctor Mini Banner */}
      <div className="flex items-center space-x-2.5 pb-2.5 mb-2.5 border-b border-blue-100">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[#123B63] truncate">{doctor.name}</p>
          <p className="text-[11px] text-slate-500 truncate">{doctor.department} • {doctor.room}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Patient Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="e.g., Hafeez / Patient Name"
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1677B8] focus:ring-1 focus:ring-[#1677B8]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Mobile Number (for SMS & Token) <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g., 9895 756 164"
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1677B8] focus:ring-1 focus:ring-[#1677B8]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Preferred Time Slot
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {slotOptions.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-1.5 px-2.5 rounded-full text-[11px] font-medium border text-center transition-all ${
                    isSelected
                      ? "bg-[#123B63] text-white border-[#123B63] shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {slot.includes("Today at 06:00 PM") ? "⚡ " : ""}
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 bg-[#d11f53] hover:bg-[#b81444] active:scale-[0.98] text-white font-semibold py-2 px-3 rounded-full text-xs shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <span>Confirming Token...</span>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirm Appointment ({selectedSlot})</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ChatWidget() {
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message with 4 introductory pill options
  const initWelcomeMessage = useCallback(() => {
    const welcomeMsg: MessageItem = {
      id: "welcome-1",
      sender: "bot",
      text: "👋 **Hello and welcome to Lisie Hospital!**\n\nI am your AI Care Assistant. How would you like to proceed today? Please choose an option below or type your query:",
      timestamp: getFormattedTime(),
      actions: [
        { label: "👨‍⚕️ Find a Doctor", type: "message", payload: "Find a Doctor" },
        { label: "📅 Book an Appointment", type: "message", payload: "Book an Appointment" },
        { label: "🏥 Find a Department", type: "message", payload: "Find a Department" },
        { label: "💬 Describe a Problem", type: "message", payload: "Describe a Problem" },
      ],
      quickReplies: INITIAL_QUICK_REPLIES,
    };
    setMessages([welcomeMsg]);
  }, []);

  useEffect(() => {
    initWelcomeMessage();
  }, [initWelcomeMessage]);

  // Scroll to bottom whenever messages change or typing changes
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen, isMinimized]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  // Global event integration: open/close via external triggers & broadcast state
  useEffect(() => {
    window.addEventListener("open-chatbot", handleOpen);
    window.addEventListener("lisie-open-chat", handleOpen);
    window.addEventListener("close-chatbot", handleClose);

    return () => {
      window.removeEventListener("open-chatbot", handleOpen);
      window.removeEventListener("lisie-open-chat", handleOpen);
      window.removeEventListener("close-chatbot", handleClose);
    };
  }, [handleOpen, handleClose]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("chatbot-visibility-changed", { detail: { isOpen } })
    );
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const messageText = (textToSend ?? inputText).trim();
    if (!messageText) return;

    setInputText("");
    playSound("send", isMuted);

    // Add user message
    const userMsg: MessageItem = {
      id: createMsgId("user"),
      sender: "user",
      text: messageText,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate thinking delay
    const responseDelay = Math.min(650, Math.max(350, messageText.length * 12));
    setTimeout(() => {
      const response: BotResponse = getBotResponse(messageText);
      const botMsg: MessageItem = {
        id: createMsgId("bot"),
        sender: "bot",
        text: response.text,
        timestamp: getFormattedTime(),
        actions: response.actions,
        quickReplies: response.quickReplies,
        doctor: response.doctor,
        showBookingForm: response.showBookingForm,
        bookingTargetDoctor: response.bookingTargetDoctor,
        isInitialGreeting: response.isInitialGreeting,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playSound("receive", isMuted);
    }, responseDelay);
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.type === "modal") {
      openModal(action.payload as ActiveModal);
      setIsMinimized(true);
    } else if (action.type === "call") {
      window.open(`tel:${action.payload}`, "_self");
    } else if (action.type === "link") {
      window.open(action.payload, "_blank", "noopener,noreferrer");
    } else if (action.type === "message") {
      handleSend(action.payload);
    } else if (action.type === "show_booking") {
      // Trigger inline booking form for the doctor
      handleOpenBookingForm(action.doctor);
    } else if (action.type === "next_doctor") {
      handleSend("🔄 Find Another Doctor");
    }
  };

  // Trigger inline booking form for a doctor
  const handleOpenBookingForm = (doctor?: DoctorRecommendation) => {
    playSound("send", isMuted);
    const userMsg: MessageItem = {
      id: createMsgId("user-book"),
      sender: "user",
      text: `📅 Book Appointment with ${doctor?.name || "Doctor"}`,
      timestamp: getFormattedTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: MessageItem = {
        id: createMsgId("bot-book"),
        sender: "bot",
        text: `📅 **Book Appointment with ${doctor?.name || "Doctor"}:**\n\nPlease fill in your basic details below to confirm your token:`,
        timestamp: getFormattedTime(),
        showBookingForm: true,
        bookingTargetDoctor: doctor,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playSound("receive", isMuted);
    }, 350);
  };

  // Confirm booking submission
  const handleConfirmBooking = ({
    patientName,
    phone,
    slot,
    doctor,
  }: {
    patientName: string;
    phone: string;
    slot: string;
    doctor: DoctorRecommendation;
  }) => {
    playSound("send", isMuted);
    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: `Submitted booking for ${patientName} (${slot})`,
      timestamp: getFormattedTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const tokenNumber = `#LIS-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      const botMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `🎉 **Thank you, ${patientName}! Your appointment has been booked.**\n\n• **Doctor:** **${doctor.name}** (${doctor.department})\n• **Slot Time:** **${slot}**\n• **Token Number:** **${tokenNumber}**\n• **OPD Location:** **${doctor.room}**\n• **Patient Contact:** **${phone}**\n\n📱 A confirmation SMS and digital token have been dispatched to your mobile. Please arrive at the registration desk 15 minutes before your slot.`,
        timestamp: getFormattedTime(),
        bookingConfirmation: {
          patientName,
          phone,
          doctorName: doctor.name,
          department: doctor.department,
          time: slot,
          token: tokenNumber,
          room: doctor.room,
        },
        actions: [
          { label: "🔄 Start New Inquiry", type: "message", payload: "Describe a Problem" },
          { label: "👨‍⚕️ Find Another Doctor", type: "message", payload: "Find a Doctor" },
          { label: "📍 Hospital Location", type: "modal", payload: "patient-help" },
          { label: "📞 Call Desk (0484 2402044)", type: "call", payload: "04842402044" },
        ],
        quickReplies: ["Describe a Problem", "Find a Doctor", "🕒 OP Timings"],
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playSound("receive", isMuted);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    initWelcomeMessage();
  };

  return (
    <>
      {/* ======================================================== */}
      {/* CHATBOT MODAL (Controlled by Lisie Doctor Mascot)       */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "620px",
            }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed bottom-6 right-4 sm:right-6 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] max-h-[calc(100vh-80px)] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(14,42,71,0.38)] border border-slate-200/90 overflow-hidden flex flex-col"
          >
            {/* ----------------- MODAL HEADER ----------------- */}
            <div className="bg-gradient-to-r from-[#0E2A47] via-[#123B63] to-[#1677B8] text-white p-4 sm:px-5 sm:py-3.5 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
                    <Bot className="w-5 h-5 text-blue-200" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#123B63] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-semibold text-sm sm:text-base leading-tight tracking-tight text-white">
                      Lisie Care Assistant
                    </h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                  </div>
                  <p className="text-[11px] text-blue-200 flex items-center space-x-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Online • Instant Help</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-white/80">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? "Unmute sounds" : "Mute sounds"}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-rose-300" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Restart conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  {isMinimized ? (
                    <ChevronDown className="w-4 h-4 rotate-180" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  title="Close chat"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* ----------------- EMERGENCY BANNER ----------------- */}
                <div className="bg-rose-50 border-b border-rose-100 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-rose-800">
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                    <span className="font-semibold truncate">
                      Emergency 24/7 Helpline:
                    </span>
                    <a
                      href="tel:9895756164"
                      className="font-bold underline text-rose-900 hover:text-rose-700"
                    >
                      9895 756 164
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal("emergency")}
                    className="ml-2 font-medium text-[#8C1138] hover:underline shrink-0"
                  >
                    View Info
                  </button>
                </div>

                {/* ----------------- CHAT MESSAGES BODY ----------------- */}
                <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto bg-[#FAFAF8] space-y-3.5 text-xs sm:text-sm [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Message Bubble Container */}
                      <div
                        className={`flex items-end space-x-1.5 max-w-[92%] sm:max-w-[88%] ${
                          msg.sender === "user"
                            ? "flex-row-reverse space-x-reverse"
                            : "flex-row"
                        }`}
                      >
                        {msg.sender === "bot" && (
                          <div className="w-6 h-6 rounded-full bg-[#123B63] text-white flex items-center justify-center shrink-0 mb-1 shadow-xs">
                            <Bot className="w-3.5 h-3.5 text-blue-200" />
                          </div>
                        )}

                        <div
                          className={`rounded-2xl px-3.5 py-2.5 shadow-xs ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-[#123B63] to-[#1677B8] text-white rounded-br-xs"
                              : "bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs w-full"
                          }`}
                        >
                          {msg.sender === "bot" ? (
                            <>
                              <RenderBotText text={msg.text} />

                              {/* ----------------- RICH DOCTOR RECOMMENDATION CARD ----------------- */}
                              {msg.doctor && (
                                <div className="mt-3 bg-gradient-to-br from-white to-blue-50/40 border border-blue-200 rounded-2xl p-3 sm:p-3.5 shadow-sm text-slate-800">
                                  <div className="flex items-start space-x-3">
                                    {/* Compact & Appropriately Sized Doctor Photo */}
                                    <img
                                      src={msg.doctor.image}
                                      alt={msg.doctor.name}
                                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-bold text-xs sm:text-sm text-[#123B63] leading-tight truncate">
                                        {msg.doctor.name}
                                      </h4>
                                      <p className="text-[11px] font-semibold text-[#1677B8] mt-0.5 leading-tight">
                                        {msg.doctor.qualifications}
                                      </p>
                                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-1 mt-0.5">
                                        {msg.doctor.designation}
                                      </p>
                                      <div className="flex flex-wrap gap-1 mt-1.5">
                                        <span className="inline-flex items-center text-[10px] font-medium bg-blue-50 text-[#123B63] px-2 py-0.5 rounded-full border border-blue-100">
                                          {msg.doctor.department}
                                        </span>
                                        <span className="inline-flex items-center text-[10px] font-medium bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200/60">
                                          {msg.doctor.experienceYears}+ Years Exp
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Availability & Location Strip */}
                                  <div className="mt-2.5 pt-2 border-t border-blue-100 flex items-center justify-between text-[11px]">
                                    <div className="flex items-center space-x-1 text-slate-600 truncate">
                                      <MapPin className="w-3 h-3 text-[#1677B8] shrink-0" />
                                      <span className="truncate">{msg.doctor.room}</span>
                                    </div>
                                    <span className="inline-flex items-center space-x-1 font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      <span>{msg.doctor.availableSlot}</span>
                                    </span>
                                  </div>

                                  {/* Embedded Doctor Action Buttons (Pill-shaped) */}
                                  <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                                    <button
                                      type="button"
                                      onClick={() => handleOpenBookingForm(msg.doctor)}
                                      className="flex-1 min-w-[120px] bg-[#d11f53] hover:bg-[#b81444] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs hover:shadow transition-all flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
                                    >
                                      <Calendar className="w-3.5 h-3.5" />
                                      <span>Book Appointment</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleSend("🔄 Find Another Doctor")}
                                      className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center justify-center space-x-1 active:scale-95 cursor-pointer"
                                    >
                                      <RotateCcw className="w-3 h-3 text-slate-500" />
                                      <span>Find Another</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* ----------------- INLINE BOOKING FORM ----------------- */}
                              {msg.showBookingForm && (
                                <InlineBookingForm
                                  targetDoctor={msg.bookingTargetDoctor}
                                  onConfirmBooking={handleConfirmBooking}
                                />
                              )}
                            </>
                          ) : (
                            <p className="leading-relaxed whitespace-pre-wrap">
                              {msg.text}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Timestamp */}
                      <span className="text-[10px] text-gray-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>

                      {/* Interactive Action Buttons if bot suggested any */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-1.5 pl-7 flex flex-wrap gap-1.5 w-full">
                          {msg.actions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              onClick={() => handleActionClick(action)}
                              className="inline-flex items-center space-x-1.5 bg-white hover:bg-blue-50 border border-blue-200 hover:border-[#1677B8] text-[#123B63] hover:text-[#1677B8] px-3 py-1.5 rounded-full text-xs font-medium shadow-xs transition-all active:scale-95 group cursor-pointer"
                            >
                              <span>{action.label}</span>
                              {action.type === "link" && (
                                <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-[#1677B8]" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center space-x-2 text-gray-500 pl-1">
                      <div className="w-6 h-6 rounded-full bg-[#123B63] text-white flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-blue-200" />
                      </div>
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-3.5 py-2 flex items-center space-x-1.5 shadow-xs">
                        <span className="w-1.5 h-1.5 bg-[#1677B8] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-[#1677B8] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-[#1677B8] rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* ----------------- INPUT COMPONENT ----------------- */}
                <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex items-center space-x-1.5 bg-[#F8FAFC] border border-slate-200 rounded-full px-3 py-1.5 focus-within:border-[#1677B8] focus-within:ring-2 focus-within:ring-[#1677B8]/20 transition-all shadow-inner"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a symptom (e.g., fever) or question..."
                      className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none px-1"
                    />

                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className="w-8 h-8 rounded-full bg-[#123B63] hover:bg-[#1677B8] disabled:bg-slate-200 text-white disabled:text-slate-400 flex items-center justify-center transition-colors shrink-0 shadow-xs cursor-pointer disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <Send className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </form>

                  {/* Micro branding footer */}
                  <div className="mt-1.5 text-center text-[10px] text-slate-400 flex items-center justify-center space-x-1">
                    <span>Lisie Hospital Desk</span>
                    <span>•</span>
                    <span>Kochi, Kerala</span>
                    <span>•</span>
                    <span className="flex items-center text-rose-500">
                      <Heart className="w-2.5 h-2.5 fill-rose-500 inline mr-0.5" />
                      Since 1956
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

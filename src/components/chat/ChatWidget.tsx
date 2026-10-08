"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Calendar,
  Stethoscope,
  Clock,
  AlertTriangle,
  MapPin,
  ShieldCheck,
  Bot,
  Heart,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import {
  getBotResponse,
  BotResponse,
  ChatAction,
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

        // Check if numbered list item (e.g. "1. Step")
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

        // Check if bullet item
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

export default function ChatWidget() {
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message
  const initWelcomeMessage = useCallback(() => {
    const welcomeMsg: MessageItem = {
      id: "welcome-1",
      sender: "bot",
      text: "👋 **Hello and welcome to Lisie Hospital!**\n\nI am your digital healthcare assistant. How can I help you today with doctor appointments, OP timings, emergency care, or hospital services?",
      timestamp: getFormattedTime(),
      actions: [
        { label: "📅 Book Appointment", type: "modal", payload: "appointment" },
        { label: "👨‍⚕️ Find a Doctor", type: "modal", payload: "doctor-search" },
        { label: "🕒 OP Timings", type: "modal", payload: "op-timings" },
      ],
      quickReplies: INITIAL_QUICK_REPLIES,
    };
    setMessages([welcomeMsg]);
  }, []);

  useEffect(() => {
    initWelcomeMessage();

    // Show initial teaser bubble after 3 seconds if modal hasn't been opened
    const timer = setTimeout(() => {
      setShowWelcomeBubble(true);
    }, 2800);

    return () => clearTimeout(timer);
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

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowWelcomeBubble(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleSend = (textToSend?: string) => {
    const messageText = (textToSend ?? inputText).trim();
    if (!messageText) return;

    setInputText("");
    playSound("send", isMuted);

    // Add user message
    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate smart thinking delay
    const responseDelay = Math.min(800, Math.max(400, messageText.length * 15));
    setTimeout(() => {
      const response: BotResponse = getBotResponse(messageText);
      const botMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        timestamp: getFormattedTime(),
        actions: response.actions,
        quickReplies: response.quickReplies,
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
      window.location.href = `tel:${action.payload}`;
    } else if (action.type === "link") {
      window.open(action.payload, "_blank", "noopener,noreferrer");
    } else if (action.type === "message") {
      handleSend(action.payload);
    }
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
      {/* 1. FLOATING CHAT BUTTON (Bottom-Right Corner)            */}
      {/* ======================================================== */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none">
        {/* Floating Greeting Pill / Teaser */}
        <AnimatePresence>
          {showWelcomeBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-3 mr-1 bg-white/95 backdrop-blur-md text-[#123B63] px-3.5 py-2 rounded-2xl shadow-xl border border-blue-100 flex items-center space-x-2 text-xs font-medium max-w-[260px] relative group cursor-pointer hover:border-[#1677B8] transition-colors"
              onClick={handleOpen}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="leading-snug">
                👋 Need help? Chat with <strong className="text-[#1677B8]">Lisie Care</strong>
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWelcomeBubble(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {/* Little triangle arrow pointing down to button */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-blue-100" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isOpen ? "Close hospital chat" : "Open hospital chat assistant"}
          className={`relative group flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full text-white shadow-[0_8px_30px_rgba(18,59,99,0.38)] focus:outline-none focus:ring-4 focus:ring-[#1677B8]/40 transition-all duration-300 ${
            isOpen
              ? "bg-[#0E2A47] hover:bg-[#123B63] ring-2 ring-white/40"
              : "bg-gradient-to-tr from-[#0E2A47] via-[#123B63] to-[#1677B8] hover:shadow-[0_12px_36px_rgba(22,119,184,0.45)]"
          }`}
        >
          {/* Animated pulsing glow backdrop when closed */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#1677B8] to-[#8C1138] opacity-30 blur-sm group-hover:opacity-50 transition duration-500 animate-pulse" />
          )}

          {/* Active online green badge indicator */}
          <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>

          {/* Icon morphing between Chat and Close */}
          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 transition-transform duration-200 rotate-0 group-hover:rotate-90" />
            ) : (
              <div className="relative">
                <MessageSquare className="w-6 h-6 text-white" />
                <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-bounce" />
              </div>
            )}
          </div>
        </motion.button>
      </div>

      {/* ======================================================== */}
      {/* 2. CORNER CHAT MODAL / FLOATING WINDOW                  */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "590px",
            }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className={`fixed bottom-22 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] max-h-[calc(100vh-120px)] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(14,42,71,0.38)] border border-slate-200/90 overflow-hidden flex flex-col`}
          >
            {/* ----------------- MODAL HEADER ----------------- */}
            <div className="bg-gradient-to-r from-[#0E2A47] via-[#123B63] to-[#1677B8] text-white p-4 sm:px-5 sm:py-3.5 flex items-center justify-between shadow-md relative z-10">
              {/* Left: Avatar & Hospital Helpdesk Title */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
                    <Bot className="w-5 h-5 text-blue-200" />
                  </div>
                  {/* Glowing online dot */}
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

              {/* Right: Header Action Controls */}
              <div className="flex items-center space-x-1 text-white/80">
                {/* Sound Toggle */}
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

                {/* Reset Conversation */}
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Restart conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Minimize Toggle */}
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

                {/* Close Button */}
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

            {/* If NOT minimized, show the rest of the modal */}
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
                        className={`flex items-end space-x-1.5 max-w-[88%] ${
                          msg.sender === "user"
                            ? "flex-row-reverse space-x-reverse"
                            : "flex-row"
                        }`}
                      >
                        {/* Avatar for bot */}
                        {msg.sender === "bot" && (
                          <div className="w-6 h-6 rounded-full bg-[#123B63] text-white flex items-center justify-center shrink-0 mb-1 shadow-xs">
                            <Bot className="w-3.5 h-3.5 text-blue-200" />
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 shadow-xs ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-[#123B63] to-[#1677B8] text-white rounded-br-xs"
                              : "bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs"
                          }`}
                        >
                          {msg.sender === "bot" ? (
                            <RenderBotText text={msg.text} />
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
                        <div className="mt-2 pl-7 flex flex-wrap gap-1.5 w-full">
                          {msg.actions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              onClick={() => handleActionClick(action)}
                              className="inline-flex items-center space-x-1.5 bg-white hover:bg-blue-50 border border-blue-200 text-[#123B63] hover:text-[#1677B8] px-2.5 py-1 rounded-full text-xs font-medium shadow-xs transition-all active:scale-95 group"
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
                      placeholder="Type a message (e.g., book appointment)..."
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

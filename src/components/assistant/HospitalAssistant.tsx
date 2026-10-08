"use client";

import React, { useState, useEffect, useRef } from "react";
import NurseMascot from "./NurseMascot";
import AssistantGreeting, { COMPACT_MESSAGES } from "./AssistantGreeting";
import AssistantLauncher from "./AssistantLauncher";

export default function HospitalAssistant() {
  const [mounted, setMounted] = useState(false);
  const [isGreetingVisible, setIsGreetingVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const assistantRef = useRef<HTMLDivElement>(null);
  const reopenTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mount effect: opens the speech bubble automatically on load!
  useEffect(() => {
    setMounted(true);

    const initialTimer = setTimeout(() => {
      setIsGreetingVisible(true);
    }, 800);

    return () => clearTimeout(initialTimer);
  }, []);

  // Listen to Chatbot Modal visibility state: when modal opens, hide mascot; when modal closes, show mascot again!
  useEffect(() => {
    const handleChatState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsChatOpen(Boolean(customEvent.detail?.isOpen));
    };

    window.addEventListener("chatbot-visibility-changed", handleChatState);
    return () => {
      window.removeEventListener("chatbot-visibility-changed", handleChatState);
    };
  }, []);

  // 10-second loop: automatically rotates through helpful nurse messages
  useEffect(() => {
    if (!mounted || !isGreetingVisible || isPaused || isChatOpen) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % COMPACT_MESSAGES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [mounted, isGreetingVisible, isPaused, isChatOpen]);

  // When user closes the speech bubble, automatically re-open after 5 seconds!
  const handleDismissGreeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGreetingVisible(false);

    if (reopenTimerRef.current) {
      clearTimeout(reopenTimerRef.current);
    }

    // Opens automatically after 5 seconds with next message
    reopenTimerRef.current = setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % COMPACT_MESSAGES.length);
      setIsGreetingVisible(true);
    }, 5000);
  };

  // Clicking our doctor cartoon image opens Hafeez's chatbot modal
  const handleOpenChatbot = () => {
    if (reopenTimerRef.current) {
      clearTimeout(reopenTimerRef.current);
    }
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reopenTimerRef.current) {
        clearTimeout(reopenTimerRef.current);
      }
    };
  }, []);

  // When chatbot modal is open, completely hide the cartoon picture!
  if (!mounted || isChatOpen) return null;

  return (
    <aside
      ref={assistantRef}
      aria-label="Lisie AI Hospital Assistant"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-9 md:right-9 z-50 flex flex-col items-end pointer-events-auto select-none"
    >
      <div className="relative flex flex-col items-end">
        {/* Spacious WhatsApp-style Blue chat bubble with comfortable breathing space above nurse */}
        <AssistantGreeting
          isVisible={isGreetingVisible}
          messageIndex={messageIndex}
          onClose={handleDismissGreeting}
          onClick={handleOpenChatbot}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        />

        {/* Doctor Cartoon Image: clicking opens the chatbot modal, and the picture hides */}
        <AssistantLauncher
          onClick={handleOpenChatbot}
          ariaLabel="Click to open Lisie AI hospital chatbot"
        >
          <NurseMascot isGreetingVisible={isGreetingVisible} />
        </AssistantLauncher>
      </div>
    </aside>
  );
}

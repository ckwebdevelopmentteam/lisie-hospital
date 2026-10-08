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

  // 10-second loop: automatically rotates through helpful nurse messages
  useEffect(() => {
    if (!mounted || !isGreetingVisible || isPaused) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % COMPACT_MESSAGES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [mounted, isGreetingVisible, isPaused]);

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

  const handleNurseClick = () => {
    if (reopenTimerRef.current) {
      clearTimeout(reopenTimerRef.current);
    }
    // Clicking toggles / advances speech bubble
    if (!isGreetingVisible) {
      setIsGreetingVisible(true);
    } else {
      setMessageIndex((prev) => (prev + 1) % COMPACT_MESSAGES.length);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reopenTimerRef.current) {
        clearTimeout(reopenTimerRef.current);
      }
    };
  }, []);

  if (!mounted) return null;

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
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        />

        {/* Male Nurse Mascot placed in the bottom corner with generous padding */}
        <AssistantLauncher
          onClick={handleNurseClick}
          ariaLabel="Lisie AI Male Nurse Assistant Mascot"
        >
          <NurseMascot isGreetingVisible={isGreetingVisible} />
        </AssistantLauncher>
      </div>
    </aside>
  );
}

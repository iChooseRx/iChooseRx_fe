"use client";

import { useState, useEffect } from "react";
import { useSessionTimer } from "@/context/SessionTimerContext";
import AdSlot from "./AdSlot";

export default function TimeBasedAdGateModal() {
  const { elapsedTime } = useSessionTimer();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // ⏳ Trigger after total 3 minutes
  useEffect(() => {
    if (elapsedTime >= 180 && !showModal) {
      setShowModal(true);
    }
  }, [elapsedTime, showModal]);

  // ⏲️ Countdown after showing
  useEffect(() => {
    if (showModal && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showModal, countdown]);

  // ✅ Dismiss only after countdown
  const handleClose = () => {
    if (countdown === 0) {
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 text-foreground max-w-lg w-full p-6 rounded-xl shadow-lg border border-borderColor">
        <h2 className="text-xl font-bold mb-2 text-center">Support iChooseRx</h2>
        <p className="text-center text-sm mb-4">
          To continue using the app, please explore one of the options below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <AdSlot position="modal-ad-1" className="h-32" />
          <AdSlot position="modal-ad-2" className="h-32" />
          <AdSlot position="modal-ad-3" className="h-32" />
        </div>

        <button
          onClick={handleClose}
          disabled={countdown > 0}
          className={`w-full px-6 py-2 rounded ${countdown > 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-blue-700 text-white"
            }`}
        >
          {countdown > 0 ? `Continue in ${countdown}s` : "Continue"}
        </button>
      </div>
    </div>
  );
}

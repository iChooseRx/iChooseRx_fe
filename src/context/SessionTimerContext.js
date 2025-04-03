"use client";
import { createContext, useContext, useEffect, useState } from "react";

const SessionTimerContext = createContext();

export function SessionTimerProvider({ children }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lastModalClosedTime, setLastModalClosedTime] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);

  // Timer keeps running
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SessionTimerContext.Provider value={{
      elapsedTime,
      lastModalClosedTime,
      showModal,
      setShowModal,
      setLastModalClosedTime
    }}>
      {children}
    </SessionTimerContext.Provider>
  );
}

export function useSessionTimer() {
  return useContext(SessionTimerContext);
}

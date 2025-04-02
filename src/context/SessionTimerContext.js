"use client";
import { createContext, useContext, useEffect, useState } from "react";

const SessionTimerContext = createContext();

export function SessionTimerProvider({ children }) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1); // ⏱️ +1 second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SessionTimerContext.Provider value={{ elapsedTime }}>
      {children}
    </SessionTimerContext.Provider>
  );
}

export function useSessionTimer() {
  return useContext(SessionTimerContext);
}

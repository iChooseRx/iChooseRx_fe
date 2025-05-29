"use client";

import { useEffect, useState } from "react";
import SessionExpiredModal from "./SessionExpiredModal";

export default function SessionExpiredModalProvider() {
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const handler = () => setSessionExpired(true);
    window.addEventListener("session-expired", handler);
    return () => window.removeEventListener("session-expired", handler);
  }, []);

  if (!sessionExpired) return null;

  return (
    <SessionExpiredModal
      onAcknowledge={() => {
        setSessionExpired(false);
        window.location.href = "/login";
      }}
    />
  );
}
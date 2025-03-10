"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("user_role") || "user";
      setRole(storedRole);

      // Redirect to the correct dashboard
      if (storedRole === "admin") {
        router.push("/dashboard/admin");
      } else if (storedRole === "pharmacy") {
        router.push("/dashboard/pharmacy");
      } else {
        router.push("/dashboard/user");
      }
    }
  }, [router]);

  return <p>Loading...</p>; // Temporary loading state while redirecting
}

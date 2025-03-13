"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // ✅ Default to user signup if no specific path is provided
    router.replace("/signup/user");
  }, [router]);

  return <p>Redirecting...</p>; // Fallback while redirecting
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/signup/user");
  }, [router]);

  return <p>Redirecting...</p>;
}

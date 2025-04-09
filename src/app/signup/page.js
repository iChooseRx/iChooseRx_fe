"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/signup/user");
  }, [router]);

  return (
    <>
      <DashboardHeader />
      <p>Redirecting...</p>;
    </>
  );
}

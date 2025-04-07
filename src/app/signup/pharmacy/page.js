"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUser } from "@/services/api";
import WhyPharmaciesMatter from "@/components/WhyPharmaciesMatter";

export default function PharmacySignupPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Loading signup form...</p>}>
      <PharmacySignupForm />
    </Suspense>
  );
}

function PharmacySignupForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    pharmacy_name: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    pharmacy_phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const invitationToken = searchParams.get("invitation_token");

  useEffect(() => {
    if (!invitationToken) {
      setError("❌ Invalid or expired invitation.");
    }
  }, [invitationToken]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      user: {
        ...form,
        role: "pharmacy",
        password: form.password,
        password_confirmation: form.password_confirmation,
        invitation_token: invitationToken,
      },
    };

    console.log("📤 Sending request to API:", JSON.stringify(requestData, null, 2));

    try {
      const response = await createUser(requestData);

      if (response.auth_token) {
        localStorage.setItem("auth_token", response.auth_token);
        localStorage.setItem("user_id", response.user.id);
        localStorage.setItem("user_role", response.user.role);

        alert("✅ Pharmacy account created successfully!");
        router.push("/dashboard/pharmacy");
      } else {
        throw new Error("❌ No auth token received");
      }
    } catch (err) {
      console.error("❌ Error in handleSubmit:", err);
      setError("❌ Failed to create account. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  if (!invitationToken) {
    return <p className="text-red-500 text-center">Invalid or expired invitation.</p>;
  }

  return (
    <main className="min-h-screen max-h-screen overflow-y-auto flex flex-col items-center justify-start px-4 py-6 bg-background text-foreground">
      <h1 className="text-2xl sm:text-xl font-bold mb-4 text-center">
        Pharmacy Account Signup
      </h1>

      {error && <p className="text-error">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required />
        <input type="password" name="password_confirmation" placeholder="Confirm Password" onChange={handleChange} className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required />
        <input type="text" name="pharmacy_name" placeholder="Pharmacy Name" onChange={handleChange} className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required />
        <input type="text" name="street_address" placeholder="Street Address" onChange={handleChange} className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required />
        <input type="text" name="state" placeholder="State" onChange={handleChange} className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required />
        <input type="text" name="zip_code" placeholder="Zip Code" onChange={handleChange} className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required />
        <input type="text" name="pharmacy_phone" placeholder="Phone Number" onChange={handleChange} className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required />

        <button type="submit" className="px-6 py-2 bg-primary text-white rounded hover:bg-blue-600">
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <WhyPharmaciesMatter />
    </main>
  );
}
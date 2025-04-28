'use client';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUser } from "@/services/api";
import WhyPharmaciesMatter from "@/components/WhyPharmaciesMatter";
import PhoneInput from "@/components/PhoneInput";
import DashboardHeader from "@/components/DashboardHeader";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
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
    return <p className="text-error text-center">Invalid or expired invitation.</p>;
  }

  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen max-h-screen overflow-y-auto flex flex-col items-center justify-start px-4 py-6 bg-background text-foreground">
        <h1 className="text-2xl sm:text-xl font-bold mb-4 text-center">Pharmacy Account Signup</h1>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="input-field w-full"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="input-field w-full pr-16"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPasswordConfirmation ? "text" : "password"}
              name="password_confirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="input-field w-full pr-16"
              required
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirmation((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label={showPasswordConfirmation ? "Hide password" : "Show password"}
            >
              {showPasswordConfirmation ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type="text"
            name="pharmacy_name"
            placeholder="Pharmacy Name"
            onChange={handleChange}
            className="input-field w-full"
            required
          />
          <input
            type="text"
            name="street_address"
            placeholder="Street Address"
            onChange={handleChange}
            className="input-field w-full"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="input-field w-full"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            className="input-field w-full"
            required
          />
          <input
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            onChange={handleChange}
            className="input-field w-full"
            required
          />
          <PhoneInput
            name="pharmacy_phone"
            value={form.pharmacy_phone}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>

        <div className="mt-4 w-full max-w-2xl">
          <WhyPharmaciesMatter />
        </div>
      </main>
    </>
  );
}
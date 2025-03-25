"use client";

import { formatPhone } from "@/utils/formatters";

export default function PhoneInput({ value, onChange, name = "phone", className = "" }) {
  const handleInput = (e) => {
    const formatted = formatPhone(e.target.value);
    onChange({ target: { name, value: formatted } });
  };

  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleInput}
      className={`input-field w-full ${className}`}
      placeholder="(123) 456-7890"
      inputMode="numeric"
      maxLength={14}
      aria-label="Phone number"
    />
  );
}

"use client";
import { useState } from "react";
import { reportPharmacyAvailability } from "../services/api";
import PhoneInput from "@/components/PhoneInput";
import { formatPhone } from "@/utils/formatters";


export default function ReportPharmacyForm({ brandName }) {
  const [formData, setFormData] = useState({
    pharmacyName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    ndcNumbers: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportPharmacyAvailability({
        ndc_numbers: formData.ndcNumbers
          .split(",")
          .map((ndc) => ndc.trim())
          .filter((ndc) => ndc.length > 0),
        pharmacy: {
          name: formData.pharmacyName,
          phone: formatPhone(formData.phone),
          street_address: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
        },
        notes: formData.notes,
      });
      setSubmitted(true);
    } catch (err) {
      setError("There was a problem submitting your report.");
    }
  };

  if (submitted) {
    return <p className="text-success">✅ Thank you! Your report has been submitted for review.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label className="block text-sm font-semibold mb-1">Pharmacy Name</label>
        <input
          type="text"
          name="pharmacyName"
          value={formData.pharmacyName}
          onChange={handleChange}
          className="input-field w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Street Address</label>
        <input
          type="text"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          className="input-field w-full"
          required
        />
      </div>
      <div className="flex space-x-2">
        <div className="w-1/2">
          <label className="block text-sm font-semibold mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input-field w-full"
            required
          />
        </div>
        <div className="w-1/4">
          <label className="block text-sm font-semibold mb-1">State</label>
          <input
            type="text"
            name="state"
            maxLength="2"
            value={formData.state}
            onChange={handleChange}
            className="input-field w-full"
            required
          />
        </div>
        <div className="w-1/4">
          <label className="block text-sm font-semibold mb-1">Zip</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="input-field w-full"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Phone</label>
        <PhoneInput
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* NDC Numbers Input */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Input <strong>NDC Numbers</strong> (comma-separated) from <strong>How Supplied</strong> Field
        </label>
        <p className="block text-sm font-semibold mb-1">
          ℹ️ If <strong>How Supplied</strong> field is empty, use <strong>Package NDC</strong> for report please. ℹ️
        </p>
        <textarea
          name="ndcNumbers"
          value={formData.ndcNumbers}
          onChange={handleChange}
          className="input-field w-full min-h-[80px]"
          placeholder="Example: 0406-8959-01, 12345-6789-00"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Additional Notes (optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="input-field w-full min-h-[80px]"
          placeholder={`E.g., "Found ${brandName} 10mg strength at pharmacy."`}
        />
      </div>

      <button type="submit" className="btn-primary mt-2">
        Submit Report
      </button>

      {error && <p className="text-error text-sm mt-2">{error}</p>}
    </form >
  );
}

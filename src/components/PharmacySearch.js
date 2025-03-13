"use client";
import { useState } from "react";
import { searchPharmaciesByNDC } from "../services/api";

export default function PharmacySearch() {
  const [ndc, setNdc] = useState("");
  const [pharmacies, setPharmacies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Function to check if a value is valid (not empty, null, or generic)
  const isValid = (value) => {
    if (
      !value ||
      value.trim() === "" ||
      value.toLowerCase().includes("unknown") ||
      value === "000-000-0000" // ❌ Generic phone number
    ) {
      return false;
    }
    return true;
  };

  const handleSearch = async () => {
    if (!ndc.trim()) {
      setError("Please enter a valid NDC.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchPharmaciesByNDC(ndc);
      setPharmacies(data);
    } catch (err) {
      setError("No pharmacies found for this NDC.");
      setPharmacies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow bg-background text-foreground">
      <h2 className="text-2xl font-semibold mb-4">Find Pharmacies by NDC</h2>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Enter NDC number"
          value={ndc}
          onChange={(e) => setNdc(e.target.value)}
          className="border border-borderColor rounded p-2 w-full bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          aria-label="Enter NDC to search for pharmacies"
        />
        <button
          onClick={handleSearch}
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {pharmacies.length > 0 && (
        // ✅ Scrollable pharmacy list
        <div className="max-h-[400px] overflow-y-auto border rounded-lg p-2 shadow-inner">
          <ul className="mt-4 space-y-2">
            {pharmacies.map((pharmacy) => (
              <li key={pharmacy.id} className="border p-2 rounded bg-background text-foreground transition-colors">
                <strong>{pharmacy.name}</strong>
                {isValid(pharmacy.stock_status) && <> - Availability: {pharmacy.stock_status}</>}

                <br />
                {isValid(pharmacy.form) && <>Form: {pharmacy.form} | </>}
                {isValid(pharmacy.strength) && <>Strength: {pharmacy.strength} | </>}

                {/* ✅ Show additional pharmacy details only if valid */}
                {isValid(pharmacy.street_address) && (
                  <p>📍 Address: {pharmacy.street_address}, {pharmacy.city}, {pharmacy.state} {pharmacy.zip_code}</p>
                )}
                {isValid(pharmacy.phone) && <p>📞 Phone: {pharmacy.phone}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

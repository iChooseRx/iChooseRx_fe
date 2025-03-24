"use client";
import { useState } from "react";
import { searchPharmaciesByNDC } from "../services/api";

export default function PharmacySearch() {
  const [ndc, setNdc] = useState("");
  const [pharmacies, setPharmacies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValid = (value) => {
    if (!value || value.trim() === "" || value.toLowerCase().includes("unknown") || value === "000-000-0000") {
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
    <>
      <section className="border-borderColor border p-4 rounded shadow bg-background text-foreground min-h-[550px]">
        <h2 className="text-2xl font-semibold mb-4">Find Pharmacies by NDC</h2>

        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Enter NDC number"
            value={ndc}
            onChange={(e) => setNdc(e.target.value)}
            className="input-field w-full"
            aria-label="Enter NDC to search for pharmacies"
          />
          <button
            onClick={handleSearch}
            className="btn-primary px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        {/* Stabilized results box */}
        <div className="border-borderColor border rounded-lg shadow-inner transition-all min-h-[300px] max-h-[400px] overflow-y-auto p-2 flex items-center justify-center">
          {pharmacies.length > 0 ? (
            <ul className="space-y-2 w-full">
              {pharmacies.map((pharmacy) => (
                <li key={pharmacy.id} className="list-item">
                  <strong>{pharmacy.name}</strong>
                  {isValid(pharmacy.stock_status) && <> - Availability: {pharmacy.stock_status}</>}
                  <br />
                  {isValid(pharmacy.form) && <>Form: {pharmacy.form} | </>}
                  {isValid(pharmacy.strength) && <>Strength: {pharmacy.strength} | </>}
                  {isValid(pharmacy.street_address) && (
                    <p>📍 Address: {pharmacy.street_address}, {pharmacy.city}, {pharmacy.state} {pharmacy.zip_code}</p>
                  )}
                  {isValid(pharmacy.phone) && <p>📞 Phone: {pharmacy.phone}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No search results yet</p>
          )}
        </div>
      </section>
    </>
  );
}

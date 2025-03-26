"use client";

import { useState } from "react";
import { searchPharmaciesByNDC, reportNdcUnavailable } from "../services/api";
import { formatPhone } from "@/utils/formatters";


export default function PharmacySearch() {
  const [ndc, setNdc] = useState("");
  const [pharmacies, setPharmacies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [searched, setSearched] = useState(false);

  const isValid = (value) => {
    return value && value.trim() !== "" && !value.toLowerCase().includes("unknown") && value !== "000-000-0000";
  };

  const handleSearch = async () => {
    if (!ndc.trim()) {
      setError("Please enter a valid NDC.");
      return;
    }

    setLoading(true);
    setError(null);
    setReportMessage("");
    setSearched(true);

    try {
      const data = await searchPharmaciesByNDC(ndc);
      if (data.pharmacies.length === 0) {
        setError(data.message || "No pharmacies found for this NDC.");
      } else {
        setPharmacies(data.pharmacies);
      }
    } catch (err) {
      setError("An error occurred while searching.");
      setPharmacies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReportUnavailable = async (pharmacy) => {
    try {
      await reportNdcUnavailable({
        ndc,
        pharmacy_id: pharmacy.id,
      });
      setReportMessage(`✅ Report submitted for ${pharmacy.name}. Thank you!`);
    } catch (err) {
      setReportMessage("❌ Failed to submit report.");
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
        {reportMessage && <p className="text-success mb-2">{reportMessage}</p>}

        {/* Results */}
        <div className="border-borderColor border rounded-lg shadow-inner transition-all min-h-[300px] max-h-[400px] overflow-y-auto p-2 flex items-center justify-center">
          {pharmacies.length > 0 ? (
            <ul className="space-y-2 w-full">
              {pharmacies.map((pharmacy) => (
                <li key={pharmacy.id} className="list-item space-y-1">
                  <strong>{pharmacy.name}</strong>
                  {isValid(pharmacy.stock_status) && <> - Availability: {pharmacy.stock_status}</>}
                  <br />
                  {isValid(pharmacy.form) && <>Form: {pharmacy.form} | </>}
                  {isValid(pharmacy.strength) && <>Strength: {pharmacy.strength} | </>}
                  {isValid(pharmacy.street_address) && (
                    <p>📍 {pharmacy.street_address}, {pharmacy.city}, {pharmacy.state} {pharmacy.zip_code}</p>
                  )}
                  {isValid(pharmacy.phone) && <p>📞 {formatPhone(pharmacy.phone)}</p>}

                  <button
                    onClick={() => handleReportUnavailable(pharmacy)}
                    className="text-sm mt-2 btn-secondary px-2 py-1 rounded"
                  >
                    Report NDC Unavailable
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {searched && !loading && (
                <p className="text-gray-500 italic">No pharmacies found for this NDC.</p>
              )}
              {!searched && !loading && (
                <p className="text-gray-500 italic">No search results yet</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

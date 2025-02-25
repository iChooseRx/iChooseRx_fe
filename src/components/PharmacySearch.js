"use client";
import { useState } from "react";
import { searchPharmaciesByNDC } from "../services/api";

export default function PharmacySearch() {
  const [ndc, setNdc] = useState("");
  const [pharmacies, setPharmacies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <h2 className="text-xl font-semibold mb-3">Find Pharmacies by NDC</h2>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Enter NDC number"
          value={ndc}
          onChange={(e) => setNdc(e.target.value)}
          className="border border-borderColor rounded p-2 w-full bg-white text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
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
        <ul className="mt-4 space-y-2">
          {pharmacies.map((pharmacy) => (
            <li key={pharmacy.id} className="border p-2 rounded bg-gray-100 dark:bg-gray-800">
              <strong>{pharmacy.name}</strong> - {pharmacy.stock_status} <br />
              {pharmacy.form && <>Form: {pharmacy.form} | </>}
              {pharmacy.strength && <>Strength: {pharmacy.strength} | </>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useState } from "react";
import { searchPharmaciesByNDC } from "../services/api";

const PharmacySearch = () => {
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
    <div>
      <h2>Find Pharmacies by NDC</h2>
      <input
        type="text"
        placeholder="Enter NDC number"
        value={ndc}
        onChange={(e) => setNdc(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pharmacies.length > 0 && (
        <ul>
          {pharmacies.map((pharmacy) => (
            <li key={pharmacy.id}>
              <strong>{pharmacy.name}</strong> - {pharmacy.stock_status} <br />
              {pharmacy.form && <>Form: {pharmacy.form} | </>}
              {pharmacy.strength && <>Strength: {pharmacy.strength} | </>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PharmacySearch;

'use client';

import { useEffect, useState } from 'react';
import { getSavedPrescriptions, searchDrugs } from '../../services/api';

export default function Dashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch saved prescriptions on component mount
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getSavedPrescriptions();
        setPrescriptions(data.data);
      } catch {
        setError('Failed to load saved prescriptions.');
      }
    };

    fetchPrescriptions();
  }, []);

  // Handle drug search
  const handleSearch = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await searchDrugs(drugName); // Use the imported searchDrugs function
      setSearchResults(data.data); // Assuming backend uses JSON:API format
    } catch (err) {
      console.error('Search Error:', err); // Log the error for debugging
      setError('Failed to fetch drug data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>

      {/* Error Display */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Search Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Search for Drugs</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="Enter drug name"
            className="border rounded p-2 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <ul className="space-y-4">
            {searchResults.map((result) => (
              <li key={result.id} className="border p-4 rounded shadow">
                <h3 className="font-bold text-lg">
                  {result.attributes.metadata.openfda?.brand_name?.[0] || 'Unknown Brand'}
                </h3>
                <p>
                  <strong>Manufacturer:</strong> {result.attributes.manufacturer || 'N/A'}
                </p>
                <p>
                  <strong>Description:</strong>{' '}
                  {result.attributes.description?.join(', ') || 'No description available.'}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Saved Prescriptions */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Saved Prescriptions</h2>
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription.id} className="mb-2">
              {prescription.attributes.drug_name}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
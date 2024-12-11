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
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const data = await getSavedPrescriptions();
      setPrescriptions(data.data);
    } catch {
      setError('Failed to load saved prescriptions.');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!drugName.trim()) return;

    setError('');
    setLoading(true);

    try {
      const data = await searchDrugs(drugName);
      setSearchResults(data.data);
    } catch (err) {
      console.error('Search Error:', err);
      setError('Failed to fetch drug data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderSearchResults = () => (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Search Results</h2>
      <ul className="space-y-4">
        {searchResults.map((result) => {
          const { metadata, fields, package_label_principal_display_panel } = result.attributes;

          return (
            <li key={result.id} className="border p-4 rounded shadow">
              {/* Brand Name */}
              <h3 className="font-bold text-lg">
                {metadata.openfda?.brand_name?.[0] || 'Unknown Brand'}
              </h3>

              {/* Manufacturer */}
              <p>
                <strong>Manufacturer:</strong> {metadata.openfda?.manufacturer_name?.[0] || 'N/A'}
              </p>

              {/* Description */}
              <p>
                <strong>Description:</strong>{' '}
                {fields?.length > 0 ? fields.join(', ') : 'No description available.'}
              </p>

              {/* Package Label */}
              {package_label_principal_display_panel && (
                <p>
                  <strong>Package Label:</strong>{' '}
                  {package_label_principal_display_panel.join(', ')}
                </p>
              )}

              {/* Metadata */}
              {metadata && (
                <div>
                  <strong>Additional Drug Information:</strong>
                  <ul className="list-disc ml-5">
                    {Object.entries(metadata).map(([key, value]) => {
                      if (key === 'openfda' && typeof value === 'object') {
                        // Handle nested openfda object
                        return (
                          <li key={key}>
                            <strong>{key}:</strong>
                            <ul className="list-disc ml-5">
                              {Object.entries(value).map(([nestedKey, nestedValue]) => (
                                <li key={nestedKey}>
                                  <strong>{nestedKey}:</strong>{' '}
                                  {Array.isArray(nestedValue)
                                    ? nestedValue.join(', ') // Join arrays into a string
                                    : nestedValue.toString()}
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      }
                      return (
                        <li key={key}>
                          <strong>{key}:</strong>{' '}
                          {Array.isArray(value) ? value.join(', ') : value.toString()}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );

  const renderSavedPrescriptions = () => (
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
  );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>

      {/* Error Display */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Search Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Search for Drugs</h2>
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="Enter drug name"
            className={`border rounded p-2 w-full ${drugName === '' ? 'text-green-600 font-bold' : 'text-black font-normal'
              }`}
            style={{ caretColor: 'black' }}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </section>

      {/* Render Search Results */}
      {searchResults.length > 0 && renderSearchResults()}

      {/* Render Saved Prescriptions */}
      {renderSavedPrescriptions()}
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { getSavedPrescriptions, searchDrugs } from '../../services/api';

export default function Dashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null); // State for selected drug
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
    if (e?.preventDefault) {
      e.preventDefault(); // Prevent page reload if this is triggered by a form or button click
    }

    if (!drugName.trim()) return; // Ensure a drug name is entered

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

  const handleSelectDrug = (drug) => {
    // If the clicked drug is already selected, deselect it (collapse)
    if (selectedDrug?.id === drug.id) {
      setSelectedDrug(null);
    } else {
      setSelectedDrug(drug);
    }
  };

  const renderSearchResults = () => (
    <section>
      <h2 className="text-xl font-semibold mb-2">Search Results</h2>
      <ul className="space-y-4">
        {searchResults.map((result) => {
          const { metadata, fields, package_label_principal_display_panel } = result.attributes;
          const isExpanded = selectedDrug?.id === result.id; // Check if this drug is selected

          return (
            <li
              key={result.id}
              className={`border p-4 rounded shadow cursor-pointer ${isExpanded ? 'bg-gray-100' : ''
                }`}
              onClick={() => handleSelectDrug(result)} // Handle click to expand/collapse
            >
              {/* Brand Name */}
              <h3 className="font-bold text-lg text-black">
                {metadata.openfda?.brand_name?.[0] || 'Unknown Brand'}
              </h3>

              {/* Render additional details only if expanded */}
              {isExpanded && (
                <div className="mt-4 text-black">
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
                            return (
                              <li key={key}>
                                <strong>{key}:</strong>
                                <ul className="list-disc ml-5">
                                  {Object.entries(value).map(([nestedKey, nestedValue]) => (
                                    <li key={nestedKey}>
                                      <strong>{nestedKey}:</strong>{' '}
                                      {Array.isArray(nestedValue)
                                        ? nestedValue.join(', ')
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
      <h2 className="text-xl font-semibold mb-4">Your Saved Prescriptions</h2>
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
    <main className="grid grid-cols-2 gap-6 h-screen p-6">
      {/* Left: Saved Prescriptions */}
      <div className="pr-4 border-r">
        {renderSavedPrescriptions()}
      </div>

      {/* Right: Search and Results */}
      <div>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)} // Trigger search on Enter
            placeholder="Enter drug name"
            className="border rounded p-2 w-full font-bold text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchResults.length > 0 && renderSearchResults()}
      </div>
    </main>
  );
}

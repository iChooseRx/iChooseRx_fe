'use client';

import { useEffect, useState } from 'react';
import {
  getSavedPrescriptions,
  searchDrugs,
  createSavedPrescription,
  deleteSavedPrescription,
  logoutUser,
  deleteAccount,
} from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null); // Track expanded search result
  const [selectedPrescription, setSelectedPrescription] = useState(null); // Track expanded saved prescription
  const [resultStats, setResultStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch saved prescriptions
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
    if (e?.preventDefault) e.preventDefault();
    if (!drugName.trim()) return;

    setError('');
    setLoading(true);

    try {
      const { data, meta } = await searchDrugs(drugName);
      setSearchResults(data);
      setResultStats(meta);
    } catch (err) {
      setError('Failed to fetch drug data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert('Logged out successfully!');
      window.location.href = '/login';
    } catch {
      alert('Failed to logout. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const userId = 1; // Replace with the current user's ID if available
        await deleteAccount(userId);
        alert('Account deleted successfully!');
        window.location.href = '/';
      } catch {
        alert('Failed to delete account. Please try again.');
      }
    }
  };

  const handleSavePrescription = async (drugData) => {
    try {
      const payload = {
        drug_name: drugData.metadata.openfda?.brand_name?.[0] || 'Unknown Brand',
        manufacturer: drugData.metadata.openfda?.manufacturer_name?.[0] || 'N/A',
        description: drugData.fields || [],
        package_label_principal_display_panel: drugData.package_label_principal_display_panel?.[0] || 'N/A',
        metadata: drugData.metadata,
      };

      await createSavedPrescription(payload);
      alert('Prescription saved successfully!');
      fetchPrescriptions();
    } catch {
      alert('Failed to save prescription. Please try again.');
    }
  };

  const handleDeletePrescription = async (id) => {
    try {
      await deleteSavedPrescription(id);
      alert('Prescription deleted successfully!');
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.filter((prescription) => prescription.id !== id)
      );
    } catch {
      alert('Failed to delete prescription. Please try again.');
    }
  };

  const chartData = [
    {
      name: 'Results',
      totalResults: resultStats?.total_results || 0,
      filteredResults: resultStats?.filtered_results || 0,
    },
  ];

  const renderSearchResults = () => (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        {`${resultStats?.filtered_results || 0} ${drugName} Search Results without FD&C Food Colorings`}
      </h2>
      <div style={{ width: '100%', height: 150 }} className="mb-4">
        <ResponsiveContainer>
          <BarChart data={chartData} layout="vertical">
            <YAxis type="category" dataKey="name" />
            <XAxis type="number" domain={[0, 'dataMax + 10']} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="totalResults" name="Total Results" fill="#e74c3c" barSize={20} radius={[0, 4, 4, 0]} />
            <Bar dataKey="filteredResults" name="Filtered Results" fill="#2ecc71" barSize={20} radius={[0, 4, 4, 0]} />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-4">
        {searchResults.map((result) => {
          const isExpanded = selectedDrug?.id === result.id;
          const { metadata, fields, package_label_principal_display_panel } = result.attributes;

          return (
            <li key={result.id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{metadata.openfda?.brand_name?.[0] || 'Unknown Brand'}</h3>
                <button
                  onClick={() => setSelectedDrug(isExpanded ? null : result)}
                  className="text-blue-500 hover:underline"
                >
                  {isExpanded ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              {isExpanded && (
                <div className="mt-4">
                  <p>
                    <strong>Manufacturer:</strong> {metadata.openfda?.manufacturer_name?.[0] || 'N/A'}
                  </p>
                  <p>
                    <strong>Description:</strong>{' '}
                    {fields?.length > 0 ? fields.join(', ') : 'No description available.'}
                  </p>
                  {package_label_principal_display_panel && (
                    <p>
                      <strong>Package Label:</strong>{' '}
                      {package_label_principal_display_panel.join(', ')}
                    </p>
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
      <h2 className="text-2xl font-semibold mb-4">Saved Drugs</h2>
      <ul className="space-y-4">
        {prescriptions.map((prescription) => {
          const isExpanded = selectedPrescription?.id === prescription.id;

          return (
            <li key={prescription.id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{prescription.attributes.drug_name || 'Unknown Brand'}</h3>
                <button
                  onClick={() => setSelectedPrescription(isExpanded ? null : prescription)}
                  className="text-blue-500 hover:underline"
                >
                  {isExpanded ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              {isExpanded && (
                <div className="mt-4">
                  <p>
                    <strong>Manufacturer:</strong> {prescription.attributes.manufacturer || 'N/A'}
                  </p>
                  <p>
                    <strong>Description:</strong>{' '}
                    {prescription.attributes.description?.length > 0
                      ? prescription.attributes.description.join(', ')
                      : 'No description available.'}
                  </p>
                  {prescription.attributes.package_label_principal_display_panel && (
                    <p>
                      <strong>Package Label:</strong>{' '}
                      {prescription.attributes.package_label_principal_display_panel}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );

  return (
    <div>
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">NoColoRx</h1>
        <div className="space-x-4">
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
          <button onClick={handleDeleteAccount} className="hover:underline">
            Delete Account
          </button>
        </div>
      </header>
      <main className="grid grid-cols-2 gap-6 h-screen p-6">
        <div className="pr-4 border-r">{renderSavedPrescriptions()}</div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Search FDA for drugs without FD&C food colorings</h2>
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              placeholder="Enter drug's generic name"
              className="border rounded p-2 w-full"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {searchResults.length > 0 && renderSearchResults()}
        </div>
      </main>
    </div>
  );
}

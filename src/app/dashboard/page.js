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
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [resultStats, setResultStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme detection for accessibility
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleThemeChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

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
      console.log('API Meta Data:', meta);
      console.log('Filtered Data:', data);
      setSearchResults(data);
      setResultStats(meta);
    } catch (err) {
      console.error('Search Error:', err);
      setError('Failed to fetch drug data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call logout API
      alert('Logged out successfully!');
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Logout Error:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const userId = 1; // Replace with the current user's ID if available
        await deleteAccount(userId); // Call delete account API
        alert('Account deleted successfully!');
        window.location.href = '/'; // Redirect to home page
      } catch (error) {
        console.error('Delete Account Error:', error);
        alert('Failed to delete account. Please try again.');
      }
    }
  };

  const handleSavePrescription = async (drugData) => {
    try {
      const payload = {
        drug_name: drugData.metadata.openfda?.brand_name?.[0] || 'Unknown Brand',
        manufacturer: drugData.metadata.openfda?.manufacturer_name?.[0] || 'N/A',
        description: drugData.fields || [], // Map fields to description
        package_label_principal_display_panel:
          drugData.package_label_principal_display_panel?.[0] || 'N/A', // Map first item or fallback
        metadata: drugData.metadata, // Full metadata object
      };

      console.log('Saving Prescription Payload:', payload); // Debugging

      await createSavedPrescription(payload); // Send payload to backend
      alert('Prescription saved successfully!');
      fetchPrescriptions(); // Refresh saved prescriptions
    } catch (error) {
      console.error('Error saving prescription:', error);
      alert('Failed to save prescription. Please try again.');
    }
  };

  // Delete saved prescription
  const handleDeletePrescription = async (id) => {
    try {
      await deleteSavedPrescription(id); // API call to delete the prescription
      alert('Prescription deleted successfully!');
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.filter((prescription) => prescription.id !== id)
      ); // Update the state to remove the deleted prescription
    } catch (error) {
      console.error('Error deleting prescription:', error);
      alert('Failed to delete prescription. Please try again.');
    }
  };

  // data for graph
  const chartData = [
    {
      name: 'Results',
      totalResults: resultStats?.total_results || 0,
      filteredResults: resultStats?.filtered_results || 0,
    },
  ];

  const renderSearchResults = () => (
    <section role="region" aria-labelledby="search-results" className="text-foreground bg-background">
      <h2 id="search-results" className="text-xl font-semibold mb-4">
        {`${resultStats?.filtered_results || 0} ${drugName} Search Results without FD&C Food Colorings`}
      </h2>
      <div style={{ width: '100%', height: 150 }} className="mb-4">
        <ResponsiveContainer>
          <BarChart data={chartData} layout="vertical">
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: 'var(--foreground)' }}
              axisLine={{ stroke: 'var(--foreground)' }}
              tickLine={{ stroke: 'var(--foreground)' }}
            />
            <XAxis
              type="number"
              domain={[0, 'dataMax + 10']}
              tick={{ fill: 'var(--foreground)' }}
              axisLine={{ stroke: 'var(--foreground)' }}
              tickLine={{ stroke: 'var(--foreground)' }}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--foreground)',
                fontWeight: 'bold',
              }}
              labelStyle={{
                color: 'var(--foreground)',
                fontWeight: 'bold',
              }}
            />
            <Bar
              dataKey="totalResults"
              name="Total Results"
              fill="#e74c3c"
              barSize={20}
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="filteredResults"
              name="Filtered Results"
              fill="#2ecc71"
              barSize={20}
              radius={[0, 4, 4, 0]}
            />
            <Legend
              content={() => (
                <div className="text-center font-bold" style={{ color: 'var(--foreground)' }}>
                  <span style={{ color: '#e74c3c', marginRight: '10px' }}>
                    Total Results: {resultStats?.total_results || 0}
                  </span>
                  <span style={{ color: '#2ecc71' }}>
                    Filtered Results: {resultStats?.filtered_results || 0}
                  </span>
                </div>
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul role="list" className="space-y-4">
        {searchResults.map((result) => {
          const { metadata, fields, package_label_principal_display_panel } = result.attributes;
          const isExpanded = selectedDrug?.id === result.id;

          return (
            <li
              key={result.id}
              className={`border p-4 rounded shadow transition-colors ${isExpanded
                ? 'bg-white text-black dark:bg-gray-800 dark:text-white'
                : 'bg-gray-100 text-black dark:bg-gray-900 dark:text-white'
                }`}
              role="listitem"
            >
              <div className="flex justify-between items-center">
                {/* Brand Name and Expand/Collapse Button */}
                <div className="flex items-center">
                  <h3 className="font-bold text-lg">
                    {metadata.openfda?.brand_name?.[0] || 'Unknown Brand'}
                    <button
                      onClick={() => setSelectedDrug(isExpanded ? null : result)}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                      aria-expanded={isExpanded}
                      aria-controls={`drug-details-${result.id}`}
                      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded ? '- details' : '+ details'}
                    </button>
                  </h3>
                </div>

                {/* Save Button */}
                <button
                  onClick={() => handleSavePrescription(result.attributes)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  aria-label={`Save prescription for ${metadata.openfda?.brand_name?.[0] || 'Unknown Brand'}`}
                >
                  Save
                </button>
              </div>
              {isExpanded && (
                <div id={`drug-details-${result.id}`} className="mt-4" tabIndex="0">
                  <p>
                    <strong>Manufacturer:</strong> {metadata.openfda?.manufacturer_name?.[0] || 'N/A'}
                  </p>
                  <p>
                    <strong>Description:</strong>{' '}
                    {fields?.length > 0 ? fields.join(', ') : 'No description available.'}
                  </p>
                  {package_label_principal_display_panel && (
                    <p>
                      <strong>Package Label:</strong> {package_label_principal_display_panel.join(', ')}
                    </p>
                  )}
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
    <section role="region" aria-labelledby="saved-prescriptions" className="text-foreground bg-background">
      <h2 id="saved-prescriptions" className="text-2xl font-semibold mb-4">
        Saved Drugs
      </h2>
      <ul role="list" className="space-y-4">
        {prescriptions.map((prescription) => {
          const isExpanded = selectedDrug?.id === prescription.id;

          return (
            <li
              key={prescription.id}
              className={`border p-4 rounded shadow transition-colors ${isExpanded
                ? 'bg-white text-black dark:bg-gray-800 dark:text-white'
                : 'bg-gray-100 text-black dark:bg-gray-900 dark:text-white'
                }`}
              role="listitem"
            >
              <div className="flex justify-between items-center">
                {/* Brand Name and Expand/Collapse Button */}
                <div className="flex items-center">
                  <h3 className="font-bold text-lg">
                    {prescription.attributes.drug_name || 'Unknown Brand'}
                    <button
                      onClick={() => setSelectedDrug(isExpanded ? null : prescription)}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                      aria-expanded={isExpanded}
                      aria-controls={`saved-prescription-details-${prescription.id}`}
                      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded ? '- details' : '+ details'}
                    </button>
                  </h3>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeletePrescription(prescription.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  aria-label={`Delete prescription for ${prescription.attributes.drug_name}`}
                >
                  Delete
                </button>
              </div>

              {/* Render additional details only if expanded */}
              {isExpanded && (
                <div
                  id={`saved-prescription-details-${prescription.id}`}
                  className="mt-4"
                  tabIndex="0"
                >
                  <p>
                    <strong>Manufacturer:</strong>{' '}
                    {prescription.attributes.manufacturer || 'N/A'}
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
                  {prescription.attributes.metadata && (
                    <div>
                      <strong>Additional Drug Information:</strong>
                      <ul className="list-disc ml-5">
                        {Object.entries(prescription.attributes.metadata).map(([key, value]) => {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner Section */}
      <header className="bg-primary text-foreground p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">NoColoRx</h1>
        <div className="space-x-4">
          <button
            onClick={handleLogout}
            className="text-foreground hover:underline"
            aria-label="Logout"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="text-foreground hover:underline"
            aria-label="Delete Account"
          >
            Delete Account
          </button>
        </div>
      </header>

      <main className="grid grid-cols-2 gap-6 h-screen p-6">
        {/* Left: Saved Prescriptions */}
        <div className="pr-4 border-r border-borderColor">
          {renderSavedPrescriptions()}
        </div>

        {/* Right: Search and Results */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Search FDA for drugs without FD&C food colorings</h2>

          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              placeholder="Enter drug's generic name"
              className="border border-borderColor rounded p-2 w-full font-bold bg-white text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              aria-label="Search for a drug by its generic name"
              role="searchbox"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-foreground px-4 py-2 rounded hover:opacity-90"
              disabled={loading}
              aria-label="Search"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {searchResults.length > 0 && renderSearchResults()}
        </div>
      </main>
    </div>
  );
}

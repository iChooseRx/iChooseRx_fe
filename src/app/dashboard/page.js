'use client';

import { useEffect, useState } from 'react';
import { getSavedPrescriptions, searchDrugs } from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Dashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null); // State for selected drug
  const [resultStats, setResultStats] = useState(null);   // Stores total/filtered results
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleThemeChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

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
    if (e?.preventDefault) e.preventDefault();

    if (!drugName.trim()) return; // Ensure input is valid

    setError('');
    setLoading(true);

    try {
      const { data, meta } = await searchDrugs(drugName); // Fetch data from API
      console.log('API Meta Data:', meta); // Debugging log for meta
      console.log('Filtered Data:', data); // Debugging log for filtered data
      setSearchResults(data); // Store filtered drug data
      setResultStats(meta); // Store meta data (total and filtered results)
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

  // bar chart data
  const chartData = [
    {
      name: 'Results',
      totalResults: resultStats?.total_results || 0,
      filteredResults: resultStats?.filtered_results || 0,
    },
  ];

  console.log('Chart Data:', chartData); // Debugging log for chartData

  const renderSearchResults = () => (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        {`${resultStats?.filtered_results || 0} ${drugName} Search Results without FD&C Food Colorings`}
      </h2>
      {/* Bar Graph */}
      <div style={{ width: '100%', height: 200 }} className="mb-4">
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            layout="vertical" // Makes the bars horizontal
          >
            {/* Y-Axis - The "category" axis */}
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }}
              axisLine={{ stroke: isDarkMode ? '#ffffff' : '#000000' }}
              tickLine={{ stroke: isDarkMode ? '#ffffff' : '#000000' }}
            />

            {/* X-Axis - The "number" axis */}
            <XAxis
              type="number"
              domain={[0, 'dataMax + 10']} // Adds padding to the bar lengths
              tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }}
              axisLine={{ stroke: isDarkMode ? '#ffffff' : '#000000' }}
              tickLine={{ stroke: isDarkMode ? '#ffffff' : '#000000' }}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff',
                color: '#000000',
                border: '1px solid #ddd',
              }}
              labelStyle={{ color: '#000000', fontWeight: 'bold' }}
            />

            {/* Bars */}
            <Bar
              dataKey="totalResults"
              name="Total Results"
              fill="#e74c3c"
              barSize={20}
              radius={[0, 4, 4, 0]} // Adjust the corner radius for horizontal bars
            />
            <Bar
              dataKey="filteredResults"
              name="Filtered Results"
              fill="#2ecc71"
              barSize={20}
              radius={[0, 4, 4, 0]}
            />

            {/* Legend */}
            <Legend
              wrapperStyle={{
                color: isDarkMode ? '#ffffff' : '#000000',
                fontWeight: 'bold',
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Drug List */}
      <ul className="space-y-4">
        {searchResults.map((result) => {
          const { metadata, fields, package_label_principal_display_panel } = result.attributes;
          const isExpanded = selectedDrug?.id === result.id; // Check if this drug is selected

          return (
            <li
              key={result.id}
              className={`border p-4 rounded shadow cursor-pointer transition-colors ${isExpanded
                ? 'bg-white text-black dark:bg-gray-900 dark:text-white' // Expanded: Dynamic colors
                : 'bg-gray-100 text-black dark:bg-gray-900 dark:text-white' // Collapsed: Dynamic colors
                }`}
              onClick={() => handleSelectDrug(result)} // Handle click to expand/collapse
            >
              {/* Brand Name */}
              <h3 className="font-bold text-lg">{metadata.openfda?.brand_name?.[0] || 'Unknown Brand'}</h3>

              {/* Render additional details only if expanded */}
              {isExpanded && (
                <div className="mt-4">
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
            placeholder="Enter drug's generic name"
            className="border rounded p-2 w-full font-bold bg-white text-black dark:bg-gray-900 dark:text-white transition-colors"
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


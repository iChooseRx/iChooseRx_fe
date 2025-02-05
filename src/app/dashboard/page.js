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
  const [isClient, setIsClient] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Available filters from the backend
  const FILTER_CATEGORIES = [
    { key: "artificial_colors", label: "Artificial Colors" },
    { key: "artificial_sweeteners", label: "Artificial Sweeteners" },
    { key: "artificial_flavors", label: "Artificial Flavors" },
    { key: "preservatives", label: "Preservatives" },
    { key: "gluten", label: "Gluten" },
    { key: "added_sugar", label: "Added Sugar" },
    { key: "vegan", label: "Animal Ingredients" },
    { key: "possible_endocrine_disruptors", label: "Endocrine Disruptors" }
  ];

  /**
   * ✅ Ensure code only runs on the client
   */
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Prevent SSR execution

    /**
     * ✅ Fix Theme Detection
     */
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleThemeChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [isClient]); // Runs only after `isClient` is true

  /**
   * ✅ Fetch saved prescriptions only after client has loaded
   */
  useEffect(() => {
    if (!isClient) return;
    fetchPrescriptions();
  }, [isClient]);

  const fetchPrescriptions = async () => {
    try {
      const data = await getSavedPrescriptions();
      setPrescriptions(data.data);
    } catch {
      setError('Failed to load saved prescriptions.');
    }
  };

  // Ensure component only renders after client is ready
  if (!isClient) {
    return null;
  }

  /**
   * ✅ Handle filter selection
   */
  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  /**
   * ✅ Handle Search with API Call
   */
  const handleSearch = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!drugName.trim()) return;

    setError('');
    setLoading(true);

    try {
      // Convert selectedFilters array into query string format
      const filterParams = selectedFilters.length
        ? selectedFilters.map((filter) => `filters[]=${encodeURIComponent(filter)}`).join('&')
        : '';

      // Call API with correctly formatted filters
      const { data, meta } = await searchDrugs(drugName, filterParams);

      console.log("Filters Sent:", filterParams);
      console.log("API Response:", data);

      setSearchResults(data);
      setResultStats(meta);
    } catch (err) {
      console.error('Search Error:', err);
      setError('Failed to fetch drug data. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  /**
   * ✅ Handle Logout
   */
  const handleLogout = async () => {
    try {
      await logoutUser();
      alert('Logged out successfully!');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout Error:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  /**
   * ✅ Handle Account Deletion
   */
  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount(1);
        alert('Account deleted successfully!');
        window.location.href = '/';
      } catch (error) {
        console.error('Delete Account Error:', error);
        alert('Failed to delete account. Please try again.');
      }
    }
  };

  /**
   * ✅ Handle Saving a Prescription
   */
  const handleSavePrescription = async (drugData) => {
    try {
      const payload = {
        brand_name: drugData.brand_name || 'Unknown Brand',
        generic_name: drugData.generic_name || 'Unknown Generic',
        substance_name: drugData.substance_name || [],
        manufacturer_name: drugData.manufacturer_name || 'N/A',
        description: drugData.description || 'No description available.',
        inactive_ingredient: drugData.inactive_ingredient || 'N/A',
        alerts: drugData.alerts || [],
        how_supplied: drugData.how_supplied || 'No supply information available.',
        route: drugData.route || 'Unknown',
        product_ndc: drugData.product_ndc || 'N/A',
        package_ndc: drugData.package_ndc || 'N/A',
        original_packager_product_ndc: drugData.original_packager_product_ndc || 'N/A'
      };

      await createSavedPrescription(payload);
      alert('Prescription saved successfully!');
      fetchPrescriptions();
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

  // 
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
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          searchResults.map((result, index) => { // Added index as fallback key
            if (!result) return null; // Ensure result is valid

            const {
              brand_name,
              generic_name,
              substance_name,
              manufacturer_name,
              description,
              inactive_ingredient,
              alerts = [], // Ensure it's always an array
              how_supplied,
              route,
              product_ndc,
              package_ndc,
              original_packager_product_ndc
            } = result || {};

            const isExpanded = selectedDrug?.id === result.id;

            return (
              <li
                key={result.id || `search-result-${index}`} // Ensure unique key
                className={`border p-4 rounded shadow transition-colors ${isExpanded
                  ? 'bg-white text-black dark:bg-gray-800 dark:text-white'
                  : 'bg-gray-100 text-black dark:bg-gray-900 dark:text-white'
                  }`}
                role="listitem"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {brand_name || 'Unknown Brand'}
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

                <button
                  onClick={() => handleSavePrescription(result)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  aria-label={`Save prescription for ${brand_name || 'Unknown Brand'}`}
                >
                  Save
                </button>

                {isExpanded && (
                  <div id={`drug-details-${result.id}`} className="mt-4" tabIndex="0">
                    <p><strong>Generic Name:</strong> {generic_name || 'N/A'}</p>
                    {substance_name && substance_name.length > 0 && (
                      <div>
                        <strong>Substance Name:</strong>
                        <ul className="list-disc ml-5">
                          {substance_name.map((substance, index) => (
                            <li key={index}>{substance}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p><strong>Manufacturer:</strong> {manufacturer_name || 'N/A'}</p>
                    <p><strong>Description:</strong> {description || 'No description available.'}</p>
                    <p><strong>Inactive Ingredients:</strong> {inactive_ingredient || 'N/A'}</p>
                    {alerts.length > 0 && (
                      <div>
                        <strong>Alerts:</strong>
                        <ul className="list-disc ml-5">
                          {alerts.map((alert, index) => (
                            <li key={index}>{alert.message}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p><strong>How Supplied:</strong> {how_supplied || 'No supply information available.'}</p>
                    <p><strong>Route:</strong> {route || 'Unknown'}</p>
                    <p><strong>Product NDC:</strong> {product_ndc || 'N/A'}</p>
                    <p><strong>Package NDC:</strong> {package_ndc || 'N/A'}</p>
                    <p><strong>Original Packager Product NDC:</strong> {original_packager_product_ndc || 'N/A'}</p>
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <p>No results found.</p>
        )}
      </ul>
    </section>
  );

  const renderSavedPrescriptions = () => (
    <section role="region" aria-labelledby="saved-prescriptions" className="text-foreground bg-background">
      <h2 id="saved-prescriptions" className="text-2xl font-semibold mb-4">
        Saved Drugs
      </h2>
      <ul role="list" className="space-y-4">
        {Array.isArray(prescriptions) && prescriptions.length > 0 ? (
          prescriptions.map((prescription) => {
            if (!prescription) return null; // Ensure valid prescription data

            const {
              brand_name,
              generic_name,
              substance_name,
              manufacturer_name,
              description,
              inactive_ingredient,
              alerts = [], // Ensure alerts is an array
              how_supplied,
              route,
              product_ndc,
              package_ndc,
              original_packager_product_ndc
            } = prescription || {}; // Prevent destructuring issues

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
                  <h3 className="font-bold text-lg">
                    {brand_name || 'Unknown Brand'}
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

                <button
                  onClick={() => handleDeletePrescription(prescription.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  aria-label={`Delete prescription for ${brand_name || 'Unknown Brand'}`}
                >
                  Delete
                </button>

                {isExpanded && (
                  <div id={`saved-prescription-details-${prescription.id}`} className="mt-4" tabIndex="0">
                    <p><strong>Generic Name:</strong> {generic_name || 'N/A'}</p>
                    {substance_name && substance_name.length > 0 && (
                      <div>
                        <strong>Substance Name:</strong>
                        <ul className="list-disc ml-5">
                          {substance_name.map((substance, index) => (
                            <li key={index}>{substance}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p><strong>Manufacturer:</strong> {manufacturer_name || 'N/A'}</p>
                    <p><strong>Description:</strong> {description || 'No description available.'}</p>
                    <p><strong>Inactive Ingredients:</strong> {inactive_ingredient || 'N/A'}</p>

                    {alerts.length > 0 && (
                      <div>
                        <strong>Alerts:</strong>
                        <ul className="list-disc ml-5">
                          {alerts.map((alert, index) => (
                            <li key={index}>{alert.message}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p><strong>How Supplied:</strong> {how_supplied || 'No supply information available.'}</p>
                    <p><strong>Route:</strong> {route || 'Unknown'}</p>
                    <p><strong>Product NDC:</strong> {product_ndc || 'N/A'}</p>
                    <p><strong>Package NDC:</strong> {package_ndc || 'N/A'}</p>
                    <p><strong>Original Packager Product NDC:</strong> {original_packager_product_ndc || 'N/A'}</p>
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <p>No saved prescriptions found.</p>
        )}
      </ul>
    </section>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner Section */}
      <header className="bg-primary text-foreground p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">iChooseRx</h1>
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
          <h2 className="text-2xl font-semibold mb-4">Search FDA approved drugs with the filters below</h2>

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

          <div className="flex flex-wrap gap-2 mb-4">
            {FILTER_CATEGORIES.map((filter) => (
              <label key={filter.key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter.key)}
                  onChange={() => toggleFilter(filter.key)}
                  className="form-checkbox"
                />
                <span className="text-sm">{filter.label}</span>
              </label>
            ))}
          </div>
          {searchResults.length > 0 && renderSearchResults()}
        </div>
      </main>
    </div>
  );
}

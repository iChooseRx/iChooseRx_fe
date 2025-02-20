"use client"; // Mark this file as a client component

import { useState, useEffect } from 'react';
import {
  searchDrugs,
  createSaveddrug,
  deleteSaveddrug,
  logoutUser,
  deleteAccount,
  updateSaveddrugNotes
} from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardClient() {
  const [drugs, setDrugs] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [expandedSearchId, setExpandedSearchId] = useState(null);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [resultStats, setResultStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [notesBydrug, setNotesBydrug] = useState({});

  // This array defines all filter categories from the backend
  const FILTER_CATEGORIES = [
    { key: 'artificial_colors', label: 'No Artificial Colors' },
    { key: 'artificial_sweeteners', label: 'No Artificial Sweeteners' },
    { key: 'artificial_flavors', label: 'No Artificial Flavors' },
    { key: 'preservatives', label: 'No Preservatives' },
    { key: 'gluten', label: 'No Gluten' },
    { key: 'added_sugar', label: 'No Added Sugar' },
    { key: 'vegan', label: 'No Animal Ingredients' },
    { key: 'possible_endocrine_disruptors', label: 'No Endocrine Disruptors' }
  ];

  /**
   * 1) Theme detection (client side)
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleThemeChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  /**
   * 2) Fetch saved drugs immediately on mount
   */
  useEffect(() => {
    fetchDrugs();
  }, []);

  /**
   * Helper function to load saved drugs from Rails
   */
  async function fetchDrugs() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL}/saved_drugs`,
        { credentials: 'include' }
      );
      if (res.status === 401) {
        // If unauthorized, you can redirect or display an error message
        alert('You are not logged in!');
        window.location.href = '/login';
        return;
      }
      const data = await res.json();
      console.log('Fetched saved_drugs:', data);

      if (Array.isArray(data.data)) {
        // Flatten the JSON:API structure
        const flattened = data.data.map((r) => ({
          id: r.id,
          ...r.attributes,
        }));
        setDrugs(flattened);
      } else {
        setDrugs([]);
      }
    } catch (error) {
      console.error('Error fetching drugs:', error);
    }
  }

  /**
   * Toggle filter selection
   */
  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  /**
   * 3) Handle searching for drugs
   */
  const handleSearch = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!drugName.trim()) return;

    setError('');
    setLoading(true);
    setSelectedDrug(null);
    setExpandedSearchId(null);

    try {
      // Build filter query string
      const filterParams = selectedFilters
        .map((f) => `filters[]=${encodeURIComponent(f)}`)
        .join('&');

      const { data, meta } = await searchDrugs(drugName, filterParams);
      const formattedResults = data.map((item) => ({
        id: item.id,
        ...item.attributes,
      }));

      setSearchResults(formattedResults);
      setResultStats(meta);
    } catch (err) {
      console.error('Search Error:', err);
      setError('Failed to fetch drug data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 4) Logout
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
   * 5) Delete account
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
   * 6) Save a new drug
   */
  const handleSavedrug = async (drugData) => {
    try {
      const payload = {
        brand_name: drugData.brand_name,
        generic_name: drugData.generic_name,
        substance_name: drugData.substance_name,
        manufacturer_name: drugData.manufacturer_name,
        description: Array.isArray(drugData.description)
          ? drugData.description.join('\n')
          : drugData.description || 'No description available.',
        inactive_ingredient: drugData.inactive_ingredient,
        alerts: drugData.alerts,
        how_supplied: drugData.how_supplied,
        route: drugData.route,
        product_ndc: drugData.product_ndc,
        package_ndc: drugData.package_ndc,
        notes: drugData.notes,
      };
      await createSaveddrug(payload);
      alert('Drug saved successfully!');
      // Refresh list
      await fetchDrugs();
    } catch (error) {
      console.error('Error saving drug:', error);
      alert('Failed to save drug. Please try again.');
    }
  };

  /**
   * 7) Note handling
   */
  function handleNoteChange(drugId, newNotes) {
    setNotesBydrug((prev) => ({
      ...prev,
      [drugId]: newNotes,
    }));
  }

  const handleUpdateNotes = async (id, notes) => {
    try {
      await updateSaveddrugNotes(id, notes);
      await fetchDrugs();
    } catch (error) {
      console.error('Failed to update notes:', error);
    }
  };

  /**
   * 8) Delete a drug
   */
  const handleDeletedrug = async (id) => {
    try {
      await deleteSaveddrug(id);
      alert('Drug deleted successfully!');
      setDrugs((prev) => prev.filter((drug) => drug.id !== id));
    } catch (error) {
      console.error('Error deleting drug:', error);
      alert('Failed to delete drug. Please try again.');
    }
  };

  /**
   * 9) Data for charts
   */
  const chartData = [
    {
      name: 'Results',
      totalResults: resultStats?.total_results || 0,
      filteredResults: resultStats?.filtered_results || 0,
    },
  ];

  /**
   * 10) Render search results
   */
  const renderSearchResults = () => (
    <section
      role="region"
      aria-labelledby="search-results"
      className="text-foreground bg-background"
    >
      <h2 id="search-results" className="text-xl font-semibold mb-4">
        {`${resultStats?.filtered_results || 0} ${drugName} results you can choose from with your selected filters!`}
      </h2>
      {/* Chart */}
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
              labelStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }}
            />
            <Bar dataKey="totalResults" name="Total Results" fill="#e74c3c" barSize={20} radius={[0, 4, 4, 0]} />
            <Bar dataKey="filteredResults" name="Filtered Results" fill="#2ecc71" barSize={20} radius={[0, 4, 4, 0]} />
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

      {/* Actual search results */}
      <ul role="list" className="space-y-4">
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          searchResults.map((result) => {
            if (!result) return null;

            const uniqueId = result.id;
            const {
              brand_name,
              generic_name,
              substance_name,
              manufacturer_name,
              description,
              inactive_ingredient,
              alerts = [],
              how_supplied,
              route,
              product_ndc,
              package_ndc
            } = result;

            const isExpanded = expandedSearchId === uniqueId;

            return (
              <li
                key={uniqueId}
                className={`border p-4 rounded shadow transition-colors ${isExpanded
                  ? 'bg-white text-black dark:bg-gray-900 dark:text-white'
                  : 'bg-gray-100 text-black dark:bg-gray-950 dark:text-white'
                  }`}
                role="listitem"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {brand_name || 'Unknown Brand'}
                    <button
                      onClick={() => setExpandedSearchId(isExpanded ? null : uniqueId)}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded ? '- details' : '+ details'}
                    </button>
                  </h3>
                </div>

                {/* Save a drug */}
                <button
                  onClick={() => handleSavedrug(result)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  aria-label={`Save drug for ${brand_name || 'Unknown Brand'}`}
                >
                  Save
                </button>

                {isExpanded && (
                  <div id={`drug-details-${uniqueId}`} className="mt-4" tabIndex="0">
                    <p><strong>Generic Name:</strong> {generic_name || 'N/A'}</p>
                    {substance_name && substance_name.length > 0 && (
                      <div>
                        <strong>Substance Name:</strong>
                        <ul className="list-disc ml-5">
                          {substance_name.map((substance, idx) => (
                            <li key={idx}>{substance}</li>
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
                          {alerts.map((alert, idx) => (
                            <li key={idx}>{alert.message}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p><strong>How Supplied:</strong> {how_supplied || 'No supply info'}</p>
                    <p><strong>Route:</strong> {route || 'Unknown'}</p>
                    <p><strong>Product NDC:</strong> {product_ndc || 'N/A'}</p>
                    <p><strong>Package NDC:</strong> {package_ndc || 'N/A'}</p>
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

  /**
   * 11) Render saved drugs (left column)
   */
  const renderSaveddrugs = () => (
    <section
      role="region"
      aria-labelledby="saved-drugs"
      className="text-foreground bg-background"
    >
      <h2 id="saved-drugs" className="text-2xl font-semibold mb-4">
        Saved Drugs
      </h2>
      <ul role="list" className="space-y-4">
        {Array.isArray(drugs) && drugs.length > 0 ? (
          drugs.map((drug) => {
            if (!drug) return null;

            const {
              brand_name,
              generic_name,
              substance_name,
              manufacturer_name,
              description,
              inactive_ingredient,
              alerts = [],
              how_supplied,
              route,
              product_ndc,
              package_ndc,
              notes,
            } = drug;

            const isExpanded = selectedDrug?.id === drug.id;

            return (
              <li
                key={drug.id}
                className={`border p-4 rounded shadow transition-colors ${isExpanded
                  ? 'bg-white text-black dark:bg-gray-900 dark:text-white'
                  : 'bg-gray-100 text-black dark:bg-gray-950 dark:text-white'
                  }`}
                role="listitem"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {brand_name || 'Unknown Brand'}
                    <button
                      onClick={() => setSelectedDrug(isExpanded ? null : drug)}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                      aria-expanded={isExpanded}
                      aria-controls={`saved-drug-details-${drug.id}`}
                      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded ? '- details' : '+ details'}
                    </button>
                  </h3>
                </div>

                {/* Delete drug */}
                <button
                  onClick={() => handleDeletedrug(drug.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  aria-label={`Delete drug for ${brand_name || 'Unknown Brand'}`}
                >
                  Delete
                </button>

                {isExpanded && (
                  <div
                    id={`saved-drug-details-${drug.id}`}
                    className="mt-4"
                    tabIndex="0"
                  >
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
                          {alerts.map((alert, idx) => (
                            <li key={idx}>{alert.message}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p><strong>How Supplied:</strong> {how_supplied || 'No supply info'}</p>
                    <p><strong>Route:</strong> {route || 'Unknown'}</p>
                    <p><strong>Product NDC:</strong> {product_ndc || 'N/A'}</p>
                    <p><strong>Package NDC:</strong> {package_ndc || 'N/A'}</p>
                    {/* Notes */}
                    <textarea
                      value={(notesBydrug[drug.id] ?? notes) || ''}
                      onChange={(e) => handleNoteChange(drug.id, e.target.value)}
                      placeholder="Add your notes here..."
                      className="border border-borderColor rounded p-2 w-full font-bold bg-white text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors mt-2"
                    />
                    <button
                      onClick={() =>
                        handleUpdateNotes(drug.id, notesBydrug[drug.id] ?? notes)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Save Notes
                    </button>
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <p>No saved drugs found.</p>
        )}
      </ul>
    </section>
  );

  /**
   * Main Render
   */
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-primary text-foreground p-4 flex justify-between items-center">
        <h1 className="text-3xl md:text-5xl font-bold">iChooseRx</h1>
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
        {/* Left Column: Saved Drugs */}
        <div className="pr-4 border-r border-borderColor">
          {renderSaveddrugs()}
        </div>

        {/* Right Column: Search & Results */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Search FDA approved drugs with iChoseRx filters!
          </h2>
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

          {/* Filter Checkboxes */}
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

          {/* Show search results */}
          {searchResults.length > 0 && renderSearchResults()}
        </div>
      </main>
    </div>
  );
}

"use client";
import React, { useState, useRef, useEffect } from "react";
import ResultsChart from "./ResultsChart";

export default function SearchResults({ results, resultStats, onSave, hasSearched }) {
  const [expandedSearchId, setExpandedSearchId] = useState(null);
  const resultsContainerRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isInteracting, setIsInteracting] = useState(true);
  const timeoutRef = useRef(null);

  const handleToggleExpand = (id) => {
    setExpandedSearchId((prev) => (prev === id ? null : id));
  };

  const handleScroll = () => {
    if (resultsContainerRef.current) {
      setShowBackToTop(resultsContainerRef.current.scrollTop > 200);
    }
    resetInteractionTimer();
  };

  const handleMouseMove = () => {
    resetInteractionTimer();
  };

  const resetInteractionTimer = () => {
    setIsInteracting(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3000);
  };

  const scrollToTop = () => {
    if (resultsContainerRef.current) {
      resultsContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = resultsContainerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("scroll", handleScroll);
      }
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // --- FALLBACK HANDLING ---
  if (!hasSearched) return null;

  const total = resultStats?.total_results ?? 0;
  const filtered = resultStats?.filtered_results ?? 0;

  if (total === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p>🔍 No drugs found matching your search terms.</p>
        <p className="text-sm mt-1">Try adjusting your spelling or searching by generic name.</p>
      </div>
    );
  }

  if (total > 0 && filtered === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p>⚠️ No results match your selected filters.</p>
        <p className="text-sm mt-1">Try loosening your filters or modifying your search.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p>⚠️ No visible results with your current query and filters.</p>
        <p className="text-sm mt-1">Try changing your search input or removing some filters.</p>
      </div>
    );
  }

  // --- MAIN RESULTS ---
  return (
    <section role="region" aria-labelledby="search-results">
      <h2 id="search-results" className="text-xl font-semibold mb-4">
        {`${resultStats?.filtered_results || 0} results found with your selected filters`}
      </h2>

      <ResultsChart resultStats={resultStats} />

      <div
        ref={resultsContainerRef}
        className="relative max-h-[500px] overflow-y-auto border border-borderColor rounded-lg p-2 shadow-inner"
      >
        <ul role="list" className="space-y-4">
          {results.map((result) => {
            if (!result) return null;
            const uniqueId = result.id;
            const isExpanded = expandedSearchId === uniqueId;

            return (
              <li
                key={uniqueId}
                className={`list-item ${isExpanded ? "shadow-lg" : ""}`}
                role="listitem"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {result.brand_name || "Unknown Brand"}
                    <button
                      onClick={() => handleToggleExpand(uniqueId)}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? "Collapse details" : "Expand details"}
                    >
                      {isExpanded ? "- details" : "+ details"}
                    </button>
                  </h3>
                </div>

                <button
                  onClick={() => onSave(result)}
                  className="btn-primary px-3 py-1 rounded mt-2"
                  aria-label={`Save drug for ${result.brand_name || "Unknown Brand"}`}
                >
                  Save
                </button>

                {isExpanded && (
                  <div
                    id={`drug-details-${uniqueId}`}
                    className="mt-4 collapsible-container open"
                    tabIndex="0"
                  >
                    <p><strong>Generic Name:</strong> {result.generic_name || "N/A"}</p>
                    {result.substance_name && result.substance_name.length > 0 && (
                      <div>
                        <strong>Substance Name:</strong>
                        <ul className="list-disc ml-5">
                          {result.substance_name.map((substance, idx) => (
                            <li key={idx}>{substance}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p><strong>Manufacturer:</strong> {result.manufacturer_name || "N/A"}</p>
                    <p><strong>Description:</strong> {result.description || "No description available."}</p>
                    <p><strong>Inactive Ingredients:</strong> {result.inactive_ingredient || "N/A"}</p>
                    {result.alerts.length > 0 && (
                      <div>
                        <strong>Alerts:</strong>
                        <ul className="list-disc ml-5">
                          {result.alerts.map((alert, idx) => (
                            <li key={idx}>{alert.message}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p><strong>How Supplied:</strong> {result.how_supplied || "No supply info"}</p>
                    <p><strong>Route:</strong> {result.route || "Unknown"}</p>
                    <p><strong>Product NDC:</strong> {result.product_ndc || "N/A"}</p>
                    <p><strong>Package NDC:</strong> {result.package_ndc || "N/A"}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className={`sticky bottom-2 right-2 btn-primary px-4 py-2 rounded shadow-md transition-opacity duration-1000 ease-in-out ${isInteracting ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ marginLeft: "auto", display: "block", width: "fit-content" }}
          >
            ↑ Back to Top
          </button>
        )}
      </div>
    </section>
  );
}

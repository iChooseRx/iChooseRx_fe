"use client";
import React, { useState, useRef, useEffect } from "react";
import ResultsChart from "./ResultsChart";

/**
 * Renders a list of search results with optional expansion for details
 * and a bar chart for result stats.
 */
export default function SearchResults({ results, resultStats, onSave }) {
  const [expandedSearchId, setExpandedSearchId] = useState(null);
  const resultsContainerRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isInteracting, setIsInteracting] = useState(true);
  const timeoutRef = useRef(null);

  if (!results || results.length === 0) return null;

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
    }, 3000); // Button hides after 3 seconds of inactivity
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

  return (
    <section role="region" aria-labelledby="search-results" className="text-foreground bg-background">
      <h2 id="search-results" className="text-xl font-semibold mb-4">
        {`${resultStats?.filtered_results || 0} results found with your selected filters`}
      </h2>

      {/* Chart */}
      <ResultsChart resultStats={resultStats} />

      {/* ✅ Scrollable results container */}
      <div
        ref={resultsContainerRef}
        className="relative max-h-[500px] overflow-y-auto border rounded-lg p-2 shadow-inner"
      >
        <ul role="list" className="space-y-4">
          {results.map((result) => {
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
              package_ndc,
            } = result;

            const isExpanded = expandedSearchId === uniqueId;

            return (
              <li
                key={uniqueId}
                className={`border p-4 rounded shadow bg-background text-foreground transition-colors ${isExpanded ? "shadow-lg" : ""}`}
                role="listitem"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {brand_name || "Unknown Brand"}
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

                {/* Save a drug */}
                <button
                  onClick={() => onSave(result)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
                  aria-label={`Save drug for ${brand_name || "Unknown Brand"}`}
                >
                  Save
                </button>

                {isExpanded && (
                  <div id={`drug-details-${uniqueId}`} className="mt-4" tabIndex="0">
                    <p><strong>Generic Name:</strong> {generic_name || "N/A"}</p>
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
                    <p><strong>Manufacturer:</strong> {manufacturer_name || "N/A"}</p>
                    <p><strong>Description:</strong> {description || "No description available."}</p>
                    <p><strong>Inactive Ingredients:</strong> {inactive_ingredient || "N/A"}</p>
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
                    <p><strong>How Supplied:</strong> {how_supplied || "No supply info"}</p>
                    <p><strong>Route:</strong> {route || "Unknown"}</p>
                    <p><strong>Product NDC:</strong> {product_ndc || "N/A"}</p>
                    <p><strong>Package NDC:</strong> {package_ndc || "N/A"}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* ✅ Floating "Back to Top" Button with Slow Fade-Out */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className={`sticky bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition-opacity duration-1000 ease-in-out ${isInteracting ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            style={{ marginLeft: "auto", display: "block", width: "fit-content" }}
          >
            ↑ Back to Top
          </button>
        )}
      </div>
    </section>
  );
}

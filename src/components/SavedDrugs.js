"use client";
import React, { useState } from "react";
import DrugNotes from "./DrugNotes";

export default function SavedDrugs({ drugs, onDelete, notesByDrug, setNotesByDrug, handleUpdateNotes }) {
  const [expandedDrugId, setExpandedDrugId] = useState(null);

  if (!drugs || drugs.length === 0) {
    return (
      <section role="region" aria-labelledby="saved-drugs" className="text-foreground bg-background">
        <h2 id="saved-drugs" className="text-2xl font-semibold mb-4">
          Saved Drugs
        </h2>
        <p>No saved drugs found.</p>
      </section>
    );
  }

  const toggleDrugExpansion = (drugId) => {
    setExpandedDrugId((prev) => (prev === drugId ? null : drugId));
  };

  return (
    <section role="region" aria-labelledby="saved-drugs" className="text-foreground bg-background">
      <h2 id="saved-drugs" className="text-2xl font-semibold mb-4">
        Saved Drugs
      </h2>

      {/* Scrollable container */}
      <div className="max-h-[500px] overflow-y-auto border rounded-lg p-2 shadow-inner">
        <ul role="list" className="space-y-4">
          {drugs.map((drug) => {
            const {
              id,
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
            } = drug;

            const isExpanded = expandedDrugId === id;

            return (
              <li
                key={id}
                className="border p-4 rounded shadow transition-colors bg-background text-foreground"
                role="listitem"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {brand_name || "Unknown Brand"}
                    <button
                      onClick={() => toggleDrugExpansion(id)}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                      aria-expanded={isExpanded}
                      aria-controls={`saved-drug-details-${id}`}
                      aria-label={isExpanded ? "Collapse details" : "Expand details"}
                    >
                      {isExpanded ? "- details" : "+ details"}
                    </button>
                  </h3>
                </div>

                {/* Delete Drug Button */}
                <button
                  onClick={() => onDelete(id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2"
                  aria-label={`Delete drug for ${brand_name || "Unknown Brand"}`}
                >
                  Delete
                </button>

                {isExpanded && (
                  <div id={`saved-drug-details-${id}`} className="mt-4" tabIndex="0">
                    <p><strong>Generic Name:</strong> {generic_name || "N/A"}</p>
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

                    {/* ✅ DrugNotes Component */}
                    <DrugNotes
                      drugId={id}
                      initialNotes={drug.notes || ""}
                      onSave={handleUpdateNotes}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

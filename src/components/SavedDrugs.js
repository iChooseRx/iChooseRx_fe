"use client";
import React, { useState } from "react";
import DrugNotes from "./DrugNotes";
import ReportPharmacyForm from "./ReportPharmacyForm";

export default function SavedDrugs({ drugs, onDelete, notesByDrug, setNotesByDrug, handleUpdateNotes }) {
  const [expandedDrugId, setExpandedDrugId] = useState(null);
  const [activeReportFormId, setActiveReportFormId] = useState(null);

  const toggleDrugExpansion = (drugId) => {
    setExpandedDrugId((prev) => (prev === drugId ? null : drugId));
  };

  const toggleReportForm = (drugId) => {
    setActiveReportFormId((prev) => (prev === drugId ? null : drugId));
  };

  return (
    <section className="border-borderColor border p-4 rounded shadow bg-background text-foreground min-h-[550px]">
      <h2 className="text-2xl font-semibold mb-4">Saved Drugs</h2>

      <div className="border-borderColor border rounded-lg shadow-inner transition-all min-h-[300px] max-h-[400px] overflow-y-auto p-2 flex flex-col">
        {(!drugs || drugs.length === 0) ? (
          <p className="text-gray-500 italic self-center my-auto">No saved drugs found.</p>
        ) : (
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

              const isExpandedDrug = expandedDrugId === id;
              const isFormVisible = activeReportFormId === id;

              return (
                <li key={id} className="list-item" role="listitem">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">
                      {brand_name || "Unknown Brand"}
                      <button
                        onClick={() => toggleDrugExpansion(id)}
                        className="ml-2 text-blue-500 hover:text-blue-600"
                        aria-expanded={isExpandedDrug}
                        aria-controls={`saved-drug-details-${id}`}
                      >
                        {isExpandedDrug ? "- details" : "+ details"}
                      </button>
                    </h3>
                  </div>

                  <button
                    onClick={() => onDelete(id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2"
                    aria-label={`Delete drug for ${brand_name || "Unknown Brand"}`}
                  >
                    Delete
                  </button>

                  {isExpandedDrug && (
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

                      <DrugNotes
                        drugId={id}
                        initialNotes={drug.notes || ""}
                        onSave={handleUpdateNotes}
                      />

                      <button
                        onClick={() => toggleReportForm(id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mt-4"
                      >
                        {isFormVisible ? "Close Pharmacy Report" : "📍 Report Pharmacy Availability"}
                      </button>

                      {isFormVisible && (
                        <div className="mt-4">
                          <ReportPharmacyForm productNdc={product_ndc} brandName={brand_name} />
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

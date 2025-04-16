"use client";
import { useEffect, useState } from "react";
import {
  fetchPendingReports,
  approveNDC,
  denyNDC,
  updateDrugReport,
} from "@/services/api";
import PhoneInput from "@/components/PhoneInput";

export default function PendingDrugReports() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");
  const [editingReportId, setEditingReportId] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    loadPendingReports();
  }, []);

  async function loadPendingReports() {
    try {
      const data = await fetchPendingReports();
      setReports(data.data);
    } catch {
      setMessage("Failed to load pending reports.");
    }
  }

  async function handleApproveNDC(rep, ndc) {
    try {
      await approveNDC({ reportId: rep.id, ndc, pharmacy_id: rep.attributes.pharmacy_id });
      setActionMessage(`✅ Approved NDC ${ndc}`);
      rep.attributes.ndc_numbers = rep.attributes.ndc_numbers.filter((item) => item !== ndc);
      rep.attributes.approved_ndcs = [...(rep.attributes.approved_ndcs || []), ndc];
      setReports([...reports]);
    } catch {
      setActionMessage("Failed to approve NDC.");
    }
  }

  async function handleDenyNDC(reportId, ndc) {
    if (!confirm(`Are you sure you want to deny NDC ${ndc}?`)) return;
    try {
      await denyNDC({ reportId, ndc });
      setActionMessage(`❌ Denied NDC ${ndc}`);
      const report = reports.find((r) => r.id === reportId);
      report.attributes.ndc_numbers = report.attributes.ndc_numbers.filter((item) => item !== ndc);
      setReports([...reports]);
    } catch {
      setActionMessage("Failed to deny NDC.");
    }
  }

  async function handleUpdateReport(report) {
    try {
      const safeAttributes = {
        notes: report.notes,
        ndc_numbers: report.ndc_numbers,
        pharmacy_details: report.pharmacy_details,
        verified: report.verified ?? false,
      };

      await updateDrugReport(report.id, safeAttributes);
      setMessage("Report updated successfully.");
      setEditingReportId(null);
      await loadPendingReports();
    } catch {
      setMessage("Failed to update report.");
    }
  }

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Pending Drug Reports</h3>
      {actionMessage && <p className="text-success text-sm mb-2">{actionMessage}</p>}
      {message && <p className="text-error text-sm mb-2">{message}</p>}
      {reports.length === 0 ? (
        <p className="text-gray-500">No pending reports found.</p>
      ) : (
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scroll">
          {reports.map((rep, index) => {
            const editing = editingReportId === rep.id;

            return (
              <div key={rep.id} className="report-card space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">#{index + 1} - Reported At: {rep.attributes.reported_at}</h4>
                  <button
                    onClick={() => setEditingReportId(editing ? null : rep.id)}
                    className="btn-secondary text-sm px-2 py-1"
                  >
                    {editing ? "Close Edit" : "Edit Report"}
                  </button>
                </div>

                {editing && (
                  <div className="collapsible-container open space-y-4">
                    <div>
                      <label className="block text-sm font-semibold">Notes:</label>
                      <textarea
                        value={rep.attributes.notes || ""}
                        onChange={(e) => {
                          rep.attributes.notes = e.target.value;
                          setReports([...reports]);
                        }}
                        className="input-field w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold">NDC Numbers (comma-separated):</label>
                      <textarea
                        value={rep.attributes.ndc_numbers?.join(", ") || ""}
                        onChange={(e) => {
                          rep.attributes.ndc_numbers = e.target.value.split(",").map((s) => s.trim());
                          setReports([...reports]);
                        }}
                        className="input-field w-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {["name", "street_address", "city", "state", "zip_code", "phone"].map((field) => (
                        field === "phone" ? (
                          <PhoneInput
                            key={field}
                            name={field}
                            value={rep.attributes.pharmacy_details?.[field] || ""}
                            onChange={(e) => {
                              rep.attributes.pharmacy_details[field] = e.target.value;
                              setReports([...reports]);
                            }}
                          />
                        ) : (
                          <input
                            key={field}
                            type="text"
                            value={rep.attributes.pharmacy_details?.[field] || ""}
                            onChange={(e) => {
                              rep.attributes.pharmacy_details[field] = e.target.value;
                              setReports([...reports]);
                            }}
                            className="input-field w-full"
                          />
                        )
                      ))}
                    </div>

                    <button onClick={() => handleUpdateReport(rep.attributes)} className="btn-primary mt-2">
                      Save Changes
                    </button>
                  </div>
                )}

                <div className="space-y-2">
                  {rep.attributes.ndc_numbers?.map((ndc, idx) => (
                    <div key={idx} className="flex justify-between items-center border p-2 rounded bg-background">
                      <p><strong>NDC:</strong> {ndc}</p>
                      <div className="flex gap-2 items-center">
                        <button onClick={() => handleApproveNDC(rep, ndc)} className="btn-secondary px-3 py-1">Approve</button>
                        <button onClick={() => handleDenyNDC(rep.id, ndc)} className="btn-danger">Deny</button>
                      </div>
                    </div>
                  ))}
                  {rep.attributes.approved_ndcs?.map((ndc, idx) => (
                    <div key={`approved-${idx}`} className="flex justify-between items-center border p-2 rounded bg-background">
                      <p><strong>NDC:</strong> {ndc}</p>
                      <span className="text-success">✔ Approved</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
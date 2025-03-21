"use client";

import { useState, useEffect } from "react";
import {
  sendInvitation,
  fetchPendingReports,
  approveNDC,
  denyNDC,
  updateDrugReport,
} from "@/services/api";

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("1");
  const [message, setMessage] = useState("");
  const [reports, setReports] = useState([]);
  const [reportsMessage, setReportsMessage] = useState("");
  const [editingReportId, setEditingReportId] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    loadPendingReports();
  }, []);

  async function loadPendingReports() {
    try {
      const data = await fetchPendingReports();
      setReports(data.data);
    } catch (error) {
      setReportsMessage("Failed to load pending reports.");
    }
  }

  async function handleApproveNDC(rep, ndc) {
    try {
      await approveNDC({ reportId: rep.id, ndc, pharmacy_id: rep.attributes.pharmacy_id });
      setActionMessage(`✅ Approved NDC ${ndc}`);
      rep.attributes.ndc_numbers = rep.attributes.ndc_numbers.filter((item) => item !== ndc);
      rep.attributes.approved_ndcs = [...(rep.attributes.approved_ndcs || []), ndc];
      setReports([...reports]);
    } catch (error) {
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
    } catch (error) {
      setActionMessage("Failed to deny NDC.");
    }
  }

  async function handleUpdateReport(report) {
    try {
      await updateDrugReport(report.id, report);
      setReportsMessage("Report updated successfully.");
      setEditingReportId(null);
      await loadPendingReports();
    } catch (error) {
      setReportsMessage("Failed to update report.");
    }
  }

  async function handleInvite(e) {
    e.preventDefault();
    try {
      await sendInvitation({ email, role });
      setMessage(`Invitation sent to ${email}`);
    } catch (err) {
      setMessage("Failed to send invite");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <h2 className="text-3xl font-semibold mb-4">🖥🔑 Admin Dashboard</h2>

      {/* Invite Form */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Invite a Pharmacy or Admin</h3>
        {message && <p className="text-sm mb-2">{message}</p>}
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-md font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full max-w-md"
            />
          </div>
          <div>
            <label className="block text-md font-medium mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field w-full max-w-md"
            >
              <option value="1">Pharmacy</option>
              <option value="2">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-primary px-4 py-2 rounded">Send Invite</button>
        </form>
      </section>

      <hr className="my-6 border-t border-borderColor" />

      {/* Pending Drug Reports */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Pending Drug Reports</h3>
        {actionMessage && <p className="text-success text-sm mb-2">{actionMessage}</p>}
        {reportsMessage && <p className="text-error text-sm mb-2">{reportsMessage}</p>}
        {reports.length === 0 ? (
          <p className="text-gray-500">No pending reports found.</p>
        ) : (
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scroll">
            {reports.map((rep, index) => (
              <div key={rep.id} className="report-card space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">#{index + 1} - Reported At: {rep.attributes.reported_at}</h4>
                  <button
                    onClick={() => setEditingReportId(editingReportId === rep.id ? null : rep.id)}
                    className="btn-secondary px-2 py-1 text-sm"
                  >
                    {editingReportId === rep.id ? "Close Edit" : "Edit Report"}
                  </button>
                </div>

                {editingReportId === rep.id && (
                  <div className="collapsible-container open space-y-4">
                    <div className="space-y-2">
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
                    <div className="space-y-2">
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
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">Pharmacy Details:</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["name", "street_address", "city", "state", "zip_code", "phone"].map((field) => (
                          <input
                            key={field}
                            type="text"
                            placeholder={field}
                            value={rep.attributes.pharmacy_details?.[field] || ""}
                            onChange={(e) => {
                              rep.attributes.pharmacy_details[field] = e.target.value;
                              setReports([...reports]);
                            }}
                            className="input-field w-full col-span-1"
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateReport(rep.attributes)}
                      className="btn-primary mt-2"
                    >
                      Save Changes
                    </button>
                  </div>
                )}

                <div className="space-y-2">
                  {rep.attributes.ndc_numbers?.map((ndc, idx) => (
                    <div key={idx} className="flex justify-between items-center border p-2 rounded bg-background">
                      <p><strong>NDC:</strong> {ndc}</p>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => handleApproveNDC(rep, ndc)}
                          className="btn-secondary px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDenyNDC(rep.id, ndc)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Deny
                        </button>
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
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

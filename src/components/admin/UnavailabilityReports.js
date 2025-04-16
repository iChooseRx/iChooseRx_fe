"use client";
import { useEffect, useState } from "react";
import {
  fetchUnavailabilityReports,
  approveUnavailabilityReport,
  denyUnavailabilityReport,
} from "@/services/api";
import { formatPhone } from "@/utils/formatters";

export default function UnavailabilityReports() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const data = await fetchUnavailabilityReports();
      setReports(data.data || []);
    } catch {
      setReports([]);
      setMessage("Failed to load unavailability reports.");
    }
  }

  async function handleApprove(reportId) {
    await approveUnavailabilityReport(reportId);
    await loadReports();
  }

  async function handleDeny(reportId) {
    if (!confirm("Are you sure you want to deny this report?")) return;
    await denyUnavailabilityReport(reportId);
    await loadReports();
  }

  return (
    <section>
      <h3 className="text-xl font-semibold mb-2">Pharmacy Unavailability Reports</h3>
      {message && <p className="text-error text-sm mb-2">{message}</p>}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scroll">
        {reports.length === 0 ? (
          <p className="text-gray-500 italic">No unavailability reports yet.</p>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="report-card space-y-2">
              <p><strong>User:</strong> {report.attributes.user_email}</p>
              <p><strong>NDC:</strong> {report.attributes.ndc}</p>
              <p><strong>Pharmacy:</strong> {report.attributes.pharmacy_details.name}</p>
              <p><strong>Address:</strong> {report.attributes.pharmacy_details.address}</p>
              <p><strong>Phone:</strong> {formatPhone(report.attributes.pharmacy_details.phone)}</p>
              <p><strong>Reported At:</strong> {report.attributes.reported_at}</p>
              <div className="flex gap-2">
                <button onClick={() => handleApprove(report.id)} className="btn-secondary px-3 py-1">Approve & Remove NDC</button>
                <button onClick={() => handleDeny(report.id)} className="btn-danger">Deny Report</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
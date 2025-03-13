"use client";
import { useState } from "react";
import { sendInvitation } from "@/services/api";

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("1"); // 1 => pharmacy, 2 => admin
  const [message, setMessage] = useState("");

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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">
        🖥🔑 Admin Dashboard
      </h1>
      {message && <p className="mt-2">{message}</p>}

      {/* Invite Form */}
      <div className="mt-6 text-left ml-6">
        <form onSubmit={handleInvite} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-md font-medium mb-1">
              Pharmacy Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-borderColor rounded p-2 bg-background text-foreground placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors max-w-sm"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-md font-medium mb-1">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-borderColor rounded p-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors max-w-sm"
            >
              <option value="1">Pharmacy</option>
              <option value="2">Admin</option>
            </select>
          </div>

          {/* Styled Submit Button */}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition-colors"
          >
            Send Invite
          </button>
        </form>
      </div>
    </div>
  );
}

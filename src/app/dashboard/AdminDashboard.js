// src/app/dashboard/AdminDashboard.js
"use client";
import { useState, useEffect } from "react";
import { sendInvitation } from "@/services/api";

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("1"); // 1 => pharmacy, 2 => admin
  const [message, setMessage] = useState("");

  // example: send an invite
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
    <div>
      <h1>Admin Dashboard</h1>
      {message && <p>{message}</p>}

      {/* Invite Form */}
      <form onSubmit={handleInvite}>
        <input
          type="email"
          placeholder="Pharmacy Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* role can be 1 => pharmacy, 2 => admin */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="1">Pharmacy</option>
          <option value="2">Admin</option>
        </select>
        <button type="submit">Send Invite</button>
      </form>

      {/* Maybe show a table of all pharmacy data, etc. */}
    </div>
  );
}

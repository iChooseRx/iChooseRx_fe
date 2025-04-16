"use client";
import { useState } from "react";
import { sendInvitation } from "@/services/api";

export default function InviteForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("1");
  const [message, setMessage] = useState("");

  async function handleInvite(e) {
    e.preventDefault();
    try {
      await sendInvitation({ email, role });
      setMessage(`Invitation sent to ${email}`);
      setEmail("");
      setRole("1");
    } catch (err) {
      setMessage("Failed to send invite");
    }
  }

  return (
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
        <button type="submit" className="btn-primary">Send Invite</button>
      </form>
    </section>
  );
}
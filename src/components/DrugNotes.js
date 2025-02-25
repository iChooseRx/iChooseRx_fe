"use client";
import React, { useState, useEffect } from "react";

export default function DrugNotes({ drugId, initialNotes, onSave }) {
  const [notes, setNotes] = useState(initialNotes || "");
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  // ✅ Sync state when `initialNotes` changes (after fetching from API)
  useEffect(() => {
    console.log(`🔄 Updating DrugNotes state for ${drugId}:`, initialNotes);
    setNotes(initialNotes || "");
  }, [initialNotes, drugId]);

  // ✅ Auto-save notes after 2 seconds of inactivity
  useEffect(() => {
    if (notes === initialNotes) return; // ✅ Prevent unnecessary saves

    const timer = setTimeout(() => {
      console.log(`💾 Auto-saving notes for drug ${drugId}:`, notes);
      onSave(drugId, notes);
      setSavedMessage("✅ Auto-saved!");
    }, 2000);

    return () => clearTimeout(timer); // ✅ Cleanup timeout
  }, [notes, initialNotes, onSave, drugId]); // ✅ Added `initialNotes` & `onSave` for consistency

  // ✅ Auto-hide success message after 3 seconds
  useEffect(() => {
    if (savedMessage) {
      const timer = setTimeout(() => setSavedMessage(""), 3000);
      return () => clearTimeout(timer); // ✅ Cleanup timeout
    }
  }, [savedMessage]);

  const handleSaveNotes = async () => {
    if (!notes.trim()) return; // ✅ Don't save empty notes

    setSaving(true);
    setSavedMessage("");

    try {
      await onSave(drugId, notes);
      setSavedMessage("✅ Notes saved!");
    } catch (error) {
      setSavedMessage("❌ Failed to save notes.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Detect Command + Return (Mac) or Ctrl + Return (Windows/Linux)
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSaveNotes();
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add your notes here..."
        onKeyDown={handleKeyDown} // ✅ Listen for keyboard shortcut
        className="border border-borderColor rounded p-2 w-full bg-white text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
      />
      <button
        onClick={handleSaveNotes}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Notes"}
      </button>
      {savedMessage && <p className="mt-2 text-sm text-gray-600">{savedMessage}</p>}
    </div>
  );
}

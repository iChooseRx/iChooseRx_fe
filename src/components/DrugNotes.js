"use client";
import React, { useState, useEffect } from "react";

export default function DrugNotes({ drugId, initialNotes, onSave }) {
  const [notes, setNotes] = useState(initialNotes || "");
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    setNotes(initialNotes || "");
  }, [initialNotes, drugId]);

  useEffect(() => {
    if (notes === initialNotes) return;
    const timer = setTimeout(() => {
      onSave(drugId, notes);
      setSavedMessage("✅ Auto-saved!");
    }, 2000);
    return () => clearTimeout(timer);
  }, [notes, initialNotes, onSave, drugId]);

  useEffect(() => {
    if (savedMessage) {
      const timer = setTimeout(() => setSavedMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [savedMessage]);

  const handleSaveNotes = async () => {
    if (!notes.trim()) return;
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
        onKeyDown={handleKeyDown}
        className="input-field w-full placeholder:text-gray-600 dark:placeholder:text-gray-400"
      />
      <button
        onClick={handleSaveNotes}
        className="btn-primary px-3 py-1 rounded mt-2"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Notes"}
      </button>
      {savedMessage && <p className="mt-2 text-sm text-foreground">{savedMessage}</p>}
    </div>
  );
}

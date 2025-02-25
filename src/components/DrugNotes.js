"use client";
import React, { useState } from "react";

export default function DrugNotes({ drugId, initialNotes, onSave }) {
  const [notes, setNotes] = useState(initialNotes || "");

  const handleSaveNotes = () => {
    if (onSave) {
      onSave(drugId, notes);
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add your notes here..."
        className="border border-borderColor rounded p-2 w-full font-bold bg-white text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
      />
      <button
        onClick={handleSaveNotes}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
      >
        Save Notes
      </button>
    </div>
  );
}

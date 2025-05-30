"use client";

export default function SessionExpiredModal({ onAcknowledge }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 text-foreground max-w-md w-full p-6 rounded-xl shadow-lg border border-borderColor">
        <h2 className="text-xl font-bold mb-2 text-center">Session Expired</h2>
        <p className="text-center text-sm mb-4 text-gray-700 dark:text-gray-300">
          You’ve been logged out because logged in sessions after 1 week.
          Please log in again to continue using iChooseRx.
        </p>

        <button
          onClick={onAcknowledge}
          className="w-full px-6 py-2 rounded bg-primary hover:bg-blue-700 text-white mt-2"
        >
          Login Again
        </button>
      </div>
    </div>
  );
}
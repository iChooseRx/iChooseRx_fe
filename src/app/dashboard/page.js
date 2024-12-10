'use client';

import { useEffect, useState } from 'react';
import { getSavedPrescriptions } from '../../services/api';

export default function Dashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getSavedPrescriptions();
        setPrescriptions(data.data);
      } catch {
        setError('Failed to load saved prescriptions.');
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription.id} className="mb-2">
            {prescription.attributes.drug_name}
          </li>
        ))}
      </ul>
    </main>
  );
}

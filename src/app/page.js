'use client';

import { useEffect, useState } from 'react';
import { getSavedPrescriptions } from '../services/api';

export default function Home() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getSavedPrescriptions();
        setPrescriptions(data.data);
      } catch (err) {
        setError('Failed to load saved prescriptions.');
      }
    };
    fetchPrescriptions();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Saved Prescriptions</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription.id}>{prescription.attributes.drug_name}</li>
        ))}
      </ul>
    </main>
  );
}

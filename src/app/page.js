'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('user'); // Mock logged-in state
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to iChooseRx</h1>
      <div className="space-x-4">
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="px-6 py-2 bg-green-600 text-white rounded"
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}

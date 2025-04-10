'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { requestPasswordReset } from '@/services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const data = await requestPasswordReset(email);
      setMessage(data.message || 'Password reset instructions have been sent.');
    } catch (err) {
      // If error response includes useful info
      const errorMsg =
        err?.response?.data?.error || 'Failed to send reset instructions. Please try again.';
      setError(errorMsg);
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Forgot Password?</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-error">{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field w-full"
        />
        <button
          type="submit"
          className="btn-primary"
        >
          Send Reset Link
        </button>
      </form>
    </main>
  );
}

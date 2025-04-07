'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUser } from '@/services/api';
import WhyIChooseRx from '@/components/WhyIChooseRx';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [agreedToWhy, setAgreedToWhy] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ email, password, password_confirmation: passwordConfirmation });
      router.push('/');
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <main className="min-h-screen max-h-screen overflow-y-auto flex flex-col items-center justify-start px-4 py-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Sign up for iChooseRx</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
        {error && <p className="text-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!agreedToWhy}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!agreedToWhy}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="px-4 py-2 border border-borderColor rounded text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!agreedToWhy}
        />

        <label className="flex items-start text-sm space-x-2">
          <input
            type="checkbox"
            checked={agreedToWhy}
            onChange={(e) => setAgreedToWhy(e.target.checked)}
            className="mt-1"
          />
          <span>
            I’ve read and understand <strong>Why iChooseRx Exists</strong> and how this platform is intended to be used.
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreedToWhy}
          className={`px-6 py-2 rounded text-white transition ${agreedToWhy
            ? 'bg-secondary hover:bg-green-700'
            : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link href="/" className="text-primary hover:underline">
          Log in here
        </Link>
      </p>

      <WhyIChooseRx />
    </main>
  );
}

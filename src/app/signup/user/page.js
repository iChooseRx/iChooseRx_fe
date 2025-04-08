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
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [agreedToWhy, setAgreedToWhy] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToWhy) return;

    try {
      await createUser({
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      router.push('/login');
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <main className="min-h-screen max-h-screen overflow-y-auto flex flex-col items-center justify-start px-4 py-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Sign up for iChooseRx</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
        {error && <div className="error-box">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field w-full"
        />

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field w-full pr-16"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Password Confirmation */}
        <div className="relative">
          <input
            type={showPasswordConfirmation ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="input-field w-full pr-16"
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirmation((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label={showPasswordConfirmation ? 'Hide password' : 'Show password'}
          >
            {showPasswordConfirmation ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Agreement Checkbox */}
        <label className="flex items-start text-sm space-x-2 mt-2">
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

        {/* Sign Up Button */}
        <button
          type="submit"
          className={`btn-secondary px-6 py-2 rounded ${!agreedToWhy ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!agreedToWhy}
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Log in here
        </Link>
      </p>

      <div className="mt-10 w-full max-w-2xl">
        <WhyIChooseRx />
      </div>
    </main>
  );
}

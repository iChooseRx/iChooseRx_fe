'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation
import { createUser } from '@/services/api';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ email, password, password_confirmation: passwordConfirmation });
      router.push('/login');
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-background text-foreground">
      {/* Sign up heading */}
      <h1 className="text-2xl font-bold mb-4">Sign up for iChooseRx</h1>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {error && <p className="text-error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-borderColor rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-borderColor rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="px-4 py-2 border border-borderColor rounded"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-secondary text-white rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>

      {/* Already have an account */}
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Log in here
        </Link>
      </p>

      {/* Why iChooseRx Is Essential section */}
      <h3 className="mt-6 text-md font-semibold text-center max-w-2lg">
        Why iChooseRx Is Essential:
        <br />
        For those who <strong>WANT</strong> cleaner drug choices to support holistic health.
        <br />
        For those who <strong>NEED</strong> cleaner drug choices due to allergies, sensitivities, or medical conditions.
        <br />
        Helps you find FDA approved drugs that align with your health goals, whether you’re managing chronic conditions or living a clean-conscious lifestyle.
      </h3>
    </main>
  );
}

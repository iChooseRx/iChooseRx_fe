'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation
import { loginUser } from '@/services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser({ email, password });
      // Example userData => { message, auth_token, user: { id, email, role } }
      localStorage.setItem("auth_token", userData.auth_token);
      localStorage.setItem("user_role", userData.user.role);
      // redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Login to iChooseRx</h1>
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
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don’t have an account?{' '}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up here
        </Link>
      </p>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/services/api';
import MatrixBackground from '@/components/MatrixBackground';
import DashboardHeader from '@/components/DashboardHeader'; // ✅ ADDED

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser({ email, password });

      localStorage.setItem("auth_token", userData.auth_token);
      localStorage.setItem("user_id", userData.user.id);
      localStorage.setItem("user_role", userData.user.role);

      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <>
      <DashboardHeader /> {/* ✅ HEADER ADDED */}

      <main className="relative h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <MatrixBackground />
        <div className="relative z-10 w-full max-w-sm rounded-xl shadow-lg">
          <div
            style={{ backgroundColor: 'var(--background)' }}
            className="p-8 rounded-xl border border-borderColor"
          >

            <h1 className="text-2xl font-bold mb-4 text-center">Login to iChooseRx</h1>

            <form
              onSubmit={handleSubmit}
              aria-label="Login form"
              className="flex flex-col space-y-4"
            >
              {error && <div className="error-box">{error}</div>}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button type="submit" className="btn-primary px-6 py-2 rounded">
                Login
              </button>
            </form>

            <p className="mt-4 text-sm font-bold text-center">
              Don’t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up here
              </Link>
            </p>
            <p className="mt-2 text-sm font-bold text-center">
              <Link href="/forgot-password" className="text-primary hover:underline">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
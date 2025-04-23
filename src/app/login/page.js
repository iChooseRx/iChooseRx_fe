'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/services/api';
import MatrixBackground from '@/components/MatrixBackground';
import DashboardHeader from '@/components/DashboardHeader';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      const userData = await loginUser({ email, password });

      localStorage.setItem("auth_token", userData.auth_token);
      localStorage.setItem("user_id", userData.user.id);
      localStorage.setItem("user_role", userData.user.role);

      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
      setIsLoggingIn(false); // only unset loading on failure
    }
  };

  return (
    <>
      <DashboardHeader />

      <main className="h-screen w-full overflow-x-hidden flex flex-col items-center justify-center px-6 text-center bg-background text-foreground">
        <MatrixBackground />
        <div className="z-0 w-full max-w-2xl rounded-xl shadow-lg">
          <div
            style={{ backgroundColor: 'var(--background)' }}
            className="p-8 rounded-xl border border-borderColor"
          >
            <h1 className="text-2xl font-bold mb-4 text-center">Login to iChooseRx</h1>
            <h3 className="font-medium text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              Just a heads-up: it may take up to 10 seconds for your login to process.
              Our servers sleep when unused to save costs — thanks for your patience!
            </h3>

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

              <button
                type="submit"
                className="btn-primary flex items-center justify-center"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    Logging in...
                    <span className="spinner"></span>
                  </>
                ) : (
                  "Login"
                )}
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
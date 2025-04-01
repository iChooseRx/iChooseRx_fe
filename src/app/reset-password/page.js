'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/services/api';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(token, password, confirm);
      setSuccess(response.message);
      // Clear errors, redirect after a brief delay
      setErrors([]);
      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      if (err.response?.status === 422) {
        // Rails validation failures
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response.data.error) {
          setErrors([err.response.data.error]);
        }
      } else {
        setErrors(['Failed to reset password. Please try again.']);
      }
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

        {/* Success */}
        {success && <p className="text-green-500">{success}</p>}

        {/* Errors */}
        {errors.length > 0 && (
          <ul className="text-red-500">
            {errors.map((msg, i) => <li key={i}>{msg}</li>)}
          </ul>
        )}

        {/* New Password Field */}
        <div>
          <label htmlFor="password" className="block mb-1">New Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="px-4 py-2 border border-gray-300 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirm" className="block mb-1">Confirm Password</label>
          <div className="relative">
            <input
              id="confirm"
              type={showConfirm ? 'text' : 'password'}
              className="px-4 py-2 border border-gray-300 rounded w-full"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showConfirm ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Reset Password
        </button>
      </form>
    </main>
  );
}

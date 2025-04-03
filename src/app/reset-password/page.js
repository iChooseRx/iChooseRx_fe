"use client";

import { Suspense, useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Loading reset form...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

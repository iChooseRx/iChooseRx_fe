'use client';

import { useState, useRef, useEffect } from 'react'; // ✅ Correct import
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

      localStorage.setItem("auth_token", userData.auth_token);
      localStorage.setItem("user_id", userData.user.id);
      localStorage.setItem("user_role", userData.user.role);

      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <main className="relative h-screen flex flex-col items-center justify-center bg-background text-foreground">
      {/* Matrix Background Layer */}
      <MatrixBackground />

      {/* Login Form Container (Stays Exactly as You Designed It) */}
      <div className="relative z-10 w-full max-w-sm p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login to iChooseRx</h1>
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
    </main>
  );
}

// ========================================
// 🎨 Matrix Background Component (Now Themed)
// ========================================
function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Fill the canvas to the full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 24;
    const lineHeight = fontSize * 1.5;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    const matrixChars = [
      '💊', 'iChooseRx', 'Conscious Consumer', 'Lisinopril', 'Ibuprofen', 'Adderall',
      'Metformin', 'Pharmacy', 'Rx', 'FDA', 'NDC', 'Atorvastatin', 'Acetaminophen',
      'I Choose iChooseRx', 'Prescribe', 'OTC', '💊', 'Ritalin', 'Medication',
      'iChooseRx', 'Prescription', 'Drug', 'iChooseRx', 'Empower', 'Conscious',
      'Consumer', 'Choice', 'I Choose', 'Pharmicist', 'iChooseRx', 'My Choice',
      'Unwanted Inactive Ingredients',
    ];

    function draw() {
      // 1) Get the iChooseRx --background color (e.g. "rgb(238, 238, 238)")
      const bgColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--background')
        .trim();

      // 2) Parse out R, G, B from the string
      const colorMatch = bgColor.match(/\d+/g); // e.g. ["238","238","238"] or ["10","10","10"]
      let trailingFill = 'rgba(255,255,255,0.3)'; // fallback if parsing fails

      if (colorMatch) {
        const [r, g, b] = colorMatch.map(Number);

        // 3) Compute brightness with the standard formula
        //    brightness ~ (0.299 R + 0.587 G + 0.114 B)
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        // 4) Decide on how opaque to make the trailing fill
        //    - For darker backgrounds, use a minimal alpha fill
        //    - For brighter backgrounds, use a stronger alpha to keep it light
        if (brightness < 128) {
          // Dark background
          trailingFill = `rgba(${r}, ${g}, ${b}, 0.05)`;
        } else {
          // Light background
          trailingFill = `rgba(${r}, ${g}, ${b}, 0.3)`;
        }
      }

      // Apply the trailing fill each frame
      ctx.fillStyle = trailingFill;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 5) Get the iChooseRx --foreground color for the falling text
      const textColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--foreground')
        .trim();
      ctx.fillStyle = textColor;
      ctx.font = `${fontSize}px var(--font-geist-mono)`;
      ctx.textAlign = 'center';

      // 6) Render vertical columns streaming down
      for (let i = 0; i < columns; i++) {
        // Pick the word in a sequential pattern
        const text = matrixChars[(drops[i] + i) % matrixChars.length];
        const posX = i * fontSize;
        const posY = drops[i] * lineHeight;

        ctx.fillText(text, posX, posY);

        // Slowly move words down
        if (Math.random() > 0.95) {
          drops[i]++;
        }

        // Reset columns once they pass bottom
        if (posY > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
      }

      // 7) Recursively call draw() with a small delay
      setTimeout(draw, 100);
    }

    // Start the animation
    draw();

    // Keep canvas full-screen on resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
}
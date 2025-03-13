"use client"; // ✅ Ensures it's a client component

import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  // 🟢 Ensure ThemeProvider is mounted only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        {/* Wrap entire app with ThemeProvider */}
        {mounted ? (
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        ) : (
          <div className="opacity-0">{children}</div> // Prevents flickering
        )}
      </body>
    </html>
  );
}

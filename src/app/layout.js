import localFont from "next/font/local";
import "./globals.css";

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

export const metadata = {
  title: "iChooseRx | Conscious Drug Search & Pharmacy Finder",
  description:
    "Search FDA-approved drugs that align with your values. Filter out FD&C dyes, sweeteners, gluten, added sugar & more. Compare NDCs and find pharmacies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7308498580001717"
          crossOrigin="anonymous"
        ></script>
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* PWA enhancements */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="relative z-10 antialiased bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

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
        {/* ✅ Google AdSense site verification script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7308498580001717"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

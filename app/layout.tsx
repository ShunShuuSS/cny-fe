import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chinese New Year 2026 - Fortune & Luck",
  description:
    "Open your Chinese New Year invitation to discover your fortune and participate in the lucky draw! 🧧",
  openGraph: {
    title: "Chinese New Year 2026 - Fortune & Luck",
    description:
      "Open your Chinese New Year invitation to discover your fortune and participate in the lucky draw! 🧧",
    type: "website",
    locale: "en_US",
    siteName: "CNY Fortune",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinese New Year 2026 - Fortune & Luck",
    description:
      "Open your Chinese New Year invitation to discover your fortune and participate in the lucky draw! 🧧",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

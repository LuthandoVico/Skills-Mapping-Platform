import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "National Skills Registry | Skills Mapping Platform",
  description:
    "The authoritative taxonomy of occupational competencies, sector-aligned skills, and career progression frameworks underpinning the national workforce strategy.",
  keywords: "skills, occupations, competencies, national registry, workforce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f5f7fa]">{children}</body>
    </html>
  );
}

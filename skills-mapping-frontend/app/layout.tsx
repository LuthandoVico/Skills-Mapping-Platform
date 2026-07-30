import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-[#f5f7fa]">{children}</body>
    </html>
  );
}

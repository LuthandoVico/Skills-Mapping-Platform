"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Browse Sectors", href: "/sectors" },
  { label: "Occupations", href: "/occupations" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1d3557]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center text-[#1d3557] font-extrabold text-sm select-none">
            NS
          </div>
          <span className="text-white font-bold text-[15px] tracking-tight hidden sm:block">
            National Skills{" "}
            <span className="text-[#d4af37]">Registry</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-white/70 hover:text-white text-[13px] font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-white/80 hover:text-white text-[13px] font-medium transition-colors duration-200 px-3 py-1.5"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="bg-[#d4af37] hover:bg-[#e8c84a] text-[#1d3557] text-[13px] font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#d4af37]/20"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1d3557] border-t border-white/10 px-8 py-4">
          <ul className="flex flex-col gap-4 mb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/80 hover:text-white text-[14px] font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="text-white/80 text-[14px] font-medium"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-[#d4af37] text-[#1d3557] text-[13px] font-semibold px-4 py-2 rounded-xl text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

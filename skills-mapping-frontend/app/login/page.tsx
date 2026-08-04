"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ShieldAlert, ArrowRight, Check } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setLoginSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7f9fe] font-sans">
      
      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-6 sm:p-12 md:py-24">
        <div className="bg-white w-full max-w-[1200px] min-h-[700px] rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Left Panel: Branded Aesthetic */}
          <div className="w-full lg:w-1/2 bg-[#1d3557] relative flex flex-col justify-between p-12 text-white overflow-hidden">
            {/* Background Pattern/Overlay */}
            <div className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.15) 1px, transparent 1px), radial-gradient(circle at 75% 60%, rgba(255, 255, 255, 0.1) 2px, transparent 2px)",
                backgroundSize: "40px 40px"
              }}
            />
            {/* Abstract visual glow */}
            <div className="absolute bg-[#a3d8fe]/20 blur-[64px] -bottom-20 -right-20 rounded-full w-96 h-96" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center text-[#1d3557] font-extrabold text-sm select-none">
                NS
              </div>
              <span className="text-[20px] font-bold tracking-tight">
                SkillsRegistry
              </span>
            </div>

            <div className="relative z-10 my-auto py-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Empowering the <br />
                <span className="text-[#d4af37]">Future Workforce</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-[#b0c7f1] font-light max-w-md leading-relaxed">
                The definitive national authority for labor data, skill taxonomies, and professional certification standards.
              </p>
            </div>

            {/* Footer Trust Badge */}
            <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/10 p-5 rounded-xl max-w-md">
              <div>
                <h4 className="text-[13px] font-semibold text-white uppercase tracking-wider">
                  Institutional Trust
                </h4>
                <p className="text-[14px] text-[#d4af37] mt-1 font-medium">
                  Join 2,400+ national agencies today.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Login Form */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white">
            
            {loginSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#181c20]">Welcome back!</h3>
                <p className="text-[#44474e] mt-3">
                  Successfully logged in. Accessing your dashboard...
                </p>
                <div className="mt-8 w-8 h-8 border-4 border-[#1d3557] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#181c20] tracking-tight">Welcome back</h2>
                  <p className="text-[#44474e] text-[15px] mt-2">
                    Please enter your credentials to access the portal.
                  </p>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 border border-[#e5e7eb] hover:bg-gray-50 rounded-lg text-[13px] font-semibold text-[#181c20] transition-colors"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 border border-[#e5e7eb] hover:bg-gray-50 rounded-lg text-[13px] font-semibold text-[#181c20] transition-colors"
                  >
                    <svg className="w-5 h-5 text-[#0077b5] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="bg-gray-100 flex-grow h-px" />
                  <span className="text-[11px] font-bold text-[#44474e] tracking-widest uppercase shrink-0">
                    OR CONTINUE WITH EMAIL
                  </span>
                  <div className="bg-gray-100 flex-grow h-px" />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#181c20] uppercase tracking-wider">
                    Professional Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input 
                      type="email" 
                      placeholder="name@organization.gov"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-200 hover:border-[#1d3557] focus:border-[#1d3557] pl-10 pr-4 py-2.5 rounded-lg outline-none transition-colors text-[#181c20] placeholder-gray-400 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[13px] font-semibold text-[#181c20] uppercase tracking-wider">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-[11px] font-bold text-[#2b6485] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-200 hover:border-[#1d3557] focus:border-[#1d3557] pl-10 pr-12 py-2.5 rounded-lg outline-none transition-colors text-[#181c20] placeholder-gray-400 bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Device Checkbox */}
                <div className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="remember"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="accent-[#1d3557] rounded"
                  />
                  <label htmlFor="remember" className="text-[14px] text-[#44474e] leading-tight cursor-pointer">
                    Remember this device for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#031f41] hover:bg-[#0c2e55] text-white py-3 rounded-lg font-semibold tracking-wider text-[13px] uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Footer Link */}
                <div className="border-t border-gray-100 pt-6 text-center">
                  <p className="text-[14px] text-[#44474e]">
                    New to the Registry?{" "}
                    <Link href="/register" className="font-bold text-[#2b6485] hover:underline">
                      Register Now.
                    </Link>
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>
      </main>

      {/* Global Footer */}
      <footer className="bg-[#1d3557] text-white border-t border-white/10 px-8 sm:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[14px] tracking-wider text-white uppercase">
            SkillsRegistry
          </span>
          <span className="text-white/30 text-[16px] hidden sm:inline">|</span>
          <span className="text-white/70 text-[13px]">
            © 2024 National Labor Authority. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6 text-[13px] text-white/80">
          <Link href="/privacy" className="hover:text-[#d4af37] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#d4af37] transition-colors">Terms of Service</Link>
          <Link href="/accessibility" className="hover:text-[#d4af37] transition-colors">Accessibility</Link>
        </div>
      </footer>

    </div>
  );
}

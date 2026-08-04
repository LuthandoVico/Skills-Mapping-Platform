"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ChevronDown, User, ShieldAlert, Check, Award } from "lucide-react";

const rolesList = [
  { id: "job_seeker", label: "Job Seeker", category: "seeker" },
  { id: "industry_expert", label: "Industry Expert / Researcher / Policy Maker", category: "expert" },
  { id: "professional_body", label: "Professional Body / Certification Partner", category: "expert" },
  { id: "education_provider", label: "Education / Training Provider", category: "expert" },
  { id: "merseta_leadership", label: "merSETA Leadership / Planning Team", category: "expert" },
  { id: "gov_admin", label: "Government Administrator", category: "expert" },
  { id: "employer_body", label: "Employer / Employer Body", category: "expert" },
  { id: "administrator", label: "Administrator", category: "admin" }
];

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(rolesList[0]); // default to Job Seeker
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!firstName || !lastName || !email || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!agreeTerms) {
      setErrorMsg("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setRegistrationSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7f9fe] font-sans">
      
      {/* Top Header / Nav */}
      <header className="bg-white border-b border-[#e5e7eb] px-8 sm:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[15px] tracking-wider text-[#d4af37] font-sans uppercase">
            SkillsRegistry
          </span>
          <span className="text-[#c4c6cf] text-[16px] hidden sm:inline">|</span>
          <span className="text-[#44474e] text-[14px]">
            © 2024 National Labor Authority. merSETA Branded.
          </span>
        </div>
        <div className="flex gap-6 text-[14px] text-[#44474e]">
          <Link href="/privacy" className="hover:text-[#2b6485] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#2b6485] transition-colors">Terms of Service</Link>
          <Link href="/accessibility" className="hover:text-[#2b6485] transition-colors">Accessibility</Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="bg-white w-full max-w-[1200px] min-h-[750px] md:min-h-[850px] rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Left Panel: Branded Aesthetic */}
          <div className="w-full lg:w-1/2 bg-[#1d3557] relative flex flex-col justify-between p-12 text-white overflow-hidden">
            {/* Background Image Overlay */}
            <div 
              className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-overlay"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80')` 
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557] via-[#1d3557]/70 to-[#1d3557]/40 pointer-events-none" />

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
                Shape Your <span className="text-[#d4af37]">Career</span> <br />Architecture
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-[#f5f7fa] font-light max-w-md leading-relaxed">
                Join the national authority for skill taxonomies and professional standards. Secure your place in the future workforce ecosystem.
              </p>
            </div>

            {/* Institutional Trust Footer */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl max-w-md">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-semibold text-white uppercase tracking-wider">
                    National Recognition
                  </h4>
                  <p className="text-[13px] text-[#d4af37] mt-1 font-medium">
                    Trusted by 2,400+ certifying bodies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Registration Form */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white">
            
            {registrationSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#181c20]">Account Created Successfully!</h3>
                <p className="text-[#44474e] mt-3 max-w-md">
                  Thank you for registering. If you signed up as an Expert, your credentials will go through our verification system. You can now access the portal.
                </p>
                <Link 
                  href="/login" 
                  className="mt-8 px-8 py-3 bg-[#1d3557] hover:bg-[#2a4a73] text-white font-medium rounded-xl shadow-md transition-all"
                >
                  Proceed to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#181c20] tracking-tight">Create Account</h2>
                  <p className="text-[#44474e] text-[15px] mt-2">
                    Join the national skills database to manage your professional identity.
                  </p>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#181c20] uppercase tracking-wider">
                      First Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border border-[#c4c6cf] hover:border-[#1d3557] focus:border-[#1d3557] px-4 py-2.5 rounded-lg outline-none transition-colors text-[#181c20] placeholder-gray-400 bg-white"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#181c20] uppercase tracking-wider">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border border-[#c4c6cf] hover:border-[#1d3557] focus:border-[#1d3557] px-4 py-2.5 rounded-lg outline-none transition-colors text-[#181c20] placeholder-gray-400 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Custom Role Selection Dropdown */}
                <div className="flex flex-col gap-1.5" ref={dropdownRef}>
                  <label className="text-[13px] font-semibold text-[#181c20] uppercase tracking-wider">
                    Sign up as
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-white border border-[#c4c6cf] hover:border-[#1d3557] px-4 py-2.5 rounded-lg text-left flex items-center justify-between text-[#181c20] outline-none transition-colors"
                    >
                      <span className="truncate">{selectedRole.label}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#c4c6cf] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {rolesList.map((role) => (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => {
                              setSelectedRole(role);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 hover:bg-[#f1f4f9] text-[14px] transition-colors border-b border-gray-100 last:border-0 ${
                              selectedRole.id === role.id ? "bg-[#f1f4f9] font-semibold text-[#1d3557]" : "text-gray-700"
                            }`}
                          >
                            {role.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] text-gray-400 mt-0.5">
                    Choose the role that best describes how you will use the platform.
                  </p>
                </div>

                {/* Dynamic Content Display based on Selected Role */}
                {selectedRole.id === "job_seeker" && (
                  <div className="bg-[#f1f4f9] border border-gray-100 p-4 rounded-xl flex gap-3 items-start animate-fade-in">
                    <div className="w-5 h-5 rounded-full bg-[#1d3557]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#1d3557]">
                      <Check className="w-3 h-3" />
                    </div>
                    <p className="text-[13.5px] text-[#44474e] leading-relaxed">
                      After registration, you'll create your skills profile and explore career pathways and resources.
                    </p>
                  </div>
                )}

                {selectedRole.category === "expert" && (
                  <div className="bg-[#f1f4f9] border border-gray-100 p-5 rounded-xl animate-fade-in space-y-2">
                    <span className="text-[11px] font-bold text-[#031f41] tracking-wider uppercase block">
                      Expert Verification
                    </span>
                    <p className="text-[13.5px] text-[#44474e] leading-relaxed">
                      Verification will be required to participate in the national standard consensus and moderation dashboard.
                    </p>
                  </div>
                )}

                {selectedRole.id === "administrator" && (
                  <div className="bg-[#f1f4f9] border border-gray-100 p-4 rounded-xl flex gap-3 items-start animate-fade-in">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[13.5px] text-[#44474e] leading-relaxed">
                      Administrator accounts are managed internally. Submission will be routed to the system owner for verification.
                    </p>
                  </div>
                )}

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
                      className="w-full border border-[#c4c6cf] hover:border-[#1d3557] focus:border-[#1d3557] pl-10 pr-4 py-2.5 rounded-lg outline-none transition-colors text-[#181c20] placeholder-gray-400 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#181c20] uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-[#c4c6cf] hover:border-[#1d3557] focus:border-[#1d3557] pl-10 pr-12 py-2.5 rounded-lg outline-none transition-colors text-[#181c20] placeholder-gray-400 bg-white"
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

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5 pt-2">
                  <input 
                    type="checkbox" 
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 accent-[#1d3557] rounded"
                  />
                  <label htmlFor="terms" className="text-[14px] text-[#44474e] leading-tight select-none cursor-pointer">
                    I agree to the <Link href="/terms" className="text-[#2b6485] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#2b6485] hover:underline">Privacy Policy</Link>.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1d3557] hover:bg-[#2a4a73] text-white py-3 rounded-lg font-semibold tracking-wider text-[13px] uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Register Account"
                  )}
                </button>

                {/* Footer Link */}
                <div className="border-t border-[#c4c6cf] pt-6 text-center">
                  <p className="text-[14px] text-[#44474e]">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-[#2b6485] hover:underline">
                      Sign in to the Portal
                    </Link>
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>
      </main>

    </div>
  );
}

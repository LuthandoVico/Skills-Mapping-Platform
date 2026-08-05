"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  Mail,
  Phone,
  ShieldAlert,
  Award,
  FileText,
  ChevronDown,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Lock,
  Landmark,
  Link as LinkIcon,
  FileCheck,
  Upload,
  User,
  GraduationCap,
  Briefcase,
  HelpCircle,
  Bell,
  Sparkles,
  RefreshCw
} from "lucide-react";

export default function ExpertValidationPage() {
  const router = useRouter();

  // Navigation & Step State
  const [step, setStep] = useState(1);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  // Step 1 States: Basic Information
  const [fullName, setFullName] = useState("Dr. Helena Thorne");
  const [email, setEmail] = useState("h.thorne@nla.gov");
  const [phone, setPhone] = useState("+27 (555) 019-2834");
  const [passportNumber, setPassportNumber] = useState("AB1234567");
  const [citizenship, setCitizenship] = useState("South Africa");
  const [residence, setResidence] = useState("South Africa");
  const [city, setCity] = useState("Pretoria");
  const [profilePhoto, setProfilePhoto] = useState<string>("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80");

  // Step 2 States: Professional Profile & Credentials
  const [cvFile, setCvFile] = useState<boolean>(true); // simulate initially loaded
  const [cvFileName, setCvFileName] = useState("Helena_Thorne_CV.pdf");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(100); // 100% complete initially

  // Researcher IDs
  const [linkedinUrl, setLinkedinUrl] = useState("linkedin.com/in/h-thorne");
  const [orcidId, setOrcidId] = useState("0000-0002-1825-0097");
  const [googleScholarUrl, setGoogleScholarUrl] = useState("scholar.google.com/citations?user=helena-thorne");
  const [scopusId, setScopusId] = useState("Scopus Author ID: 57204918200");
  const [githubProfile, setGithubProfile] = useState("github.com/h-thorne");
  const [personalWebsite, setPersonalWebsite] = useState("https://helenathorne.org");

  // Employment Info
  const [jobTitle, setJobTitle] = useState("Senior Research Scientist");
  const [organization, setOrganization] = useState("Institute of Advanced Technology");
  const [industry, setIndustry] = useState("Scientific Research & Development");
  const [employmentStatus, setEmploymentStatus] = useState("Full-time");
  const [yearsExperience, setYearsExperience] = useState("12");

  // Academic Qualifications
  const [qualifications, setQualifications] = useState([
    { degree: "Ph.D. in Information Systems", institution: "Stanford University", year: "2012" },
    { degree: "M.S. in Computer Science", institution: "MIT", year: "2008" }
  ]);
  const [newDegree, setNewDegree] = useState("");
  const [newInstitution, setNewInstitution] = useState("");
  const [newYear, setNewYear] = useState("");

  // Step 3 States: Review & Agreements
  const [declarations, setDeclarations] = useState({
    truthfulness: false,
    consequences: false,
    conflict: false,
    privacy: false,
    usage: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // simulated CV upload handler
  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvFile(true);
      setCvFileName(file.name);
      setIsExtracting(true);
      setExtractionProgress(0);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          progress = 100;
          setIsExtracting(false);
          clearInterval(interval);
        }
        setExtractionProgress(progress);
      }, 150);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAddQualification = () => {
    if (newDegree.trim() && newInstitution.trim() && newYear.trim()) {
      setQualifications([
        ...qualifications,
        { degree: newDegree, institution: newInstitution, year: newYear }
      ]);
      setNewDegree("");
      setNewInstitution("");
      setNewYear("");
    }
  };

  const handleDeleteQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  // Profile Completeness Score
  const calculateCompleteness = () => {
    let score = 45; // base score for basic filled details
    if (profilePhoto) score += 10;
    if (cvFile) score += 10;
    if (linkedinUrl) score += 5;
    if (orcidId) score += 5;
    if (googleScholarUrl) score += 5;
    if (scopusId) score += 5;
    if (githubProfile) score += 5;
    if (personalWebsite) score += 5;
    if (qualifications.length > 0) score += 5;
    return Math.min(100, score);
  };

  const allConsented = Object.values(declarations).every(val => val === true);

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allConsented) return;
    setShowSuccessOverlay(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7f9fe] font-sans relative">

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#c4c6cf] px-8 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center text-[#1d3557] font-extrabold text-sm select-none">
              NS
            </div>
            <span className="font-bold text-[20px] tracking-tight text-[#002045] font-sans">
              SkillsRegistry
            </span>
          </div>

          <nav className="flex gap-8 items-center">
            <Link href="/" className="text-[14px] text-[#43474e] hover:text-[#002045] font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/sectors" className="text-[14px] text-[#43474e] hover:text-[#002045] font-medium transition-colors">
              Taxonomy
            </Link>
            <div className="border-[#d4af37] border-b-2 pb-1 relative shrink-0">
              <span className="font-bold text-[#002045] text-[14px]">
                Validation
              </span>
            </div>
            <Link href="#" className="text-[14px] text-[#43474e] hover:text-[#002045] font-medium transition-colors">
              Reports
            </Link>
          </nav>

          <div className="flex gap-4 items-center">
            <button className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1d3557] text-[#d4af37] font-bold text-sm flex items-center justify-center shadow-sm select-none">
              HT
            </div>
          </div>
        </div>
      </header>

      {/* Main Validation Flow Area */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-8 py-10">

        {/* Title Banner */}
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002045] tracking-tight">
            Expert Identity Validation
          </h1>
          <p className="text-[#43474e] text-lg max-w-2xl leading-relaxed">
            {step === 1 && "Complete your professional verification to gain access to the national registry."}
            {step === 2 && "Verify your professional credentials to join the National Expert Registry."}
            {step === 3 && "Complete the final step to authorize your professional registry entry."}
          </p>
        </div>

        {/* Stepper Header Tabs */}
        <div className="border-b border-[#c4c6cf] flex gap-10 mb-8 overflow-x-auto pb-px">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 pb-4 text-[14px] font-semibold tracking-wide uppercase transition-all border-b-2 ${step === 1
                ? "border-[#d4af37] text-[#002045]"
                : "border-transparent text-[#43474e]/60 hover:text-[#002045]"
              }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step > 1 ? "bg-green-600 text-white" : "bg-[#002045] text-white"
              }`}>
              {step > 1 ? <Check className="w-3 h-3" /> : "1"}
            </div>
            <span>Basic Information</span>
          </button>

          <button
            onClick={() => setStep(Math.max(1, Math.min(2, step)))}
            className={`flex items-center gap-2 pb-4 text-[14px] font-semibold tracking-wide uppercase transition-all border-b-2 ${step === 2
                ? "border-[#d4af37] text-[#002045]"
                : "border-transparent text-[#43474e]/60 hover:text-[#002045]"
              }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step > 2 ? "bg-green-600 text-white" : step === 2 ? "bg-[#002045] text-white" : "bg-gray-200 text-gray-500"
              }`}>
              {step > 2 ? <Check className="w-3 h-3" /> : "2"}
            </div>
            <span>Professional Profile & Credentials</span>
          </button>

          <button
            onClick={() => setStep(3)}
            disabled={step < 3}
            className={`flex items-center gap-2 pb-4 text-[14px] font-semibold tracking-wide uppercase transition-all border-b-2 disabled:cursor-not-allowed ${step === 3
                ? "border-[#d4af37] text-[#002045]"
                : "border-transparent text-[#43474e]/60 hover:text-[#002045]"
              }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? "bg-[#002045] text-white" : "bg-gray-200 text-gray-500"
              }`}>
              3
            </div>
            <span>Review & Agreements</span>
          </button>
        </div>

        {/* STEP 1: BASIC INFORMATION */}
        {step === 1 && (
          <div className="bg-white border border-[#c4c6cf] rounded-2xl p-8 sm:p-10 shadow-sm animate-fade-in max-w-[1024px]">
            <div className="flex gap-3 items-center mb-8 border-b border-gray-100 pb-4">
              <User className="w-6 h-6 text-[#002045]" />
              <h2 className="text-xl font-bold text-[#002045]">Personal Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              {/* Full Legal Name */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-bold text-[#43474e] tracking-wider uppercase">
                    Full Legal Name
                  </label>
                  <span className="bg-[#e5e9eb] text-[#43474e] font-extrabold text-[10px] px-2 py-0.5 rounded uppercase select-none">
                    Auto-Filled
                  </span>
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-[#c4c6cf] pl-4 pr-4 py-3 rounded-lg outline-none text-[#43474e] font-semibold bg-gray-50 cursor-not-allowed"
                  readOnly
                />
              </div>

              {/* Organization Email */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-bold text-[#43474e] tracking-wider uppercase">
                    Organization Email
                  </label>
                  <span className="bg-[#e5e9eb] text-[#43474e] font-extrabold text-[10px] px-2 py-0.5 rounded uppercase select-none">
                    Auto-Filled
                  </span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#c4c6cf] pl-4 pr-4 py-3 rounded-lg outline-none text-[#43474e] font-semibold bg-gray-50 cursor-not-allowed"
                  readOnly
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#43474e] tracking-wider uppercase">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#c4c6cf] hover:border-[#1d3557] focus:border-[#1d3557] pl-4 pr-4 py-3 rounded-lg outline-none transition-colors text-gray-800 placeholder-gray-400 bg-white"
                  placeholder="+27 (555) 000-0000"
                  required
                />
              </div>

              {/* National ID / Passport Number */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#43474e] tracking-wider uppercase">
                  National ID / Passport Number
                </label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="w-full border border-[#c4c6cf] hover:border-[#1d3557] focus:border-[#1d3557] pl-4 pr-4 py-3 rounded-lg outline-none transition-colors text-gray-800 placeholder-gray-400 bg-white"
                  placeholder="AB1234567"
                  required
                />
              </div>

              {/* Citizenship */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#43474e] tracking-wider uppercase">
                  Citizenship
                </label>
                <div className="relative">
                  <select
                    value={citizenship}
                    onChange={(e) => setCitizenship(e.target.value)}
                    className="w-full border border-[#c4c6cf] hover:border-[#1d3557] focus:border-[#1d3557] px-4 py-3 rounded-lg outline-none appearance-none transition-colors text-gray-800 bg-white"
                  >
                    <option value="South Africa">South Africa</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Botswana">Botswana</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Country of Residence */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#43474e] tracking-wider uppercase">
                  Country of Residence
                </label>
                <div className="relative">
                  <select
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    className="w-full border border-[#c4c6cf] hover:border-[#1d3557] focus:border-[#1d3557] px-4 py-3 rounded-lg outline-none appearance-none transition-colors text-gray-800 bg-white"
                  >
                    <option value="South Africa">South Africa</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Botswana">Botswana</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#43474e] tracking-wider uppercase">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-[#c4c6cf] hover:border-[#1d3557] focus:border-[#1d3557] pl-4 pr-4 py-3 rounded-lg outline-none transition-colors text-gray-800 placeholder-gray-400 bg-white"
                  placeholder="e.g. Pretoria"
                  required
                />
              </div>

            </div>

            {/* Profile Photo upload */}
            <div className="flex flex-col gap-3 mb-10">
              <label className="text-[13px] font-bold text-[#43474e] tracking-wider uppercase">
                Profile Photo (Optional)
              </label>

              <div className="flex items-center gap-6 p-6 border-2 border-[#c4c6cf] border-dashed rounded-xl bg-gray-50">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 bg-white flex items-center justify-center shrink-0">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-gray-300" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[15px] font-semibold text-gray-700">Upload a professional headshot</span>
                  <span className="text-[13px] text-gray-400">JPG, PNG or WEBP. Max 2MB.</span>
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg text-[13px] font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
                      onClick={() => setProfilePhoto("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80")}
                    >
                      Use Demo Photo
                    </button>
                    {profilePhoto && (
                      <button
                        type="button"
                        className="px-4 py-2 text-[13px] font-semibold text-red-600 hover:underline"
                        onClick={() => setProfilePhoto("")}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-6 border-t border-gray-100">
              <button
                onClick={() => setStep(2)}
                className="bg-[#002045] hover:bg-[#082d5a] text-white px-8 py-4 rounded-lg font-semibold tracking-wider text-[13px] uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Continue to Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROFESSIONAL PROFILE & CREDENTIALS */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">

            {/* Left Column: Form Sections */}
            <div className="lg:col-span-8 space-y-8">

              {/* CV Upload */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#002045]" />
                    <h2 className="text-xl font-bold text-[#002045]">CV / Resume Upload</h2>
                  </div>
                  <span className="bg-[#fed65b] text-[#745c00] font-extrabold text-[10px] px-2.5 py-1 rounded tracking-wide uppercase select-none">
                    Recommended
                  </span>
                </div>

                <div
                  onClick={triggerFileUpload}
                  className="bg-[#f1f4f6] border-2 border-dashed border-[#c4c6cf] hover:border-[#1d3557] rounded-xl py-12 px-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-gray-50"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleCvUpload}
                    className="hidden"
                    accept=".pdf,.docx"
                  />
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#002045] mb-4">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-[16px] font-semibold text-gray-800 mb-1">
                    {cvFileName ? cvFileName : "Drag and drop your CV here"}
                  </h4>
                  <p className="text-[13px] text-gray-500">PDF, DOCX up to 10MB</p>
                  <button
                    type="button"
                    className="mt-4 px-6 py-2 bg-[#002045] hover:bg-[#082d5a] text-white text-[12px] font-bold rounded-lg tracking-wider uppercase transition-all shadow-sm"
                  >
                    Select File
                  </button>
                </div>

                {cvFile && (
                  <div className="mt-4 bg-[#e5e9eb] rounded-xl p-4 flex items-center gap-4 transition-all">
                    <div className="relative w-6 h-6 shrink-0 flex items-center justify-center bg-white border border-[#c4c6cf] rounded-full">
                      {isExtracting ? (
                        <RefreshCw className="w-3.5 h-3.5 text-[#002045] animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[12px] font-bold text-[#002045] tracking-wider uppercase">
                          {isExtracting ? "Extracting Information..." : "CV EXTRACTION COMPLETE"}
                        </span>
                        <span className="text-[11px] font-semibold italic text-[#43474e]">
                          {extractionProgress}% complete
                        </span>
                      </div>
                      <div className="w-full bg-[#c4c6cf] h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-[#002045] h-full transition-all duration-300"
                          style={{ width: `${extractionProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Digital Presence & Researcher IDs */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                  <LinkIcon className="w-6 h-6 text-[#002045]" />
                  <h2 className="text-xl font-bold text-[#002045]">Digital Presence & Researcher IDs</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="border border-[#c4c6cf] hover:border-[#1d3557] px-4 py-2.5 rounded-lg outline-none bg-[#f7fafc] text-gray-800 text-[15px]"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">ORCID ID</label>
                    <input
                      type="text"
                      value={orcidId}
                      onChange={(e) => setOrcidId(e.target.value)}
                      className="border border-[#c4c6cf] hover:border-[#1d3557] px-4 py-2.5 rounded-lg outline-none bg-[#f7fafc] text-gray-800 text-[15px]"
                      placeholder="0000-0000-0000-0000"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">Google Scholar URL</label>
                    <input
                      type="text"
                      value={googleScholarUrl}
                      onChange={(e) => setGoogleScholarUrl(e.target.value)}
                      className="border border-[#c4c6cf] hover:border-[#1d3557] px-4 py-2.5 rounded-lg outline-none bg-[#f7fafc] text-gray-800 text-[15px]"
                      placeholder="scholar.google.com/citations?user=..."
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">Scopus ID</label>
                    <input
                      type="text"
                      value={scopusId}
                      onChange={(e) => setScopusId(e.target.value)}
                      className="border border-[#c4c6cf] hover:border-[#1d3557] px-4 py-2.5 rounded-lg outline-none bg-[#f7fafc] text-gray-800 text-[15px]"
                      placeholder="Scopus Author ID"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">GitHub Profile</label>
                    <input
                      type="text"
                      value={githubProfile}
                      onChange={(e) => setGithubProfile(e.target.value)}
                      className="border border-[#c4c6cf] hover:border-[#1d3557] px-4 py-2.5 rounded-lg outline-none bg-[#f7fafc] text-gray-800 text-[15px]"
                      placeholder="github.com/username"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">Portfolio / Personal Website</label>
                    <input
                      type="text"
                      value={personalWebsite}
                      onChange={(e) => setPersonalWebsite(e.target.value)}
                      className="border border-[#c4c6cf] hover:border-[#1d3557] px-4 py-2.5 rounded-lg outline-none bg-[#f7fafc] text-gray-800 text-[15px]"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 text-[12px] font-bold text-[#002045] hover:underline uppercase tracking-wide"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Other Profile</span>
                </button>
              </div>

              {/* Employment Information */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-[#002045]" />
                    <h2 className="text-xl font-bold text-[#002045]">Employment Information</h2>
                  </div>
                  <span className="bg-[#ebeef0] border border-[#c4c6cf] text-[#43474e] text-[11px] px-2 py-0.5 rounded flex items-center gap-1 select-none">
                    <Check className="w-3 h-3 text-[#002045]" />
                    <span>Auto-filled</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">Current Job Title</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="border border-[#c4c6cf] px-4 py-2.5 rounded-lg outline-none bg-[#f1f4f6] text-[#181c1e] font-semibold text-[15px]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">Organization</label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="border border-[#c4c6cf] px-4 py-2.5 rounded-lg outline-none bg-[#f1f4f6] text-[#181c1e] font-semibold text-[15px]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">Industry</label>
                    <div className="relative">
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full border border-[#c4c6cf] px-4 py-2.5 rounded-lg outline-none appearance-none bg-[#f1f4f6] text-gray-800 text-[15px]"
                      >
                        <option value="Scientific Research & Development">Scientific Research & Development</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Education">Education</option>
                        <option value="Government / Public Sector">Government / Public Sector</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">Employment Status</label>
                    <div className="relative">
                      <select
                        value={employmentStatus}
                        onChange={(e) => setEmploymentStatus(e.target.value)}
                        className="w-full border border-[#c4c6cf] px-4 py-2.5 rounded-lg outline-none appearance-none bg-[#f1f4f6] text-gray-800 text-[15px]"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Consultant">Consultant</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[12px] font-bold text-[#43474e] tracking-wide">Years of Professional Experience</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        className="border border-[#c4c6cf] px-4 py-2 rounded-lg outline-none bg-white text-center text-[#181c1e] font-bold text-lg w-20"
                      />
                      <span className="text-[15.5px] italic text-[#43474e]">Verified by career history data</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Qualifications */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                  <GraduationCap className="w-6 h-6 text-[#002045]" />
                  <h2 className="text-xl font-bold text-[#002045]">Academic Qualifications</h2>
                </div>

                <div className="space-y-4 mb-8">
                  {qualifications.map((q, idx) => (
                    <div key={idx} className="flex items-center justify-between border-l-4 border-[#d4af37] bg-gray-50 pl-4 pr-3 py-3 rounded-r-lg">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-[15px]">{q.degree}</h4>
                        <p className="text-[13px] text-gray-500">{q.institution} • {q.year}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteQualification(idx)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new qualification form */}
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 mb-6">
                  <h4 className="text-[13.5px] font-bold text-gray-700 uppercase mb-4">Add Qualification</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="e.g. Ph.D. in Computer Science"
                      value={newDegree}
                      onChange={(e) => setNewDegree(e.target.value)}
                      className="border border-gray-200 px-3.5 py-2 text-[14px] rounded-lg bg-white outline-none focus:border-[#1d3557] md:col-span-2"
                    />
                    <input
                      type="text"
                      placeholder="Graduation Year (YYYY)"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="border border-gray-200 px-3.5 py-2 text-[14px] rounded-lg bg-white outline-none focus:border-[#1d3557]"
                    />
                    <input
                      type="text"
                      placeholder="e.g. Stanford University"
                      value={newInstitution}
                      onChange={(e) => setNewInstitution(e.target.value)}
                      className="border border-gray-200 px-3.5 py-2 text-[14px] rounded-lg bg-white outline-none focus:border-[#1d3557] md:col-span-3"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddQualification}
                    className="flex items-center gap-1.5 px-4 py-2 border border-[#002045] hover:bg-[#002045] hover:text-white text-[#002045] text-[12px] font-bold rounded-lg tracking-wide uppercase transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to List</span>
                  </button>
                </div>
              </div>

              {/* Back & Next Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold tracking-wider text-[12px] uppercase transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Basic Info</span>
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => router.push("/")}
                    className="px-5 py-3 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg font-semibold tracking-wider text-[12px] uppercase transition-all"
                  >
                    Save as Draft
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-[#002045] hover:bg-[#082d5a] text-white px-8 py-4 rounded-lg font-semibold tracking-wider text-[13px] uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <span>Continue to Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 space-y-6">

              {/* Profile Strength */}
              <div className="bg-[#1a3250] text-white border border-[#c4c6cf]/10 rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-[16px] tracking-wide text-white mb-2">Expertise Ranking</h4>
                <p className="text-[13px] text-[#b0c7f1] leading-relaxed mb-6">
                  Your profile strength determines your priority in the validation queue.
                </p>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] font-semibold text-[#a3d8fe] uppercase tracking-wider">Profile Completeness</span>
                  <span className="text-[18px] font-bold text-white">{calculateCompleteness()}%</span>
                </div>
                <div className="w-full bg-[#15273f] h-2 rounded-full overflow-hidden mb-6">
                  <div
                    className="bg-[#d4af37] h-full transition-all duration-500"
                    style={{ width: `${calculateCompleteness()}%` }}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex gap-3 items-start text-[13.5px]">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#d4af37] font-bold text-[10px]">!</div>
                    <p className="text-[#e2ecfa]">
                      Link your LinkedIn and ORCID to boost validation speed by 40%.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start text-[13.5px]">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <p className="text-[#e2ecfa]">
                      Professional experience verified from institutional database.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guidance Info */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-[16px] text-gray-800 border-b border-gray-100 pb-3 mb-4">Guidance</h4>
                <div className="space-y-4">
                  <div className="flex gap-3.5 items-start">
                    <FileCheck className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[14px] font-bold text-gray-700 block hover:underline cursor-pointer">What documents are accepted?</span>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">
                        View the list of valid professional credentials.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3.5 items-start">
                    <Lock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[14px] font-bold text-gray-700 block hover:underline cursor-pointer">Privacy Policy</span>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">
                        How we handle your sensitive identity data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trusted Banner */}
              <div className="relative rounded-2xl overflow-hidden min-h-[160px] bg-gradient-to-br from-[#0c2340] to-[#1d3557] border border-white/10 flex flex-col justify-end p-6 text-white shadow-md">
                <div className="absolute top-6 left-6 text-white/5 opacity-50 shrink-0">
                  <Landmark className="w-24 h-24 stroke-[1px]" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#d4af37] block mb-1">
                    National Authority
                  </span>
                  <h4 className="text-xl font-bold tracking-tight text-white leading-tight">
                    Trusted Expert Registry
                  </h4>
                  <p className="text-[12.5px] text-[#b0c7f1] mt-2 font-light">
                    Your profile will display validation status across cooperating SETAs and government portals.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* STEP 3: REVIEW & AGREEMENTS */}
        {step === 3 && (
          <form onSubmit={handleSubmitProfile} className="space-y-8 animate-fade-in max-w-[1024px]">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Profile Card & Details */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 shadow-sm md:col-span-2 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-lg text-[#002045]">Personal Details</h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[13px] font-bold text-[#002045] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-[14.5px]">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider mb-1">Full Name</span>
                    <span className="font-semibold text-gray-800">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider mb-1">Email Address</span>
                    <span className="font-semibold text-gray-800">{email}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider mb-1">Identification ID</span>
                    <span className="font-semibold text-gray-800">{passportNumber}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider mb-1">Registry Role</span>
                    <span className="font-semibold text-gray-800">Senior Data Architect</span>
                  </div>
                </div>
              </div>

              {/* Photo Card */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 mb-3 shadow-sm">
                  <img src={profilePhoto} alt="Helena Thorne" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-gray-800 text-[16px]">Expert Profile</h4>
                <span className="text-[12.5px] text-gray-500 mt-1">Official Identification Photo</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-4 px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Replace
                </button>
              </div>

              {/* Academic summary */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-lg text-[#002045]">Education</h3>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[13px] font-bold text-[#002045] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-3.5">
                  {qualifications.map((q, idx) => (
                    <div key={idx} className="border-l-2 border-[#d4af37] pl-3">
                      <span className="font-bold text-gray-800 text-[14px] block">{q.degree}</span>
                      <span className="text-[12px] text-gray-500 mt-0.5 block">{q.institution} • {q.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employment summary */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-lg text-[#002045]">Employment</h3>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[13px] font-bold text-[#002045] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="border-l-2 border-[#d4af37] pl-3">
                  <span className="font-bold text-gray-800 text-[14px] block">{jobTitle}</span>
                  <span className="text-[12px] text-gray-500 mt-0.5 block">{organization} • {yearsExperience} Years</span>
                </div>
              </div>

              {/* Credentials summary */}
              <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-lg text-[#002045]">Credentials</h3>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[13px] font-bold text-[#002045] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1.5">
                  <span className="bg-[#e2ecfa] text-[#002045] text-[12.5px] px-2.5 py-1 rounded-md font-medium border border-[#002045]/5">
                    Certified CISA
                  </span>
                  <span className="bg-[#e2ecfa] text-[#002045] text-[12.5px] px-2.5 py-1 rounded-md font-medium border border-[#002045]/5">
                    AWS Solutions Architect
                  </span>
                </div>
              </div>

            </div>

            {/* Legal Declarations Section */}
            <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-xl font-bold text-[#002045]">Legal Declarations & Consent</h3>
                <p className="text-[#43474e] text-[14.5px] mt-1">
                  Please review and confirm the following legal statements to proceed with your application.
                </p>
              </div>

              <div className="space-y-6">
                {/* 1. Truthfulness */}
                <label className="flex items-start gap-4 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={declarations.truthfulness}
                    onChange={(e) => setDeclarations({ ...declarations, truthfulness: e.target.checked })}
                    className="mt-1.5 accent-[#002045] rounded scale-110 shrink-0"
                  />
                  <div>
                    <span className="text-[15px] font-bold text-gray-800 block">Truthfulness and Accuracy Confirmation</span>
                    <p className="text-[13.5px] text-gray-500 leading-relaxed mt-0.5">
                      I hereby certify that all information provided in this validation flow is true, complete, and accurate to the best of my knowledge.
                    </p>
                  </div>
                </label>

                {/* 2. Consequences */}
                <label className="flex items-start gap-4 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={declarations.consequences}
                    onChange={(e) => setDeclarations({ ...declarations, consequences: e.target.checked })}
                    className="mt-1.5 accent-[#002045] rounded scale-110 shrink-0"
                  />
                  <div>
                    <span className="text-[15px] font-bold text-gray-800 block">Acknowledgment of Consequences</span>
                    <p className="text-[13.5px] text-gray-500 leading-relaxed mt-0.5">
                      I understand that providing false information or misrepresenting credentials may result in immediate disqualification and potential legal or professional sanctions.
                    </p>
                  </div>
                </label>

                {/* 3. Conflict of Interest */}
                <label className="flex items-start gap-4 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={declarations.conflict}
                    onChange={(e) => setDeclarations({ ...declarations, conflict: e.target.checked })}
                    className="mt-1.5 accent-[#002045] rounded scale-110 shrink-0"
                  />
                  <div>
                    <span className="text-[15px] font-bold text-gray-800 block">Conflict of Interest Declaration</span>
                    <p className="text-[13.5px] text-gray-500 leading-relaxed mt-0.5">
                      I declare that I have no conflicts of interest that would compromise my integrity as a registered expert in the National Skills Registry.
                    </p>
                  </div>
                </label>

                {/* 4. Privacy Policy */}
                <label className="flex items-start gap-4 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={declarations.privacy}
                    onChange={(e) => setDeclarations({ ...declarations, privacy: e.target.checked })}
                    className="mt-1.5 accent-[#002045] rounded scale-110 shrink-0"
                  />
                  <div>
                    <span className="text-[15px] font-bold text-gray-800 block">Privacy Policy and Data Processing</span>
                    <p className="text-[13.5px] text-gray-500 leading-relaxed mt-0.5">
                      I consent to the collection and processing of my personal and professional data as outlined in the <Link href="/privacy" className="text-[#2b6485] underline">Privacy Policy</Link>.
                    </p>
                  </div>
                </label>

                {/* 5. Professional Usage */}
                <label className="flex items-start gap-4 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={declarations.usage}
                    onChange={(e) => setDeclarations({ ...declarations, usage: e.target.checked })}
                    className="mt-1.5 accent-[#002045] rounded scale-110 shrink-0"
                  />
                  <div>
                    <span className="text-[15px] font-bold text-gray-800 block">Professional Information Usage</span>
                    <p className="text-[13.5px] text-gray-500 leading-relaxed mt-0.5">
                      I authorize the SkillsRegistry to share my verified professional profile with authorized government and industry stakeholders for labor intelligence purposes.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold tracking-wider text-[12px] uppercase transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Credentials</span>
              </button>

              <div className="flex gap-4 items-center">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg font-semibold tracking-wider text-[12px] uppercase transition-all"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={!allConsented}
                  className={`px-8 py-4 rounded-lg font-semibold tracking-wider text-[13px] uppercase transition-all shadow-md flex items-center gap-2 text-white ${allConsented
                      ? "bg-[#002045] hover:bg-[#082d5a] cursor-pointer hover:shadow-lg"
                      : "bg-gray-300 cursor-not-allowed opacity-60"
                    }`}
                >
                  <span>Submit Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </form>
        )}

      </main>

      {/* Global Footer */}
      <footer className="bg-[#1d3557] text-white border-t border-white/10 px-8 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
            <Link href="#" className="hover:text-[#d4af37] transition-colors">Contact Registry</Link>
          </div>
        </div>
      </footer>

      {/* SUCCESS OVERLAY STATE */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 bg-[#002045]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 max-w-[600px] text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-[12px] font-bold tracking-[2px] uppercase text-green-600 mb-2 block">
              Submission Successful
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight mb-4">
              Identity Validation Submitted
            </h2>

            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
              Thank you, <span className="font-semibold text-gray-800">{fullName}</span>. Your professional registry entry has been successfully submitted for validation. Our panel will review your credentials and you will be notified via <span className="font-semibold text-[#2b6485]">{email}</span> once your account is fully verified.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => router.push("/expert/dashboard")}
                className="flex-1 py-3 bg-[#002045] hover:bg-[#082d5a] text-white font-semibold rounded-lg text-[13px] uppercase tracking-wider transition-all"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => setShowSuccessOverlay(false)}
                className="flex-1 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-[13px] uppercase tracking-wider transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Check, 
  HelpCircle, 
  LogOut, 
  Settings, 
  Network, 
  GitBranch, 
  Bell, 
  Upload, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Lock,
  RefreshCw,
  AlertTriangle,
  FileSearch,
  CheckSquare
} from "lucide-react";

export default function ExpertDashboard() {
  const router = useRouter();
  
  // Simulation State: false = Pending Review (State A), true = Action Required (State B - Figma Design)
  const [isActionRequired, setIsActionRequired] = useState(true);
  
  // Re-upload Simulation States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setUploadProgress(0);
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (progress >= 100) {
          progress = 100;
          setIsUploading(false);
          setIsActionRequired(false); // Change state back to Pending Review
          setShowToast(true);
          clearInterval(interval);
          setTimeout(() => setShowToast(false), 5000);
        }
        setUploadProgress(progress);
      }, 200);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7f9fe] font-sans relative">
      
      {/* 🔧 Developer Simulator Banner */}
      <div className="bg-[#002045] text-white py-3 px-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#d4af37]/30 z-30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
          <span className="text-[12px] font-bold tracking-wider uppercase text-[#b0c7f1]">Admin Simulator Panel:</span>
          <span className="text-[13px] text-gray-200">Toggle unverified expert status</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsActionRequired(false)}
            className={`px-3 py-1 rounded text-[11px] font-bold transition-all uppercase ${
              !isActionRequired 
                ? "bg-[#d4af37] text-[#002045]" 
                : "bg-white/10 hover:bg-white/20 text-[#b0c7f1]"
            }`}
          >
            State A: Pending Review
          </button>
          <button
            onClick={() => setIsActionRequired(true)}
            className={`px-3 py-1 rounded text-[11px] font-bold transition-all uppercase ${
              isActionRequired 
                ? "bg-red-600 text-white shadow-md" 
                : "bg-white/10 hover:bg-white/20 text-[#b0c7f1]"
            }`}
          >
            State B: Action Required (Figma)
          </button>
        </div>
      </div>

      <div className="flex flex-1 relative">
        
        {/* Left Sidebar Navigation (Locked for unverified users) */}
        <aside className="hidden lg:flex flex-col justify-between bg-[#f1f4f6] border-r border-[#c4c6cf] w-64 p-4 shrink-0">
          <div className="space-y-8">
            {/* Header / Brand */}
            <div className="flex gap-3.5 items-center px-4 py-2 border-b border-gray-200/50 pb-4">
              <div className="w-10 h-10 bg-[#1a365d] rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
                <GitBranch className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[12px] tracking-[0.6px] uppercase text-[#002045] leading-tight">
                  National
                </span>
                <span className="font-bold text-[12px] tracking-[0.6px] uppercase text-[#002045] leading-tight">
                  Authority
                </span>
                <span className="text-[10px] text-gray-500 mt-0.5">Expert Portal</span>
              </div>
            </div>

            {/* Menu Links */}
            <nav className="space-y-1">
              <div className="bg-[#fed65b] text-[#181c1e] flex gap-4 items-center px-4 py-2.5 rounded-lg text-[13px] font-bold cursor-default select-none shadow-sm">
                <FileSearch className="w-4 h-4 text-[#181c1e]" />
                <span>Overview</span>
              </div>

              {/* Disabled menu items */}
              <div className="flex gap-4 items-center px-4 py-2.5 rounded-lg text-[13px] font-bold text-gray-400 opacity-60 cursor-not-allowed select-none group relative">
                <Network className="w-4 h-4" />
                <span>Skill Trees</span>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded -top-8 left-12 whitespace-nowrap z-25">
                  Locked until verified
                </span>
              </div>

              <div className="flex gap-4 items-center px-4 py-2.5 rounded-lg text-[13px] font-bold text-gray-400 opacity-60 cursor-not-allowed select-none group relative">
                <GitBranch className="w-4 h-4" />
                <span>Expert Network</span>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded -top-8 left-12 whitespace-nowrap z-25">
                  Locked until verified
                </span>
              </div>

              <div className="flex gap-4 items-center px-4 py-2.5 rounded-lg text-[13px] font-bold text-gray-400 opacity-60 cursor-not-allowed select-none group relative">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded -top-8 left-12 whitespace-nowrap z-25">
                  Locked until verified
                </span>
              </div>
            </nav>
          </div>

          {/* Footer items */}
          <div className="border-t border-[#c4c6cf] pt-4 space-y-1">
            <Link 
              href="#" 
              className="flex gap-4 items-center px-4 py-2.5 rounded-lg text-[13px] font-semibold text-[#43474e] hover:bg-gray-200/50 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-gray-500" />
              <span>Help Center</span>
            </Link>
            <button 
              onClick={() => router.push("/login")}
              className="w-full flex gap-4 items-center px-4 py-2.5 rounded-lg text-[13px] font-semibold text-[#43474e] hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 text-gray-500 hover:text-red-600" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col justify-between overflow-x-hidden">
          
          {/* Header Bar */}
          <header className="bg-white border-b border-[#c4c6cf] px-8 py-3 shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[18px] text-[#002045]">SkillsRegistry</span>
              <span className="bg-[#fed65b] text-[#745c00] font-extrabold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase select-none">
                Unverified Access
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <button className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          {/* Verification Main Panel */}
          <main className="flex-grow p-8 max-w-[1280px] mx-auto w-full space-y-8">
            
            {/* Page Title */}
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold text-[#002045] tracking-tight">
                Verification Status
              </h2>
              <p className="text-[#43474e] text-[15px] leading-relaxed max-w-3xl">
                Your application is currently being reviewed. Complete approval is required before you can access expert features on the platform.
              </p>
            </div>

            {/* Content Columns */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Progress Timeline */}
              <div className="xl:col-span-5 bg-white border border-[#e5e7eb] rounded-2xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#002045] mb-6 pb-2 border-b border-gray-100">
                  Progress Timeline
                </h3>

                <div className="space-y-6 relative pl-3">
                  
                  {/* Step 1 */}
                  <div className="flex gap-4 items-start relative">
                    {/* Vertical line connector to Step 2 */}
                    <div className="absolute bg-[#002045] left-3.5 top-7 w-[2px] h-[34px] z-10" />
                    
                    <div className="w-7 h-7 rounded-full bg-[#002045] text-white flex items-center justify-center shrink-0 z-20">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12.5px] font-bold text-[#002045] tracking-wider uppercase">
                        Registration Submitted
                      </span>
                      <span className="text-[11.5px] text-gray-500 mt-0.5">
                        Status: Completed ✓
                      </span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 items-start relative">
                    {/* Vertical line connector to Step 3 */}
                    <div className="absolute bg-[#002045] left-3.5 top-7 w-[2px] h-[34px] z-10" />
                    
                    <div className="w-7 h-7 rounded-full bg-[#002045] text-white flex items-center justify-center shrink-0 z-20">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12.5px] font-bold text-[#002045] tracking-wider uppercase">
                        Email Verification
                      </span>
                      <span className="text-[11.5px] text-gray-500 mt-0.5">
                        Status: Completed ✓
                      </span>
                    </div>
                  </div>

                  {/* Step 3 (Interactive State) */}
                  <div className="flex gap-4 items-start relative">
                    {/* Vertical line connector to Step 4 */}
                    <div className="absolute bg-[#c4c6cf] left-3.5 top-7 w-[2px] h-[34px] z-10" />
                    
                    {isActionRequired ? (
                      <div className="w-7 h-7 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 z-20 border border-white shadow-[0_0_0_4px_rgba(186,26,26,0.2)]">
                        <span className="font-black text-sm">!</span>
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 z-20 border border-white shadow-[0_0_0_4px_rgba(59,130,246,0.2)]">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      </div>
                    )}
                    
                    <div className="flex-grow flex flex-col gap-1.5">
                      <div>
                        <span className={`text-[12.5px] font-bold tracking-wider uppercase ${isActionRequired ? "text-[#ba1a1a]" : "text-blue-600"}`}>
                          Document Review
                        </span>
                        <span className={`text-[11.5px] block mt-0.5 font-semibold ${isActionRequired ? "text-[#ba1a1a]" : "text-blue-500"}`}>
                          Status: {isActionRequired ? "Action Required" : "In Progress"}
                        </span>
                      </div>
                      
                      {isActionRequired && (
                        <div className="bg-[#fdf0f0] border border-[#f5c2c2] p-2.5 rounded-lg text-[11px] text-gray-600 leading-normal">
                          'Passport image is unreadable. Please upload a high-resolution scan.'
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4 items-start relative opacity-50">
                    <div className="absolute bg-[#c4c6cf] left-3.5 top-7 w-[2px] h-[34px] z-10" />
                    <div className="w-7 h-7 rounded-full bg-[#e5e9eb] border border-[#c4c6cf] text-gray-500 flex items-center justify-center shrink-0 z-20 text-[11px] font-bold">
                      ...
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12.5px] font-bold text-[#181c1e] tracking-wider uppercase">
                        Identity Verification
                      </span>
                      <span className="text-[11.5px] text-gray-500 mt-0.5">
                        Status: Pending
                      </span>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-4 items-start relative opacity-50">
                    <div className="absolute bg-[#c4c6cf] left-3.5 top-7 w-[2px] h-[34px] z-10" />
                    <div className="w-7 h-7 rounded-full bg-[#e5e9eb] border border-[#c4c6cf] text-gray-500 flex items-center justify-center shrink-0 z-20 text-[11px] font-bold">
                      ...
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12.5px] font-bold text-[#181c1e] tracking-wider uppercase">
                        Qualification Verification
                      </span>
                      <span className="text-[11.5px] text-gray-500 mt-0.5">
                        Status: Pending
                      </span>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="flex gap-4 items-start relative opacity-50">
                    <div className="absolute bg-[#c4c6cf] left-3.5 top-7 w-[2px] h-[34px] z-10" />
                    <div className="w-7 h-7 rounded-full bg-[#e5e9eb] border border-[#c4c6cf] text-gray-500 flex items-center justify-center shrink-0 z-20 text-[11px] font-bold">
                      ...
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12.5px] font-bold text-[#181c1e] tracking-wider uppercase">
                        Admin Review
                      </span>
                      <span className="text-[11.5px] text-gray-500 mt-0.5">
                        Status: Pending
                      </span>
                    </div>
                  </div>

                  {/* Step 7 */}
                  <div className="flex gap-4 items-start relative opacity-50">
                    <div className="w-7 h-7 rounded-full bg-[#e5e9eb] border border-[#c4c6cf] text-gray-500 flex items-center justify-center shrink-0 z-20 text-[11px] font-bold">
                      🎖️
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12.5px] font-bold text-[#181c1e] tracking-wider uppercase">
                        Approved Expert
                      </span>
                      <span className="text-[11.5px] text-gray-500 mt-0.5">
                        Status: Pending
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Current Stage Detail Card & Support */}
              <div className="xl:col-span-7 space-y-6">
                
                {/* Current Stage Card */}
                <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
                  
                  {/* Dynamic Card Header */}
                  <div className={`px-6 py-4 flex items-center justify-between text-white ${
                    isActionRequired ? "bg-[#ba1a1a]" : "bg-[#1d3557]"
                  }`}>
                    <div className="flex items-center gap-2">
                      {isActionRequired ? (
                        <AlertTriangle className="w-5 h-5 text-white shrink-0 animate-bounce" />
                      ) : (
                        <RefreshCw className="w-5 h-5 text-[#d4af37] shrink-0 animate-spin" style={{ animationDuration: '3s' }} />
                      )}
                      <span className="text-[12.5px] font-bold tracking-wider uppercase">
                        {isActionRequired ? "Immediate Action Required" : "Under Review"}
                      </span>
                    </div>
                    <span className="text-[11.5px] font-medium text-white/80">
                      Stage 3: Document Review
                    </span>
                  </div>

                  {/* Detail Body */}
                  <div className="p-6 space-y-6">
                    
                    {/* Status Info Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#c4c6cf]">
                      <div>
                        <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          STATUS
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${isActionRequired ? "bg-[#ba1a1a]" : "bg-blue-500 animate-pulse"}`} />
                          <span className={`text-[15.5px] font-bold ${isActionRequired ? "text-[#ba1a1a]" : "text-blue-600"}`}>
                            {isActionRequired ? "Unreadable Passport Image" : "Verification In Progress"}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-8">
                        <div>
                          <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                            UPDATED
                          </span>
                          <span className="text-[15px] font-extrabold text-[#002045]">
                            {isActionRequired ? "Oct 26, 2024" : "Today"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                            PROC. TIME
                          </span>
                          <span className="text-[15px] font-extrabold text-[#002045]">
                            2-5 days
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="space-y-2">
                      <span className="text-[12px] font-bold text-[#002045] tracking-wider uppercase block">
                        EXPLANATION
                      </span>
                      <p className="text-[14.5px] text-gray-600 leading-relaxed">
                        {isActionRequired 
                          ? "Our team was unable to verify your identity document due to image quality. The system detected excessive glare and low resolution on the identification page. Please provide a clearer scan of your passport's bio-data page to proceed with your expert validation."
                          : "We have successfully received your updated identity documents and qualifications. Our review panel is currently verifying your records against national institutional databases. No additional actions are required from you at this time."}
                      </p>
                    </div>

                    {/* Interactive Re-upload Area / Actions */}
                    <div className="pt-4 flex flex-wrap gap-4 items-center">
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleDocumentUpload} 
                        className="hidden" 
                        accept="image/*,.pdf" 
                      />
                      
                      {isActionRequired ? (
                        <>
                          <button 
                            onClick={triggerUpload}
                            disabled={isUploading}
                            className="bg-[#002045] hover:bg-[#082d5a] text-white px-5 py-3 rounded-lg text-[13px] font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUploading ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Uploading ({uploadProgress}%)</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                <span>Upload Updated Document</span>
                              </>
                            )}
                          </button>
                          
                          <button 
                            onClick={() => router.push("/expert/validation")}
                            className="border border-[#74777f] hover:bg-gray-50 text-[#002045] px-5 py-3 rounded-lg text-[13px] font-bold uppercase tracking-wider transition-all"
                          >
                            Edit Information
                          </button>
                        </>
                      ) : (
                        <div className="bg-[#e2ecfa] border border-[#b4d2f8] text-[#002045] text-[13.5px] px-4 py-3 rounded-lg flex items-center gap-2 w-full font-medium shadow-sm">
                          <CheckSquare className="w-4 h-4 text-green-600 shrink-0" />
                          <span>Documents submitted successfully. Waiting for admin approval.</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Need Help? Section */}
                <div className="bg-[#f1f4f6] border border-[#c4c6cf] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37] text-[#002045] flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-7 h-7" />
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-[#002045] tracking-tight">Need Help?</h4>
                      <p className="text-[#43474e] text-[13.5px] leading-relaxed mt-1">
                        If you believe there is an error or you need assistance with your verification, please contact the platform administrators.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[13px] font-bold text-[#002045]">
                      <a href="#" className="hover:underline flex items-center gap-1.5">
                        <span>📞</span>
                        <span>Contact Support</span>
                      </a>
                      <a href="#" className="hover:underline flex items-center gap-1.5">
                        <span>✉️</span>
                        <span>Email Administrator</span>
                      </a>
                      <a href="#" className="hover:underline flex items-center gap-1.5">
                        <span>❓</span>
                        <span>View Verification FAQ</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </main>

          {/* Global Footer */}
          <footer className="bg-[#1d3557] text-white border-t border-white/10 px-8 py-6 shrink-0">
            <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
                <Link href="#" className="hover:text-[#d4af37] transition-colors">Accessibility Statement</Link>
                <Link href="#" className="hover:text-[#d4af37] transition-colors">Contact Registry</Link>
              </div>
            </div>
          </footer>

        </div>

      </div>

      {/* TOAST NOTIFICATION FOR COMPLETED UPLOAD */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#002045] border-l-4 border-green-500 text-white py-4 px-6 rounded-lg shadow-2xl flex items-center gap-3 z-50 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-[13.5px]">Passport scan re-submitted!</span>
            <span className="text-[12px] text-gray-300">Status has been updated to Under Review.</span>
          </div>
        </div>
      )}

    </div>
  );
}

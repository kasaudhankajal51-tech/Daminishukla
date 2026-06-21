"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { Download, Upload, LogOut, Settings, Image as ImageIcon, Menu, X, Calendar, Mail, Phone, Lock, Eye } from "lucide-react";

export function AdminClient({ initialIsLoggedIn }: { initialIsLoggedIn: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      setIsLoggedIn(true);
    } else {
      try {
        const errorData = await res.json();
        setLoginError(errorData.error || "Invalid credentials");
      } catch {
        setLoginError("Invalid credentials");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!username) {
      setForgotMessage("Please enter your username first.");
      return;
    }
    setIsForgotLoading(true);
    setForgotMessage("");
    setLoginError("");

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      const data = await res.json();

      if (res.ok) {
        setForgotMessage("If the username is correct, the password has been sent to the registered email.");
      } else {
        setForgotMessage(data.error || "Failed to request password reset.");
      }
    } catch {
      setForgotMessage("An error occurred. Please try again.");
    } finally {
      setIsForgotLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-8 font-inter relative">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-[1050px] bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row min-h-[650px] relative z-10">
          
          {/* Left Side: Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center relative">
            
            {/* Header: Logo & Title */}
            <div className="flex items-center gap-4 mb-14">
              <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-sm w-12 h-12 rounded-full">
                <Settings className="text-blue-600" size={20} />
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase">Damini Admin</span>
            </div>

            {/* Title */}
            <div className="mb-12">
              <h1 className="text-4xl lg:text-[2.5rem] font-bold font-outfit text-slate-900 mb-3 tracking-tight">Welcome back!</h1>
              <p className="text-slate-500 font-medium text-[15px]">Securely sign in to manage your platform.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase ml-1 block mb-1">Username</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase ml-1 block mb-1">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-slate-400" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400"
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" className="absolute right-4 text-slate-400 hover:text-blue-500 transition-colors">
                    <Eye size={18} />
                  </button>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isForgotLoading}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isForgotLoading ? "Sending..." : "Forgot Password?"}
                  </button>
                </div>
              </div>
              
              {loginError && <div className="text-red-600 text-sm font-semibold">{loginError}</div>}
              {forgotMessage && <div className="text-blue-700 text-sm font-semibold">{forgotMessage}</div>}
              
              <button
                type="submit"
                className="w-full py-4 mt-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[17px] shadow-lg active:scale-[0.98] transition-all"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Right Side: Image */}
          <div className="hidden lg:block lg:w-1/2 relative bg-slate-900">
            <Image 
              src="/admin-hero.png" 
              alt="Creator and Astrology Dashboard Background" 
              fill 
              className="object-cover"
              priority
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/80 pointer-events-none" />
            
            <div className="absolute top-12 left-12 right-12 text-white z-10">
              <span className="text-cyan-400 font-bold tracking-[0.15em] text-sm uppercase mb-4 block">Damini Workspace</span>
              <h2 className="text-4xl font-outfit font-bold leading-tight tracking-wide text-white drop-shadow-lg">
                Manage creators,<br />astrology queries<br />& content
              </h2>
            </div>

            <div className="absolute bottom-10 left-12 z-10">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-lg">
                <Lock size={14} className="text-white" />
                <span className="text-white text-sm font-bold tracking-wide">Authorized personnel only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

const AdminDashboard = memo(({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<"banners" | "export">("banners");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({});
  const [banners, setBanners] = useState({ creator: "/creator-bg.png", astrologer: "/astrologer-bg.png" });
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [isExporting, setIsExporting] = useState(false);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const resCreator = await fetch("/api/banner/creator");
        const dataCreator = await resCreator.json();

        const resAstro = await fetch("/api/banner/astrologer");
        const dataAstro = await resAstro.json();

        setBanners({
          creator: dataCreator.url || "/creator-bg.png",
          astrologer: dataAstro.url || "/astrologer-bg.png"
        });
      } catch (err) {
        console.error("Failed to fetch current banners");
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (activeTab === "export") {
      const fetchEnquiries = async () => {
        setIsLoadingEnquiries(true);
        try {
          const res = await fetch("/api/admin/queries/list");
          const data = await res.json();
          if (data.success) {
            setEnquiries(data.data);
          }
        } catch (err) {
          console.error("Failed to fetch enquiries");
        }
        setIsLoadingEnquiries(false);
      };
      fetchEnquiries();
    }
  }, [activeTab]);

  const handleUpload = useCallback(async (page: string) => {
    const file = selectedFiles[page];
    if (!file) return;

    setUploadStatus(prev => ({ ...prev, [page]: "Uploading..." }));
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`/api/admin/banner/${page}`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setBanners(prev => ({ ...prev, [page]: data.url }));
        setUploadStatus(prev => ({ ...prev, [page]: "Success!" }));
        setSelectedFiles(prev => ({ ...prev, [page]: null }));
        setTimeout(() => setUploadStatus(prev => ({ ...prev, [page]: "" })), 3000);
      } else {
        setUploadStatus(prev => ({ ...prev, [page]: "Failed." }));
      }
    } catch {
      setUploadStatus(prev => ({ ...prev, [page]: "Failed." }));
    }
  }, [selectedFiles]);

  const handleExport = useCallback(() => {
    setIsExporting(true);
    let url = "/api/admin/queries/export";
    const params = new URLSearchParams();
    if (dateFrom) params.append("from", dateFrom);
    if (dateTo) params.append("to", dateTo);
    if (params.toString()) url += `?${params.toString()}`;
    window.location.href = url;
    setTimeout(() => setIsExporting(false), 2000);
  }, [dateFrom, dateTo]);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-inter flex flex-col md:flex-row overflow-hidden relative">

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-200 z-20 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-xl border border-blue-100 shadow-sm">
            <Settings className="text-blue-600" size={20} />
          </div>
          <span className="font-bold font-outfit text-xl text-slate-900">Damini Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-72 md:w-72 bg-gradient-to-b from-blue-50 to-sky-50/50 border-r border-blue-100 md:h-screen flex flex-col z-40 transform transition-transform duration-300 ease-out shadow-2xl md:shadow-none ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="hidden md:flex p-6 border-b border-slate-100 items-center gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2.5 rounded-xl border border-blue-100 shadow-sm group cursor-pointer hover:scale-105 transition-transform">
            <Settings className="text-blue-600 group-hover:rotate-90 transition-transform duration-700" size={22} />
          </div>
          <span className="font-bold font-outfit text-2xl text-slate-900 tracking-tight">Damini Admin</span>
        </div>

        {/* Mobile Sidebar Header */}
        <div className="flex md:hidden p-6 border-b border-slate-100 items-center justify-between">
          <span className="font-bold font-outfit text-2xl text-slate-900">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 text-slate-600 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">Dashboard</div>
          <button
            onClick={() => { setActiveTab("banners"); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all text-left font-semibold group relative overflow-hidden ${activeTab === "banners"
              ? "bg-white text-blue-700 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-blue-100/50"
              : "text-slate-600 hover:bg-white/60 hover:text-slate-900 border border-transparent"
              }`}
          >
            {activeTab === "banners" && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
            <Upload size={18} className={activeTab === "banners" ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500 transition-colors"} />
            Banner Management
          </button>

          <button
            onClick={() => { setActiveTab("export"); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all text-left font-semibold group relative overflow-hidden ${activeTab === "export"
              ? "bg-white text-blue-700 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-blue-100/50"
              : "text-slate-600 hover:bg-white/60 hover:text-slate-900 border border-transparent"
              }`}
          >
            {activeTab === "export" && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
            <Download size={18} className={activeTab === "export" ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500 transition-colors"} />
            Export Enquiries
          </button>
        </div>

        <div className="p-6 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-red-50/50 text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-100 transition-colors font-bold text-sm shadow-sm hover:shadow active:scale-[0.98]"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto h-[calc(100vh-73px)] md:h-screen relative w-full bg-[#f8fafc]">
        {/* Decorative background blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent pointer-events-none opacity-50" />
        
        <div className="max-w-5xl mx-auto relative z-10">

          {activeTab === "banners" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight pb-1">Banner Management</h2>
                <p className="text-slate-500 font-medium mt-2">Upload and manage the hero banners for your pages.</p>
              </div>

              <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-400 to-indigo-500 group-hover:w-2 transition-all duration-300" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-5 bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/80 flex flex-col hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 group/card relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <h3 className="font-bold text-xl text-slate-800">Creator Page Banner</h3>
                    <p className="text-sm text-slate-500 font-medium">Upload a bright, light-themed background image for the Creator page hero section.</p>

                    <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300 my-2 flex items-center justify-center p-2">
                      <Image src={previewUrls["creator"] || banners.creator} alt="Creator Banner Preview" fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain rounded" />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="bg-white/90 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1"><ImageIcon size={14} /> {previewUrls["creator"] ? "New Preview" : "Current Preview"}</span>
                      </div>
                    </div>

                    <div className="pt-2 mt-auto">
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            setSelectedFiles(prev => ({ ...prev, creator: file }));
                            setPreviewUrls(prev => ({ ...prev, creator: URL.createObjectURL(file) }));
                          }
                        }}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 cursor-pointer transition-colors"
                      />
                      {selectedFiles["creator"] && (
                        <button
                          onClick={() => handleUpload("creator")}
                          disabled={uploadStatus["creator"] === "Uploading..."}
                          className="w-full mt-4 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none shadow-sm"
                        >
                          {uploadStatus["creator"] === "Uploading..." ? "Saving..." : "Save Creator Banner"}
                        </button>
                      )}
                    </div>
                    {uploadStatus["creator"] && <span className="text-sm font-semibold text-sky-600 block mt-2">{uploadStatus["creator"]}</span>}
                  </div>

                  <div className="space-y-5 bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/80 flex flex-col hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 group/card relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <h3 className="font-bold text-xl text-slate-800">Astrologer Page Banner</h3>
                    <p className="text-sm text-slate-500 font-medium">Upload a mystical, light-themed background image for the Astrologer page hero section.</p>

                    <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300 my-2 flex items-center justify-center p-2">
                      <Image src={previewUrls["astrologer"] || banners.astrologer} alt="Astrologer Banner Preview" fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain rounded" />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="bg-white/90 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1"><ImageIcon size={14} /> {previewUrls["astrologer"] ? "New Preview" : "Current Preview"}</span>
                      </div>
                    </div>

                    <div className="pt-2 mt-auto">
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            setSelectedFiles(prev => ({ ...prev, astrologer: file }));
                            setPreviewUrls(prev => ({ ...prev, astrologer: URL.createObjectURL(file) }));
                          }
                        }}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer transition-colors"
                      />
                      {selectedFiles["astrologer"] && (
                        <button
                          onClick={() => handleUpload("astrologer")}
                          disabled={uploadStatus["astrologer"] === "Uploading..."}
                          className="w-full mt-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none shadow-sm"
                        >
                          {uploadStatus["astrologer"] === "Uploading..." ? "Saving..." : "Save Astrologer Banner"}
                        </button>
                      )}
                    </div>
                    {uploadStatus["astrologer"] && <span className="text-sm font-semibold text-indigo-600 block mt-2">{uploadStatus["astrologer"]}</span>}
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "export" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight pb-1">Export Enquiries</h2>
                <p className="text-slate-500 font-medium mt-2">Download all brand enquiries or filter by a specific date range.</p>
              </div>

              {/* Production-Level Filter Section */}
              <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-end gap-6">
                  
                  {/* Filters Container */}
                  <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">From Date</label>
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors font-medium hover:border-slate-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">To Date</label>
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors font-medium hover:border-slate-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category Filter</label>
                      <div className="relative">
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3.5 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors font-medium hover:border-slate-300 appearance-none"
                        >
                          <option value="All">All Categories</option>
                          <option value="Astrology">Astrology</option>
                          <option value="Creator">Creator</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Export Button */}
                  <div className="w-full lg:w-auto">
                    <button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="w-full lg:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-900 active:scale-[0.98]"
                    >
                      {isExporting ? <span className="animate-pulse">Exporting...</span> : <><Download size={18} /> Export Data</>}
                    </button>
                  </div>

                </div>
              </section>

              {/* Enquiries Table Section */}
              <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-8 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold font-outfit text-slate-900 tracking-tight">Recent Enquiries</h3>
                  <span className="bg-blue-50 text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm border border-blue-100 shadow-sm">
                    {enquiries.filter(e => filterType === "All" || (e.enquiry_type || e.enquiryType || "General").toLowerCase().includes(filterType.toLowerCase())).length} Records
                  </span>
                </div>

                {isLoadingEnquiries ? (
                  <div className="flex justify-center items-center py-16">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
                      <span className="animate-pulse text-slate-500 font-semibold">Loading enquiries...</span>
                    </div>
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100 border-dashed">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                      <Download className="text-slate-300" size={24} />
                    </div>
                    <p className="text-slate-500 font-medium text-lg">No enquiries found for this period.</p>
                  </div>
                ) : (
                  <>
                    {/* Mobile Card View */}
                    <div className="block md:hidden space-y-4">
                      {enquiries.filter(e => filterType === "All" || (e.enquiry_type || e.enquiryType || "General").toLowerCase().includes(filterType.toLowerCase())).map((enq, i) => (
                        <div key={enq._id || i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h4 className="font-bold text-lg text-slate-900 leading-tight">{enq.full_name || enq.name || '-'}</h4>
                              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mt-1.5">
                                <Calendar size={13} className="text-slate-400" />
                                {new Date(enq.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-sm whitespace-nowrap">
                              {enq.enquiry_type || enq.enquiryType || 'General'}
                            </span>
                          </div>
                          
                          <div className="h-px w-full bg-slate-100" />
                          
                          <div className="text-sm font-medium text-slate-600 space-y-2">
                            <div className="flex items-center gap-2"><Mail size={15} className="text-slate-400" /> <span className="truncate">{enq.email || '-'}</span></div>
                            {enq.phone && <div className="flex items-center gap-2"><Phone size={15} className="text-slate-400" /> <span>{enq.phone}</span></div>}
                          </div>
                          
                          <div className="text-sm font-medium text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                            <p>{enq.message || '-'}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold text-sm tracking-wide">
                            <th className="p-5 whitespace-nowrap">Date</th>
                            <th className="p-5 whitespace-nowrap">Name</th>
                            <th className="p-5 whitespace-nowrap">Contact</th>
                            <th className="p-5 whitespace-nowrap">Type</th>
                            <th className="p-5 min-w-[350px]">Message</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm font-medium relative bg-transparent">
                          {enquiries.filter(e => filterType === "All" || (e.enquiry_type || e.enquiryType || "General").toLowerCase().includes(filterType.toLowerCase())).map((enq, i) => (
                            <tr key={enq._id || i} className="hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 group relative z-0 hover:z-10">
                              <td className="p-5 whitespace-nowrap text-slate-500">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                                  {new Date(enq.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>
                              </td>
                              <td className="p-5 font-bold text-slate-900 whitespace-nowrap">{enq.full_name || enq.name || '-'}</td>
                              <td className="p-5 text-slate-600 whitespace-nowrap">
                                <div className="flex items-center gap-2 mb-1"><Mail size={13} className="text-slate-400" /> {enq.email || '-'}</div>
                                {enq.phone && <div className="flex items-center gap-2 text-slate-500"><Phone size={13} className="text-slate-400" /> {enq.phone}</div>}
                              </td>
                              <td className="p-5">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-sm whitespace-nowrap">
                                  {enq.enquiry_type || enq.enquiryType || 'General'}
                                </span>
                              </td>
                              <td className="p-5 text-slate-600 leading-relaxed max-w-md">
                                <div className="line-clamp-2 hover:line-clamp-none transition-all duration-300 cursor-pointer bg-transparent hover:bg-white hover:shadow-sm hover:border-slate-200 border border-transparent p-2 -m-2 rounded-lg relative z-0 hover:z-10">
                                  {enq.message || '-'}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </section>
            </div>
          )}

        </div>
      </main>
    </div>
  );
});
AdminDashboard.displayName = "AdminDashboard";

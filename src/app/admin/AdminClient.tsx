"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { Download, Upload, LogOut, Settings, Image as ImageIcon, Menu, X, Calendar, Mail, Phone, Lock, Eye, Search, Bell, ChevronLeft, ChevronDown, LayoutDashboard, MessageSquare, Briefcase, Users, Star, Video, Activity, BookOpen } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"dashboard" | "banners" | "export">("dashboard");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest → Oldest");
  
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
  }, []);

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

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = (e.full_name || e.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (e.email || "").toLowerCase().includes(searchTerm.toLowerCase()) || (e.phone || "").includes(searchTerm);
    const matchesType = filterType === "All" || (e.enquiry_type || e.enquiryType || "General").toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  if (sortOrder === "Oldest → Newest") {
    filteredEnquiries.reverse();
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-slate-800 font-inter flex flex-col md:flex-row overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">DS</div>
          <span className="font-bold text-lg text-[#0B1121]">Damini Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-blue-950 border-r border-blue-900/50 md:h-screen flex flex-col z-40 shadow-xl shadow-blue-900/10 transform transition-transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-blue-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-[0_2px_10px_rgba(37,99,235,0.4)]">DS</div>
            <span className="font-bold text-sm text-white tracking-wide">DAMINI ADMIN</span>
          </div>
          <button className="hidden md:flex w-6 h-6 rounded-md bg-blue-900 border border-blue-800 items-center justify-center text-blue-300 hover:bg-blue-800 hover:text-white transition-colors">
            <ChevronLeft size={14} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          
          <button 
            onClick={() => { setActiveTab("dashboard"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${activeTab === "dashboard" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-500" : "text-blue-200 hover:bg-blue-900/50 hover:text-white"}`}
          >
            <div className={`p-1.5 rounded-lg ${activeTab === "dashboard" ? "bg-white/20 text-white" : "bg-transparent text-blue-400"}`}>
              <LayoutDashboard size={18} />
            </div>
            Dashboard
          </button>

          <button 
            onClick={() => { setActiveTab("export"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${activeTab === "export" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-500" : "text-blue-200 hover:bg-blue-900/50 hover:text-white"}`}
          >
            <div className={`p-1.5 rounded-lg ${activeTab === "export" ? "bg-white/20 text-white" : "bg-transparent text-blue-400"}`}>
              <MessageSquare size={18} />
            </div>
            Enquiries Inbox
          </button>

          <button 
            onClick={() => { setActiveTab("banners"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${activeTab === "banners" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-500" : "text-blue-200 hover:bg-blue-900/50 hover:text-white"}`}
          >
            <div className={`p-1.5 rounded-lg ${activeTab === "banners" ? "bg-white/20 text-white" : "bg-transparent text-blue-400"}`}>
              <Briefcase size={18} />
            </div>
            Banner Management
          </button>

        </div>

        {/* Bottom User */}
        <div className="p-4 border-t border-blue-900/50">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-900/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-900 text-white border border-blue-800 flex items-center justify-center font-bold text-xs shadow-sm">AD</div>
              <div>
                <div className="text-white text-sm font-bold leading-tight">Administrator</div>
                <div className="text-blue-400 text-[10px] font-semibold tracking-wide uppercase mt-0.5">Super Admin</div>
              </div>
            </div>
            <button onClick={onLogout} className="w-8 h-8 rounded-full flex items-center justify-center text-blue-400 hover:text-red-400 hover:bg-red-500/20 transition-colors" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F4F6F8]">
        
        {/* Top Navbar */}
        <header className="h-[72px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              {activeTab === "dashboard" ? <LayoutDashboard size={20} /> : activeTab === "export" ? <MessageSquare size={20} /> : <Briefcase size={20} />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{activeTab === "dashboard" ? "Dashboard" : activeTab === "export" ? "Enquiries Inbox" : "Banner Management"}</h1>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                Damini Admin <ChevronLeft className="rotate-180" size={10} /> {activeTab === "dashboard" ? "Dashboard" : activeTab === "export" ? "Enquiries Inbox" : "Banner Management"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500 border border-red-600 rounded-lg text-sm font-bold text-white hover:bg-red-600 transition-all shadow-sm shadow-red-500/20">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6">

            {activeTab === "dashboard" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Welcome, DS Astrology Admin</h2>
                  <p className="text-xs font-medium text-slate-500 mt-1">Live analytics · automatically synced · last updated just now</p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  
                  {/* Total Leads Card */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Users size={14} />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">All time</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900">{enquiries.length}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">Total Enquiries</p>
                    </div>
                    <div className="mt-4 h-0.5 w-1/3 bg-blue-500 rounded-full" />
                  </div>

                  {/* Astrology Leads Card */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Star size={14} />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Active</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900">{enquiries.filter(e => (e.enquiry_type || e.enquiryType || '').toLowerCase().includes('astrology')).length}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">Astrology Queries</p>
                    </div>
                    <div className="mt-4 h-0.5 w-1/3 bg-orange-500 rounded-full" />
                  </div>

                  {/* Creator Leads Card */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Video size={14} />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Active</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900">{enquiries.filter(e => (e.enquiry_type || e.enquiryType || '').toLowerCase().includes('creator')).length}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">Creator Enquiries</p>
                    </div>
                    <div className="mt-4 h-0.5 w-1/3 bg-purple-500 rounded-full" />
                  </div>

                  {/* Today's Leads Card */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Activity size={14} />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">Today</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900">{enquiries.filter(e => {
                          const date = new Date(e.created_at || e.createdAt || new Date());
                          const today = new Date();
                          return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
                        }).length}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">New Leads Today</p>
                    </div>
                    <div className="mt-4 h-0.5 w-1/3 bg-emerald-500 rounded-full" />
                  </div>

                </div>

                {/* Recent Leads Preview */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-slate-900">Recent Leads</h3>
                    <button onClick={() => setActiveTab("export")} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      View All <ChevronLeft className="rotate-180" size={14} />
                    </button>
                  </div>
                  
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                            <th className="p-4 pl-6 whitespace-nowrap">Submitted</th>
                            <th className="p-4 whitespace-nowrap">Name / Contact</th>
                            <th className="p-4 whitespace-nowrap">Type</th>
                            <th className="p-4 whitespace-nowrap">Service</th>
                            <th className="p-4 whitespace-nowrap">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {enquiries.slice(0, 5).map((enq, i) => (
                            <tr key={enq._id || i} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-4 pl-6 whitespace-nowrap">
                                <div className="font-bold text-slate-900">
                                  {new Date(enq.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="font-bold text-slate-900">{enq.full_name || enq.name || '-'}</div>
                                <div className="text-xs text-blue-600 mt-0.5">{enq.email || '-'}</div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <span className="text-[10px] font-bold text-green-600 tracking-wider">DIRECT</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-slate-600 font-medium">
                                {enq.enquiry_type || enq.enquiryType || 'General Enquiry'}
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> NEW
                                </div>
                              </td>
                            </tr>
                          ))}
                          {enquiries.length === 0 && (
                            <tr>
                              <td colSpan={5} className="p-8 text-center text-slate-500">No leads available.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "export" && (
              <>
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by name, email, or phone..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-800 text-sm focus:outline-none focus:border-blue-500 shadow-sm transition-colors"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 text-sm focus:outline-none shadow-sm transition-colors"
                  >
                    <option>Newest → Oldest</option>
                    <option>Oldest → Newest</option>
                  </select>

                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 text-sm focus:outline-none shadow-sm transition-colors"
                  >
                    <option value="All">All Payments / Categories</option>
                    <option value="Astrology">Astrology</option>
                    <option value="Creator">Creator</option>
                  </select>

                  <input 
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 text-sm focus:outline-none shadow-sm transition-colors"
                  />

                  <input 
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 text-sm focus:outline-none shadow-sm transition-colors"
                  />

                  <button 
                    onClick={handleExport}
                    disabled={isExporting}
                    className="px-6 py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm transition-colors disabled:opacity-50"
                  >
                    <Download size={16} /> Excel 
                  </button>
                </div>

                {/* Table Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-6">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">Lead Inbox</h3>
                      <p className="text-xs text-slate-500">Showing Enquiries / Leads</p>
                    </div>
                    <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                      {filteredEnquiries.length} leads
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                          <th className="p-4 pl-6 whitespace-nowrap">Submitted On</th>
                          <th className="p-4 whitespace-nowrap">Name</th>
                          <th className="p-4 whitespace-nowrap">Phone</th>
                          <th className="p-4 whitespace-nowrap">Service</th>
                          <th className="p-4 min-w-[250px]">Message</th>
                          <th className="p-4 whitespace-nowrap">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredEnquiries.length > 0 ? (
                          filteredEnquiries.map((enq, i) => (
                            <tr key={enq._id || i} className="hover:bg-slate-50/80 transition-colors group">
                              <td className="p-4 pl-6 whitespace-nowrap">
                                <div className="font-bold text-slate-900">
                                  {new Date(enq.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {new Date(enq.created_at || new Date()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="font-bold text-slate-900">{enq.full_name || enq.name || '-'}</div>
                                <div className="text-xs text-blue-600 mt-1">{enq.email || '-'}</div>
                              </td>
                              <td className="p-4 whitespace-nowrap font-medium text-slate-700">
                                {enq.phone || '-'}
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-green-600 tracking-wider">DIRECT</span>
                                  <span className="px-2 py-0.5 rounded border border-orange-200 bg-orange-50 text-orange-600 text-[10px] font-bold flex items-center gap-1">
                                    <MessageSquare size={10} /> {enq.enquiry_type || enq.enquiryType || 'GENERAL'}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4 text-slate-600">
                                <div className="flex gap-2">
                                  <MessageSquare size={14} className="text-slate-400 shrink-0 mt-0.5" />
                                  <div className="line-clamp-2 text-xs">{enq.message || '-'}</div>
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> STATUS: <span className="font-bold">RECEIVED</span>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-500">
                              No enquiries found matching your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "banners" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Creator Banner Card */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                    <div className="p-6 md:p-8 pl-8 md:pl-10">
                      <h3 className="font-bold text-xl text-slate-900 mb-1">Creator Page Banner</h3>
                      <p className="text-sm text-slate-500 mb-6">Upload a bright, light-themed background image for the Creator page hero section.</p>

                      <div className="w-full h-48 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 relative mb-6">
                        <Image src={previewUrls["creator"] || banners.creator} alt="Preview" fill className="object-contain" />
                      </div>

                      <div className="space-y-4">
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
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                        {selectedFiles["creator"] && (
                          <button
                            onClick={() => handleUpload("creator")}
                            disabled={uploadStatus["creator"] === "Uploading..."}
                            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
                          >
                            {uploadStatus["creator"] === "Uploading..." ? "Saving..." : "Save Creator Banner"}
                          </button>
                        )}
                        {uploadStatus["creator"] && <span className="text-xs font-bold text-blue-600">{uploadStatus["creator"]}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Astrologer Banner Card */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                    <div className="p-6 md:p-8 pl-8 md:pl-10">
                      <h3 className="font-bold text-xl text-slate-900 mb-1">Astrologer Page Banner</h3>
                      <p className="text-sm text-slate-500 mb-6">Upload a mystical, light-themed background image for the Astrologer page hero section.</p>

                      <div className="w-full h-48 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 relative mb-6">
                        <Image src={previewUrls["astrologer"] || banners.astrologer} alt="Preview" fill className="object-contain" />
                      </div>

                      <div className="space-y-4">
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
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                        {selectedFiles["astrologer"] && (
                          <button
                            onClick={() => handleUpload("astrologer")}
                            disabled={uploadStatus["astrologer"] === "Uploading..."}
                            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
                          >
                            {uploadStatus["astrologer"] === "Uploading..." ? "Saving..." : "Save Astrologer Banner"}
                          </button>
                        )}
                        {uploadStatus["astrologer"] && <span className="text-xs font-bold text-blue-600">{uploadStatus["astrologer"]}</span>}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
});
AdminDashboard.displayName = "AdminDashboard";

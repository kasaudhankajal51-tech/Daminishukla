"use client";

import { useState } from "react";
import { Download, Upload, LogOut, Settings } from "lucide-react";

export function AdminClient({ initialIsLoggedIn }: { initialIsLoggedIn: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

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
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-inter p-4">
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl w-full max-w-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-400 to-blue-500" />
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-sm">
              <Settings className="text-blue-500" size={32} />
            </div>
            <h1 className="text-3xl font-bold font-outfit text-slate-900 mb-2">Admin Portal</h1>
            <p className="text-slate-500 font-medium">Sign in to manage your website</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium"
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-lg">{loginError}</p>}
            <button 
              type="submit" 
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold text-lg shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({});

  const handleUpload = async (page: string, file: File) => {
    setUploadStatus(prev => ({ ...prev, [page]: "Uploading..." }));
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`/api/admin/banner/${page}`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setUploadStatus(prev => ({ ...prev, [page]: "Success!" }));
        setTimeout(() => setUploadStatus(prev => ({ ...prev, [page]: "" })), 3000);
      } else {
        setUploadStatus(prev => ({ ...prev, [page]: "Failed." }));
      }
    } catch {
      setUploadStatus(prev => ({ ...prev, [page]: "Failed." }));
    }
  };

  const handleExport = () => {
    let url = "/api/admin/queries/export";
    const params = new URLSearchParams();
    if (dateFrom) params.append("from", dateFrom);
    if (dateTo) params.append("to", dateTo);
    if (params.toString()) url += `?${params.toString()}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-inter">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
              <Settings className="text-blue-500" size={20} />
            </div>
            <span className="font-bold font-outfit text-xl text-slate-800">DS Workspace</span>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 transition-colors font-medium text-sm"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 py-10 space-y-8">
        
        {/* Banner Management */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-400 to-cyan-400" />
          
          <h2 className="text-2xl font-bold font-outfit mb-8 flex items-center gap-3 text-slate-900">
            <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-100">
              <Upload size={24} className="text-sky-500" />
            </div>
            Banner Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Creator Page Banner</h3>
              <p className="text-sm text-slate-500 font-medium">Upload a bright, light-themed background image for the Creator page hero section.</p>
              <div className="pt-2">
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, image/webp"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUpload("creator", e.target.files[0]);
                    }
                  }}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 cursor-pointer transition-colors"
                />
              </div>
              {uploadStatus["creator"] && <span className="text-sm font-semibold text-sky-600 block mt-2">{uploadStatus["creator"]}</span>}
            </div>

            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Astrologer Page Banner</h3>
              <p className="text-sm text-slate-500 font-medium">Upload a mystical, light-themed background image for the Astrologer page hero section.</p>
              <div className="pt-2">
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, image/webp"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUpload("astrologer", e.target.files[0]);
                    }
                  }}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer transition-colors"
                />
              </div>
              {uploadStatus["astrologer"] && <span className="text-sm font-semibold text-indigo-600 block mt-2">{uploadStatus["astrologer"]}</span>}
            </div>
          </div>
        </section>

        {/* Enquiries Export */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-green-400 to-emerald-500" />
          
          <h2 className="text-2xl font-bold font-outfit mb-4 flex items-center gap-3 text-slate-900">
            <div className="p-2.5 bg-green-50 rounded-xl border border-green-100">
              <Download size={24} className="text-green-600" />
            </div>
            Export Enquiries
          </h2>
          <p className="text-slate-500 font-medium mb-8">Download all brand enquiries submitted via the Creator page or filter by a specific date range. The export will be downloaded as an Excel (.xlsx) file.</p>
          
          <div className="flex flex-col md:flex-row items-end gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-semibold text-slate-700 ml-1">From Date</label>
              <input 
                type="date" 
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all font-medium"
              />
            </div>
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-semibold text-slate-700 ml-1">To Date</label>
              <input 
                type="date" 
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all font-medium"
              />
            </div>
            <button 
              onClick={handleExport}
              className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Export XLS
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Download, Upload, LogOut, Settings, Image as ImageIcon } from "lucide-react";

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
              <div className="flex justify-between items-center mt-1">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isForgotLoading}
                  className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50"
                >
                  {isForgotLoading ? "Sending..." : "Forgot Password?"}
                </button>
              </div>
            </div>
            {loginError && <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-lg">{loginError}</p>}
            {forgotMessage && <p className="text-blue-600 text-sm font-medium text-center bg-blue-50 p-2 rounded-lg">{forgotMessage}</p>}
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
  const [activeTab, setActiveTab] = useState<"banners" | "export">("banners");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({});
  const [banners, setBanners] = useState({ creator: "/creator-bg.png", astrologer: "/astrologer-bg.png" });
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [isExporting, setIsExporting] = useState(false);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);

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

  const handleUpload = async (page: string) => {
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
  };

  const handleExport = () => {
    setIsExporting(true);
    let url = "/api/admin/queries/export";
    const params = new URLSearchParams();
    if (dateFrom) params.append("from", dateFrom);
    if (dateTo) params.append("to", dateTo);
    if (params.toString()) url += `?${params.toString()}`;
    window.location.href = url;
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-inter flex flex-col md:flex-row">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 md:min-h-screen flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-200 flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
            <Settings className="text-blue-500" size={20} />
          </div>
          <span className="font-bold font-outfit text-xl text-slate-800">DS Workspace</span>
        </div>

        <div className="flex-1 py-6 flex flex-col gap-2 px-4">
          <button
            onClick={() => setActiveTab("banners")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium ${activeTab === "banners"
              ? "bg-sky-50 text-sky-700 border border-sky-100 shadow-sm"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
              }`}
          >
            <Upload size={18} />
            Banner Management
          </button>

          <button
            onClick={() => setActiveTab("export")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium ${activeTab === "export"
              ? "bg-green-50 text-green-700 border border-green-100 shadow-sm"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
              }`}
          >
            <Download size={18} />
            Export Enquiries
          </button>
        </div>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 transition-colors font-medium text-sm"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">

          {activeTab === "banners" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold font-outfit text-slate-900">Banner Management</h2>
                <p className="text-slate-500 font-medium mt-2">Upload and manage the hero banners for your pages.</p>
              </div>

              <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-400 to-cyan-400" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col">
                    <h3 className="font-bold text-lg text-slate-800">Creator Page Banner</h3>
                    <p className="text-sm text-slate-500 font-medium">Upload a bright, light-themed background image for the Creator page hero section.</p>

                    <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300 my-2 flex items-center justify-center p-2">
                      <img src={previewUrls["creator"] || banners.creator} alt="Creator Banner Preview" className="max-w-full max-h-full object-contain rounded" />
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

                  <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col">
                    <h3 className="font-bold text-lg text-slate-800">Astrologer Page Banner</h3>
                    <p className="text-sm text-slate-500 font-medium">Upload a mystical, light-themed background image for the Astrologer page hero section.</p>

                    <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300 my-2 flex items-center justify-center p-2">
                      <img src={previewUrls["astrologer"] || banners.astrologer} alt="Astrologer Banner Preview" className="max-w-full max-h-full object-contain rounded" />
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
                <h2 className="text-3xl font-bold font-outfit text-slate-900">Export Enquiries</h2>
                <p className="text-slate-500 font-medium mt-2">Download all brand enquiries or filter by a specific date range.</p>
              </div>

              <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-green-400 to-emerald-500" />

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
                    disabled={isExporting}
                    className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isExporting ? <span className="animate-pulse">Exporting...</span> : <><Download size={18} /> Export XLS</>}
                  </button>
                </div>
              </section>

              {/* Enquiries Table Section */}
              <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-8">
                <h3 className="text-xl font-bold font-outfit text-slate-900 mb-6">Recent Enquiries</h3>

                {isLoadingEnquiries ? (
                  <div className="flex justify-center items-center py-12">
                    <span className="animate-pulse text-slate-400 font-medium">Loading enquiries...</span>
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-500 font-medium">No enquiries found yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-sm">
                          <th className="p-4 whitespace-nowrap">Date</th>
                          <th className="p-4 whitespace-nowrap">Name</th>
                          <th className="p-4 whitespace-nowrap">Contact</th>
                          <th className="p-4 whitespace-nowrap">Type</th>
                          <th className="p-4 min-w-[300px]">Message</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {enquiries.map((enq, i) => (
                          <tr key={enq._id || i} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 whitespace-nowrap text-slate-500">
                              {new Date(enq.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="p-4 font-medium text-slate-800 whitespace-nowrap">{enq.full_name || enq.name || '-'}</td>
                            <td className="p-4 text-slate-600 whitespace-nowrap">
                              <div>{enq.email || '-'}</div>
                              {enq.phone && <div className="text-xs text-slate-400 mt-0.5">{enq.phone}</div>}
                            </td>
                            <td className="p-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100 whitespace-nowrap">
                                {enq.enquiry_type || enq.enquiryType || 'General'}
                              </span>
                            </td>
                            <td className="p-4 text-slate-600 leading-relaxed max-w-md truncate hover:whitespace-normal hover:break-words">
                              {enq.message || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

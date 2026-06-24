"use client";

import { motion } from "framer-motion";
import { Mail, Award, Users, Tv, Star, TrendingUp, Sparkles, Video, Play, Clock, Eye, Home } from "lucide-react";
import Link from "next/link";
import React, { useState, useCallback, memo, useEffect } from "react";
import Image from "next/image";

const MILESTONES_AND_IMPACT = [
  { icon: <Tv size={24} />, title: "TV Show Feature", desc: "Featured in prime time reality shows and talk shows across national television." },
  { icon: <Star size={24} />, title: "Brand Partnerships", desc: "Collaborated with Fortune 500 beauty, lifestyle, and tech brands." },
  { icon: <TrendingUp size={24} />, title: "Viral Reels", desc: "Consistently hitting millions of views with relatable and trending content." },
  { icon: <Users size={24} />, title: "Community Builder", desc: "Fostered a highly engaged community of 2M+ loyal supporters." },
  { icon: <Award size={24} />, title: "Industry Recognition", desc: "Awarded 'Creator of the Year' at leading digital influencer awards." },
  { icon: <Sparkles size={24} />, title: "Events & Appearances", desc: "Keynote speaker and special guest at major lifestyle and tech events." },
];

export const CreatorClientPage = memo(function CreatorClientPage({ bannerUrl }: { bannerUrl: string }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "Brand Promotion - Creator",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);

  const [instagramPosts, setInstagramPosts] = useState<any[]>([]);
  const [isLoadingInsta, setIsLoadingInsta] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/youtube");
        const json = await res.json();
        if (json.success) setYoutubeVideos(json.data);
      } catch (err) {
        console.error("Failed to fetch YouTube videos", err);
      } finally {
        setIsLoadingVideos(false);
      }
    };

    const fetchInsta = async () => {
      try {
        const res = await fetch("/api/instagram");
        const json = await res.json();
        if (json.success) setInstagramPosts(json.data);
      } catch (err) {
        console.error("Failed to fetch Instagram posts", err);
      } finally {
        setIsLoadingInsta(false);
      }
    };

    fetchVideos();
    fetchInsta();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ fullName: "", email: "", phone: "", enquiryType: "Brand Promotion - Creator", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  }, [formData]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-800 font-inter selection:bg-sky-200 selection:text-sky-900 pb-20">

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 font-semibold text-sm shadow-md hover:shadow-lg hover:border-orange-300 hover:text-orange-600 transition-all"
        >
          <Home size={16} />
          Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] pt-32 pb-24 w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-white/70 to-white/30 backdrop-blur-[2px]" />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-outfit mb-4 text-slate-900 drop-shadow-sm break-words"
          >
            Damini Shukla
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sky-600 text-xl md:text-2xl font-semibold mb-6 tracking-wide"
          >
            Content Creator · Digital Influencer
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            Inspiring millions through relatable lifestyle content, fashion inspiration, and authentic storytelling.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-full px-4"
          >
            <a href="https://instagram.com/daminishukla" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md hover:shadow-lg backdrop-blur-md transition-all border border-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E1306C]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span className="font-medium">Instagram</span>
            </a>
            <a href="https://youtube.com/@daminishukla" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md hover:shadow-lg backdrop-blur-md transition-all border border-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF0000]"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              <span className="font-medium">YouTube</span>
            </a>
            <button 
              onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:shadow-[0_4px_25px_rgba(14,165,233,0.5)] hover:-translate-y-1 transition-all font-semibold"
            >
              <Mail size={20} />
              <span>Brand Enquiry</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/90 rounded-2xl p-4 sm:p-8 border border-slate-100 shadow-xl backdrop-blur-xl">
          <div className="text-center p-4">
            <h3 className="text-3xl sm:text-4xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">2M+</h3>
            <p className="text-slate-500 mt-2 font-medium">Combined Followers</p>
          </div>
          <div className="text-center p-4 md:border-x border-slate-100">
            <h3 className="text-3xl sm:text-4xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">150+</h3>
            <p className="text-slate-500 mt-2 font-medium">Brand Collaborations</p>
          </div>
          <div className="text-center p-4">
            <h3 className="text-3xl sm:text-4xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">12+</h3>
            <p className="text-slate-500 mt-2 font-medium">TV Appearances</p>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-4 text-slate-900">Milestones & Impact</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-cyan-300 mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MILESTONES_AND_IMPACT.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-xl transition-all shadow-sm group"
            >
              <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 mb-6 group-hover:scale-110 group-hover:bg-sky-100 transition-all">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-outfit text-slate-800">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TV Feature Block */}
      <section className="bg-white py-24 border-y border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-[100px] -z-10" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 lg:pr-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 font-semibold text-sm mb-6 border border-sky-100 shadow-sm">
                As Seen on TV
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6 text-slate-900">Bringing Digital Magic to Television</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                From viral reels to national television screens, Damini has successfully bridged the gap between digital content and mainstream media, appearing in popular reality shows and talk panels.
              </p>
              <a href="https://youtube.com/@daminishukla" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all">
                <Video size={20} />
                <span>Watch TV Segments</span>
              </a>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl relative group">
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center z-10 group-hover:bg-slate-900/30 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-sky-600 shadow-xl cursor-pointer hover:scale-110 transition-transform">
                    <Video size={32} />
                  </div>
                </div>
                <Image src="/creator-bg.png" fill sizes="(max-width: 1024px) 100vw, 50vw" alt="TV Feature" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Platform Cards */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-3 text-slate-900">Connect & Explore</h2>
          <p className="text-slate-600 mt-2 text-base">Join the community across platforms</p>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-cyan-300 mx-auto rounded-full mt-5" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Instagram Card */}
          <a href="https://instagram.com/daminishukla" target="_blank" rel="noopener noreferrer" className="relative cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-[24px] blur-md opacity-20" />
            <div className="relative bg-white h-full rounded-[24px] p-8 flex flex-col items-center text-center border border-pink-100 shadow-xl shadow-pink-500/5">
              <div className="w-16 h-16 rounded-[18px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-pink-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <h3 className="text-2xl font-bold font-outfit mb-1 text-slate-900">Instagram</h3>
              <p className="text-pink-500 font-semibold mb-4">@daminishukla</p>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">Daily lifestyle updates, fashion inspiration, and behind-the-scenes magic.</p>
              <div className="mt-auto px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold shadow-md shadow-pink-500/20 w-full">
                Follow me
              </div>
            </div>
          </a>

          {/* YouTube Card */}
          <a href="https://youtube.com/@daminishukla" target="_blank" rel="noopener noreferrer" className="relative cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-[24px] blur-md opacity-20" />
            <div className="relative bg-white h-full rounded-[24px] p-8 flex flex-col items-center text-center border border-red-100 shadow-xl shadow-red-500/5">
              <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </div>
              <h3 className="text-2xl font-bold font-outfit mb-1 text-slate-900">YouTube</h3>
              <p className="text-red-500 font-semibold mb-4">Damini Shukla</p>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">In-depth vlogs, product reviews, and exclusive lifestyle content.</p>
              <div className="mt-auto px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-md shadow-red-500/20 w-full">
                Subscribe
              </div>
            </div>
          </a>
        </div>

        {/* Live Social Feed */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30">
              <Play size={20} fill="currentColor" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-outfit text-slate-900">Latest from YouTube</h3>
          </div>

          {isLoadingVideos ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white rounded-[24px] overflow-hidden border border-slate-100 h-72 shadow-sm" />
              ))}
            </div>
          ) : youtubeVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {youtubeVideos.map(video => (
                <a 
                  key={video.id} 
                  href={`https://www.youtube.com/watch?v=${video.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative aspect-video w-full overflow-hidden shrink-0 bg-slate-100">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      <Clock size={12} /> {video.duration}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="font-bold text-slate-900 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors leading-snug">{video.title}</h4>
                    <div className="mt-auto flex items-center text-xs text-slate-500 font-semibold gap-2">
                      <span className="flex items-center gap-1"><Eye size={14} /> {video.views}</span>
                      <span className="text-slate-300">•</span>
                      <span>{new Date(video.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-500 font-medium">New videos coming soon.</p>
            </div>
          )}
        </div>

        {/* Live Instagram Feed */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-outfit text-slate-900">Latest from Instagram</h3>
          </div>

          {isLoadingInsta ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white rounded-[24px] overflow-hidden border border-slate-100 h-72 shadow-sm" />
              ))}
            </div>
          ) : instagramPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {instagramPosts.map(post => (
                <a 
                  key={post.id} 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(236,72,153,0.15)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative aspect-square w-full overflow-hidden shrink-0 bg-slate-100">
                    {post.mediaUrl ? (
                      <img src={post.mediaUrl} alt="Instagram post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    {post.mediaType === "VIDEO" && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white">
                        <Play size={14} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-slate-700 line-clamp-3 mb-3 leading-snug">{post.caption || "View post on Instagram"}</p>
                    <div className="mt-auto flex items-center text-xs text-slate-500 font-semibold gap-2">
                      <span className="flex items-center gap-1"><Eye size={14} /> View</span>
                      <span className="text-slate-300">•</span>
                      <span>{new Date(post.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-500 font-medium">New posts coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="max-w-4xl mx-auto px-4 py-24">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-400 to-cyan-400" />
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4 text-slate-900">Work With Me</h2>
            <p className="text-slate-500 font-medium">Fill out the form below for brand promotions, events, or collaborations.</p>
          </div>

          {submitStatus === "success" ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center shadow-sm">
              <h3 className="text-2xl font-bold mb-3 font-outfit">Message Sent Successfully!</h3>
              <p className="text-green-700">Thank you for reaching out. My team will get back to you shortly.</p>
              <button 
                onClick={() => setSubmitStatus("idle")}
                className="mt-8 px-8 py-3 bg-white border border-green-200 text-green-700 font-semibold hover:bg-green-50 rounded-full transition-colors shadow-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all placeholder:text-slate-400 font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Email Address *</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all placeholder:text-slate-400 font-medium"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all placeholder:text-slate-400 font-medium"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Enquiry Type *</label>
                  <select 
                    required
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({...formData, enquiryType: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="Brand Promotion - Creator">Brand Promotion</option>
                    <option value="Sponsored Reels - Creator">Sponsored Reels</option>
                    <option value="YouTube Integration - Creator">YouTube Integration</option>
                    <option value="Event / Show or TV - Creator">Event / Show or TV</option>
                    <option value="Product Gifting - Creator">Product Gifting</option>
                    <option value="Other - Creator">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Message *</label>
                <textarea 
                  required 
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all resize-none placeholder:text-slate-400 font-medium"
                  placeholder="Tell us about your project or brand..."
                ></textarea>
              </div>

              {submitStatus === "error" && (
                <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-3 rounded-lg">
                  Something went wrong. Please try again later.
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold text-lg shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_25px_rgba(14,165,233,0.4)] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Sending Message..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
});

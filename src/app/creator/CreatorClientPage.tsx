"use client";

import { motion } from "framer-motion";
import { Mail, Award, Users, Tv, Star, TrendingUp, Sparkles, Video, Play, Clock, Eye, Home, Heart, User, Phone, Briefcase, MessageSquare, Send, CheckCircle2 } from "lucide-react";
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

const PILLARS_DETAILS = [
  { key: 'fashion', label: 'Fashion & Style', icon: '👗', bg: 'from-pink-500/10 to-orange-500/10 border-pink-500/20 text-pink-700', desc: 'Relatable lookbooks, clothing hauls, styling tips, and everyday fashion inspiration that balances elegance with practicality.', statement: '"Fashion is about comfort and representing your true self to the world."' },
  { key: 'lifestyle', label: 'Travel & Lifestyle', icon: '✈️', bg: 'from-sky-500/10 to-cyan-500/10 border-sky-500/20 text-sky-700', desc: 'Aesthetic travel diaries, daily lifestyle vlogs, home styling, and food recommendations that bring you along on the journey.', statement: '"Living life mindfully, exploring new cultures, and sharing every beautiful moment."' },
  { key: 'storytelling', label: 'Authentic Storytelling', icon: '📖', bg: 'from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-700', desc: 'Direct chat sessions, personal growth journeys, self-care routines, and motivational conversations that inspire a positive mindset.', statement: '"Our stories are our power. Sharing them authentically unites us and builds a community."' },
  { key: 'beauty', label: 'Beauty & Glam', icon: '💄', bg: 'from-rose-500/10 to-pink-500/10 border-rose-500/20 text-rose-700', desc: 'Honest beauty product reviews, skincare routines, easy makeup guides, and glowing look transformations.', statement: '"Skincare is self-love. Beauty shines brightest when you feel beautiful from within."' }
];

const PARTICLE_GLYPHS = ['✨', '📸', '✨', '🎥', '🌟'];

// Precompute calculations for static SVGs once on module load to prevent hydration mismatches and performance cost on render
const APERTURE_RAYS = Array.from({ length: 8 }).map((_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  return {
    x1: (50 + 10 * Math.cos(angle)).toFixed(4),
    y1: (50 + 10 * Math.sin(angle)).toFixed(4),
    x2: (50 + 45 * Math.cos(angle + 0.2)).toFixed(4),
    y2: (50 + 45 * Math.sin(angle + 0.2)).toFixed(4)
  };
});

const CreatorBackgroundPattern = memo(function CreatorBackgroundPattern() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-[650px] h-[650px] text-[#FF4D2E]" fill="none" stroke="currentColor" strokeWidth="0.15">
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="22" strokeDasharray="1, 1" />
        <circle cx="50" cy="50" r="10" />
        {APERTURE_RAYS.map((ray, i) => (
          <line key={i} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} />
        ))}
      </svg>
    </div>
  );
});

const SectionDivider = () => (
  <div className="flex items-center justify-center gap-4 py-8 pointer-events-none opacity-20">
    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#FF4D2E]" />
    <span className="text-[#FF9A2E] text-xs">✦</span>
    <span className="text-[#FF9A2E] text-sm">✦</span>
    <span className="text-[#FF9A2E] text-xs">✦</span>
    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#FF4D2E]" />
  </div>
);

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  content: string;
}

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

  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  useEffect(() => {
    setMounted(true);

    // Generate floating particles on client mount to resolve hydration mismatches and prevent lag
    const generated = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 85}%`,
      delay: `${i * 1.5}s`,
      duration: `${12 + Math.random() * 8}s`,
      content: PARTICLE_GLYPHS[Math.floor(Math.random() * PARTICLE_GLYPHS.length)]
    }));
    setParticles(generated);

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

  const MOCK_YOUTUBE = [
    { id: "mockyt1", title: "My Relatable Skincare Routine & Lifestyle Chat", thumbnail: "/creator-bg.png", duration: "12:45", views: "145K views", publishedAt: new Date().toISOString() },
    { id: "mockyt2", title: "Fashion Lookbook: Aesthetic Outfits for Summers", thumbnail: "/creator-bg.png", duration: "8:20", views: "98K views", publishedAt: new Date().toISOString() },
    { id: "mockyt3", title: "Vlog: Day in My Life as a Creator in Mumbai", thumbnail: "/creator-bg.png", duration: "15:10", views: "210K views", publishedAt: new Date().toISOString() }
  ];

  const MOCK_INSTAGRAM = [
    { id: "mockig1", mediaUrl: "/creator-bg.png", mediaType: "VIDEO", caption: "Unlocking style & beauty secrets. Follow along for daily styling inspirations! ✨👗", views: "85K", timestamp: new Date().toISOString(), permalink: "https://instagram.com" },
    { id: "mockig2", mediaUrl: "/creator-bg.png", mediaType: "IMAGE", caption: "Authentic storytelling & lifestyle vlogging. Growing together as a family! 💖🌿", views: "64K", timestamp: new Date().toISOString(), permalink: "https://instagram.com" },
    { id: "mockig3", mediaUrl: "/creator-bg.png", mediaType: "VIDEO", caption: "Behind the scenes talk: How I navigate branding events. 🎥💫", views: "110K", timestamp: new Date().toISOString(), permalink: "https://instagram.com" }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0A0503] text-stone-200 font-inter selection:bg-[#FF4D2E]/20 selection:text-[#FF9A2E]">

      {/* GPU-Accelerated Smooth CSS Animations for Floating Particles */}
      <style jsx global>{`
        @keyframes float-up {
          0% { transform: translateY(105vh) scale(0.8) rotate(0deg); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-15vh) scale(1.1) rotate(360deg); opacity: 0; }
        }
        .animate-float-particle {
          animation: float-up var(--float-duration) linear infinite;
          animation-delay: var(--float-delay);
          left: var(--float-left);
          will-change: transform, opacity;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Warm Ambient Glow Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,77,46,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(255,154,46,0.06),transparent_50%)]" />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-stone-300 font-semibold text-sm shadow-lg hover:shadow-xl hover:border-orange-500/50 hover:text-[#FF9A2E] transition-all"
        >
          <Home size={16} />
          Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] pt-32 pb-24 w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-[#0A0503]/85 to-black/50" />
        
        {/* Decorative Floating Particles (Client-only) */}
        {mounted && particles.length > 0 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  "--float-left": p.left,
                  "--float-delay": p.delay,
                  "--float-duration": p.duration,
                } as React.CSSProperties}
                className="absolute text-orange-450/35 text-3xl opacity-0 drop-shadow-[0_0_10px_rgba(255,154,46,0.4)] animate-float-particle"
              >
                {p.content}
              </div>
            ))}
          </div>
        )}

        {/* Hero Content Container */}
        <div className="relative z-10 w-full px-4 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center px-4"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-outfit mb-4 text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] tracking-tight"
            >
              Damini Shukla
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#FF9A2E] text-lg sm:text-xl md:text-2xl font-semibold mb-6 tracking-[0.15em] uppercase flex items-center gap-2 drop-shadow-[0_2px_10px_rgba(255,154,46,0.2)] font-outfit"
            >
              <span className="text-[#FF4D2E] font-bold">✨</span>
              Content Creator · Digital Influencer
              <span className="text-[#FF4D2E] font-bold">✨</span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stone-300 text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium drop-shadow-md"
            >
              Inspiring millions through relatable lifestyle content, fashion inspiration, and authentic storytelling.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center w-full px-4 max-w-md sm:max-w-none"
            >
              <a 
                href="https://instagram.com/daminishukla" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-base sm:text-lg shadow-[0_0_20px_rgba(255,77,46,0.05)] hover:bg-white/10 hover:border-[#FF4D2E]/50 hover:shadow-[0_0_30px_rgba(255,77,46,0.2)] hover:-translate-y-1 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF4D2E]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span>Instagram</span>
              </a>
              <a 
                href="https://youtube.com/@daminishukla" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-base sm:text-lg shadow-[0_0_20px_rgba(255,77,46,0.05)] hover:bg-white/10 hover:border-[#FF4D2E]/50 hover:shadow-[0_0_30px_rgba(255,77,46,0.2)] hover:-translate-y-1 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF9A2E]"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                <span>YouTube</span>
              </a>
              <button 
                onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] text-white font-semibold text-base sm:text-lg shadow-[0_4px_25px_rgba(255,77,46,0.3)] hover:shadow-[0_6px_35px_rgba(255,77,46,0.5)] hover:-translate-y-1 transition-all active:scale-95 cursor-pointer"
              >
                <Mail size={20} />
                <span>Brand Enquiry</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 bg-[#140C0A]/85 border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <div className="text-center p-3 hover:bg-white/[0.02] rounded-2xl transition-colors duration-300">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] drop-shadow-[0_2px_15px_rgba(255,77,46,0.2)]">2M+</h3>
            <p className="text-stone-400 mt-2 font-medium text-xs sm:text-sm md:text-base tracking-wider uppercase">Combined Followers</p>
          </div>
          <div className="text-center p-3 hover:bg-white/[0.02] rounded-2xl transition-colors duration-300 border-l border-white/5">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] drop-shadow-[0_2px_15px_rgba(255,77,46,0.2)]">150+</h3>
            <p className="text-stone-400 mt-2 font-medium text-xs sm:text-sm md:text-base tracking-wider uppercase">Brand Collaborations</p>
          </div>
          <div className="text-center p-3 hover:bg-white/[0.02] rounded-2xl transition-colors duration-300 border-l border-white/5 col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] drop-shadow-[0_2px_15px_rgba(255,77,46,0.2)]">12+</h3>
            <p className="text-stone-400 mt-2 font-medium text-xs sm:text-sm md:text-base tracking-wider uppercase">TV Appearances</p>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="max-w-6xl mx-auto px-4 py-28 relative">
        <CreatorBackgroundPattern />
        
        <div className="text-center mb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 text-[#FF9A2E] text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,77,46,0.1)]"
          >
            Digital Milestones
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-4 text-white tracking-tight">Milestones & Impact</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {MILESTONES_AND_IMPACT.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#120B09]/45 p-8 rounded-3xl border border-white/5 hover:border-[#FF4D2E]/50 hover:shadow-[0_20px_40px_rgba(255,77,46,0.08)] hover:-translate-y-1.5 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.3)] group"
            >
              <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#FF9A2E] mb-6 group-hover:scale-110 group-hover:bg-[#FF4D2E]/20 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-outfit text-white group-hover:text-[#FF9A2E] transition-colors duration-300">{item.title}</h3>
              <p className="text-stone-400 leading-relaxed text-sm group-hover:text-stone-300 transition-colors duration-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Interactive Style & Lifestyle Pillars */}
      <section className="relative py-28 bg-[#0B0604] overflow-hidden border-y border-white/5">
        <CreatorBackgroundPattern />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 text-[#FF9A2E] text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,77,46,0.1)]"
            >
              <Sparkles size={12} className="animate-pulse text-[#FF9A2E]" />
              Content Pillars
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-4 text-white tracking-tight">Style & Lifestyle Pillars</h2>
            <p className="text-stone-400 max-w-lg mx-auto text-sm md:text-base">Tap on any pillar below to discover how Damini inspires and connects with her audience.</p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] mx-auto rounded-full mt-4" />
          </div>

          {/* Pillars Tab Swiper Selector */}
          <div className="flex sm:flex-wrap overflow-x-auto sm:overflow-visible snap-x scrollbar-none gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto px-4 sm:px-2 -mx-4 sm:mx-auto pb-4 sm:pb-0 justify-start sm:justify-center">
            {PILLARS_DETAILS.map((p, index) => (
              <motion.button
                key={p.key}
                onClick={() => setSelectedPillar(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer snap-center shrink-0 ${
                  selectedPillar === index
                    ? "bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] border-transparent text-white shadow-[0_4px_20px_rgba(255,77,46,0.35)] scale-105"
                    : "bg-white/[0.02] border-white/10 text-stone-300 hover:border-orange-500/40 hover:bg-orange-50/5"
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Detailed Content Pillar Card */}
          <motion.div 
            key={selectedPillar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#120B09]/50 rounded-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-8 md:p-10 max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF4D2E]/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start relative z-10">
              {/* Left Circle Badge (Desktop Only) */}
              <div className="hidden md:flex flex-col items-center justify-center text-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl w-48 shrink-0">
                <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center shadow-lg border border-white/10 text-3xl mb-3">
                  {PILLARS_DETAILS[selectedPillar].icon}
                </div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 font-outfit">Style Core</span>
                <span className="font-bold text-[#FF9A2E] text-base font-outfit">{PILLARS_DETAILS[selectedPillar].label}</span>
              </div>

              {/* Mobile Only Header */}
              <div className="flex md:hidden items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl w-full text-left">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white/[0.04] flex items-center justify-center shadow-md border border-white/10 text-xl">
                    {PILLARS_DETAILS[selectedPillar].icon}
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-wider font-outfit">Style Core</span>
                    <span className="font-bold text-[#FF9A2E] text-sm font-outfit">{PILLARS_DETAILS[selectedPillar].label}</span>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold font-outfit text-white mb-4 hidden md:block">
                  {PILLARS_DETAILS[selectedPillar].label}
                </h3>
                <p className="text-stone-300 leading-relaxed text-sm sm:text-base mb-6">
                  {PILLARS_DETAILS[selectedPillar].desc}
                </p>
                <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                  <p className="text-[#FF9A2E] leading-relaxed text-sm sm:text-base italic font-semibold drop-shadow-[0_2px_8px_rgba(255,154,46,0.1)]">
                    {PILLARS_DETAILS[selectedPillar].statement}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* TV Feature Block */}
      <section className="bg-[#0A0503] py-28 border-y border-white/5 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D2E]/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 lg:pr-10 text-center lg:text-left"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#FF4D2E]/10 text-[#FF9A2E] font-semibold text-sm mb-6 border border-[#FF4D2E]/20 shadow-sm uppercase tracking-widest font-outfit">
                As Seen on TV
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6 text-white tracking-tight leading-tight">Bringing Digital Magic to Television</h2>
              <p className="text-stone-300 text-base sm:text-lg mb-8 leading-relaxed">
                From viral reels to national television screens, Damini has successfully bridged the gap between digital content and mainstream media, appearing in popular reality shows and talk panels.
              </p>
              <a href="https://youtube.com/@daminishukla" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 hover:border-[#FF4D2E]/50 hover:shadow-[0_0_25px_rgba(255,77,46,0.2)] hover:-translate-y-1 active:scale-95 transition-all">
                <Video size={20} className="text-[#FF4D2E]" />
                <span>Watch TV Segments</span>
              </a>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full relative"
            >
              <div className="aspect-video w-full rounded-3xl overflow-hidden border-4 border-white/10 shadow-[0_25px_50px_rgba(255,77,46,0.15)] relative group bg-black/45">
                <div className="absolute inset-0 bg-[#0A0503]/40 flex items-center justify-center z-10 group-hover:bg-[#0A0503]/20 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] flex items-center justify-center text-white shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300">
                    <Video size={28} />
                  </div>
                </div>
                <Image src="/creator-bg.png" fill sizes="(max-width: 1024px) 100vw, 50vw" alt="TV Feature" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105 opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Platform Cards */}
      <section className="max-w-5xl mx-auto px-4 py-28">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-3 text-white tracking-tight">Connect & Explore</h2>
          <p className="text-stone-400 mt-2 text-sm sm:text-base">Join the community across platforms</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] mx-auto rounded-full mt-5" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {/* Instagram Card */}
          <motion.a 
            href="https://instagram.com/daminishukla" 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-[#120B09]/30 hover:border-[#FF4D2E]/40 hover:shadow-[0_15px_40px_rgba(255,77,46,0.1)] transition-all duration-300 min-h-[250px]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF4D2E]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF4D2E] to-[#E1306C] text-white flex items-center justify-center shadow-lg shadow-[#FF4D2E]/20 group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full group-hover:border-[#FF4D2E]/30 group-hover:text-[#FF9A2E] transition-all">@daminishukla</span>
            </div>
            
            <div className="space-y-3 mt-8 relative z-10">
              <h3 className="text-2xl font-bold font-outfit text-white group-hover:text-[#FF9A2E] transition-colors">Instagram</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Tune in for daily fashion edits, aesthetic lookbooks, and casual life updates.
              </p>
            </div>
          </motion.a>

          {/* YouTube Card */}
          <motion.a 
            href="https://youtube.com/@daminishukla" 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-[#120B09]/30 hover:border-[#FF9A2E]/40 hover:shadow-[0_15px_40px_rgba(255,154,46,0.1)] transition-all duration-300 min-h-[250px]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF9A2E]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF0000] to-[#FF4D2E] text-white flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </div>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full group-hover:border-[#FF9A2E]/30 group-hover:text-[#FF9A2E] transition-all">Damini Shukla</span>
            </div>
            
            <div className="space-y-3 mt-8 relative z-10">
              <h3 className="text-2xl font-bold font-outfit text-white group-hover:text-[#FF9A2E] transition-colors">YouTube</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Watch full vlogs, skincare secrets, deep chats, and travel lookbooks.
              </p>
            </div>
          </motion.a>
        </div>

        {/* Live Social Feed - YouTube */}
        <div className="mt-28">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF4D2E] to-[#FF9A2E] text-white flex items-center justify-center shadow-lg shadow-[#FF4D2E]/25">
              <Play size={18} fill="currentColor" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white">Latest from YouTube</h3>
          </div>

          {isLoadingVideos ? (
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x scrollbar-none pb-4 px-4 -mx-4 sm:px-0 sm:mx-0 justify-start">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white/[0.02] rounded-[24px] overflow-hidden border border-white/5 h-72 shadow-sm snap-center shrink-0 w-[280px] sm:w-auto" />
              ))}
            </div>
          ) : youtubeVideos.length > 0 ? (
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x scrollbar-none pb-4 px-4 -mx-4 sm:px-0 sm:mx-0 justify-start">
              {youtubeVideos.map(video => (
                <a 
                  key={video.id} 
                  href={`https://www.youtube.com/watch?v=${video.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-[#120B09]/40 rounded-[24px] overflow-hidden border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,77,46,0.15)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col snap-center shrink-0 w-[280px] sm:w-auto h-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden shrink-0 bg-stone-900">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                      <Clock size={12} /> {video.duration}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="font-bold text-white text-sm sm:text-base line-clamp-2 mb-3 group-hover:text-[#FF9A2E] transition-colors leading-snug">{video.title}</h4>
                    <div className="mt-auto flex items-center text-xs text-[#FF9A2E] font-semibold gap-2">
                      <span className="flex items-center gap-1"><Eye size={14} /> {video.views}</span>
                      <span className="text-stone-600">•</span>
                      <span className="text-stone-400">{new Date(video.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* Mock YouTube Feed on Empty API */
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x scrollbar-none pb-4 px-4 -mx-4 sm:px-0 sm:mx-0 justify-start">
              {MOCK_YOUTUBE.map((video, i) => (
                <motion.a 
                  key={video.id} 
                  href="https://youtube.com/@daminishukla" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group relative bg-[#120B09]/40 rounded-[24px] overflow-hidden border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,77,46,0.15)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col snap-center shrink-0 w-[280px] sm:w-auto h-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden shrink-0 bg-gradient-to-tr from-[#1A0C08] via-[#0E0604] to-black flex flex-col items-center justify-center text-center p-4 text-white">
                    <div className="absolute inset-0 bg-black/30 group-hover:opacity-10 transition-opacity" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,46,0.15),transparent)]" />
                    <div className="relative z-10 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
                      <Play size={18} className="text-[#FF9A2E]" fill="currentColor" />
                    </div>
                    <span className="relative z-10 text-[10px] font-bold text-[#FF9A2E] uppercase tracking-widest mb-1 font-outfit">YouTube Vlog</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="font-bold text-white text-sm sm:text-base line-clamp-2 mb-3 group-hover:text-[#FF9A2E] transition-colors leading-snug">
                      {video.title}
                    </h4>
                    <div className="mt-auto flex items-center text-xs text-[#FF9A2E] font-semibold gap-2">
                      <span className="flex items-center gap-1">
                        <Eye size={14} /> {video.views}
                      </span>
                      <span className="text-stone-600">•</span>
                      <span className="text-stone-400">Lifestyle</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* Live Social Feed - Instagram */}
        {mounted && (
        <div className="mt-28">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E1306C] to-[#FF4D2E] text-white flex items-center justify-center shadow-lg shadow-pink-500/25">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white">Latest from Instagram</h3>
          </div>

          {isLoadingInsta ? (
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x scrollbar-none pb-4 px-4 -mx-4 sm:px-0 sm:mx-0 justify-start">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white/[0.02] rounded-[24px] overflow-hidden border border-white/5 h-80 shadow-sm snap-center shrink-0 w-[280px] sm:w-auto" />
              ))}
            </div>
          ) : instagramPosts.length > 0 ? (
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x scrollbar-none pb-4 px-4 -mx-4 sm:px-0 sm:mx-0 justify-start">
              {instagramPosts.map(post => (
                <a 
                  key={post.id} 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-[#120B09]/40 rounded-[24px] overflow-hidden border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(225,48,108,0.15)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col snap-center shrink-0 w-[280px] sm:w-auto h-full"
                >
                  <div className="relative aspect-square w-full overflow-hidden shrink-0 bg-stone-900">
                    <img src={post.mediaUrl} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                    {post.mediaType === "VIDEO" && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white p-2 rounded-xl flex items-center justify-center shadow-md">
                        <Video size={14} />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-stone-200 line-clamp-2 mb-3 leading-relaxed font-medium">{post.caption}</p>
                    <div className="mt-auto flex items-center text-xs text-[#FF4D2E] font-semibold gap-2">
                      <span>{new Date(post.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* Mock Instagram Feed on Empty API */
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x scrollbar-none pb-4 px-4 -mx-4 sm:px-0 sm:mx-0 justify-start">
              {MOCK_INSTAGRAM.map((post, i) => (
                <motion.a 
                  key={post.id} 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group relative bg-[#120B09]/40 rounded-[24px] overflow-hidden border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(225,48,108,0.15)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col snap-center shrink-0 w-[280px] sm:w-auto h-full"
                >
                  <div className="relative aspect-square w-full overflow-hidden shrink-0 bg-gradient-to-tr from-[#1F0712] via-[#0E0308] to-black flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="absolute inset-0 bg-black/35 group-hover:opacity-10 transition-opacity" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,48,108,0.15),transparent)]" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                        <Heart size={18} className="text-[#FF4D2E]" fill="currentColor" />
                      </div>
                      <Sparkles className="w-5 h-5 text-[#FF9A2E] mb-2 animate-pulse" />
                      <p className="font-outfit font-semibold text-sm leading-snug px-4">
                        Fashion & Lookbooks
                      </p>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-stone-300 line-clamp-2 mb-3 leading-snug font-medium">
                      {post.caption}
                    </p>
                    <div className="mt-auto flex items-center text-xs text-[#FF4D2E] font-semibold gap-2">
                      <span className="flex items-center gap-1 text-[#FF4D2E]">
                        <Heart size={14} /> {post.views} Likes
                      </span>
                      <span className="text-stone-600">•</span>
                      <span className="text-stone-400">Trending</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
        )}
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <div className="bg-gradient-to-br from-[#120B09] to-[#080403]/90 rounded-[32px] border border-white/10 shadow-[0_25px_60px_-15px_rgba(255,77,46,0.15)] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Form Content */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between relative z-10 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E]" />
            
            <div>
              <div className="mb-10 text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 text-[#FF9A2E] text-xs font-bold uppercase tracking-wider mb-4"
                >
                  <Sparkles size={12} className="text-[#FF9A2E] animate-pulse" />
                  Collaborations
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-3 text-white tracking-tight">Work With Me</h2>
                <p className="text-stone-400 text-sm sm:text-base font-medium leading-relaxed">
                  Fill out the form below for brand promotions, events, or collaborations. Let's connect!
                </p>
              </div>

              {submitStatus === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-200 p-8 rounded-2xl text-center shadow-sm flex flex-col items-center justify-center space-y-4 my-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400">
                    <CheckCircle2 size={32} className="animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold font-outfit text-green-400">Message Sent Successfully!</h3>
                  <p className="text-green-500/80 max-w-sm text-sm font-medium">
                    Thank you for reaching out. Damini and her team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-6 px-8 py-3 bg-white/5 border border-green-500/30 text-green-300 font-semibold hover:bg-green-500/10 hover:shadow-sm active:scale-95 rounded-full transition-all cursor-pointer text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-stone-300 ml-1 flex items-center gap-1.5">
                        <User size={14} className="text-[#FF9A2E]" />
                        Full Name *
                      </label>
                      <input 
                        required 
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0C0706] border border-white/10 focus:border-[#FF4D2E]/50 focus:ring-4 focus:ring-[#FF4D2E]/10 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all placeholder:text-stone-600 font-medium text-sm sm:text-base"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-stone-300 ml-1 flex items-center gap-1.5">
                        <Mail size={14} className="text-[#FF9A2E]" />
                        Email Address *
                      </label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0C0706] border border-white/10 focus:border-[#FF4D2E]/50 focus:ring-4 focus:ring-[#FF4D2E]/10 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all placeholder:text-stone-600 font-medium text-sm sm:text-base"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-stone-300 ml-1 flex items-center gap-1.5">
                        <Phone size={14} className="text-[#FF9A2E]" />
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0C0706] border border-white/10 focus:border-[#FF4D2E]/50 focus:ring-4 focus:ring-[#FF4D2E]/10 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all placeholder:text-stone-600 font-medium text-sm sm:text-base"
                        placeholder="+91 99999-99999"
                      />
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-sm font-semibold text-stone-300 ml-1 flex items-center gap-1.5">
                        <Briefcase size={14} className="text-[#FF9A2E]" />
                        Enquiry Type *
                      </label>
                      <div className="relative">
                        <select 
                          required
                          value={formData.enquiryType}
                          onChange={(e) => setFormData({...formData, enquiryType: e.target.value})}
                          className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0C0706] border border-white/10 focus:border-[#FF4D2E]/50 focus:ring-4 focus:ring-[#FF4D2E]/10 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer text-sm sm:text-base pr-10"
                        >
                          <option value="Brand Promotion - Creator">Brand Promotion</option>
                          <option value="Sponsored Reels - Creator">Sponsored Reels</option>
                          <option value="YouTube Integration - Creator">YouTube Integration</option>
                          <option value="Event / Show or TV - Creator">Event / Show or TV</option>
                          <option value="Product Gifting - Creator">Product Gifting</option>
                          <option value="Other - Creator">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 text-xs">▼</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-300 ml-1 flex items-center gap-1.5">
                      <MessageSquare size={14} className="text-[#FF9A2E]" />
                      Message *
                    </label>
                    <textarea 
                      required 
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0C0706] border border-white/10 focus:border-[#FF4D2E]/50 focus:ring-4 focus:ring-[#FF4D2E]/10 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all resize-none placeholder:text-stone-600 font-medium text-sm sm:text-base"
                      placeholder="Tell us about your project or brand..."
                    ></textarea>
                  </div>

                  {submitStatus === "error" && (
                    <div className="text-red-400 text-sm font-medium text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      Something went wrong. Please try again later.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] text-white font-bold text-lg shadow-[0_4px_15px_rgba(255,77,46,0.3)] hover:shadow-[0_6px_25px_rgba(255,77,46,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_4px_15px_rgba(255,77,46,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Creative Image Block */}
          <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-full overflow-hidden flex flex-col justify-end p-6 sm:p-8 text-white group/banner">
            <div className="absolute inset-0 z-0">
              <Image 
                src={bannerUrl} 
                alt="Work With Me" 
                fill 
                className="object-cover transition-transform duration-1000 ease-out group-hover/banner:scale-105 opacity-80"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-[#0A0503]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#FF4D2E]/5 backdrop-blur-[1px] mix-blend-multiply z-10" />
            </div>

            <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#FF9A2E] animate-pulse" />
                Open for Projects
              </span>
              <span className="px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-[#FF9A2E] text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                ✦ Creator
              </span>
            </div>

            <div className="relative z-20 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-white leading-tight drop-shadow-md">
                Let's craft <br />
                <span className="bg-gradient-to-r from-[#FF4D2E] via-[#FF8040] to-[#FF9A2E] bg-clip-text text-transparent font-extrabold">something magic</span> together.
              </h3>
              
              <p className="text-stone-300 text-sm font-medium leading-relaxed drop-shadow-sm">
                Combining authentic storytelling with brand aesthetics to create campaigns that truly resonate.
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-stone-200">
                  <span className="p-1 rounded-md bg-white/5 border border-white/10 text-[#FF4D2E]"><Users size={14} /></span>
                  <span>2M+ Engaged Community</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-stone-200">
                  <span className="p-1 rounded-md bg-white/5 border border-white/10 text-[#FF9A2E]"><Star size={14} /></span>
                  <span>Premium Brand Experience</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-stone-200">
                  <span className="p-1 rounded-md bg-white/5 border border-white/10 text-orange-400"><TrendingUp size={14} /></span>
                  <span>Proven Viral Track Record</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#060302] text-stone-500 text-xs py-10 px-6 sm:px-12 border-t border-white/5 font-sans tracking-wider select-none overflow-hidden group/footer">
        
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left relative z-10">
          <div className="font-medium">
            © 2025 <span className="font-bold bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] bg-clip-text text-transparent font-outfit tracking-wide hover:opacity-80 transition-opacity cursor-pointer">Damini Shukla</span>
          </div>
          
          <div className="flex items-center gap-2 font-semibold text-[#FF9A2E] lowercase group/text cursor-pointer">
            <span>content creator</span>
            <span className="text-[#FF4D2E] animate-pulse font-bold text-sm inline-block hover:scale-135 hover:rotate-180 transition-all duration-500">✦</span>
            <span>influencer</span>
          </div>
          
          <div className="lowercase">
            <Link 
              href="/" 
              className="relative inline-flex items-center gap-1 hover:text-[#FF4D2E] transition-colors text-stone-400 font-semibold group/link pb-0.5"
            >
              <span>daminishukla.com</span>
              <span className="text-[10px] text-[#FF4D2E] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300">↗</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#FF4D2E] to-[#FF9A2E] transition-all duration-300 group-hover/link:w-full" />
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
});

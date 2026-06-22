"use client";

import { motion } from "framer-motion";
import { Moon, Star, Sun, Compass, BookOpen, Heart, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import React, { useState, useEffect, useCallback, memo } from "react";

const ZODIAC_SIGNS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

const CAREER_STATS = [
  { metric: "1000+", label: "Readings" },
  { metric: "5+ Yrs", label: "Experience" },
  { metric: "500+", label: "Students" },
  { metric: "Top", label: "Platforms" }
];

const ASTRO_HELP_ITEMS = [
  { icon: <Briefcase size={28} />, title: "Career Clarity", desc: "Discover your professional calling and the best timing for career transitions." },
  { icon: <Heart size={28} />, title: "Relationship Guidance", desc: "Understand your compatibility and navigate relationship dynamics." },
  { icon: <Compass size={28} />, title: "Life Purpose", desc: "Uncover your karmic path and align with your soul's true journey." },
  { icon: <Sun size={28} />, title: "Business Timing", desc: "Launch projects and make investments when the stars favor success." }
];

const PREMIUM_SERVICES = [
  { title: "Birth Chart Reading", price: "Personalized", icon: <Moon size={24} />, desc: "A comprehensive deep dive into your Kundali covering all major aspects of life." },
  { title: "Predictive Astrology", price: "Future Insight", icon: <Star size={24} />, desc: "Detailed forecasting using Dasha systems and transits to prepare you for what's ahead." },
  { title: "Kundali Milan", price: "Compatibility", icon: <Heart size={24} />, desc: "In-depth matching for marriage and partnerships based on ancient Ashta Koota principles." },
  { title: "Astro Courses", price: "Learn Astrology", icon: <BookOpen size={24} />, desc: "Join 500+ students in mastering the science of Jyotish from basics to advanced." }
];

const TRUSTED_CREDENTIALS = [
  "Astrotalk (Verified)", 
  "Corporate Workshops", 
  "Certified Educator", 
  "Media & TV", 
  "1000+ Consultations"
];

export const AstroClientPage = memo(function AstroClientPage({ bannerUrl }: { bannerUrl: string }) {
  const dsAstrologyUrl = "https://dsastrology.com";
  const [mounted, setMounted] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState<any[]>([]);
  const [isLoadingInsta, setIsLoadingInsta] = useState(true);

  useEffect(() => {
    setMounted(true);

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
    fetchInsta();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-800 font-inter selection:bg-indigo-200 selection:text-indigo-900 pb-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] py-24 w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-white/80 to-white/40 backdrop-blur-[2px]" />
        
        {/* Floating Zodiac Glyphs */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: "100vh", x: Math.random() * 100 + "vw" }}
                animate={{ 
                  opacity: [0, 0.4, 0], 
                  y: "-20vh",
                  rotate: 360
                }}
                transition={{ 
                  duration: 15 + Math.random() * 10, 
                  repeat: Infinity, 
                  delay: i * 2,
                  ease: "linear"
                }}
                className="absolute text-indigo-400 text-4xl opacity-30 drop-shadow-md"
              >
                {ZODIAC_SIGNS[Math.floor(Math.random() * 12)]}
              </motion.div>
            ))}
          </div>
        )}

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
            className="text-indigo-600 text-xl md:text-2xl font-semibold mb-6 tracking-wide uppercase"
          >
            Vedic Astrologer & Spiritual Guide
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            Unlock the cosmic blueprint of your life. Navigate challenges and embrace your true potential with authentic Vedic wisdom.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full px-4"
          >
            <a 
              href={dsAstrologyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold text-lg shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-all"
            >
              Book a Consultation
              <ArrowRight size={20} />
            </a>
            <a 
              href={dsAstrologyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-lg hover:bg-slate-50 hover:shadow-md transition-all"
            >
              Request Reading
            </a>
          </motion.div>
        </div>
      </section>

      {/* Career Milestone Dials / Stats */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 bg-white/90 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-xl backdrop-blur-xl">
          {CAREER_STATS.map((stat, i) => (
            <a key={i} href={dsAstrologyUrl} target="_blank" rel="noopener noreferrer" className="block text-center p-2 sm:p-4 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 group-hover:scale-110 transition-transform">{stat.metric}</h3>
              <p className="text-slate-500 mt-2 font-medium text-sm md:text-base">{stat.label}</p>
            </a>
          ))}
        </div>
      </section>

      {/* How Astrology Helps You */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-4 text-slate-900">How Astrology Helps You</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ASTRO_HELP_ITEMS.map((item, i) => (
            <a 
              key={i}
              href={dsAstrologyUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl shadow-sm transition-all group block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors" />
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform border border-indigo-100">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-outfit text-slate-800">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-white py-24 border-y border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute -left-48 top-48 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -z-10" />
        <div className="absolute -right-48 bottom-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-4 text-slate-900">Premium Services</h2>
            <p className="text-indigo-600 font-medium text-lg">Authentic Vedic interpretations tailored to you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PREMIUM_SERVICES.map((service, i) => (
              <a 
                key={i}
                href={dsAstrologyUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start p-6 md:p-8 bg-slate-50/50 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:bg-white transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-indigo-500 mr-6 shrink-0 group-hover:text-blue-600 group-hover:shadow-md transition-all border border-slate-100">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-outfit text-slate-800 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">{service.price}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                  <span className="text-indigo-600 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                    View details <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Strip */}
      <section className="py-20 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-sm font-semibold tracking-widest text-slate-400 uppercase mb-8">Trusted & Verified By</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {TRUSTED_CREDENTIALS.map((cred, i) => (
              <a 
                key={i} 
                href={dsAstrologyUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md text-slate-600 hover:text-indigo-600 transition-all text-sm md:text-base font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Star size={18} className="text-amber-400" />
                {cred}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Live Instagram Feed */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit text-slate-900">Latest Astro Reels</h2>
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
                className="group relative bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-slate-700 line-clamp-3 mb-3 leading-snug">{post.caption || "View post on Instagram"}</p>
                  <div className="mt-auto flex items-center text-xs text-slate-500 font-semibold gap-2">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      View
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>{new Date(post.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-[24px] border border-slate-100 shadow-sm">
            <p className="text-slate-500 font-medium">New reels coming soon.</p>
          </div>
        )}
      </section>

      {/* Final CTA Block */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-outfit text-slate-900 mb-6">Ready to decode your destiny?</h2>
        <p className="text-slate-600 mb-10 max-w-2xl mx-auto text-lg">Take the first step towards cosmic alignment and profound self-discovery.</p>
        <a 
          href={dsAstrologyUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-xl shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-all"
        >
          Visit DSAstrology.com
          <ArrowRight size={24} />
        </a>
      </section>

    </div>
  );
});

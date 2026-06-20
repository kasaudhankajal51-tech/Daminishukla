"use client";

import { motion } from "framer-motion";
import { Mail, Award, Users, Tv, Star, TrendingUp, Sparkles, Video, ArrowUpRight } from "lucide-react";
import React, { useState, useCallback, memo } from "react";
import Image from "next/image";

const MILESTONES_AND_IMPACT = [
  { icon: <Tv size={24} />, title: "TV Show Feature", desc: "Featured in prime time reality shows and talk shows across national television." },
  { icon: <Star size={24} />, title: "Brand Partnerships", desc: "Collaborated with Fortune 500 beauty, lifestyle, and tech brands." },
  { icon: <TrendingUp size={24} />, title: "Viral Reels", desc: "Consistently hitting millions of views with relatable and trending content." },
  { icon: <Users size={24} />, title: "Community Builder", desc: "Fostered a highly engaged community of 2M+ loyal supporters." },
  { icon: <Award size={24} />, title: "Industry Recognition", desc: "Awarded 'Creator of the Year' at leading digital influencer awards." },
  { icon: <Sparkles size={24} />, title: "Events & Appearances", desc: "Keynote speaker and special guest at major lifestyle and tech events." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export const CreatorClientPage = memo(function CreatorClientPage({ bannerUrl }: { bannerUrl: string }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "Brand Promotion",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
        setFormData({ fullName: "", email: "", phone: "", enquiryType: "Brand Promotion", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  }, [formData]);

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 font-inter selection:bg-sky-200 selection:text-sky-900 pb-20 relative overflow-hidden">
      
      {/* Background Animated Subtle Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-200/50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-[150px] pointer-events-none translate-x-1/3" 
      />

      {/* Main Container - Bento Layout */}
      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 pb-12 relative z-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-5 md:gap-6"
        >
          
          {/* Hero Bento Box */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="lg:col-span-8 md:col-span-4 col-span-1 rounded-[2.5rem] overflow-hidden relative group min-h-[400px] md:min-h-[450px] border border-white shadow-[0_10px_40px_rgb(0,0,0,0.06)] bg-white"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url('${bannerUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent backdrop-blur-[2px]" />
            
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-14">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-600 text-sm font-bold w-fit mb-6 shadow-sm border border-sky-100/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-0 hover:opacity-10 transition-opacity" />
                <Sparkles size={16} className="text-cyan-500" /> Digital Creator & Influencer
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black font-outfit text-slate-900 mb-6 tracking-tight drop-shadow-sm leading-none">
                Damini<br/>Shukla
              </h1>
              <p className="text-slate-600 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                Inspiring millions through relatable lifestyle content, fashion inspiration, and authentic storytelling.
              </p>
            </div>
          </motion.div>

          {/* Contact / CTA Bento Box */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="lg:col-span-4 md:col-span-2 col-span-1 bg-gradient-to-br from-sky-500 via-sky-400 to-cyan-400 border border-sky-300 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between group shadow-[0_10px_40px_rgba(14,165,233,0.3)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.4)] relative overflow-hidden"
          >
            <motion.div 
              animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" 
            />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-[1.25rem] bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-8 border border-white/40 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Mail size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit text-white mb-3 leading-tight">Let's Create<br/>Together</h2>
              <p className="text-sky-50 text-lg opacity-90">Open for brand collaborations and meaningful partnerships.</p>
            </div>
            
            <button 
              onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-10 w-full relative z-10 flex items-center justify-between px-8 py-5 rounded-[1.25rem] bg-white text-sky-600 font-bold hover:shadow-xl hover:bg-sky-50 transition-all group/btn cursor-pointer"
            >
              <span className="text-lg">Work With Me</span>
              <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center group-hover/btn:bg-sky-100 transition-colors">
                <ArrowUpRight className="group-hover/btn:rotate-45 group-hover/btn:scale-110 transition-transform text-sky-600" />
              </div>
            </button>
          </motion.div>

          {/* Stats Bento Boxes */}
          {[
            { num: "2M+", text: "Combined Followers", color: "from-sky-500 to-cyan-500", hoverColor: "group-hover:border-sky-300", shadow: "hover:shadow-sky-500/20" },
            { num: "150+", text: "Brand Collaborations", color: "from-cyan-500 to-teal-400", hoverColor: "group-hover:border-cyan-300", shadow: "hover:shadow-cyan-500/20" },
            { num: "12+", text: "TV Appearances", color: "from-blue-500 to-sky-400", hoverColor: "group-hover:border-blue-300", shadow: "hover:shadow-blue-500/20" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={`lg:col-span-4 md:col-span-2 col-span-1 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group transition-all duration-300 ${stat.hoverColor} ${stat.shadow}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
              <motion.h3 
                className={`text-6xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-3 relative z-10 drop-shadow-sm`}
              >
                {stat.num}
              </motion.h3>
              <p className="text-slate-500 font-bold text-base relative z-10 uppercase tracking-wider">{stat.text}</p>
            </motion.div>
          ))}

          {/* TV Feature Bento */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="lg:col-span-6 md:col-span-4 col-span-1 bg-white border border-slate-100 shadow-[0_10px_40px_rgb(0,0,0,0.05)] rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-sky-300 hover:shadow-sky-500/10 transition-all duration-300"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-bl from-sky-100 via-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-bl-full pointer-events-none" />
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-[1.25rem] bg-sky-50 flex items-center justify-center text-sky-500 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm border border-sky-100">
                  <Tv size={32} />
                </div>
                <motion.span whileHover={{ scale: 1.05 }} className="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-widest shadow-lg cursor-pointer">
                  As seen on TV
                </motion.span>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 mb-5 leading-tight group-hover:text-sky-600 transition-colors">Bringing Digital Magic to Television</h3>
                <p className="text-slate-600 mb-8 leading-relaxed text-lg font-medium">
                  Bridging the gap between digital content and mainstream media, starring in popular reality shows and national talk panels.
                </p>
                <a href="https://youtube.com/@daminishukla" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sky-600 font-black text-lg hover:text-cyan-600 transition-colors group/link">
                  Watch Segments 
                  <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center group-hover/link:bg-cyan-50 group-hover/link:translate-x-1 transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social Links Bento */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-6 md:col-span-4 col-span-1 grid grid-cols-2 gap-5 md:gap-6"
          >
            {/* Instagram */}
            <motion.a 
              whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}
              href="https://instagram.com/daminishukla" target="_blank" rel="noopener noreferrer" 
              className="col-span-2 sm:col-span-1 bg-white border border-slate-100 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:border-pink-200 hover:shadow-[0_15px_40px_rgba(236,72,153,0.15)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <h3 className="font-black font-outfit text-slate-900 text-2xl relative z-10">Instagram</h3>
              <p className="text-slate-500 font-bold mt-1 relative z-10">@daminishukla</p>
            </motion.a>

            {/* YouTube */}
            <motion.a 
              whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}
              href="https://youtube.com/@daminishukla" target="_blank" rel="noopener noreferrer" 
              className="col-span-2 sm:col-span-1 bg-white border border-slate-100 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:border-red-200 hover:shadow-[0_15px_40px_rgba(239,68,68,0.15)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-20 h-20 rounded-[1.5rem] bg-red-600 flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </div>
              <h3 className="font-black font-outfit text-slate-900 text-2xl relative z-10">YouTube</h3>
              <p className="text-slate-500 font-bold mt-1 relative z-10">Damini Shukla</p>
            </motion.a>

            {/* Promo */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="col-span-2 rounded-[2.5rem] overflow-hidden relative min-h-[180px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] group bg-white border border-white"
            >
              <Image src="/creator-bg.png" fill sizes="(max-width: 1024px) 100vw, 50vw" alt="Lifestyle" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/50">
                  <Video size={28} className="ml-1" />
                </div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Milestones Grid Section */}
        <div className="mt-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black font-outfit text-slate-900 mb-10 flex items-center gap-4 px-2"
          >
            <Star className="text-yellow-400 fill-yellow-400" size={40} /> Milestones & Impact
          </motion.h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {MILESTONES_AND_IMPACT.map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] rounded-[2rem] p-8 md:p-10 hover:shadow-[0_15px_40px_rgba(14,165,233,0.1)] hover:border-sky-200 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 rounded-[1.25rem] bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky-400 group-hover:to-cyan-400 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-sky-500/30">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black font-outfit text-slate-900 mb-4 group-hover:text-sky-600 transition-colors relative z-10">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enquiry Form Section */}
        <motion.div 
          id="enquiry-form"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-white border border-slate-100 shadow-[0_20px_60px_rgb(0,0,0,0.05)] rounded-[3rem] p-8 md:p-16 mt-16 relative overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-cyan-100/30 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-14">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-400 to-cyan-400 flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-sky-500/20"
              >
                <Mail size={36} />
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-black font-outfit text-slate-900 mb-5">Start a Conversation</h2>
              <p className="text-slate-500 text-xl font-medium">Fill out the form below for brand promotions, events, or collaborations.</p>
            </div>

            {submitStatus === "success" ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-green-50 border border-green-200 text-green-800 p-12 rounded-[2.5rem] text-center shadow-lg"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Sparkles size={40} />
                </div>
                <h3 className="text-4xl font-black mb-4 font-outfit text-green-700">Message Sent!</h3>
                <p className="text-green-600 text-xl mb-10 font-medium">Thank you for reaching out. My team will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitStatus("idle")}
                  className="px-10 py-5 bg-white border-2 border-green-200 text-green-700 font-bold hover:bg-green-50 rounded-2xl transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 bg-white/50 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 ml-2 tracking-wide uppercase">Full Name *</label>
                    <input 
                      required type="text" value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:outline-none focus:border-sky-400 focus:bg-white transition-all placeholder:text-slate-400 font-bold shadow-inner"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 ml-2 tracking-wide uppercase">Email Address *</label>
                    <input 
                      required type="email" value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:outline-none focus:border-sky-400 focus:bg-white transition-all placeholder:text-slate-400 font-bold shadow-inner"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 ml-2 tracking-wide uppercase">Phone Number</label>
                    <input 
                      type="tel" value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:outline-none focus:border-sky-400 focus:bg-white transition-all placeholder:text-slate-400 font-bold shadow-inner"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 ml-2 tracking-wide uppercase">Enquiry Type *</label>
                    <select 
                      required value={formData.enquiryType}
                      onChange={(e) => setFormData({...formData, enquiryType: e.target.value})}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:outline-none focus:border-sky-400 focus:bg-white transition-all appearance-none cursor-pointer font-bold shadow-inner"
                    >
                      <option value="Brand Promotion">Brand Promotion</option>
                      <option value="Sponsored Reels">Sponsored Reels</option>
                      <option value="YouTube Integration">YouTube Integration</option>
                      <option value="Event / Show or TV">Event / Show or TV</option>
                      <option value="Product Gifting">Product Gifting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-700 ml-2 tracking-wide uppercase">Message *</label>
                  <textarea 
                    required rows={5} value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:outline-none focus:border-sky-400 focus:bg-white transition-all resize-none placeholder:text-slate-400 font-bold shadow-inner"
                    placeholder="Tell us about your project or brand..."
                  ></textarea>
                </div>

                {submitStatus === "error" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-600 text-sm font-bold text-center bg-red-50 border border-red-100 p-5 rounded-2xl">
                    Something went wrong. Please try again later.
                  </motion.div>
                )}

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 rounded-2xl bg-slate-900 text-white font-black text-xl hover:bg-slate-800 transition-all shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 group"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isSubmitting ? "Sending Message..." : "Submit Enquiry"}
                    {!isSubmitting && <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />}
                  </span>
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
});

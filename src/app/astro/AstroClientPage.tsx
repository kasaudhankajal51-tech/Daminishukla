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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "Birth Chart Reading - Astrology",
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
        setFormData({ fullName: "", email: "", phone: "", enquiryType: "Birth Chart Reading - Astrology", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  }, [formData]);

  useEffect(() => {
    setMounted(true);
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
            <button 
              onClick={() => document.getElementById("astro-enquiry-form")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-lg hover:bg-slate-50 hover:shadow-md transition-all"
            >
              Request Reading
            </button>
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

      {/* Enquiry Form */}
      <section id="astro-enquiry-form" className="max-w-4xl mx-auto px-4 py-24">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500" />
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4 text-slate-900">Request a Reading</h2>
            <p className="text-slate-500 font-medium">Fill out the form below to book a consultation or enquire about services.</p>
          </div>

          {submitStatus === "success" ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center shadow-sm">
              <h3 className="text-2xl font-bold mb-3 font-outfit">Request Sent Successfully!</h3>
              <p className="text-green-700">Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                onClick={() => setSubmitStatus("idle")}
                className="mt-8 px-8 py-3 bg-white border border-green-200 text-green-700 font-semibold hover:bg-green-50 rounded-full transition-colors shadow-sm"
              >
                Send Another Request
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all placeholder:text-slate-400 font-medium"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all placeholder:text-slate-400 font-medium"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all placeholder:text-slate-400 font-medium"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Service Type *</label>
                  <select 
                    required
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({...formData, enquiryType: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="Birth Chart Reading - Astrology">Birth Chart Reading</option>
                    <option value="Predictive Astrology - Astrology">Predictive Astrology</option>
                    <option value="Kundali Milan - Astrology">Kundali Milan</option>
                    <option value="Astro Courses - Astrology">Astro Courses</option>
                    <option value="Other - Astrology">Other</option>
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all resize-none placeholder:text-slate-400 font-medium"
                  placeholder="Tell us about your requirements or questions..."
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
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-lg shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Sending Request..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
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

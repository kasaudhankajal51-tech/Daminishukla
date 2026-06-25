"use client";

import { motion } from "framer-motion";
import { Moon, Star, Sun, Compass, BookOpen, Heart, Briefcase, GraduationCap, ArrowRight, Home, Flame, Wind, Droplets, Mountain, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, memo } from "react";

const ZODIAC_SIGNS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

// Precompute calculations for static SVGs once on module load to prevent hydration mismatches and performance cost on render
const SACRED_GEOMETRY_LINES = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  return {
    x2: (50 + 45 * Math.cos(angle)).toFixed(4),
    y2: (50 + 45 * Math.sin(angle)).toFixed(4)
  };
});

const SACRED_GEOMETRY_CIRCLES = Array.from({ length: 8 }).map((_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  return {
    cx: (50 + 28 * Math.cos(angle)).toFixed(4),
    cy: (50 + 28 * Math.sin(angle)).toFixed(4)
  };
});

const CELESTIAL_WHEEL_RAYS = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  return {
    x1: (100 + 20 * Math.cos(angle)).toFixed(4),
    y1: (100 + 20 * Math.sin(angle)).toFixed(4),
    x2: (100 + 90 * Math.cos(angle)).toFixed(4),
    y2: (100 + 90 * Math.sin(angle)).toFixed(4)
  };
});

const CELESTIAL_WHEEL_SIGNS = ZODIAC_SIGNS.map((sign, i) => {
  const angle = ((i * 30 + 15) * Math.PI) / 180;
  return {
    sign,
    x: (100 + 58 * Math.cos(angle)).toFixed(4),
    y: (100 + 58 * Math.sin(angle)).toFixed(4),
    rotation: i * 30 + 105
  };
});

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

const ZODIAC_DETAILS = [
  { sign: 'Aries', Sanskrit: 'Mesha', date: 'Mar 21 - Apr 19', glyph: '♈', element: 'Fire', color: 'text-amber-600 bg-amber-500/10 border-amber-500/20', guidance: 'A powerful period for starting new projects. Trust your instincts and lead with courage. The universe is aligning to support your initiatives.' },
  { sign: 'Taurus', Sanskrit: 'Vrishabha', date: 'Apr 20 - May 20', glyph: '♉', element: 'Earth', color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20', guidance: 'Focus on building stability and nurturing relationships. Patience will yield rich rewards. A steady approach brings long-term harmony.' },
  { sign: 'Gemini', Sanskrit: 'Mithuna', date: 'May 21 - Jun 20', glyph: '♊', element: 'Air', color: 'text-sky-600 bg-sky-500/10 border-sky-500/20', guidance: 'Express your ideas clearly. A great time for intellectual pursuits, writing, and communication. Stay curious and open to conversations.' },
  { sign: 'Cancer', Sanskrit: 'Karka', date: 'Jun 21 - Jul 22', glyph: '♋', element: 'Water', color: 'text-blue-600 bg-blue-500/10 border-blue-500/20', guidance: 'Listen to your intuition. Pay attention to your home environment and emotional well-being. A warm, nurturing space is your sanctuary.' },
  { sign: 'Leo', Sanskrit: 'Simha', date: 'Jul 23 - Aug 22', glyph: '♌', element: 'Fire', color: 'text-amber-600 bg-amber-500/10 border-amber-500/20', guidance: 'Your creative energy is peaking. Shine your light brightly and inspire those around you. Take center stage and share your talents.' },
  { sign: 'Virgo', Sanskrit: 'Kanya', date: 'Aug 23 - Sep 22', glyph: '♍', element: 'Earth', color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20', guidance: 'Perfect time for organization and self-care. Focus on detailing and refining your routine. Mindful steps lead to greater efficiency.' },
  { sign: 'Libra', Sanskrit: 'Tula', date: 'Sep 23 - Oct 22', glyph: '♎', element: 'Air', color: 'text-sky-600 bg-sky-500/10 border-sky-500/20', guidance: 'Harmonize your life and seek balance. Collaboration and partnerships are highly favored. Find beauty and peace in your surroundings.' },
  { sign: 'Scorpio', Sanskrit: 'Vrishchika', date: 'Oct 23 - Nov 21', glyph: '♏', element: 'Water', color: 'text-blue-600 bg-blue-500/10 border-blue-500/20', guidance: 'Embrace transformation and let go of the old. Deep insights and spiritual growth await you. Secrets of the inner self are being revealed.' },
  { sign: 'Sagittarius', Sanskrit: 'Dhanu', date: 'Nov 22 - Dec 21', glyph: '♐', element: 'Fire', color: 'text-amber-600 bg-amber-500/10 border-amber-500/20', guidance: 'Seek knowledge and expand your horizons. Adventure and optimism will guide your path. Keep your vision focused on the high peaks.' },
  { sign: 'Capricorn', Sanskrit: 'Makara', date: 'Dec 22 - Jan 19', glyph: '♑', element: 'Earth', color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20', guidance: 'Stay disciplined and focused on long-term goals. Hard work is paving the way for success. Consistent effort is your greatest asset.' },
  { sign: 'Aquarius', Sanskrit: 'Kumbha', date: 'Jan 20 - Feb 18', glyph: '♒', element: 'Air', color: 'text-sky-600 bg-sky-500/10 border-sky-500/20', guidance: 'Connect with community and think outside the box. Your unique perspective is needed. Innovation and progress are highly supported.' },
  { sign: 'Pisces', Sanskrit: 'Meena', date: 'Feb 19 - Mar 20', glyph: '♓', element: 'Water', color: 'text-blue-600 bg-blue-500/10 border-blue-500/20', guidance: 'Dive into your spiritual practices and dreams. Trust the flow of the universe. Meditate and let your creative imagination run free.' }
];

const getElementIcon = (element: string) => {
  switch (element) {
    case 'Fire': return <Flame className="w-6 h-6 text-amber-500 animate-pulse" />;
    case 'Water': return <Droplets className="w-6 h-6 text-blue-500 animate-bounce" />;
    case 'Air': return <Wind className="w-6 h-6 text-sky-500" />;
    case 'Earth': return <Mountain className="w-6 h-6 text-emerald-500" />;
    default: return <Sparkles className="w-6 h-6 text-indigo-500" />;
  }
};

const SacredGeometryBackground = memo(function SacredGeometryBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02] md:opacity-[0.03] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-[600px] h-[600px] text-indigo-950" fill="none" stroke="currentColor" strokeWidth="0.15">
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="38" />
        <circle cx="50" cy="50" r="28" />
        <circle cx="50" cy="50" r="18" />
        {SACRED_GEOMETRY_LINES.map((line, i) => (
          <line key={i} x1="50" y1="50" x2={line.x2} y2={line.y2} strokeDasharray="1, 1" />
        ))}
        {SACRED_GEOMETRY_CIRCLES.map((circle, i) => (
          <circle
            key={i}
            cx={circle.cx}
            cy={circle.cy}
            r="8"
          />
        ))}
      </svg>
    </div>
  );
});

const SectionDivider = () => (
  <div className="flex items-center justify-center gap-4 py-8 pointer-events-none opacity-40">
    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-indigo-300" />
    <span className="text-indigo-400 text-xs">✦</span>
    <span className="text-indigo-400 text-sm">✦</span>
    <span className="text-indigo-400 text-xs">✦</span>
    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-indigo-300" />
  </div>
);

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  sign: string;
}

export const AstroClientPage = memo(function AstroClientPage({ bannerUrl }: { bannerUrl: string }) {
  const dsAstrologyUrl = "https://www.dsastrology.com/";
  const [mounted, setMounted] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState<any[]>([]);
  const [isLoadingInsta, setIsLoadingInsta] = useState(true);
  const [selectedZodiac, setSelectedZodiac] = useState<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);

    // Generate random particle parameters strictly on mount to resolve hydration mismatch and prevent lag
    const generated = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 85}%`,
      delay: `${i * 2.5}s`,
      duration: `${16 + Math.random() * 10}s`,
      sign: ZODIAC_SIGNS[Math.floor(Math.random() * 12)]
    }));
    setParticles(generated);

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

  const MOCK_REELS = [
    { id: "mock1", title: "Saturn Transit Lessons", permalink: dsAstrologyUrl, caption: "Understanding your Saturn Return: Cosmic lessons & spiritual growth.", views: "12.4K" },
    { id: "mock2", title: "Moon & Emotional Alignment", permalink: dsAstrologyUrl, caption: "How the Moon influences your daily emotions and mood swings.", views: "8.9K" },
    { id: "mock3", title: "Jupiter in the 9th House", permalink: dsAstrologyUrl, caption: "Jupiter Transit Guidance: Luck, wisdom, and cosmic expansion.", views: "15.1K" }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-800 font-inter selection:bg-indigo-200 selection:text-indigo-900 pb-20">
      
      {/* GPU-Accelerated Smooth CSS Animations for Rotations and Particles */}
      <style jsx global>{`
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-clockwise 220s linear infinite;
          will-change: transform;
        }
        .animate-spin-reverse-slow {
          animation: spin-counter-clockwise 280s linear infinite;
          will-change: transform;
        }
        @keyframes float-up {
          0% { transform: translateY(105vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.25; }
          90% { opacity: 0.25; }
          100% { transform: translateY(-15vh) rotate(360deg); opacity: 0; }
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

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 font-semibold text-sm shadow-md hover:shadow-lg hover:border-indigo-300 hover:text-indigo-600 transition-all"
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-white/80 to-white/40 backdrop-blur-[2px]" />
        
        {/* Decorative Rotating Celestial Wheels (CSS-driven for optimal frame rate, client-only to prevent hydration warnings) */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
            <div
              className="absolute w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] md:w-[750px] md:h-[750px] lg:w-[850px] lg:h-[850px] opacity-[0.08] md:opacity-[0.12] text-indigo-600 animate-spin-slow"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.4">
                <circle cx="100" cy="100" r="95" strokeDasharray="1, 1" />
                <circle cx="100" cy="100" r="90" />
                <circle cx="100" cy="100" r="72" />
                <circle cx="100" cy="100" r="45" />
                
                {/* Rays for 12 divisions */}
                {CELESTIAL_WHEEL_RAYS.map((ray, i) => (
                  <line key={i} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} />
                ))}

                {/* Zodiac symbols in divisions */}
                {CELESTIAL_WHEEL_SIGNS.map((z, i) => (
                  <text
                    key={i}
                    x={z.x}
                    y={z.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8.5"
                    fill="currentColor"
                    className="font-sans select-none font-bold"
                    transform={`rotate(${z.rotation}, ${z.x}, ${z.y})`}
                  >
                    {z.sign}
                  </text>
                ))}
              </svg>
            </div>
            
            {/* Reverse Rotating Constellation Ring */}
            <div
              className="absolute w-[260px] h-[260px] sm:w-[450px] sm:h-[450px] md:w-[580px] md:h-[580px] lg:w-[680px] lg:h-[680px] opacity-[0.05] md:opacity-[0.08] text-blue-600 animate-spin-reverse-slow"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.3">
                <circle cx="100" cy="100" r="85" />
                <circle cx="100" cy="100" r="55" />
                <circle cx="100" cy="100" r="30" />
                
                <polygon points="100,80 105,95 120,100 105,105 100,120 95,105 80,100 95,95" fill="none" stroke="currentColor" />
                <polygon points="100,75 107,93 125,100 107,107 100,125 93,107 75,100 93,93" strokeDasharray="1, 1" />
              </svg>
            </div>
          </div>
        )}

        {/* Floating Cosmic Zodiac Glyphs (Performance Optimized) */}
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
                className="absolute text-indigo-400 text-4xl opacity-0 drop-shadow-md animate-float-particle"
              >
                {p.sign}
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
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-outfit mb-4 text-slate-900 drop-shadow-sm break-words"
            >
              Damini Shukla
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-indigo-600 text-xl md:text-2xl font-semibold mb-6 tracking-wider uppercase flex items-center gap-2"
            >
              <span className="text-amber-400 font-bold">✦</span>
              Vedic Astrologer & Spiritual Guide
              <span className="text-amber-400 font-bold">✦</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-700 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium"
            >
              Unlock the cosmic blueprint of your life. Navigate challenges and embrace your true potential with authentic Vedic wisdom.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-lg hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                Request Reading
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Career Milestone Dials / Stats */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 bg-white/95 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-xl backdrop-blur-xl">
          {CAREER_STATS.map((stat, i) => (
            <a key={i} href={dsAstrologyUrl} target="_blank" rel="noopener noreferrer" className="block text-center p-2 sm:p-4 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 group-hover:scale-110 transition-transform duration-300">{stat.metric}</h3>
              <p className="text-slate-500 mt-2 font-medium text-sm md:text-base">{stat.label}</p>
            </a>
          ))}
        </div>
      </section>

      {/* How Astrology Helps You */}
      <section className="max-w-6xl mx-auto px-4 py-24 relative">
        <SacredGeometryBackground />
        
        <div className="text-center mb-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3"
          >
            Cosmic Guidance
          </motion.div>
          <h2 className="text-2xl md:text-4xl font-bold font-outfit mb-4 text-slate-900">How Astrology Helps You</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {ASTRO_HELP_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <a 
                href={dsAstrologyUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-indigo-300 hover:shadow-[0_15px_30px_rgba(79,70,229,0.08)] hover:-translate-y-1.5 shadow-sm transition-all duration-300 group block relative overflow-hidden h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl group-hover:bg-indigo-100/50 transition-colors duration-300" />
                <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300 border border-indigo-100 relative z-10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-outfit text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 relative z-10">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm relative z-10">{item.desc}</p>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Interactive Zodiac Explorer */}
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        <SacredGeometryBackground />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3"
            >
              <Sparkles size={12} className="animate-pulse text-amber-500" />
              Interactive Reading
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-bold font-outfit mb-4 text-slate-900">Explore Your Astrological Sign</h2>
            <p className="text-slate-600 max-w-lg mx-auto text-sm md:text-base">Click on your zodiac sign below to unlock its Vedic name, cosmic element energy, and spiritual guidance.</p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mt-4" />
          </div>

          {/* Sign Selector Grid - Horizontal Scroll Snap on Mobile, Flex Wrap on Desktop */}
          <div className="flex sm:flex-wrap overflow-x-auto sm:overflow-visible snap-x scrollbar-none gap-2 sm:gap-2.5 mb-8 md:mb-10 max-w-4xl mx-auto px-4 sm:px-2 -mx-4 sm:mx-auto pb-4 sm:pb-0 justify-start sm:justify-center">
            {ZODIAC_DETAILS.map((signData, index) => (
              <motion.button
                key={signData.sign}
                onClick={() => setSelectedZodiac(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer snap-center shrink-0 ${
                  selectedZodiac === index
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 border-indigo-600 text-white shadow-[0_4px_15px_rgba(79,70,229,0.25)] scale-105"
                    : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50"
                }`}
              >
                <span className="text-base sm:text-lg">{signData.glyph}</span>
                <span>{signData.sign}</span>
              </motion.button>
            ))}
          </div>

          {/* Detailed Guidance Card */}
          <motion.div 
            key={selectedZodiac}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-5 sm:p-6 md:p-8 max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60" />
            
            <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-center md:items-start relative z-10">
              {/* Left Circle Badge (Element) - Desktop Only */}
              <div className="hidden md:flex flex-col items-center justify-center text-center p-6 bg-slate-50 border border-slate-100 rounded-2xl w-48 shrink-0">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 mb-3">
                  {getElementIcon(ZODIAC_DETAILS[selectedZodiac].element)}
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Vedic Element</span>
                <span className="font-bold text-slate-800 text-lg">{ZODIAC_DETAILS[selectedZodiac].element}</span>
              </div>

              {/* Right Description */}
              <div className="flex-1 text-center md:text-left w-full">
                {/* Mobile Element Header - Mobile Only */}
                <div className="flex md:hidden items-center justify-between p-3.5 mb-4 bg-slate-50 border border-slate-100 rounded-2xl text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                      {getElementIcon(ZODIAC_DETAILS[selectedZodiac].element)}
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Vedic Element</span>
                      <span className="font-bold text-slate-700 text-sm">{ZODIAC_DETAILS[selectedZodiac].element}</span>
                    </div>
                  </div>
                  <span className="text-2xl">{ZODIAC_DETAILS[selectedZodiac].glyph}</span>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-baseline gap-1 md:gap-2 mb-1 justify-center md:justify-start">
                  <h3 className="text-2xl md:text-3xl font-bold font-outfit text-slate-800">
                    {ZODIAC_DETAILS[selectedZodiac].sign}
                  </h3>
                  <span className="text-indigo-600 font-semibold text-base">
                    ({ZODIAC_DETAILS[selectedZodiac].Sanskrit})
                  </span>
                </div>
                <p className="text-indigo-500/80 font-medium text-xs md:text-sm uppercase tracking-wider mb-4">
                  {ZODIAC_DETAILS[selectedZodiac].date}
                </p>
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/50 mb-4">
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base italic">
                    "{ZODIAC_DETAILS[selectedZodiac].guidance}"
                  </p>
                </div>
                <a 
                  href={dsAstrologyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center md:justify-start gap-1.5 w-full md:w-auto text-xs md:text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:translate-x-1 transition-all"
                >
                  Get Personal Kundali Chart Reading <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Services Preview */}
      <section className="bg-white py-24 border-y border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute -left-48 top-48 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -z-10" />
        <div className="absolute -right-48 bottom-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3"
            >
              Premium Services
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-bold font-outfit mb-4 text-slate-900">Vedic Consultations</h2>
            <p className="text-indigo-600 font-medium text-lg">Authentic Vedic interpretations tailored to you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PREMIUM_SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <a 
                  href={dsAstrologyUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start p-6 md:p-8 bg-slate-50/50 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-[0_15px_35px_rgba(79,70,229,0.06)] hover:-translate-y-1.5 hover:bg-white transition-all duration-300 group cursor-pointer h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-indigo-500 mr-6 shrink-0 group-hover:text-blue-600 group-hover:shadow-md transition-all duration-300 border border-slate-100">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-xl font-bold font-outfit text-slate-800 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full shrink-0">{service.price}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                    <span className="text-indigo-600 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-300">
                      View details <ArrowRight size={14} />
                    </span>
                  </div>
                </a>
              </motion.div>
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
              <motion.a 
                key={i} 
                href={dsAstrologyUrl}
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md text-slate-600 hover:text-indigo-600 transition-all text-sm md:text-base font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Star size={18} className="text-amber-400" />
                {cred}
              </motion.a>
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
          <h2 className="text-2xl md:text-4xl font-bold font-outfit text-slate-900">Latest Astro Reels</h2>
        </div>

        {isLoadingInsta ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-[24px] overflow-hidden border border-slate-100 h-72 shadow-sm" />
            ))}
          </div>
        ) : instagramPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          /* High quality mock reels overlay when feed is empty */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_REELS.map((post, i) => (
              <motion.a 
                key={post.id} 
                href={post.permalink} 
                target="_blank" 
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Cosmic reel background placeholder */}
                <div className="relative aspect-square w-full overflow-hidden shrink-0 bg-gradient-to-tr from-indigo-950 via-indigo-900 to-blue-900 flex flex-col items-center justify-center p-6 text-center text-white">
                  <div className="absolute inset-0 bg-black/20 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent)]" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                    <Sparkles className="w-5 h-5 text-indigo-400 mb-2 animate-pulse" />
                    <p className="font-outfit font-semibold text-sm md:text-base leading-snug px-4">
                      {post.title}
                    </p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-slate-700 line-clamp-2 mb-3 leading-snug font-medium">
                    {post.caption}
                  </p>
                  <div className="mt-auto flex items-center text-xs text-slate-500 font-semibold gap-2">
                    <span className="flex items-center gap-1 text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      {post.views} Views
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>Vedic Guidance</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </section>

      {/* Final CTA Block */}
      <section className="py-24 px-4 text-center relative overflow-hidden">
        <SacredGeometryBackground />
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold font-outfit text-slate-900 mb-6">Ready to decode your destiny?</h2>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto text-lg">Take the first step towards cosmic alignment and profound self-discovery.</p>
          <motion.a 
            href={dsAstrologyUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-xl shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-all"
          >
            Visit DSAstrology.com
            <ArrowRight size={24} />
          </motion.a>
        </div>
      </section>

    </div>
  );
});

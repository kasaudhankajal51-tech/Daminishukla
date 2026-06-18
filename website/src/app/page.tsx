"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// Modern abstract shapes instead of generic stars
const FloatingShapes = ({ side }: { side: "creator" | "astro" }) => {
  const isCreator = side === "creator";
  const color1 = isCreator ? "rgba(255,107,43,0.4)" : "rgba(155,127,234,0.4)";
  const color2 = isCreator ? "rgba(255,43,107,0.3)" : "rgba(127,155,234,0.3)";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
      <motion.div
        className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${color1} 0%, transparent 70%)` }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, ${color2} 0%, transparent 70%)` }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
      />
    </div>
  );
};

export default function Home() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="relative flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#050505] font-[var(--font-space-grotesk)] text-white cursor-default">
      
      {/* Creator Side */}
      <motion.div
        className="relative w-full md:w-1/2 h-[50%] md:h-full overflow-hidden cursor-pointer group"
        animate={{
          height: isMobile ? (hoveredSide === "left" ? "65%" : hoveredSide === "right" ? "35%" : "50%") : "100%",
          width: !isMobile ? (hoveredSide === "left" ? "65%" : hoveredSide === "right" ? "35%" : "50%") : "100%",
          filter: hoveredSide === "right" ? "blur(8px) grayscale(60%) brightness(0.5)" : "blur(0px) grayscale(0%) brightness(1)",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => { if(isMobile) setHoveredSide("left") }}
        style={{ zIndex: hoveredSide === "left" ? 10 : 1 }}
      >
        <div className="absolute inset-0 bg-[#0A0400]" />
        
        {/* Background Image with slight zoom on hover */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/creator-bg.png')" }}
          animate={{ scale: hoveredSide === "left" ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Dark Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0400] via-[#0A0400]/70 to-transparent" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />

        <FloatingShapes side="creator" />
        
        <div className="absolute opacity-[0.03] pointer-events-none text-[20rem] md:text-[30rem] leading-none select-none -bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:-left-20 font-bold mix-blend-overlay">CR</div>
        
        <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 items-center md:items-end text-center md:text-right">
          
          {/* Glassmorphic Panel to Highlight Text */}
          <motion.div 
            className="flex flex-col items-center md:items-end bg-black/40 backdrop-blur-[16px] border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            animate={{ scale: hoveredSide === "left" ? 1.05 : 1, y: hoveredSide === "left" ? -10 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="px-4 py-1.5 rounded-full border border-orange-500/50 bg-orange-500/20 mb-6 shadow-[0_0_15px_rgba(255,107,43,0.3)]">
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-orange-300 font-bold">Enter her world</p>
            </div>
            
            <h1 className="font-[var(--font-cormorant)] font-light text-6xl md:text-8xl leading-none text-white mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              Damini
            </h1>
            <h2 className="font-[var(--font-cormorant)] italic text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2B] to-[#FF9A5C] mb-6 drop-shadow-lg">
              the Creator
            </h2>
            
            <p className="text-sm md:text-base tracking-[0.2em] uppercase text-white/80 mb-12 font-medium drop-shadow-md">Content Creator · Digital Influencer</p>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-3 mb-12 max-w-md">
              {["Reels", "Instagram", "YouTube", "Brand Collabs"].map((tag) => (
                <span key={tag} className="text-[0.65rem] tracking-[0.15em] uppercase px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white/90 hover:border-[#FF6B2B]/70 hover:bg-[#FF6B2B]/20 hover:text-white transition-all duration-300 shadow-xl">
                  {tag}
                </span>
              ))}
            </div>
            
            <Link 
              href="/creator"
              className="relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 bg-white/10 border border-white/20 rounded-2xl font-[var(--font-space-grotesk)] text-sm font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:scale-105 group/btn shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,107,43,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B2B] to-[#FF9A5C] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-white group-hover/btn:text-white transition-colors duration-300">Explore Portfolio</span>
              <svg className="w-4 h-4 relative z-10 text-white group-hover/btn:text-white transition-all duration-300 group-hover/btn:translate-x-1 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div 
        className="absolute z-20 pointer-events-none flex items-center justify-center"
        animate={{
          left: isMobile ? '0' : (hoveredSide === 'left' ? '65%' : hoveredSide === 'right' ? '35%' : '50%'),
          top: isMobile ? (hoveredSide === 'left' ? '65%' : hoveredSide === 'right' ? '35%' : '50%') : '0',
          width: isMobile ? '100%' : '2px',
          height: isMobile ? '2px' : '100%',
          x: isMobile ? 0 : '-50%',
          y: isMobile ? '-50%' : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        
        {/* Glowing Orb Center */}
        <motion.div 
          className="absolute flex items-center justify-center w-16 h-16 rounded-full bg-[#050505] border border-white/10 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          animate={{
             boxShadow: hoveredSide === 'left' ? '0 0 50px rgba(255,107,43,0.5)' : hoveredSide === 'right' ? '0 0 50px rgba(155,127,234,0.5)' : '0 0 30px rgba(255,255,255,0.1)',
             borderColor: hoveredSide === 'left' ? 'rgba(255,107,43,0.3)' : hoveredSide === 'right' ? 'rgba(155,127,234,0.3)' : 'rgba(255,255,255,0.1)'
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="font-[var(--font-cormorant)] text-xl text-white/90 font-light tracking-widest drop-shadow-md">DS</div>
          {/* Inner pulse */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Astro Side */}
      <motion.div
        className="relative w-full md:w-1/2 h-[50%] md:h-full overflow-hidden cursor-pointer group"
        animate={{
          height: isMobile ? (hoveredSide === "right" ? "65%" : hoveredSide === "left" ? "35%" : "50%") : "100%",
          width: !isMobile ? (hoveredSide === "right" ? "65%" : hoveredSide === "left" ? "35%" : "50%") : "100%",
          filter: hoveredSide === "left" ? "blur(8px) grayscale(60%) brightness(0.5)" : "blur(0px) grayscale(0%) brightness(1)",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => { if(isMobile) setHoveredSide("right") }}
        style={{ zIndex: hoveredSide === "right" ? 10 : 1 }}
      >
        <div className="absolute inset-0 bg-[#04020A]" />
        
        {/* Background Image with slight zoom on hover */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/astrologer-bg.png')" }}
          animate={{ scale: hoveredSide === "right" ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Dark Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04020A] via-[#04020A]/70 to-transparent" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />

        <FloatingShapes side="astro" />
        
        <div className="absolute opacity-[0.03] pointer-events-none text-[20rem] md:text-[30rem] leading-none select-none -bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:-right-20 font-bold mix-blend-overlay">AS</div>
        
        <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 items-center md:items-start text-center md:text-left">
          
          {/* Glassmorphic Panel to Highlight Text */}
          <motion.div 
            className="flex flex-col items-center md:items-start bg-black/40 backdrop-blur-[16px] border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            animate={{ scale: hoveredSide === "right" ? 1.05 : 1, y: hoveredSide === "right" ? -10 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="px-4 py-1.5 rounded-full border border-purple-500/50 bg-purple-500/20 mb-6 shadow-[0_0_15px_rgba(155,127,234,0.3)]">
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-purple-300 font-bold">Seek her wisdom</p>
            </div>
            
            <h1 className="font-[var(--font-cormorant)] font-light text-6xl md:text-8xl leading-none text-white mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              Damini
            </h1>
            <h2 className="font-[var(--font-cormorant)] italic text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#9B7FEA] to-[#C4AEFF] mb-6 drop-shadow-lg">
              the Astrologer
            </h2>
            
            <p className="text-sm md:text-base tracking-[0.2em] uppercase text-white/80 mb-12 font-medium drop-shadow-md">Vedic Astrologer · Astro Teacher</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-12 max-w-md">
              {["Vedic Astrology", "Astrotalk", "Consultations", "Courses"].map((tag) => (
                <span key={tag} className="text-[0.65rem] tracking-[0.15em] uppercase px-4 py-2 rounded-xl bg-black/30 border border-white/20 text-white/90 hover:border-[#9B7FEA]/70 hover:bg-[#9B7FEA]/20 hover:text-white transition-all duration-300 shadow-xl">
                  {tag}
                </span>
              ))}
            </div>
            
            <Link 
              href="/astro"
              className="relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 bg-white/10 border border-white/20 rounded-2xl font-[var(--font-space-grotesk)] text-sm font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:scale-105 group/btn shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(155,127,234,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#9B7FEA] to-[#C4AEFF] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-white group-hover/btn:text-white transition-colors duration-300">Discover Stars</span>
              <svg className="w-4 h-4 relative z-10 text-white group-hover/btn:text-white transition-all duration-300 group-hover/btn:translate-x-1 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

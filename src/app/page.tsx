"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// Floating particles for creative ambiance
const Particles = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-50 z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: color,
            width: Math.random() * 5 + 1 + "px",
            height: Math.random() * 5 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${color}`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 1, 0],
            scale: [1, 2, 1]
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// 3D Tilt Card Component for massive wow factor
function TiltCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      {/* Container inside tilt */}
      <div 
        className="w-full h-full relative" 
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden mix-blend-screen z-0">
      {/* Added more complex background shapes and animations */}
      <motion.div
        className="absolute top-[5%] left-[10%] w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[180px]"
        style={{ background: `radial-gradient(circle, rgba(255,77,46,0.15) 0%, transparent 70%)` }}
        animate={{ x: [0, 80, -40, 0], y: [0, -80, 50, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] md:w-[900px] md:h-[900px] rounded-full blur-[120px] md:blur-[180px]"
        style={{ background: `radial-gradient(circle, rgba(155,127,234,0.15) 0%, transparent 70%)` }}
        animate={{ x: [0, -100, 60, 0], y: [0, 100, -40, 0], scale: [1, 1.2, 0.8, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#050505] font-[var(--font-space-grotesk)] text-white overflow-x-hidden selection:bg-orange-500/30">
      {/* Premium Dark Abstract Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/premium-bg.png')" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_90%)]" />
      </div>

      {/* Cinematic Film Grain */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')" }} />
      
      <FloatingShapes />

      {/* Hero Section */}
      <section className="relative z-10 w-full pt-32 md:pt-40 pb-16 md:pb-24 flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-12 shadow-[0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF4D2E] to-[#9B7FEA] animate-pulse shadow-[0_0_10px_rgba(255,77,46,0.8)]" />
          <span className="text-[0.65rem] md:text-xs tracking-[0.25em] uppercase font-bold text-white/80">Welcome to her universe</span>
        </motion.div>

        {/* Shimmering Hero Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 50 }}
          className="relative"
        >
          <div className="absolute -inset-4 blur-3xl opacity-30 bg-gradient-to-r from-[#FF4D2E] via-purple-500 to-[#9B7FEA] animate-pulse" />
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
            }}
            className="relative font-[var(--font-cormorant)] text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-none font-light mb-6 flex justify-center"
          >
            {"Damini".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } }
                }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 drop-shadow-2xl"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm md:text-lg lg:text-xl tracking-[0.3em] uppercase text-white/50 max-w-2xl font-medium"
        >
          Bridging the <span className="text-[#FF9A2E] drop-shadow-[0_0_10px_rgba(255,154,46,0.5)]">Creative</span> and the <span className="text-[#D4A843] drop-shadow-[0_0_10px_rgba(212,168,67,0.5)]">Cosmic</span>
        </motion.p>
      </section>

      {/* Cards Section */}
      <section className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 pb-32 perspective-[2000px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Creator Tilt Card */}
          <TiltCard 
            delay={0.2}
            className="group relative h-[500px] md:h-[600px] lg:h-[700px] w-full cursor-pointer z-10 hover:z-50"
          >
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(255,77,46,0.4)] group-hover:border-[#FF4D2E]/50">
              <div className="absolute inset-0 bg-[#0A0400]" />
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110 opacity-80 group-hover:opacity-100" style={{ backgroundImage: "url('/creator-bg.png')" }} />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
              
              <Particles color="#FF4D2E" />

              {/* 3D Popping Content inside Card */}
              <div 
                className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center text-center"
                style={{ transform: "translateZ(60px)" }} // This makes the text pop out in 3D!
              >
                <div className="px-5 py-2 rounded-full border border-[#FF4D2E]/50 bg-[#FF4D2E]/20 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,77,46,0.2)]">
                  <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#FF9A2E] font-bold">Content Creator</p>
                </div>
                <h2 className="font-[var(--font-cormorant)] text-5xl md:text-6xl lg:text-7xl text-white mb-2 drop-shadow-xl">The Creator</h2>
                <p className="text-sm md:text-base text-white/70 mb-10 max-w-md drop-shadow-md">Content Creator · Digital Influencer</p>
                
                <Link href="/creator" className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-[#FF4D2E]/40 rounded-full font-[var(--font-space-grotesk)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-500 group-hover:bg-[#FF4D2E] group-hover:border-[#FF4D2E] group-hover:text-white backdrop-blur-xl shadow-[0_0_20px_rgba(255,77,46,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">Explore</span>
                  <svg className="relative z-10 w-4 h-4 text-[#FF4D2E] group-hover:text-white transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          </TiltCard>

          {/* Astrologer Tilt Card */}
          <TiltCard 
            delay={0.4}
            className="group relative h-[500px] md:h-[600px] lg:h-[700px] w-full cursor-pointer mt-8 md:mt-24 z-10 hover:z-50"
          >
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(155,127,234,0.4)] group-hover:border-[#9B7FEA]/50">
              <div className="absolute inset-0 bg-[#04020A]" />
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110 opacity-80 group-hover:opacity-100" style={{ backgroundImage: "url('/astrologer-bg.png')" }} />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
              
              <Particles color="#9B7FEA" />

              {/* 3D Popping Content inside Card */}
              <div 
                className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center text-center"
                style={{ transform: "translateZ(60px)" }} // This makes the text pop out in 3D!
              >
                <div className="px-5 py-2 rounded-full border border-[#9B7FEA]/50 bg-[#9B7FEA]/20 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(155,127,234,0.2)]">
                  <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#D4A843] font-bold">Vedic Astrologer</p>
                </div>
                <h2 className="font-[var(--font-cormorant)] text-5xl md:text-6xl lg:text-7xl text-white mb-2 drop-shadow-xl">The Astrologer</h2>
                <p className="text-sm md:text-base text-white/70 mb-10 max-w-md drop-shadow-md">Vedic Astrologer · Astro Teacher</p>
                
                <Link href="/astro" className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-[#9B7FEA]/40 rounded-full font-[var(--font-space-grotesk)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-500 group-hover:bg-[#9B7FEA] group-hover:border-[#9B7FEA] group-hover:text-white backdrop-blur-xl shadow-[0_0_20px_rgba(155,127,234,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">Explore</span>
                  <svg className="relative z-10 w-4 h-4 text-[#9B7FEA] group-hover:text-white transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          </TiltCard>

        </div>
      </section>

    </main>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  const headlineVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const ctaVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">
      <ParticleBackground />

      {/* Right Side Background Elements - Behind Content */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none select-none hidden lg:block overflow-hidden z-0">
        {/* Large Savings Percentage */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[-10%] top-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <span
              className="font-clash font-bold text-orange leading-none block"
              style={{
                fontSize: 'clamp(200px, 25vw, 420px)',
                opacity: 0.025,
                WebkitTextStroke: '1px rgba(255, 107, 53, 0.04)',
              }}
            >
              Ops
            </span>
            {/* Accent line */}
            <div className="absolute bottom-0 left-0 w-[60%] h-1 bg-gradient-to-r from-orange/10 to-transparent" />
          </div>
        </motion.div>

        {/* Abstract Cost Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute right-[15%] top-[20%] space-y-4"
        >
          {[
            { label: 'MONTHLY SAVINGS', value: '$8.2K', color: 'text-gold' },
            { label: 'RESOURCES OPTIMIZED', value: '247', color: 'text-orange' },
            { label: 'SPRINT DURATION', value: '30D', color: 'text-text-secondary' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              className="backdrop-blur-sm bg-surface/5 border border-border/20 px-6 py-3 rounded-sm"
              style={{ opacity: 0.4 }}
            >
              <div className="text-[9px] text-text-muted font-mono uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <div className={`text-2xl font-clash font-bold ${item.color}`}>
                {item.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Vertical Accent Lines */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
          className="absolute right-[35%] top-0 w-px h-full bg-gradient-to-b from-transparent via-orange/5 to-transparent origin-top"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.1, duration: 1.2, ease: 'easeOut' }}
          className="absolute right-[25%] top-0 w-px h-full bg-gradient-to-b from-transparent via-gold/3 to-transparent origin-top"
        />

        {/* Small Decorative Dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + i * 0.05, duration: 0.4 }}
            className="absolute w-1 h-1 bg-orange/20 rounded-full"
            style={{
              right: `${15 + Math.random() * 30}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 py-20  md:py-28">
        {/* Full Width Content */}
        <div className="relative">
          {/* Trust Signal - Top Left Anchor Point */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            <span className="text-text-secondary text-label uppercase tracking-label font-cabinet font-medium">
              FinOps Engineering — Est. 2025
            </span>
            <div className="hidden sm:block w-px h-4 bg-border ml-2" />
            <span className="hidden sm:inline text-gold text-label uppercase tracking-label font-mono font-medium">
              30-Day Guarantee
            </span>
          </motion.div>

          {/* Main Headline - Visual Hierarchy with Emphasis - Full Width */}
          <div className="relative mb-10">
            {/* Background Number - Positioned as Directional Cue */}
            <div className="absolute -left-8 md:-left-12 top-0 pointer-events-none select-none opacity-[0.03] hidden md:block">
              <span
                className="font-clash font-bold text-gold leading-none"
                style={{
                  fontSize: 'clamp(280px, 30vw, 480px)',
                  lineHeight: 0.8,
                }}
              >
                Fin
              </span>
            </div>

            {/* Headline with Visual Weight on Key Words */}
            <div className="relative">
              <div className="flex gap-4">
                <div className="overflow-hidden mb-1">
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                  variants={headlineVariants}
                  className="font-clash font-bold text-hero leading-[0.85] tracking-hero text-text-primary"
                >
                  <span className="text-gradient">Stop</span>
                </motion.h1>
              </div>

              <div className="overflow-hidden mb-1">
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                  variants={headlineVariants}
                  className="font-clash font-bold text-hero leading-[0.85] tracking-hero text-text-primary"
                >
                  Burning
                </motion.h1>
              </div>

              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                  variants={headlineVariants}
                  className="font-clash font-bold text-hero leading-[0.85] tracking-hero text-text-primary"
                >
                  Cloud Budget.
                </motion.h1>
              </div>
            </div>
          </div>

          {/* Value Proposition - Max Width Constrained */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            variants={fadeInUp}
            className="mb-12"
          >
            <p className="text-subhead text-text-secondary max-w-2xl leading-[1.5] font-cabinet">
              Blizon cuts AWS and GCP costs by{' '}
              <span className="text-orange font-medium">20–40%</span> for funded startups — in{' '}
              <span className="text-gold font-medium">30 days</span>, without touching your roadmap.
            </p>
          </motion.div>

          {/* Z-Pattern Terminal: CTA as Visual Destination */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            variants={ctaVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-14"
          >
            {/* Primary CTA - Maximum Visual Weight */}
            <Link
              href="https://calendly.com/hello-blizon/30min"
              target="_blank"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-orange text-black font-clash font-semibold text-xl hover:shadow-orange-glow transition-all duration-300 cursor-hover overflow-hidden"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Get Free Audit</span>
              <span className="relative z-10 text-2xl transition-all duration-300 group-hover:translate-x-1 group-hover:text-black">
                →
              </span>
              {/* Hover effect overlay - slides in from left to right */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange via-orange to-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </Link>

            {/* Secondary CTA - Reduced Visual Weight */}
            <Link
              href="#process"
              className="group inline-flex items-center gap-2 text-text-secondary hover:text-text-primary font-cabinet text-base transition-colors duration-200 cursor-hover"
            >
              <span>See the Process</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-y-1">
                ↓
              </span>
            </Link>
          </motion.div>
<br /><br /><br />
          {/* Social Proof - Supporting Evidence Below CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-8 border-t border-border/50"
          >
            {[
              { icon: '✓', text: 'FinOps Certified' },
              { icon: '☁', text: 'AWS + GCP + DO' },
              { icon: '⚡', text: '30-Day Sprints' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-orange text-sm">{item.icon}</span>
                <span className="text-label uppercase tracking-label text-text-muted font-cabinet font-medium">
                  {item.text}
                </span>
                {index < 2 && <div className="hidden sm:block w-px h-3 bg-border ml-2" />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator - Bottom Center Anchor */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-orange to-transparent animate-pulse-line" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">scroll</span>
        </motion.div>
      </div>
    </section>
  );
}

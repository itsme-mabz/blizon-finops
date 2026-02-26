'use client';

import { motion } from 'framer-motion';

export default function ServicesHero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none select-none hidden lg:block overflow-hidden z-0">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[-10%] top-1/2 -translate-y-1/2"
        >
          <span
            className="font-clash font-bold text-orange leading-none block"
            style={{
              fontSize: 'clamp(200px, 25vw, 420px)',
              opacity: 0.025,
              WebkitTextStroke: '1px rgba(255, 107, 53, 0.04)',
            }}
          >
            {'</>'}
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
          className="absolute right-[35%] top-0 w-px h-full bg-gradient-to-b from-transparent via-orange/10 to-transparent origin-top"
        />
      </div>

      <div className="container relative z-10">
        <div className="relative max-w-5xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            <span className="text-text-secondary text-label uppercase tracking-label font-cabinet font-medium">
              Engineering Services
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="mb-10">
            {['We build.', 'You scale.'].map((line, index) => (
              <div key={index} className="overflow-hidden mb-1">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-clash font-bold text-hero leading-[0.85] tracking-hero text-text-primary"
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-subhead text-text-secondary max-w-3xl leading-[1.5] font-cabinet mb-12"
          >
            Full-stack engineering, cloud architecture, and technical leadership for funded startups.
            From <span className="text-orange font-medium">MVP</span> to <span className="text-gold font-medium">Series B</span> and beyond.
          </motion.p>

          {/* Services Preview Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {['Full-Stack Development', 'Cloud Architecture', 'DevOps & SRE', 'Technical Leadership'].map((service, i) => (
              <div
                key={i}
                className="px-4 py-2 bg-surface/50 border border-border text-text-secondary text-sm font-cabinet cursor-hover hover:border-orange/50 transition-colors duration-200"
              >
                {service}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

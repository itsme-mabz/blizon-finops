'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="audit"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #1a0f08 0%, #080810 100%)',
      }}
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-clash font-bold text-gold text-center"
          style={{
            fontSize: 'clamp(300px, 40vw, 600px)',
            lineHeight: 1,
            opacity: 0.03,
          }}
        >
          SAVE
        </span>
      </div>

      <div className="container relative z-10 text-center py-20 md:py-32">
        {/* Headline */}
        <div className="mb-8">
          {['Most clients save more', 'in month one than', 'our entire fee.'].map((line, index) => (
            <div key={index} className="overflow-hidden">
              <motion.h2
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                variants={fadeInUp}
                className="font-clash font-bold text-gradient mb-2"
                style={{
                  fontSize: 'clamp(42px, 6vw, 88px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          variants={fadeInUp}
          className="text-text-secondary text-xl md:text-2xl font-cabinet mb-12 max-w-2xl mx-auto"
        >
          Free audit. Real numbers. You decide what happens next.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          variants={fadeInUp}
          className="mb-6"
        >
          <Link
            href="https://calendly.com/hello-blizon/30min"
            target="_blank"
            className="group relative inline-block px-12 py-5 bg-orange text-black font-clash font-semibold text-xl hover:shadow-orange-glow transition-all duration-300 cursor-hover overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Book Your Free Audit →
            </span>
            {/* Hover effect overlay - slides in from left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange via-orange to-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          variants={fadeInUp}
          className="text-text-muted text-sm font-cabinet"
        >
          No commitment. No credit card. 60 minutes.
        </motion.p>
      </div>
    </section>
  );
}

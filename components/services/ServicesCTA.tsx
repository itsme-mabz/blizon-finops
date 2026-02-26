'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function ServicesCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-clash font-bold text-gold text-center"
          style={{
            fontSize: 'clamp(200px, 40vw, 600px)',
            lineHeight: 1,
            opacity: 0.03,
          }}
        >
          START
        </span>
      </div>

      <div className="container relative z-10 text-center py-20">
        {/* Headline */}
        <div className="mb-12">
          {["Let's build", "something great."].map((line, index) => (
            <div key={index} className="overflow-hidden">
              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-clash font-bold text-gradient mb-2"
                style={{ fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 0.95 }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-secondary text-xl md:text-2xl font-cabinet mb-12 max-w-2xl mx-auto"
        >
          Tell us what you are building. We will show you how we can help.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Link
            href="mailto:hello@blizon.com?subject=Engineering Services Inquiry"
            className="group inline-flex items-center gap-3 px-12 py-6 bg-orange text-black font-clash font-semibold text-xl hover:scale-[1.02] hover:shadow-orange-glow transition-all duration-300 cursor-hover"
          >
            <span>Get In Touch</span>
            <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-text-muted text-sm font-cabinet"
        >
          Response within 24 hours. Free technical consultation.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '15+', label: 'Years Combined Experience' },
            { value: '50+', label: 'Projects Delivered' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-clash font-bold text-orange text-4xl md:text-5xl mb-2">
                {stat.value}
              </div>
              <div className="h-px w-12 bg-gold mx-auto mb-3" />
              <div className="text-text-secondary text-sm uppercase tracking-wide font-cabinet">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

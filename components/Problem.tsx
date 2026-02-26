'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const headlineVariants = {
    hidden: { y: 40, opacity: 0 },
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

  const problems = [
    'Idle EC2 instances running 24/7 in every environment',
    'Dev and prod sharing the same oversized databases',
    'Zero tagging — no idea which team owns which cost',
    'Reserved instance coverage under 20% on predictable workloads',
    'Orphaned EBS volumes and snapshots from 18 months ago',
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-surface overflow-hidden">
      {/* Background Text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block">
        <span
          className="font-clash font-bold text-orange"
          style={{
            fontSize: 'clamp(200px, 20vw, 300px)',
            lineHeight: 1,
            opacity: 0.03,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          WASTE
        </span>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Content - Right Aligned */}
          <div className="lg:col-start-5 lg:col-span-8">
            {/* Label */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              variants={fadeInUp}
              className="mb-6"
            >
              <span className="text-orange text-label uppercase tracking-label font-cabinet font-medium">
                The Problem
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-12">
              {['Your cloud bill', 'is growing.', "Nobody's watching."].map((line, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.h2
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                    variants={headlineVariants}
                    className="font-clash font-semibold text-section leading-section text-text-primary"
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>

            {/* Body Text */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              variants={fadeInUp}
              className="mb-12 space-y-6"
            >
              <p className="text-text-secondary text-lg leading-relaxed">
                Most funded startups are so focused on shipping that cloud costs become an
                afterthought. By the time someone looks, there's months of compounding waste sitting
                in the bill.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                It's not an engineering failure. It's a visibility failure.
              </p>
            </motion.div>

            {/* Problem Chips */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              variants={fadeInUp}
              className="mb-16 space-y-4"
            >
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="text-orange text-xl leading-none mt-1">■</span>
                  <span className="text-text-secondary text-base">{problem}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Pull Quote */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              variants={fadeInUp}
              className="border-l-2 border-orange pl-8"
            >
              <blockquote className="mb-4">
                <p className="font-clash font-semibold text-4xl md:text-5xl leading-tight text-gradient">
                  The average Series A startup wastes 32% of its cloud budget.
                </p>
              </blockquote>
              <cite className="text-text-muted text-sm font-cabinet not-italic">
                — FinOps Foundation, 2024
              </cite>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

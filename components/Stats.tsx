'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function StatValue({ display }: { display: string }) {
  return <span>{display}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { display: '20–40%', label: 'Average cost reduction' },
    { display: '$78K', label: 'Average annual savings found' },
    { display: '30', label: 'Days to measurable results' },
    { display: '17×', label: 'Average ROI on our fee' },
  ];

  return (
    <section ref={ref} id="results" className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-clash font-bold text-gold text-center"
          style={{
            fontSize: 'clamp(200px, 30vw, 500px)',
            lineHeight: 1,
            opacity: 0.025,
          }}
        >
          RESULTS
        </span>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              {/* Vertical Divider (not on first item for desktop) */}
              {index > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-orange opacity-20" />
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center"
              >
                {/* Number */}
                <div className="font-mono text-orange mb-4" style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}>
                  <StatValue {...stat} />
                </div>

                {/* Gold Underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-10 h-0.5 bg-gold mx-auto mb-4"
                  style={{ transformOrigin: 'left' }}
                />

                {/* Label */}
                <p className="text-text-secondary text-sm uppercase tracking-wide font-cabinet font-medium max-w-[200px] mx-auto">
                  {stat.label}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

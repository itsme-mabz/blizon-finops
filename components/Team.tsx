'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.97 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
  };

  const team = [
    {
      name: 'Ahmed',
      role: 'Co-founder & Strategy',
      bio: 'I focus on making sure every engagement delivers measurable ROI. I handle the audit calls, the client relationships, and the business.',
    },
    {
      name: 'Amman',
      role: 'Technical Lead',
      bio: "I live in Cost Explorer. Give me read-only access and 30 minutes — I'll show you where the money's going.",
    },
    {
      name: 'Wajdan',
      role: 'Implementation Lead',
      bio: "I execute the fixes. Clean, documented, built to last. When I'm done, your team can maintain it without us.",
    },
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-surface overflow-hidden">
      {/* Background Number */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span
          className="font-clash font-bold text-gold"
          style={{
            fontSize: 'clamp(200px, 30vw, 500px)',
            lineHeight: 1,
            opacity: 0.025,
          }}
        >
          03
        </span>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-16 max-w-4xl">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            variants={fadeInUp}
            className="mb-6"
          >
            <span className="text-orange text-label uppercase tracking-label font-cabinet font-medium">
              The Team
            </span>
          </motion.div>

          <div>
            {['Three engineers.', 'One obsession.'].map((line, index) => (
              <div key={index} className="overflow-hidden">
                <motion.h2
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  transition={{ delay: (index + 1) * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                  variants={fadeInUp}
                  className="font-clash font-semibold text-section leading-section text-text-primary"
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              variants={cardVariants}
              className="glass p-8 hover:shadow-orange-glow transition-all duration-300 cursor-hover"
            >
              <h3 className="font-clash font-semibold text-3xl text-text-primary mb-2">
                {member.name}
              </h3>
              <p className="text-orange text-[10px] uppercase tracking-wider font-cabinet font-medium mb-6">
                {member.role}
              </p>
              <p className="text-text-secondary text-base leading-relaxed font-cabinet">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

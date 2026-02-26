'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WhyBlizon() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const differentiators = [
    {
      title: 'Engineers, not account managers',
      subtitle: 'You talk to the people doing the work.',
    },
    {
      title: 'Multi-cloud expertise',
      subtitle: "AWS, GCP, DigitalOcean, Linode — we've optimized all of them.",
    },
    {
      title: 'FinOps Foundation Certified',
      subtitle: 'Not just pattern matching. We know the framework.',
    },
    {
      title: 'Small team, full attention',
      subtitle: "We take 3-4 clients at a time. That's it.",
    },
  ];

  return (
    <section ref={ref} id="about" className="relative py-20 md:py-32 bg-black">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Editorial Text */}
          <div>
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              variants={fadeInUp}
              className="mb-8"
            >
              <span className="text-orange text-label uppercase tracking-label font-cabinet font-medium">
                Why Us
              </span>
            </motion.div>

            <div className="mb-8">
              {['Engineers.', 'Not consultants.'].map((line, index) => (
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

            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.24, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <p className="text-text-secondary text-lg leading-relaxed">
                Most FinOps consultants come from finance. We come from engineering. We've built
                and scaled production systems on AWS, GCP, DigitalOcean, and Linode. We know where
                the waste hides because we've created it ourselves.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                You work directly with us. No account managers. No juniors. Three engineers who are
                FinOps certified and obsessively focused on one metric: how much we saved you.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Differentiators */}
          <div className="space-y-8">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ delay: (index + 4) * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                variants={fadeInUp}
                className="flex items-start gap-4 pb-8 border-b border-border last:border-0"
              >
                <div className="text-orange text-2xl leading-none mt-1">—</div>
                <div>
                  <h3 className="font-cabinet font-bold text-text-primary text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-base">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

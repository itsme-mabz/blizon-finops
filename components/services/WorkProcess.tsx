'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WorkProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      phase: 'Discovery',
      duration: '1 week',
      description: "We start with deep technical discovery. Architecture review, codebase audit, team interviews. We need to understand what you have before we build what's next.",
      outcomes: ['Technical Assessment', 'Architecture Review', 'Resource Planning', 'Risk Analysis'],
    },
    {
      phase: 'Planning',
      duration: '3-5 days',
      description: "Detailed technical specs, sprint planning, and architecture decisions. No surprises. You'll know exactly what we're building and why.",
      outcomes: ['Technical Specs', 'Sprint Roadmap', 'Architecture Diagrams', 'Team Alignment'],
    },
    {
      phase: 'Execution',
      duration: 'Ongoing',
      description: "2-week sprints. Daily standups. Weekly demos. Continuous deployment. We ship code, not PowerPoints.",
      outcomes: ['Working Software', 'Code Reviews', 'Documentation', 'Knowledge Transfer'],
    },
    {
      phase: 'Optimization',
      duration: 'Continuous',
      description: "Performance monitoring, cost optimization, security audits. We don't just ship and disappear. We make sure it stays fast, secure, and cost-effective.",
      outcomes: ['Performance Metrics', 'Cost Reports', 'Security Scans', 'Ongoing Support'],
    },
  ];

  return (
    <section ref={ref} className="relative bg-surface py-20 md:py-32">
      {/* Header */}
      <div className="container mb-16">
        <span className="text-orange text-label uppercase tracking-label font-cabinet font-medium mb-6 block">
          How We Work
        </span>
        <h2 className="font-clash font-semibold text-section leading-section text-text-primary mb-6">
          Predictable process.
          <br />
          Measurable results.
        </h2>
      </div>

      {/* Timeline */}
      <div className="container">
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-[32px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-[32px] top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-orange border-4 border-surface z-10" />

                {/* Content */}
                <div className="flex items-start gap-6 md:gap-12">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-orange/10 border border-orange flex items-center justify-center">
                      <span className="font-clash font-bold text-orange text-xl">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="glass p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-clash font-semibold text-2xl md:text-3xl text-text-primary">
                          {step.phase}
                        </h3>
                        <span className="text-xs font-mono text-gold bg-gold/10 px-3 py-1 border border-gold/30">
                          {step.duration}
                        </span>
                      </div>

                      <p className="text-text-secondary leading-relaxed font-cabinet mb-6">
                        {step.description}
                      </p>

                      {/* Outcomes */}
                      <div className="pt-6 border-t border-border">
                        <p className="text-text-muted text-xs uppercase tracking-wide font-cabinet font-medium mb-3">
                          Deliverables
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {step.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-orange text-xs">✓</span>
                              <span className="text-text-secondary text-sm font-cabinet">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

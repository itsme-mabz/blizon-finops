'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ServicesList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      number: '01',
      title: 'Full-Stack Development',
      description: 'Modern web and mobile applications built with React, Next.js, TypeScript, and Node.js. We focus on performance, scalability, and maintainability.',
      deliverables: ['Product Development', 'API Design & Implementation', 'Database Architecture', 'UI/UX Implementation'],
    },
    {
      number: '02',
      title: 'Cloud Architecture & Infrastructure',
      description: 'AWS, GCP, and multi-cloud solutions designed for scale. From containerization to serverless, we build infrastructure that grows with you.',
      deliverables: ['Cloud Migration', 'Kubernetes & Docker', 'CI/CD Pipelines', 'Infrastructure as Code'],
    },
    {
      number: '03',
      title: 'DevOps & SRE',
      description: 'Reliability engineering, monitoring, and automation. We ensure your systems stay up, perform well, and recover gracefully.',
      deliverables: ['Monitoring & Alerting', 'Incident Response', 'Performance Optimization', 'Security Hardening'],
    },
    {
      number: '04',
      title: 'Technical Leadership & Consulting',
      description: 'Fractional CTO services, architecture reviews, and technical strategy. Get experienced engineering leadership without the full-time hire.',
      deliverables: ['Architecture Reviews', 'Team Mentorship', 'Technical Roadmaps', 'Hiring & Scaling'],
    },
  ];

  return (
    <section ref={ref} className="relative bg-surface py-20 md:py-32">
      {/* Header */}
      <div className="container mb-16">
        <span className="text-orange text-label uppercase tracking-label font-cabinet font-medium mb-6 block">
          What We Offer
        </span>
        <h2 className="font-clash font-semibold text-section leading-section text-text-primary mb-6">
          Engineering services
          <br />
          that ship.
        </h2>
      </div>

      {/* Services Grid */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-8 hover:shadow-orange-glow/30 transition-all duration-300 group"
            >
              {/* Number */}
              <div className="flex items-start gap-6 mb-6">
                <span className="font-clash font-bold text-6xl text-orange/20 group-hover:text-orange/40 transition-colors duration-300">
                  {service.number}
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="font-clash font-semibold text-2xl md:text-3xl text-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed font-cabinet mb-6">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Deliverables */}
              <div className="pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-3">
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-orange text-xs">●</span>
                      <span className="text-text-muted text-sm font-cabinet">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

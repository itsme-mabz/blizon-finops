'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
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

  const services = [
    {
      tag: 'START HERE — FREE',
      tagColor: 'text-orange',
      price: null,
      title: 'Cloud Cost Audit',
      description:
        'We spend 60 minutes on your actual bill. We find the waste, calculate the savings, send you the full report. Yours to keep — no strings, no pitch, no commitment required.',
      cta: 'Book Free Audit →',
      href: '#audit',
      gridSpan: 'lg:col-span-5',
    },
    {
      tag: 'MOST POPULAR',
      tagColor: 'text-gold',
      price: 'From $3,500',
      title: '30-Day Sprint',
      description:
        'We execute the fixes. Rightsizing, reserved instances, storage cleanup, tagging strategy. Done in 30 days with full documentation.',
      cta: 'Get Started →',
      href: '#contact',
      gridSpan: 'lg:col-span-4',
    },
    {
      tag: 'ONGOING',
      tagColor: 'text-text-muted',
      price: 'From $1,500/mo',
      title: 'FinOps Retainer',
      description:
        'Monthly cost governance. Anomaly alerts. Continuous optimization as you scale.',
      cta: 'Learn More →',
      href: '#contact',
      gridSpan: 'lg:col-span-3',
    },
  ];

  return (
    <section ref={ref} id="services" className="relative py-20 md:py-32 bg-surface">
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="mb-6"
          >
            <span className="text-orange text-label uppercase tracking-label font-cabinet font-medium">
              What We Do
            </span>
          </motion.div>

          <div className="overflow-hidden">
            {['Three ways to', 'fix your bill.'].map((line, index) => (
              <div key={index} className="overflow-hidden">
                <motion.h2
                  custom={index}
                  initial={{ y: 60, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
                  transition={{
                    delay: index * 0.08 + 0.1,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-clash font-semibold text-section leading-section text-text-primary"
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              variants={cardVariants}
              className={`${service.gridSpan} group`}
            >
              <div className="glass p-8 h-full flex flex-col hover:shadow-orange-glow transition-all duration-300 cursor-hover">
                {/* Tag */}
                <div className="mb-4">
                  <span
                    className={`${service.tagColor} text-[10px] uppercase tracking-wider font-cabinet font-medium`}
                  >
                    {service.tag}
                  </span>
                </div>

                {/* Price */}
                {service.price && (
                  <div className="mb-4">
                    <span className="text-orange font-mono text-lg">{service.price}</span>
                  </div>
                )}

                {/* Title */}
                <h3 className="font-clash font-semibold text-2xl text-text-primary mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-base leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="text-orange hover:text-gold transition-colors duration-200 font-cabinet font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all cursor-hover"
                >
                  {service.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

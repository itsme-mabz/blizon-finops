'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const techCategories = [
    {
      category: 'Frontend',
      techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      techs: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis'],
    },
    {
      category: 'Cloud & Infrastructure',
      techs: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
    },
    {
      category: 'DevOps & Tools',
      techs: ['GitHub Actions', 'GitLab CI', 'Datadog', 'Sentry', 'Grafana'],
    },
  ];

  return (
    <section ref={ref} className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-clash font-bold text-gold text-center"
          style={{
            fontSize: 'clamp(200px, 30vw, 500px)',
            lineHeight: 1,
            opacity: 0.02,
          }}
        >
          STACK
        </span>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-orange text-label uppercase tracking-label font-cabinet font-medium mb-6 block">
            Our Stack
          </span>
          <h2 className="font-clash font-semibold text-section leading-section text-text-primary">
            Modern tools.
            <br />
            Battle-tested practices.
          </h2>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((cat, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: catIndex * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Category */}
              <div className="pb-3 border-b border-orange/30">
                <h3 className="font-clash font-semibold text-text-primary text-lg">
                  {cat.category}
                </h3>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                {cat.techs.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: catIndex * 0.1 + techIndex * 0.05, duration: 0.4 }}
                    className="text-text-secondary text-sm font-cabinet hover:text-text-primary transition-colors duration-200 cursor-default"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

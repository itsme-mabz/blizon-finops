'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ServicesPopup() {
  const [isMinimized, setIsMinimized] = useState(true);

  const services = [
    { icon: '</>', name: 'Full-Stack Dev' },
    { icon: '☁', name: 'Cloud & Infrastructure' },
    { icon: '⚙', name: 'DevOps & SRE' },
    { icon: '◆', name: 'Tech Leadership' },
  ];

  return (
    <div className="fixed bottom-0 right-0 z-50">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // Minimized State - Small Badge
          <motion.button
            key="minimized"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsMinimized(false)}
            className="group relative h-16 px-5 bg-orange hover:bg-orange/90 flex items-center justify-center shadow-orange-glow hover:shadow-orange-glow/60 transition-all duration-300 cursor-hover"
          >
            <span className="text-2xl font-clash font-bold text-black">Engineering Services</span>

            {/* Ping animation */}
            <span className="absolute inset-0  bg-orange animate-ping opacity-20" />

            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-1.5 bg-surface border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              <span className="text-xs font-cabinet text-text-secondary">View Services</span>
            </div>
          </motion.button>
        ) : (
          // Maximized State - Services Card
          <motion.div
            key="maximized"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 glass border-orange/30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-orange text-xl leading-none">■</span>
                <h3 className="font-clash font-semibold text-text-primary text-sm">
                  Engineering Services
                </h3>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="w-6 h-6 flex items-center justify-center hover:bg-border rounded transition-colors duration-200 cursor-hover"
                aria-label="Minimize"
              >
                <span className=" text-lg">—</span>
              </button>
            </div>

            {/* Services List */}
            <div className="p-4 space-y-2">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex items-center gap-3 p-2 hover:bg-surface/50 rounded transition-colors duration-200"
                >
                  <span className="text-orange text-sm font-mono">{service.icon}</span>
                  <span className="text-sm font-cabinet text-text-secondary">
                    {service.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="p-4 pt-2 border-t border-border">
              <Link
                href="/services"
                className="group relative w-full flex items-center justify-between px-4 py-3 bg-orange/10 border border-orange/30 rounded overflow-hidden cursor-hover"
              >
                {/* Background Fill on Hover - slides left to right */}
                <div className="absolute inset-0 bg-orange -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                <span className="relative text-sm font-clash font-semibold text-orange group-hover:text-black transition-colors duration-500 ease-out">
                  View All Services
                </span>
                <span className="relative text-orange group-hover:text-black transition-all duration-500 ease-out group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Footer Note */}
            <div className="px-4 pb-4">
              <p className="text-xs text-text-muted font-cabinet text-center">
                Free consultation • Fast response
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

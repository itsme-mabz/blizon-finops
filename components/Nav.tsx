'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '#about' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-[16px]' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 cursor-hover">
              <span className="text-orange text-4xl leading-none">■</span>
              <span className="font-clash font-semibold  text-xl text-text-primary">
                BLIZON
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-[15px] cursor-hover"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://calendly.com/hello-blizon/30min"
                target="_blank"
                className="px-6 py-2.5 border border-orange text-orange hover:bg-orange hover:text-black transition-all duration-200 font-cabinet font-medium cursor-hover"
              >
                Free Audit →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-6 h-5 cursor-hover"
              aria-label="Toggle menu"
            >
              <span
                className={`w-full h-0.5 bg-text-primary transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-text-primary transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-text-primary transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`font-clash font-semibold text-4xl text-text-primary hover:text-orange transition-all duration-300 cursor-hover ${
                mobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 0.1}s` : '0s',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://calendly.com/hello-blizon/30min"
            target="_blank"
            onClick={handleLinkClick}
            className={`mt-4 px-8 py-4 rounded-sm border-2 border-orange text-orange hover:bg-orange hover:text-black transition-all duration-200 font-clash font-semibold text-xl cursor-hover ${
              mobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: mobileMenuOpen ? `${navLinks.length * 0.1}s` : '0s',
            }}
          >
            Free Audit →
          </Link>
        </div>
      </div>
    </>
  );
}

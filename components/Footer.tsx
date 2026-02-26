'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'FinOps Services', href: '#services' },
    { label: 'Engineering Services', href: '/services' },
    { label: 'Process', href: '#process' },
    { label: 'Book Audit', href: '#audit' },
  ];

  return (
    <footer className="bg-black border-t border-border">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange text-xl leading-none">■</span>
              <span className="font-clash font-semibold text-lg text-text-primary">BLIZON</span>
            </div>
            <p className="text-text-secondary text-sm font-cabinet leading-relaxed">
              FinOps Engineering for Funded Startups
            </p>
          </div>

          {/* Middle - Links */}
          <div>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-orange transition-colors duration-200 text-sm font-cabinet cursor-hover"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right - Contact */}
          <div className="flex flex-col gap-3">
            <a
              href="https://www.linkedin.com/company/blizon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-orange transition-colors duration-200 text-sm font-cabinet cursor-hover"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@blizon.com"
              className="text-text-secondary hover:text-orange transition-colors duration-200 text-sm font-cabinet cursor-hover"
            >
              hello@blizon.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-orange/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-muted text-sm font-cabinet">© {currentYear} Blizon</p>
            <p className="text-text-muted text-sm font-cabinet">
              Built by engineers, for engineers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

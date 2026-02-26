'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Frame Components - Standardized Layout
function Frame1() {
  return (
    <div className="w-full bg-surface/50 border h-[60vh] border-border p-8 md:p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="mb-4">
          <h3 className="font-clash font-semibold text-3xl md:text-4xl text-text-primary mb-4">
            The Audit Call
          </h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            We start with a free 60-minute call. No pitch deck. No sales script. Just your actual bill and two engineers who know what to look for.
          </p>
        </div>
        <div className="bg-black/80 p-6 border border-border flex-1 flex flex-col justify-center overflow-hidden">
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-text-muted mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square border border-border/30 ${
                  i === 16
                    ? 'bg-orange/20 border-orange flex items-center justify-center'
                    : 'bg-black/50'
                }`}
              >
                {i === 16 && (
                  <div className="text-xs text-orange font-mono">60m</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="w-full bg-surface/50 border h-[60vh] border-border p-8 md:p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="mb-4">
          <h3 className="font-clash font-semibold text-3xl md:text-4xl text-text-primary mb-4">
            Read-Only Access
          </h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            You grant read-only access. Nothing changes in your infrastructure. We just look.
          </p>
        </div>
        <div className="bg-black/80 p-6 border border-border flex-1 flex flex-col justify-center overflow-hidden">
          <div className="space-y-2 font-mono text-sm">
            <p className="text-green-500">$ aws configure</p>
            <p className="text-text-primary">AWS Access Key ID: AKIA***************</p>
            <p className="text-text-primary">AWS Secret Key: **********************</p>
            <p className="text-green-500 mt-4">✓ Read-only access granted</p>
            <p className="text-text-muted mt-4">Permissions: ReadOnlyAccess</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="w-full bg-surface/50 border h-[60vh] border-border p-8 md:p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="mb-4">
          <h3 className="font-clash font-semibold text-3xl md:text-4xl text-text-primary mb-4">
            Full Bill Analysis
          </h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            We go line by line. Every service, every region, every resource. Most teams have never seen their bill this clearly.
          </p>
        </div>
        <div className="bg-black/80 p-6 border border-border flex-1 flex flex-col justify-center overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <h4 className="font-cabinet font-semibold text-text-primary text-sm">
              AWS Cost Explorer — January 2025
            </h4>
            <span className="text-text-muted text-xs font-mono">Total: $21,847</span>
          </div>
          <div className="flex items-end justify-between gap-2 flex-1">
            {[
              { height: '85%', label: 'EC2', cost: '$8.2K' },
              { height: '65%', label: 'RDS', cost: '$5.1K' },
              { height: '45%', label: 'S3', cost: '$2.8K' },
              { height: '38%', label: 'Lambda', cost: '$1.9K' },
              { height: '52%', label: 'EBS', cost: '$3.1K' },
              { height: '28%', label: 'Other', cost: '$700' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                <div className="flex-1 w-full flex flex-col justify-end">
                  <div
                    className="w-full bg-red-900/40 border border-red-800/50"
                    style={{ height: bar.height }}
                  />
                </div>
                <span className="text-[10px] text-text-muted font-mono">{bar.cost}</span>
                <span className="text-[10px] text-text-muted">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="w-full bg-surface/50 border h-[60vh] border-border p-8 md:p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="mb-4">
          <h3 className="font-clash font-semibold text-3xl md:text-4xl text-text-primary mb-4">
            Waste Flagged
          </h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            We flag everything. Idle instances. Forgotten snapshots. Dev environments burning money at 3am.
          </p>
        </div>
        <div className="bg-black/80 p-6 border border-border flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <h4 className="font-cabinet font-semibold text-text-primary text-sm">
              Waste Identified
            </h4>
            <span className="text-orange text-xs font-mono">$6,900/mo waste</span>
          </div>
          <div className="flex items-end justify-between gap-2 flex-1 mb-4">
            {[
              { height: '85%', label: 'EC2', cost: '$8.2K', waste: '$2.1K', hasWaste: true },
              { height: '65%', label: 'RDS', cost: '$5.1K', waste: '$3.2K', hasWaste: true },
              { height: '45%', label: 'S3', cost: '$2.8K', waste: null, hasWaste: false },
              { height: '38%', label: 'Lambda', cost: '$1.9K', waste: null, hasWaste: false },
              { height: '52%', label: 'EBS', cost: '$3.1K', waste: '$800', hasWaste: true },
              { height: '28%', label: 'Other', cost: '$700', waste: null, hasWaste: false },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full relative">
                <div className="flex-1 w-full flex flex-col justify-end">
                  <div
                    className={`w-full ${
                      bar.hasWaste
                        ? 'bg-orange/20 border-2 border-orange'
                        : 'bg-surface border border-border'
                    }`}
                    style={{ height: bar.height }}
                  />
                </div>
                {bar.hasWaste && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[10px] font-mono text-orange bg-black px-1 py-0.5 border border-orange">
                      {bar.waste}
                    </span>
                  </div>
                )}
                <span className="text-[10px] text-text-muted font-mono">{bar.cost}</span>
                <span className="text-[10px] text-text-muted">{bar.label}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
            <div className="text-xs">
              <span className="text-orange">■</span> <span className="font-mono">$2.1K</span>
            </div>
            <div className="text-xs">
              <span className="text-orange">■</span> <span className="font-mono">$800</span>
            </div>
            <div className="text-xs">
              <span className="text-orange">■</span> <span className="font-mono">$3.2K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="w-full bg-surface/50 border h-[60vh] border-border p-8 md:p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="mb-4">
          <h3 className="font-clash font-semibold text-3xl md:text-4xl text-text-primary mb-4">
            The Savings Report
          </h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            48 hours later, you get the full report. Exact numbers. Exact fixes. Exact savings. You own it whether or not you hire us.
          </p>
        </div>
        <div className="bg-black/80 p-6 border border-border flex-1 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-text-secondary font-cabinet font-medium">Issue</th>
                <th className="text-right py-2 text-text-secondary font-cabinet font-medium">Waste</th>
                <th className="text-left py-2 text-text-secondary font-cabinet font-medium">Fix</th>
                <th className="text-right py-2 text-text-secondary font-cabinet font-medium">Savings</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr className="border-b border-border/50">
                <td className="py-2 text-text-primary">Idle EC2</td>
                <td className="py-2 text-right text-orange">$2.1K</td>
                <td className="py-2 text-text-muted">Terminate</td>
                <td className="py-2 text-right text-green-500">$2.1K</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 text-text-primary">Orphaned EBS</td>
                <td className="py-2 text-right text-orange">$800</td>
                <td className="py-2 text-text-muted">Delete</td>
                <td className="py-2 text-right text-green-500">$800</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 text-text-primary">Over-provisioned RDS</td>
                <td className="py-2 text-right text-orange">$3.2K</td>
                <td className="py-2 text-text-muted">Rightsize</td>
                <td className="py-2 text-right text-green-500">$3.2K</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 text-text-primary">RI gaps</td>
                <td className="py-2 text-right text-orange">$1.2K</td>
                <td className="py-2 text-text-muted">Purchase RIs</td>
                <td className="py-2 text-right text-green-500">$1.2K</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gold">
                <td className="py-3 text-text-primary font-cabinet font-semibold" colSpan={3}>
                  Total Annual Savings
                </td>
                <td className="py-3 text-right text-gold font-semibold text-base">$67,400</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="w-full bg-surface/50 border h-[60vh] border-border p-8 md:p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="mb-4">
          <h3 className="font-clash font-semibold text-3xl md:text-4xl text-text-primary mb-4">
            The Sprint
          </h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            If you want us to execute — we run a focused 30-day sprint. No distractions. Just fixes.
          </p>
        </div>
        <div className="bg-black/80 p-6 border border-border flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <h4 className="font-cabinet font-semibold text-text-primary text-sm">30-Day Sprint Board</h4>
            <span className="text-text-muted text-xs">Day 12 of 30</span>
          </div>
          <div className="grid grid-cols-3 gap-4 flex-1 overflow-hidden">
            {[
              { title: 'To Fix', count: 4, items: ['Snapshot cleanup', 'Tag architecture', 'S3 lifecycle'] },
              { title: 'In Progress', count: 3, items: ['EC2 rightsizing', 'RDS optimization', 'Reserved instances'] },
              { title: 'Done', count: 5, items: ['Idle EC2 audit', 'EBS cleanup', 'IAM audit'] },
            ].map((col, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-cabinet font-medium text-text-primary text-xs uppercase tracking-wide">
                    {col.title}
                  </h5>
                  <span className="text-[10px] text-text-muted font-mono">{col.count}</span>
                </div>
                <div className="space-y-1">
                  {col.items.map((item, j) => (
                    <div
                      key={j}
                      className={`p-2 border text-[10px] ${
                        i === 2
                          ? 'bg-green-900/10 border-green-800/30'
                          : i === 1
                            ? 'bg-orange/10 border-orange/30'
                            : 'bg-surface border-border'
                      }`}
                    >
                      <p className="text-text-primary">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="w-full bg-surface/50 border h-[60vh] border-border p-8 md:p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="mb-4">
          <h3 className="font-clash font-semibold text-3xl md:text-4xl text-text-primary mb-4">
            Bill Drops
          </h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            Your bill drops. Real money. Measurable from the first invoice after the sprint.
          </p>
        </div>
        <div className="bg-black/80 p-6 border border-border flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <h4 className="font-cabinet font-semibold text-text-primary text-sm">Monthly AWS Bill</h4>
            <span className="text-green-500 text-xs font-mono">-38% reduction</span>
          </div>
          <div className="relative flex-1 mb-4">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 50 L 100 48 L 200 52 L 300 50 L 400 49 L 500 130 L 600 132 L 700 128 L 800 130"
                stroke="#ff6b35"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 500 130 L 600 132 L 700 128 L 800 130 L 800 200 L 500 200 Z"
                fill="url(#grad)"
              />
              <circle cx="500" cy="130" r="6" fill="#ffd700" />
              <text x="500" y="115" fontSize="12" fill="#ffd700" textAnchor="middle">
                Blizon Sprint
              </text>
              <text x="250" y="70" fontSize="14" fill="#8a8399" textAnchor="middle">
                Before: $21.8K/mo
              </text>
              <text x="650" y="150" fontSize="14" fill="#ffd700" textAnchor="middle">
                After: $13.5K/mo
              </text>
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
            <div>
              <p className="text-text-muted text-xs mb-1">Monthly Savings</p>
              <p className="text-gold font-mono text-xl">$8.3K</p>
            </div>
            <div>
              <p className="text-text-muted text-xs mb-1">Annual Impact</p>
              <p className="text-gold font-mono text-xl">$99.6K</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="w-full bg-surface/50 border h-[60vh] border-border p-8 md:p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="mb-4">
          <h3 className="font-clash font-semibold text-3xl md:text-4xl text-text-primary mb-4">
            Ongoing Optionality
          </h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            Want us to stay? Monthly retainer. We watch your bill, catch anomalies, and keep optimizing as you scale.
          </p>
        </div>
        <div className="bg-black/80 p-6 border border-border flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <h4 className="font-cabinet font-semibold text-text-primary text-sm">FinOps Dashboard</h4>
            <span className="px-2 py-1 bg-green-900/20 border border-green-800/40 text-green-500 text-[10px] font-mono">
              Active
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: 'This Month', value: '$13.2K', change: '+2%', up: true },
              { label: 'vs Last Month', value: '-$380', change: null, up: false },
              { label: 'Anomalies', value: '0', change: null, up: null },
              { label: 'Score', value: '94', change: '+12', up: true },
            ].map((metric, i) => (
              <div key={i} className="p-3 bg-surface border border-border">
                <p className="text-text-muted text-[10px] mb-1">{metric.label}</p>
                <p className="text-text-primary font-mono text-base mb-0.5">{metric.value}</p>
                {metric.change && (
                  <p className={`text-[10px] font-mono ${metric.up ? 'text-green-500' : 'text-orange'}`}>
                    {metric.change}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-border space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">RI Coverage</span>
              <span className="text-green-500 font-mono">87%</span>
            </div>
            <div className="w-full h-2 bg-surface">
              <div className="h-full bg-green-500 w-[87%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const steps = [
  { component: Frame1, label: '' },
  { component: Frame2, label: '' },
  { component: Frame3, label: '' },
  { component: Frame4, label: '' },
  { component: Frame5, label: '' },
  { component: Frame6, label: '' },
  { component: Frame7, label: '' },
  { component: Frame8, label: '' },
];

function TimelineStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const Component = step.component;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative"
    >
      {/* Step Number & Label */}
      <div className="flex items-start gap-4 md:gap-8 mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-orange/10 border border-orange flex items-center justify-center">
            <span className="font-clash font-bold text-orange text-lg md:text-xl">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div className="pt-2">
          <h3 className="font-clash font-semibold text-xl md:text-2xl text-text-primary">
            {step.label}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div>
        <Component />
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="process" className="relative bg-surface py-20 md:py-32">
      {/* Intro */}
      <div className="container mb-16">
        <div className="max-w-4xl">
          <span className="text-orange text-label uppercase tracking-label font-cabinet font-medium mb-6 block">
            The Process
          </span>
          <h2 className="font-clash font-semibold text-section leading-section text-text-primary mb-6">
            From bloated bill
            <br />
            to optimized infra.
          </h2>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="container relative">
        {/* Timeline Line - Aligned with Heading */}
        <div className="absolute left-[32px] md:left-[32px] top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-8">
          {steps.map((step, index) => (
            <TimelineStep key={index} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Outro */}
      <div className="container mt-20">
        <p className="text-center text-text-secondary text-base font-cabinet">
          Most clients complete the full process in under 35 days.
        </p>
      </div>
    </section>
  );
}

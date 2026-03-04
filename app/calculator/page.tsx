'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import jsPDF from 'jspdf';


type YesNo = 'Yes' | 'No';

export default function FinOpsCalculator() {
    const [step, setStep] = useState(1);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    // Section 1: General Cloud Usage
    const [monthlySpend, setMonthlySpend] = useState<number>(50000);
    const [provider, setProvider] = useState<'AWS' | 'Azure' | 'GCP'>('AWS');
    const [numEngineers, setNumEngineers] = useState<number>(10);
    const [numEnvironments, setNumEnvironments] = useState<number>(3);

    // Section 2: Compute Waste
    const [ec2Count, setEc2Count] = useState<number>(50);
    const [lowCpuPercent, setLowCpuPercent] = useState<number>(30);
    const [run247, setRun247] = useState<YesNo>('Yes');
    const [autoScaling, setAutoScaling] = useState<YesNo>('No');
    const [unusedEipPercent, setUnusedEipPercent] = useState<number>(10);
    const [orphanedEbs, setOrphanedEbs] = useState<number>(5);

    // Section 3: Storage Waste
    const [s3StorageTb, setS3StorageTb] = useState<number>(20);
    const [infrequentDataPercent, setInfrequentDataPercent] = useState<number>(40);
    const [lifecycle, setLifecycle] = useState<YesNo>('No');
    const [unattachedEbsPercent, setUnattachedEbsPercent] = useState<number>(15);

    // Section 4: Commitment & Pricing
    const [useRi, setUseRi] = useState<YesNo>('No');
    const [useSp, setUseSp] = useState<YesNo>('No');
    const [predictablePercent, setPredictablePercent] = useState<number>(70);
    const [useSpot, setUseSpot] = useState<YesNo>('No');

    // Section 5: Monitoring & Governance
    const [trackCost, setTrackCost] = useState<YesNo>('No');
    const [useBudgets, setUseBudgets] = useState<YesNo>('No');
    const [taggingEnforced, setTaggingEnforced] = useState<YesNo>('No');
    const [finopsTeam, setFinopsTeam] = useState<YesNo>('No');
    const [error, setError] = useState<string | null>(null);

    const showError = (msg: string) => {
        setError(msg);
        setTimeout(() => setError(null), 3000);
    };

    const handleNext = () => {
        if (step === 1 && (monthlySpend < 0 || numEngineers < 0 || numEnvironments < 0)) return showError("Values cannot be negative.");


        if (step === 2 && (ec2Count < 0 || lowCpuPercent < 0 || unusedEipPercent < 0 || orphanedEbs < 0)) return showError("Values cannot be negative.");
        if (step === 3 && (s3StorageTb < 0 || infrequentDataPercent < 0 || unattachedEbsPercent < 0)) return showError("Values cannot be negative.");
        if (step === 4 && predictablePercent < 0) return showError("Values cannot be negative.");

        setError(null);
        setStep((s) => Math.min(s + 1, 6));
    };
    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    // Calculations
    const results = useMemo(() => {
        // We calculate waste percentages in different categories
        // Base assumptions based on industry averages

        // Compute Waste factors
        let computeWastePct = 0;
        if (run247 === 'Yes') computeWastePct += 8; // instances running all the time
        if (autoScaling === 'No') computeWastePct += 10; // adjusted from 12 for realism
        computeWastePct += (lowCpuPercent / 100) * 10; // Over-provisioned
        if (ec2Count > 100 && autoScaling === 'No') computeWastePct += 3; // large fleet + no scaling = chaos
        computeWastePct += (unusedEipPercent / 100) * 3; // unused EIP waste
        computeWastePct += Math.min(orphanedEbs * 0.2, 4); // orphaned EBS waste

        // Storage Waste factors
        let storageWastePct = 0;
        if (lifecycle === 'No') storageWastePct += 8;
        storageWastePct += (unattachedEbsPercent / 100) * 5;
        storageWastePct += (infrequentDataPercent / 100) * 5; // Using standard instead of glacier
        if (s3StorageTb > 200 && lifecycle === 'No') storageWastePct += 3; // large storage without lifecycle

        // Commitment Waste factors

        let commitmentWastePct = 0;
        if (useRi === 'No' && useSp === 'No') commitmentWastePct += 15; // adjusted from 18
        if (useSpot === 'No') commitmentWastePct += 4;
        if (provider === 'AWS' && useSp === 'No') commitmentWastePct += 2; // AWS savings plans are mature

        if (predictablePercent > 60 && useRi === 'No' && useSp === 'No') {
            commitmentWastePct += Math.min((predictablePercent - 60) * 0.1, 4); // predictability penalty
        }

        // Governance & Visibility 
        let governanceWastePct = 0;
        if (trackCost === 'No') governanceWastePct += 3;
        if (taggingEnforced === 'No') governanceWastePct += 6;
        if (finopsTeam === 'No') governanceWastePct += 3;
        if (useBudgets === 'No') governanceWastePct += 3;
        if (numEngineers > 20 && taggingEnforced === 'No') governanceWastePct += 3; // many engineers + no governance = sprawl

        let totalWastePct = computeWastePct + storageWastePct + commitmentWastePct + governanceWastePct;

        // Environments influence - more non-prod = more idle waste
        if (numEnvironments > 2) totalWastePct += Math.min((numEnvironments - 2) * 1.5, 6);

        // Cap total waste at reasonable realistic maximum (e.g. 50%)
        if (totalWastePct > 50) totalWastePct = 50;
        if (totalWastePct < 5) totalWastePct = 5; // always some waste

        const estimatedWaste = monthlySpend * (totalWastePct / 100);
        const annualWaste = estimatedWaste * 12;

        // Determine top areas
        const areas = [
            { name: 'Overprovisioned Compute', value: computeWastePct },
            { name: 'Unused Storage', value: storageWastePct },
            { name: 'No Commitment Discounts', value: commitmentWastePct },
            { name: 'Poor Governance & Tagging', value: governanceWastePct },
        ].sort((a, b) => b.value - a.value);

        return {
            totalWastePct,
            estimatedWaste,
            annualWaste,
            topAreas: areas.slice(0, 3)
        };
    }, [
        monthlySpend, provider, numEngineers, numEnvironments, ec2Count, unusedEipPercent, orphanedEbs,
        s3StorageTb, predictablePercent, run247, autoScaling, lowCpuPercent, lifecycle, unattachedEbsPercent,
        infrequentDataPercent, useRi, useSp, useSpot, trackCost, taggingEnforced, finopsTeam, useBudgets
    ]);

    const toggleBtnClass = (val: string, current: string) =>
        `py-3 px-6 font-medium transition-all duration-300 w-full ${val === current
            ? 'bg-orange text-black shadow-lg shadow-orange/20'
            : 'bg-surface border border-border text-text-secondary hover:border-orange/50 hover:text-text-primary'
        }`;

    const generatePDF = () => {
        setIsGeneratingPdf(true);
        try {
            const doc = new jsPDF();

            // Define colors
            const primaryColor = '#ff6b35';
            const textColor = '#333333';
            const mutedColor = '#666666';

            // Add Header
            doc.setFillColor(primaryColor);
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor('#ffffff');
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('Blizon FinOps Assessment Report', 20, 25);

            // Add basic info section
            let y = 60;
            doc.setTextColor(textColor);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Client Infrastructure Profile', 20, y);

            y += 10;
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(`Monthly Spend: $${monthlySpend.toLocaleString()}`, 20, y);
            doc.text(`Provider: ${provider}`, 100, y);

            y += 8;
            doc.text(`Total Environments: ${numEnvironments}`, 20, y);
            doc.text(`Total Engineers: ${numEngineers}`, 100, y);

            // Add Results Section
            y += 20;
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Financial Analysis', 20, y);

            y += 15;
            doc.setDrawColor(200, 200, 200);
            doc.setFillColor(245, 245, 245);
            doc.roundedRect(20, y, 170, 40, 3, 3, 'FD');

            y += 15;
            doc.setFontSize(12);
            doc.setTextColor(mutedColor);
            doc.text('Estimated Monthly Waste', 30, y);
            doc.text('Estimated Annual Waste', 110, y);

            y += 15;
            doc.setFontSize(24);
            doc.setTextColor(primaryColor);
            doc.setFont('helvetica', 'bold');
            doc.text(`$${results.estimatedWaste.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 30, y);
            doc.text(`$${results.annualWaste.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 110, y);

            // Add Recommendations Section
            y += 40;
            doc.setFontSize(14);
            doc.setTextColor(textColor);
            doc.setFont('helvetica', 'bold');
            doc.text('Top 3 Actionable Waste Areas', 20, y);

            y += 15;
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            results.topAreas.forEach((area) => {
                doc.setTextColor(primaryColor);
                doc.text(`►`, 20, y);
                doc.setTextColor(textColor);
                doc.text(area.name, 30, y);
                y += 10;
            });

            // Footer
            doc.setFontSize(10);
            doc.setTextColor(mutedColor);
            doc.text('Generated by Blizon — Expert FinOps Engineering for Series A/B Startups', 20, 280);
            doc.text('https://blizon.tech/calculator', 20, 285);

            // Save document
            doc.save('Blizon-Cloud-Waste-Report.pdf');
        } catch (error) {
            console.error('Failed to generate PDF:', error);
        } finally {
            setIsGeneratingPdf(false);
        }


    };

    const renderStepIndicator = () => (
        <div className="flex justify-between items-center mb-12 relative max-w-3xl mx-auto">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface rounded-full -z-10" />
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange rounded-full -z-10 transition-all duration-500"
                style={{ width: `${((step - 1) / 5) * 100}%` }}
            />
            {[1, 2, 3, 4, 5, 6].map((s) => (
                <div
                    key={s}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-clash font-semibold transition-all duration-300 ${s === step ? 'bg-orange text-black scale-110 shadow-[0_0_20px_rgba(255,107,53,0.4)]' :
                        s < step ? 'bg-orange text-black' : 'bg-surface text-text-muted border border-border'
                        }`}
                >
                    {s === 6 ? '✓' : s}
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-text-primary selection:bg-orange/30">
            <Nav />

            <main className="pt-32 pb-24 overflow-hidden relative">
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: -20, x: '-50%' }}
                            className="fixed top-24 left-1/2 z-50 bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-3 rounded-xl backdrop-blur-md shadow-[0_10px_40px_rgba(239,68,68,0.2)] flex items-center gap-3 font-cabinet"
                        >
                            <span className="text-xl">⚠️</span> {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Background effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-clash font-semibold mb-4 tracking-tight">
                            Cloud <span className="text-orange">FinOps</span> Calculator
                        </h1>
                        <p className="text-text-secondary md:text-lg max-w-2xl mx-auto font-cabinet">
                            Discover your hidden cloud waste and unlock capital for your product roadmap.
                            Takes exactly 2 minutes.

                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {renderStepIndicator()}

                        <div className="glass p-8 md:p-12 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden">
                            <AnimatePresence mode="wait">

                                {/* STEP 1: General */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-clash font-semibold mb-2">General Cloud Usage</h2>
                                            <p className="text-text-secondary text-sm">Let's start with the basics of your infrastructure.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-3">
                                                    <label className="text-sm font-cabinet font-medium text-text-secondary uppercase tracking-widest">Monthly Cloud Spend</label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary font-clash text-lg">$</span>
                                                        <input
                                                            type="number"
                                                            value={monthlySpend}
                                                            onChange={(e) => setMonthlySpend(Number(e.target.value))}
                                                            className="bg-surface border border-border rounded-lg py-2 pl-8 pr-4 text-orange font-clash font-semibold text-xl w-40 text-right focus:border-orange outline-none transition-colors"
                                                            min="0"
                                                        />
                                                    </div>
                                                </div>
                                                <input type="range" min="5000" max="500000" step="1000" value={monthlySpend} onChange={(e) => setMonthlySpend(Number(e.target.value))} className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-orange" />
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-sm font-cabinet font-medium text-text-secondary uppercase tracking-widest">Cloud Provider</label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {['AWS', 'Azure', 'GCP'].map(prov => (
                                                        <button key={prov} onClick={() => setProvider(prov as 'AWS' | 'Azure' | 'GCP')} className={toggleBtnClass(prov, provider)}>{prov}</button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-end">
                                                        <label className="text-sm font-cabinet font-medium text-text-secondary uppercase tracking-widest">Engineers</label>
                                                        <span className="text-xl font-clash">{numEngineers}</span>
                                                    </div>
                                                    <input type="range" min="0" max="100" value={numEngineers} onChange={(e) => setNumEngineers(Number(e.target.value))} className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-orange" />
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-end">
                                                        <label className="text-sm font-cabinet font-medium text-text-secondary uppercase tracking-widest">Environments</label>
                                                        <span className="text-xl font-clash">{numEnvironments} (Dev/Stg/Prod)</span>
                                                    </div>
                                                    <input type="range" min="1" max="10" value={numEnvironments} onChange={(e) => setNumEnvironments(Number(e.target.value))} className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-orange" />
                                                    <p className="text-xs text-text-muted">Companies with multiple environments waste more in non-prod.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: Compute Waste */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-clash font-semibold mb-2">Compute Waste</h2>
                                            <p className="text-text-secondary text-sm">Compute is typically the biggest waste area.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Number of EC2/VMs</label>
                                                    <input type="number" value={ec2Count} onChange={(e) => setEc2Count(Number(e.target.value))} className="w-full bg-surface border border-border rounded-lg py-3 px-4 text-text-primary focus:border-orange outline-none transition-colors" />
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-end">
                                                        <label className="text-sm font-cabinet font-medium text-text-secondary uppercase tracking-widest">% under 40% CPU</label>
                                                        <span className="text-xl font-clash">{lowCpuPercent}%</span>
                                                    </div>
                                                    <input type="range" min="0" max="100" value={lowCpuPercent} onChange={(e) => setLowCpuPercent(Number(e.target.value))} className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-orange" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Running 24/7?</label>
                                                    <div className="flex gap-4">
                                                        <button onClick={() => setRun247('Yes')} className={toggleBtnClass('Yes', run247)}>Yes</button>
                                                        <button onClick={() => setRun247('No')} className={toggleBtnClass('No', run247)}>No</button>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Use Auto Scaling?</label>
                                                    <div className="flex gap-4">
                                                        <button onClick={() => setAutoScaling('Yes')} className={toggleBtnClass('Yes', autoScaling)}>Yes</button>
                                                        <button onClick={() => setAutoScaling('No')} className={toggleBtnClass('No', autoScaling)}>No</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border/50">
                                                <div className="space-y-4">
                                                    <div className="flex justify-between">
                                                        <label className="text-sm text-text-secondary uppercase tracking-widest">% Unused IPs</label>
                                                        <span>{unusedEipPercent}%</span>
                                                    </div>
                                                    <input type="range" min="0" max="100" value={unusedEipPercent} onChange={e => setUnusedEipPercent(Number(e.target.value))} className="w-full h-1.5 bg-border rounded-lg appearance-none accent-orange" />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-sm text-text-secondary uppercase tracking-widest">Orphaned Volumes</label>
                                                    <input type="number" value={orphanedEbs} onChange={(e) => setOrphanedEbs(Number(e.target.value))} className="w-full bg-surface border border-border rounded-lg py-3 px-4 outline-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: Storage Waste */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-clash font-semibold mb-2">Storage Waste</h2>
                                            <p className="text-text-secondary text-sm">Common waste: No lifecycle policies, forgotten backups.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
                                                    <label className="text-sm text-text-secondary uppercase tracking-widest">Total Object Storage (TB)</label>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            value={s3StorageTb}
                                                            onChange={(e) => setS3StorageTb(Number(e.target.value))}
                                                            className="bg-surface border border-border rounded-lg py-2 pl-4 pr-10 text-white font-clash text-xl w-32 text-right focus:border-orange outline-none transition-colors"
                                                            min="0"
                                                        />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary font-clash">TB</span>
                                                    </div>
                                                </div>


                                                <input type="range" min="1" max="1000" value={s3StorageTb} onChange={(e) => setS3StorageTb(Number(e.target.value))} className="w-full h-1.5 bg-border rounded-lg appearance-none accent-orange" />
                                            </div>



                                            <div className="space-y-4">
                                                <div className="flex justify-between">
                                                    <label className="text-sm text-text-secondary uppercase tracking-widest">% Infrequently Accessed</label>
                                                    <span>{infrequentDataPercent}%</span>
                                                </div>
                                                <input type="range" min="0" max="100" value={infrequentDataPercent} onChange={(e) => setInfrequentDataPercent(Number(e.target.value))} className="w-full h-1.5 bg-border rounded-lg appearance-none accent-orange" />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Lifecycle Policies?</label>
                                                    <div className="flex gap-4">
                                                        <button onClick={() => setLifecycle('Yes')} className={toggleBtnClass('Yes', lifecycle)}>Yes</button>
                                                        <button onClick={() => setLifecycle('No')} className={toggleBtnClass('No', lifecycle)}>No</button>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between">
                                                        <label className="text-sm text-text-secondary uppercase tracking-widest">% Unattached Volumes</label>
                                                        <span>{unattachedEbsPercent}%</span>
                                                    </div>
                                                    <input type="range" min="0" max="100" value={unattachedEbsPercent} onChange={(e) => setUnattachedEbsPercent(Number(e.target.value))} className="w-full h-1.5 bg-border rounded-lg appearance-none accent-orange" />
                                                </div>
                                            </div>


                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 4: Commitment & Pricing */}
                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-clash font-semibold mb-2">Commitment Optimization</h2>
                                            <p className="text-text-secondary text-sm">This is BIG for FinOps. Missed commitments = huge overpayments.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Use Reserved Instances?</label>
                                                    <div className="flex gap-4">
                                                        <button onClick={() => setUseRi('Yes')} className={toggleBtnClass('Yes', useRi)}>Yes</button>
                                                        <button onClick={() => setUseRi('No')} className={toggleBtnClass('No', useRi)}>No</button>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Use Savings Plans?</label>
                                                    <div className="flex gap-4">
                                                        <button onClick={() => setUseSp('Yes')} className={toggleBtnClass('Yes', useSp)}>Yes</button>
                                                        <button onClick={() => setUseSp('No')} className={toggleBtnClass('No', useSp)}>No</button>
                                                    </div>
                                                </div>
                                            </div>




                                            <div className="space-y-4">
                                                <div className="flex justify-between">
                                                    <label className="text-sm text-text-secondary uppercase tracking-widest">% Workloads Predictable</label>
                                                    <span className="text-xl font-clash">{predictablePercent}%</span>
                                                </div>
                                                <input type="range" min="0" max="100" value={predictablePercent} onChange={(e) => setPredictablePercent(Number(e.target.value))} className="w-full h-1.5 bg-border rounded-lg appearance-none accent-orange" />
                                            </div>

                                            <div className="space-y-3 pt-4 border-t border-border/50">
                                                <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Use Spot Instances?</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <button onClick={() => setUseSpot('Yes')} className={toggleBtnClass('Yes', useSpot)}>Yes</button>
                                                    <button onClick={() => setUseSpot('No')} className={toggleBtnClass('No', useSpot)}>No</button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 5: Governance */}
                                {step === 5 && (
                                    <motion.div
                                        key="step5"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div>



                                            <h2 className="text-2xl font-clash font-semibold mb-2">Monitoring & Governance</h2>
                                            <p className="text-text-secondary text-sm">Poor governance equals hidden long-term waste.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Track Cost Per Service?</label>
                                                <div className="flex gap-4">
                                                    <button onClick={() => setTrackCost('Yes')} className={toggleBtnClass('Yes', trackCost)}>Yes</button>
                                                    <button onClick={() => setTrackCost('No')} className={toggleBtnClass('No', trackCost)}>No</button>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Use Cloud Budgets?</label>
                                                <div className="flex gap-4">
                                                    <button onClick={() => setUseBudgets('Yes')} className={toggleBtnClass('Yes', useBudgets)}>Yes</button>
                                                    <button onClick={() => setUseBudgets('No')} className={toggleBtnClass('No', useBudgets)}>No</button>
                                                </div>
                                            </div>
                                            <div className="space-y-3 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6">
                                                <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Tagging Enforced?</label>
                                                <div className="flex gap-4">
                                                    <button onClick={() => setTaggingEnforced('Yes')} className={toggleBtnClass('Yes', taggingEnforced)}>Yes</button>
                                                    <button onClick={() => setTaggingEnforced('No')} className={toggleBtnClass('No', taggingEnforced)}>No</button>
                                                </div>
                                            </div>
                                            <div className="space-y-3 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6">
                                                <label className="text-sm font-cabinet text-text-secondary uppercase tracking-widest">Dedicated FinOps Team?</label>
                                                <div className="flex gap-4">
                                                    <button onClick={() => setFinopsTeam('Yes')} className={toggleBtnClass('Yes', finopsTeam)}>Yes</button>
                                                    <button onClick={() => setFinopsTeam('No')} className={toggleBtnClass('No', finopsTeam)}>No</button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 6: Results */}
                                {step === 6 && (
                                    <motion.div
                                        key="step6"
                                        id="report-container"
                                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-10 p-2 md:p-6 rounded-2xl bg-black/40"
                                    >
                                        <div className="text-center">
                                            <div className="inline-block bg-orange/10 text-orange px-4 py-1.5 rounded-full text-sm font-cabinet uppercase tracking-widest font-medium mb-6">
                                                Analysis Complete
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-clash font-semibold mb-2">
                                                Estimated Monthly Waste
                                            </h2>
                                            <div className="text-5xl md:text-7xl font-clash font-bold text-orange my-6 tracking-tighter">
                                                ${results.estimatedWaste.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                            </div>
                                            <p className="text-text-secondary text-lg">
                                                That's roughly <span className="text-white font-medium">{Math.round(results.totalWastePct)}%</span> of your monthly spend.
                                            </p>
                                        </div>




                                        <div className="bg-surface rounded-2xl p-6 border border-border">
                                            <div className="text-center mb-6">
                                                <p className="text-sm text-text-secondary uppercase tracking-widest">Potential Annual Savings</p>
                                                <div className="text-3xl font-clash font-semibold text-white mt-1">
                                                    ${results.annualWaste.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                                </div>
                                            </div>

                                            <div className="border-t border-border pt-6 mt-6">
                                                <h3 className="text-sm text-text-secondary uppercase tracking-widest mb-4 font-medium flex items-center gap-2">
                                                    <span className="text-orange"></span> Top 3 Waste Areas
                                                </h3>
                                                <ul className="space-y-4">
                                                    {results.topAreas.map((area, idx) => (
                                                        <li key={idx} className="flex justify-between items-center text-sm md:text-base">
                                                            <span className="text-white font-cabinet">{area.name}</span>
                                                            <div className="bg-black py-1 px-3 rounded-md text-orange font-mono">
                                                                Impact: High
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-center space-y-6">
                                            <p className="text-lg font-cabinet bg-orange/5 border border-orange/20 rounded-xl py-4 px-6 inline-block">
                                                We typically reduce cloud spend by <span className="text-orange font-bold">22–35%</span> within 90 days.
                                            </p>

                                            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                                                <button
                                                    onClick={generatePDF}
                                                    disabled={isGeneratingPdf}
                                                    className={`py-5 px-8 w-full md:w-auto bg-surface border border-border text-text-primary font-cabinet font-semibold text-lg rounded-xl hover:border-orange/50 transition-all duration-300 flex items-center justify-center gap-2 ${isGeneratingPdf ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {isGeneratingPdf ? 'Generating...' : 'Download Report'}
                                                </button>



                                                <a
                                                    href="https://calendly.com/hello-blizon/30min"
                                                    target="_blank"
                                                    className="w-full md:w-auto py-5 px-10 bg-orange text-black font-clash font-bold text-lg rounded-xl shadow-[0_15px_40px_rgba(255,107,53,0.3)] hover:shadow-[0_20px_50px_rgba(255,107,53,0.4)] transition-all duration-300 hover:text-black transform hover:-translate-y-1 block text-center"
                                                >
                                                 Book Free Cloud Assessment
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons (Hidden on Results) */}
                        {step < 6 && (
                            <div className="flex justify-between mt-8">
                                <button
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    className={`py-3 px-6 font-cabinet font-medium transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-text-secondary hover:text-white hover:bg-surface'
                                        }`}
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="py-3 px-8 bg-white text-black font-clash font-semibold hover:bg-orange transition-colors shadow-lg shadow-white/5"
                                >
                                    {step === 5 ? 'Calculate Waste ' : 'Next Step →'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

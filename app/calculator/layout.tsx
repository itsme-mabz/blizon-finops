import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Cloud Savings Calculator | Blizon",
    description: "Calculate how much your startup can save on AWS, GCP, or Azure costs with Blizon's expert FinOps engineering.",
    openGraph: {
        title: "Cloud Savings Calculator — Blizon",
        description: "Estimate your monthly and annual cloud savings with our interactive FinOps calculator.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Blizon Cloud Savings Calculator"
            }
        ]
    }
};

export default function CalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

import type { Metadata } from 'next';

export const calculatorMetadata: Metadata = {
    title: "FinOps Calculator — Free Cloud Cost Savings Estimator",
    description: "Use Blizon's free FinOps calculator to estimate your cloud waste and potential savings on AWS, Azure, or GCP. Get an instant breakdown of compute, storage, and commitment savings.",
    keywords: [
        "finops calculator",
        "cloud cost calculator",
        "cloud savings calculator",
        "AWS cost calculator",
        "cloud waste calculator",
        "cloud cost optimization calculator",
        "finops roi calculator",
        "cloud savings estimator",
        "AWS savings calculator",
        "GCP cost calculator",
        "Azure cost calculator",
        "cloud spend calculator",
        "reserved instance calculator",
        "spot instance savings calculator",
        "cloud cost reduction tool",
        "finops tool",
        "cloud cost estimator",
        "AWS waste calculator",
        "kubernetes cost optimization",
        "cloud billing calculator"
    ],
    alternates: {
        canonical: 'https://blizon.tech/calculator',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://blizon.tech/calculator",
        siteName: "Blizon",
        title: "FinOps Calculator — Free Cloud Cost Savings Estimator | Blizon",
        description: "Estimate how much your company is wasting on AWS, Azure, or GCP cloud spend. Blizon's free FinOps calculator gives you an instant savings report.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Blizon FinOps Calculator — Free Cloud Cost Savings Estimator"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "FinOps Calculator — Free Cloud Cost Savings Estimator | Blizon",
        description: "Estimate your AWS, Azure, or GCP cloud waste in minutes. Free FinOps calculator by Blizon.",
        images: ["/og-image.png"],
        creator: "@blizon",
        site: "@blizon"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
        },
    },
};

export const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FinOps Calculator",
    "alternateName": "Cloud Cost Savings Calculator",
    "url": "https://blizon.tech/calculator",
    "description": "A free interactive FinOps calculator to estimate cloud waste and potential savings on AWS, Azure, and GCP. Covers compute, storage, networking, and commitment discounts.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "isAccessibleForFree": true,
    "provider": {
        "@type": "Organization",
        "name": "Blizon",
        "url": "https://blizon.tech"
    },
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "featureList": [
        "AWS cloud cost savings estimate",
        "GCP cloud cost savings estimate",
        "Azure cloud cost savings estimate",
        "Compute waste analysis",
        "Storage waste analysis",
        "Reserved instance savings calculator",
        "Spot instance savings calculator",
        "Network cost analysis",
        "Kubernetes cost optimization estimate",
        "PDF report generation"
    ],
    "screenshot": "https://blizon.tech/og-image.png",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "50",
        "bestRating": "5"
    }
};

export const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "FinOps Calculator — Free Cloud Cost Savings Estimator",
    "url": "https://blizon.tech/calculator",
    "description": "Use Blizon's free FinOps calculator to estimate your cloud waste and potential savings on AWS, Azure, or GCP.",
    "isPartOf": {
        "@type": "WebSite",
        "name": "Blizon",
        "url": "https://blizon.tech"
    },
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://blizon.tech"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "FinOps Calculator",
                "item": "https://blizon.tech/calculator"
            }
        ]
    },
    "mainEntity": {
        "@type": "WebApplication",
        "name": "FinOps Calculator",
        "url": "https://blizon.tech/calculator"
    }
};

export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is a FinOps calculator?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A FinOps calculator is a free tool that estimates how much your company is overspending on cloud infrastructure (AWS, Azure, GCP) and shows potential savings from optimizations like reserved instances, rightsizing, and storage cleanup."
            }
        },
        {
            "@type": "Question",
            "name": "How accurate is this cloud cost calculator?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Blizon's FinOps calculator uses industry-standard waste benchmarks to provide accurate savings estimates. Results are based on your actual inputs such as monthly cloud spend, number of instances, and current usage patterns."
            }
        },
        {
            "@type": "Question",
            "name": "Is this FinOps calculator free to use?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Blizon's cloud cost savings calculator is completely free. No sign-up required. You can also download your results as a PDF report."
            }
        },
        {
            "@type": "Question",
            "name": "Which cloud providers does this calculator support?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Blizon FinOps calculator supports AWS (Amazon Web Services), GCP (Google Cloud Platform), and Azure (Microsoft Azure)."
            }
        }
    ]
};

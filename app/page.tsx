import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Stats from '@/components/Stats';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import WhyBlizon from '@/components/WhyBlizon';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ServicesPopup from '@/components/ServicesPopup';

export const metadata: Metadata = {
  title: "Cloud Cost Optimization & FinOps for Funded Startups",
  description: "Cut AWS and GCP costs 20-40% in 30 days. Free audit for Series A/B startups. Expert FinOps engineering.",
  keywords: [
    "cloud cost optimization",
    "FinOps",
    "AWS cost reduction",
    "GCP optimization",
    "startup engineering"
  ],
  openGraph: {
    title: "Stop Burning Cloud Budget — Cut Costs 20-40% in 30 Days",
    description: "Free cloud audit for Series A/B startups. Expert FinOps engineering that cuts AWS and GCP costs without touching your roadmap.",
    url: "https://blizon.tech",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blizon FinOps - Cut Cloud Costs by 20-40%"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Burning Cloud Budget — Cut Costs 20-40% in 30 Days",
    description: "Free cloud audit for Series A/B startups. Expert FinOps engineering that cuts AWS and GCP costs.",
  },
  alternates: {
    canonical: "https://blizon.tech",
  },
};

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does Blizon do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We reduce AWS and GCP costs by 20-40% in 30 days for funded startups through FinOps engineering."
        }
      },
      {
        "@type": "Question",
        "name": "How much can you reduce my cloud costs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typically 20-40% within 30 days. Most clients save more in month one than our entire fee."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer a free audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, free 60-minute audit with no commitment or credit card required."
        }
      },
      {
        "@type": "Question",
        "name": "What is FinOps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Financial Operations - bringing financial accountability to cloud spending through engineering and optimization."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://blizon.tech"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Stats />
        <HowItWorks />
        <Services />
        <WhyBlizon />

        <FinalCTA />
      </main>
      <Footer />
      <ServicesPopup />
    </>
  );
}

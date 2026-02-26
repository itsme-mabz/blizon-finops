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
  description: "Blizon cuts AWS, GCP, and DigitalOcean costs by 20–40% in 30 days for Series A and B startups. Free cloud audit. Expert FinOps engineering without touching your roadmap. FinOps certified team with 15+ years experience.",
  keywords: [
    "AWS cost optimization",
    "GCP cost reduction",
    "DigitalOcean cost savings",
    "cloud cost audit",
    "FinOps services",
    "cloud spend optimization",
    "infrastructure cost reduction",
    "startup cloud costs",
    "Series A cloud optimization",
    "Series B cost engineering"
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
        "name": "What does Blizon company do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Blizon is a FinOps engineering and cloud cost optimization company that helps Series A and B funded startups reduce their AWS, GCP, and DigitalOcean cloud costs by 20-40% in 30 days. We also provide full-stack development, cloud architecture, DevOps, and technical consulting services."
        }
      },
      {
        "@type": "Question",
        "name": "How much can Blizon reduce my cloud costs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Blizon typically reduces AWS, GCP, and DigitalOcean costs by 20-40% within the first 30 days for Series A and B funded startups. Most clients save more in month one than our entire fee. Average monthly savings range from $5,000 to $50,000 depending on your infrastructure size."
        }
      },
      {
        "@type": "Question",
        "name": "What cloud providers does Blizon support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Blizon provides FinOps and cost optimization services for AWS (Amazon Web Services), GCP (Google Cloud Platform), and DigitalOcean. We also support multi-cloud environments and hybrid cloud architectures."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the cloud cost optimization process take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Blizon works in 30-day sprints. Initial cost reductions are typically achieved within the first 30 days, with ongoing optimization and monitoring continuing as needed. The discovery phase takes 1 week, followed by immediate implementation."
        }
      },
      {
        "@type": "Question",
        "name": "Does Blizon offer a free cloud audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Blizon offers a free cloud cost audit for Series A and B funded startups. The audit takes 60 minutes with no commitment or credit card required. You'll receive a detailed report with specific cost-saving opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "Who founded Blizon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Blizon was founded in 2025 by experienced cloud engineers and FinOps practitioners with 15+ years combined experience in cloud infrastructure, cost optimization, and software engineering."
        }
      },
      {
        "@type": "Question",
        "name": "What is FinOps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FinOps (Financial Operations) is a practice that brings financial accountability to cloud spending. It combines financial management, cloud engineering, and business operations to optimize cloud costs while maintaining performance and scalability."
        }
      },
      {
        "@type": "Question",
        "name": "Does Blizon work with startups only?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Blizon specializes in Series A and B funded startups but also works with seed-stage companies and growth-stage businesses. Our services are optimized for companies spending $10,000+ monthly on cloud infrastructure."
        }
      },
      {
        "@type": "Question",
        "name": "What engineering services does Blizon provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beyond FinOps, Blizon provides full-stack development (React, Next.js, TypeScript, Node.js), cloud architecture (AWS, GCP, Kubernetes), DevOps & SRE services, and fractional CTO/technical leadership consulting."
        }
      },
      {
        "@type": "Question",
        "name": "How does Blizon pricing work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most Blizon clients save more in the first month than our entire fee. We offer transparent pricing based on your infrastructure size and complexity. Contact us for a free audit and custom quote. No long-term contracts required."
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

import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import TechStack from '@/components/services/TechStack';
import WorkProcess from '@/components/services/WorkProcess';
import ServicesCTA from '@/components/services/ServicesCTA';

export const metadata: Metadata = {
  title: 'Engineering Services — Full-Stack, Cloud, DevOps & Technical Leadership',
  description: 'Expert software engineering services for funded startups. Full-stack development with React/Next.js, cloud architecture on AWS/GCP, DevOps & SRE, and fractional CTO services. Modern tech stack, battle-tested practices, 2-week sprints.',
  keywords: [
    'full-stack development',
    'React development',
    'Next.js development',
    'TypeScript development',
    'cloud architecture',
    'AWS architecture',
    'GCP cloud services',
    'Kubernetes consulting',
    'DevOps services',
    'SRE services',
    'site reliability engineering',
    'fractional CTO',
    'technical consulting',
    'startup engineering',
    'software engineering services',
    'CI/CD pipeline',
    'infrastructure as code',
    'Terraform consulting',
    'Docker consulting'
  ],
  openGraph: {
    title: 'Engineering Services — We Build. You Scale.',
    description: 'Full-stack development, cloud architecture, DevOps & SRE for funded startups. Modern stack, 2-week sprints, shipped code.',
    url: 'https://blizon.tech/services',
    type: 'website',
    images: [
      {
        url: '/og-services.png',
        width: 1200,
        height: 630,
        alt: 'Blizon Engineering Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Services — We Build. You Scale.',
    description: 'Full-stack development, cloud architecture, DevOps & SRE for funded startups.',
  },
  alternates: {
    canonical: 'https://blizon.tech/services',
  },
};

export default function ServicesPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Blizon Engineering Services",
    "description": "Professional software engineering and cloud services",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Full-Stack Development",
          "description": "Modern web and mobile applications built with React, Next.js, TypeScript, and Node.js. Focus on performance, scalability, and maintainability.",
          "provider": {
            "@type": "Organization",
            "name": "Blizon"
          },
          "areaServed": "US",
          "serviceType": "Software Development"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Cloud Architecture & Infrastructure",
          "description": "AWS, GCP, and multi-cloud solutions designed for scale. Containerization, serverless, and infrastructure that grows with you.",
          "provider": {
            "@type": "Organization",
            "name": "Blizon"
          },
          "areaServed": "US",
          "serviceType": "Cloud Computing"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "DevOps & SRE",
          "description": "Reliability engineering, monitoring, and automation. Systems that stay up, perform well, and recover gracefully.",
          "provider": {
            "@type": "Organization",
            "name": "Blizon"
          },
          "areaServed": "US",
          "serviceType": "IT Services"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Technical Leadership & Consulting",
          "description": "Fractional CTO services, architecture reviews, and technical strategy. Experienced engineering leadership without full-time hire.",
          "provider": {
            "@type": "Organization",
            "name": "Blizon"
          },
          "areaServed": "US",
          "serviceType": "Consulting"
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
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Engineering Services",
        "item": "https://blizon.tech/services"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Nav />
      <main>
        <ServicesHero />
        <ServicesList />
        <TechStack />
        <WorkProcess />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  );
}

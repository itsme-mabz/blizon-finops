import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ff6b35",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://blizon.tech'),
  title: {
    default: "Blizon — Cloud Cost Optimization & FinOps for Funded Startups",
    template: "%s | Blizon"
  },
  description: "Cut AWS and GCP costs by 20-40% in 30 days. Expert FinOps engineering for Series A/B startups. Free audit, no commitment.",
  keywords: [
    "FinOps",
    "cloud cost optimization",
    "AWS cost reduction",
    "GCP optimization",
    "cloud engineering",
    "DevOps",
    "cloud architecture",
    "Series A startups",
    "infrastructure optimization"
  ],
  authors: [{ name: "Blizon", url: "https://blizon.tech" }],
  creator: "Blizon",
  publisher: "Blizon",
  applicationName: "Blizon",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blizon.tech",
    siteName: "Blizon",
    title: "Blizon — Cloud Cost Optimization & FinOps for Funded Startups",
    description: "Cut AWS and GCP costs by 20–40% in 30 days. Expert FinOps engineering for Series A/B startups. Free cloud audit, no commitment.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blizon - FinOps Engineering for Funded Startups"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blizon — Cloud Cost Optimization & FinOps for Funded Startups",
    description: "Cut AWS and GCP costs by 20–40% in 30 days. Expert FinOps engineering for Series A/B startups. Free cloud audit.",
    images: ["/twitter-image.png"],
    creator: "@blizon",
    site: "@blizon"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://blizon.tech',
  },
  category: 'technology',
  classification: 'Business',
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'facebook-domain-verification': 'your-facebook-verification-code',
    'company': 'Blizon',
    'industry': 'Cloud Computing, FinOps, Software Engineering',
    'target-audience': 'Series A and B Funded Startups',
    'geo.region': 'US',
    'geo.placename': 'United States',
    'rating': 'general',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "Corporation", "TechCompany"],
    "name": "Blizon",
    "legalName": "Blizon Inc.",
    "alternateName": "Blizon Tech",
    "url": "https://blizon.tech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://blizon.tech/logo.png",
      "width": "512",
      "height": "512"
    },
    "image": "https://blizon.tech/og-image.png",
    "description": "FinOps engineering company specializing in cloud cost optimization for funded startups.",
    "slogan": "FinOps Engineering for Funded Startups",
    "foundingDate": "2025",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    },
    "email": "hello@blizon.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-XXX-XXX-XXXX",
        "contactType": "customer service",
        "email": "hello@blizon.com",
        "availableLanguage": ["English"],
        "areaServed": "US"
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "hello@blizon.com",
        "availableLanguage": ["English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "United States"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Global"
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/blizon",
      "https://twitter.com/blizon",
      "https://github.com/blizon"
    ],
    "knowsAbout": ["FinOps", "Cloud Cost Optimization", "DevOps"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "FinOps & Cloud Optimization",
          "description": "Reduce cloud costs by 20-40%"
        },
        {
          "@type": "Service",
          "name": "Engineering Services",
          "description": "Full-stack development and DevOps"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "award": [
      "FinOps Certified",
      "AWS Partner",
      "GCP Partner"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Blizon",
    "url": "https://blizon.tech",
    "description": "FinOps Engineering and Cloud Cost Optimization for Funded Startups",
    "publisher": {
      "@type": "Organization",
      "name": "Blizon"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://blizon.tech/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Blizon",
    "image": "https://blizon.tech/logo.png",
    "url": "https://blizon.tech",
    "telephone": "+1-XXX-XXX-XXXX",
    "email": "hello@blizon.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.7749",
      "longitude": "-122.4194"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://linkedin.com/company/blizon",
      "https://twitter.com/blizon",
      "https://github.com/blizon"
    ]
  };

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": "Blizon",
    "description": "FinOps Engineering for Funded Startups",
    "logo": "https://blizon.tech/logo.png",
    "url": "https://blizon.tech",
    "slogan": "Stop Burning Cloud Budget"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';
import { hygraph, GET_ALL_POSTS, Post } from '@/lib/hygraph';

export const metadata: Metadata = {
  title: 'Blog — FinOps Insights & Cloud Cost Optimization Tips',
  description: 'Expert insights on FinOps, cloud cost optimization, AWS and GCP best practices, and engineering tips for funded startups.',
  keywords: [
    'FinOps blog',
    'cloud cost optimization',
    'AWS tips',
    'GCP optimization',
    'DevOps insights',
    'startup engineering'
  ],
  openGraph: {
    title: 'Blog — FinOps Insights & Cloud Optimization',
    description: 'Expert insights on cloud cost optimization and FinOps engineering.',
    url: 'https://blizon.tech/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — FinOps Insights & Cloud Optimization',
    description: 'Expert insights on cloud cost optimization and FinOps engineering.',
  },
  alternates: {
    canonical: 'https://blizon.tech/blog',
  },
};

async function getPosts(): Promise<Post[]> {
  try {
    const data = await hygraph.request<{ posts: Post[] }>(GET_ALL_POSTS);
    return data.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const revalidate = 0; // Disable ISR cache

export default async function BlogPage() {
  const posts = await getPosts();

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blizon Blog",
    "description": "FinOps insights, cloud cost optimization tips, and engineering best practices",
    "url": "https://blizon.tech/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Blizon",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blizon.tech/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <Nav />
      <main className="bg-black min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-surface to-black">
          <div className="container">
            <div className="max-w-3xl">
              <span className="text-orange text-label uppercase tracking-label font-cabinet font-medium mb-6 block">
                Insights & Resources
              </span>
              <h1 className="font-clash font-bold text-hero leading-[0.9] text-text-primary mb-6">
                Blog
              </h1>
              <p className="text-subhead text-text-secondary font-cabinet leading-relaxed">
                FinOps insights, cloud cost optimization strategies, and engineering best practices
                for funded startups.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <BlogList posts={posts} />
      </main>
      <Footer />
    </>
  );
}

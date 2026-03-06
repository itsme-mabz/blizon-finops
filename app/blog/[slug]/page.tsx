import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BlogPost from '@/components/blog/BlogPost';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blogs';

interface Props {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags ? post.tags.split('\n').map((t: string) => t.trim()) : [],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://blizon.tech/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      images: post.featuredImage?.url
        ? [{ url: post.featuredImage.url, alt: post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage?.url ? [post.featuredImage.url] : [],
    },
    alternates: {
      canonical: `https://blizon.tech/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p: any) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage?.url ?? '',
    "datePublished": post.publishedDate,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Blizon",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blizon.tech/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://blizon.tech/blog/${post.slug}`
    },
    "articleSection": post.category,
    ...(post.tags && { "keywords": post.tags }),
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
        "name": "Blog",
        "item": "https://blizon.tech/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://blizon.tech/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Nav />
      <main className="bg-black min-h-screen">
        <BlogPost post={post} />
        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BlogPost from '@/components/blog/BlogPost';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { hygraph, GET_POST_BY_SLUG, GET_ALL_POST_SLUGS, GET_RELATED_POSTS, Post } from '@/lib/hygraph';

interface Props {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const data = await hygraph.request<{ post: Post }>(GET_POST_BY_SLUG, { slug });
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

async function getRelatedPosts(categorySlug: string, currentSlug: string): Promise<Post[]> {
  try {
    const data = await hygraph.request<{ posts: Post[] }>(GET_RELATED_POSTS, {
      categorySlug,
      currentSlug,
    });
    return data.posts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const revalidate = 0; // Disable ISR cache

// Temporarily disable static generation for development
// export async function generateStaticParams() {
//   try {
//     const data = await hygraph.request<{ posts: { slug: string }[] }>(GET_ALL_POST_SLUGS);
//     return data.posts.map((post) => ({
//       slug: post.slug,
//     }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags ? post.tags.split(',').map(t => t.trim()) : [],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://blizon.tech/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage.url,
          width: post.coverImage.width,
          height: post.coverImage.height,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage.url],
    },
    alternates: {
      canonical: `https://blizon.tech/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category.slug, post.slug);

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage.url,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      ...(post.author.picture && { "image": post.author.picture.url }),
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
    "articleSection": post.category.name,
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

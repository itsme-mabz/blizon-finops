import { MetadataRoute } from 'next';
import { hygraph, GET_ALL_POST_SLUGS } from '@/lib/hygraph';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blizon.tech';
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Get blog post slugs
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const data = await hygraph.request<{ posts: { slug: string }[] }>(GET_ALL_POST_SLUGS);
    blogPosts = data.posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticPages, ...blogPosts];
}

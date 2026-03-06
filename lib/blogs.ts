import { hygraph } from './hygraph';

export const GET_BLOG_POSTS = `
  query GetBlogPosts {
    blogPosts {
      title
      slug
      author
      authorRole
      category
      excerpt
      readTime
      tags
      publishedDate
      displayOrder
      featuredImage {
        url
      }
      content {
        raw
      }
    }
  }
`;

export const GET_BLOG_POST_BY_SLUG = `
  query GetBlogPostBySlug($slug: String!) {
    blogPost(where: { slug: $slug }) {
      title
      slug
      author
      authorRole
      category
      excerpt
      readTime
      tags
      publishedDate
      displayOrder
      featuredImage {
        url
      }
      content {
        raw
      }
    }
  }
`;

export async function getBlogPosts() {
  try {
    const data = await hygraph.request(GET_BLOG_POSTS);
    return data.blogPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const data = await hygraph.request(GET_BLOG_POST_BY_SLUG, { slug });
    return data.blogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

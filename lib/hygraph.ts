import { GraphQLClient } from 'graphql-request';

const HYGRAPH_URL = process.env.NEXT_PUBLIC_HYGRAPH_URL || '';
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN || '';

// Public client (for regular queries)
export const hygraph = new GraphQLClient(HYGRAPH_URL, {
  headers: {
    ...(HYGRAPH_TOKEN && { Authorization: `Bearer ${HYGRAPH_TOKEN}` }),
  },
});

// Query to get all blog posts
export const GET_ALL_POSTS = `
  query GetAllPosts {
    posts(orderBy: publishedAt_DESC) {
      id
      title
      slug
      excerpt
      publishedAt
      coverImage {
        url
        width
        height
      }
      author {
        name
        picture {
          url
        }
      }
      category {
        name
        slug
      }
    }
  }
`;

// Query to get a single post by slug
export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      excerpt
      content {
        html
      }
      publishedAt
      updatedAt
      coverImage {
        url
        width
        height
      }
      author {
        name
        bio
        picture {
          url
        }
      }
      category {
        name
        slug
      }
      tags
    }
  }
`;

// Query to get all post slugs (for static generation)
export const GET_ALL_POST_SLUGS = `
  query GetAllPostSlugs {
    posts {
      slug
    }
  }
`;

// Query to get related posts
export const GET_RELATED_POSTS = `
  query GetRelatedPosts($categorySlug: String!, $currentSlug: String!) {
    posts(
      where: {
        category: { slug: $categorySlug }
        slug_not: $currentSlug
      }
      first: 3
      orderBy: publishedAt_DESC
    ) {
      id
      title
      slug
      excerpt
      publishedAt
      coverImage {
        url
        width
        height
      }
      author {
        name
      }
    }
  }
`;

// Query to get posts by category
export const GET_POSTS_BY_CATEGORY = `
  query GetPostsByCategory($categorySlug: String!) {
    posts(
      where: { category: { slug: $categorySlug } }
      orderBy: publishedAt_DESC
    ) {
      id
      title
      slug
      excerpt
      publishedAt
      coverImage {
        url
        width
        height
      }
      author {
        name
      }
      category {
        name
        slug
      }
    }
  }
`;

// Query to get all categories
export const GET_ALL_CATEGORIES = `
  query GetAllCategories {
    categories {
      name
      slug
      description
    }
  }
`;

// Types
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: {
    html: string;
  };
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  coverImage: {
    url: string;
    width: number;
    height: number;
  };
  author: {
    name: string;
    bio?: string;
    picture?: {
      url: string;
    };
  };
  category: {
    name: string;
    slug: string;
  };
  tags?: string;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
}

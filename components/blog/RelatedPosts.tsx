'use client';

import { Post } from '@/lib/hygraph';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="relative py-20 md:py-32 bg-surface">
      <div className="container">
        <h2 className="font-clash font-semibold text-section leading-section text-text-primary mb-12">
          Related Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

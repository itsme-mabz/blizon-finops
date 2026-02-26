'use client';

import { motion } from 'framer-motion';
import { Post } from '@/lib/hygraph';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="glass p-12 text-center">
            <p className="text-text-secondary font-cabinet text-lg">
              No blog posts yet. Check back soon for FinOps insights and cloud optimization tips.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

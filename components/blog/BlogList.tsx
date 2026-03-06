'use client';

import { motion } from 'framer-motion';
import { Post } from '@/lib/hygraph';
import BlogCard from './BlogCard';
import { useEffect, useState } from 'react';
import { getBlogPosts } from '@/lib/blogs';

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [blogs, setBlogs] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    async function fetchBlogs() {
      const blogPosts = await getBlogPosts();
      console.log('All Blogs:', blogPosts);
      setBlogs(blogPosts);
    }
    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return (
      <section className="py-10 md:py-32">
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

  const categories = ['All', ...Array.from(new Set(blogs.map((post: any) => post.category)))];
  const filteredBlogs = activeFilter === 'All' 
    ? blogs 
    : blogs.filter((post: any) => post.category === activeFilter);
  const visibleBlogs = filteredBlogs.slice(0, displayCount);
  const hasMore = displayCount < filteredBlogs.length;

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        {/* Filter Tabs */}
        <div className="mb-12">
          <h3 className="text-sm font-cabinet text-text-secondary uppercase tracking-widest mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setDisplayCount(6);
                }}
                className={`px-6 py-2 font-cabinet font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-orange text-black'
                    : 'bg-surface text-text-secondary hover:text-text-primary border border-border hover:border-orange/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {visibleBlogs.map((post: any, index: number) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="break-inside-avoid mb-8"
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
        
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setDisplayCount(prev => prev + 6)}
              className="px-8 py-3 bg-orange text-black font-cabinet font-semibold hover:bg-orange/90 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

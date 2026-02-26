'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Post } from '@/lib/hygraph';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block glass hover:shadow-orange-glow/30 transition-all duration-300 overflow-hidden h-full cursor-hover"
    >
      {/* Cover Image */}
      <div className="relative h-56 bg-surface overflow-hidden">
        <Image
          src={post.coverImage.url}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-xs font-mono text-black bg-orange px-3 py-1 font-semibold uppercase tracking-wide">
            {post.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 text-xs text-text-muted font-cabinet">
          <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
          <span>•</span>
          <span>{post.author.name}</span>
        </div>

        {/* Title */}
        <h3 className="font-clash font-semibold text-xl text-text-primary mb-3 group-hover:text-orange transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm font-cabinet leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read More */}
        <div className="mt-4 flex items-center gap-2 text-orange text-sm font-cabinet font-medium">
          <span>Read Article</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}

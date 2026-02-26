'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '@/lib/hygraph';

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-surface to-black">
        <div className="container max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-sm font-cabinet text-text-muted">
            <Link href="/" className="hover:text-orange transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-orange transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{post.category.name}</span>
          </nav>

          {/* Category Badge */}
          <div className="mb-6">
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="inline-block text-xs font-mono text-black bg-orange px-3 py-1 font-semibold uppercase tracking-wide hover:bg-gold transition-colors"
            >
              {post.category.name}
            </Link>
          </div>

          {/* Title */}
          <h1 className="font-clash font-bold text-hero leading-[0.9] text-text-primary mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-text-secondary font-cabinet mb-8">
            <div className="flex items-center gap-3">
              {post.author.picture && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.author.picture.url}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span>{post.author.name}</span>
            </div>
            <span className="text-text-muted">•</span>
            <span>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</span>
            {post.updatedAt && (
              <>
                <span className="text-text-muted">•</span>
                <span className="text-sm">
                  Updated {format(new Date(post.updatedAt), 'MMM dd, yyyy')}
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.trim() && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-mono text-text-muted border border-border px-3 py-1"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cover Image */}
      <section className="relative -mt-10 mb-20">
        <div className="container max-w-5xl">
          <div className="relative h-[400px] md:h-[500px] rounded-sm overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-3xl">
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-clash prose-headings:font-semibold prose-headings:text-text-primary
              prose-p:font-cabinet prose-p:text-text-secondary prose-p:leading-relaxed
              prose-a:text-orange prose-a:no-underline hover:prose-a:underline
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-code:text-orange prose-code:bg-surface prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-surface prose-pre:border prose-pre:border-border
              prose-ul:text-text-secondary prose-ol:text-text-secondary
              prose-li:marker:text-orange
              prose-blockquote:border-l-orange prose-blockquote:text-text-secondary prose-blockquote:italic
              prose-img:rounded-sm
              prose-hr:border-border"
            dangerouslySetInnerHTML={{ __html: post.content?.html || '' }}
          />

          {/* Author Bio */}
          {post.author.bio && (
            <div className="mt-16 pt-8 border-t border-border">
              <div className="glass p-8">
                <div className="flex items-start gap-4">
                  {post.author.picture && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={post.author.picture.url}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-clash font-semibold text-lg text-text-primary mb-2">
                      About {post.author.name}
                    </h3>
                    <p className="text-text-secondary text-sm font-cabinet leading-relaxed">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}

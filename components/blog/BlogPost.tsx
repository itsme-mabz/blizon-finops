'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

interface BlogPostProps {
  post: any;
}

export default function BlogPost({ post }: BlogPostProps) {
  const tags = post.tags && post.tags.trim() ? post.tags.split('\n').map((t: string) => t.trim()).filter(Boolean) : [];

  return (
    <article>
      

      {/* Pinterest-style Pin Layout */}
      <section className="py-20 md:py-20">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 xl:gap-16 items-start">

            {/* Left — Featured Image (sticky) */}
            <div className="lg:sticky lg:top-24">
              <div className="relative w-full overflow-hidden rounded-2xl bg-surface shadow-[0_8px_60px_rgba(0,0,0,0.6)]">
                {post.featuredImage?.url && (
                  <Image
                    src={post.featuredImage.url}
                    alt={post.title}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover rounded-2xl"
                    priority
                  />
                )}
                {/* Category overlay on image */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block text-xs font-mono font-semibold uppercase tracking-widest text-black bg-orange px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Metadata & Info */}
            <div className="flex flex-col gap-8 pt-2">

              {/* Title */}
              <div>
                <h1 className="font-clash font-bold text-[clamp(32px,4vw,64px)] leading-[1.05] text-text-primary mb-4">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="font-cabinet text-text-secondary text-lg leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Author Card */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange to-gold flex items-center justify-center flex-shrink-0">
                  <span className="font-clash font-bold text-black text-sm">
                    {post.author?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-cabinet font-semibold text-text-primary text-sm">{post.author}</p>
                  {post.authorRole && (
                    <p className="font-cabinet text-text-muted text-xs mt-0.5">{post.authorRole}</p>
                  )}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-1">Published</p>
                  <p className="font-cabinet text-text-primary font-medium">
                    {post.publishedDate ? format(parseISO(post.publishedDate), 'MMM dd, yyyy') : '—'}
                  </p>
                </div>
                {post.readTime && (
                  <div className="bg-surface border border-border rounded-xl p-4">
                    <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-1">Read Time</p>
                    <p className="font-cabinet text-text-primary font-medium">{post.readTime} min read</p>
                  </div>
                )}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div>
                  <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs font-mono text-text-secondary bg-surface border border-border hover:border-orange hover:text-orange transition-colors px-3 py-1.5 rounded-full cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Scroll cue */}
              <div className="flex items-center gap-3 text-text-muted">
                <div className="flex-1 h-px bg-border" />
                <span className="font-mono text-xs uppercase tracking-widest">Scroll to read</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-3xl">
          {/* Top accent line */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-0.5 bg-orange" />
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Article</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="font-cabinet text-text-secondary text-[17px] leading-[1.8]">
            {post.content?.raw && renderRichText(post.content.raw)}
          </div>
        </div>
      </section>
    </article>
  );
}

function renderRichText(raw: any) {
  return raw.children.map((node: any, index: number) => {
    if (node.type === 'paragraph') {
      const text = node.children.map((child: any) => child.text).join('');
      if (!text.trim()) return null;
      return (
        <p key={index} className="mb-8 text-text-secondary leading-[1.8]">
          {node.children.map((child: any, i: number) => {
            if (child.bold) return <strong key={i} className="text-text-primary font-semibold">{child.text}</strong>;
            if (child.italic) return <em key={i} className="text-text-secondary">{child.text}</em>;
            if (child.code) return <code key={i} className="font-mono text-orange bg-surface border border-border px-1.5 py-0.5 rounded text-sm">{child.text}</code>;
            return child.text;
          })}
        </p>
      );
    }
    if (node.type === 'heading-one') {
      return <h1 key={index} className="font-clash font-bold text-4xl text-text-primary mt-16 mb-6 leading-tight">{node.children.map((c: any) => c.text).join('')}</h1>;
    }
    if (node.type === 'heading-two') {
      return <h2 key={index} className="font-clash font-bold text-3xl text-text-primary mt-14 mb-5 leading-tight">{node.children.map((c: any) => c.text).join('')}</h2>;
    }
    if (node.type === 'heading-three') {
      return <h3 key={index} className="font-clash font-semibold text-2xl text-text-primary mt-12 mb-4 leading-tight">{node.children.map((c: any) => c.text).join('')}</h3>;
    }
    if (node.type === 'heading-four') {
      return <h4 key={index} className="font-clash font-semibold text-xl text-text-primary mt-10 mb-4">{node.children.map((c: any) => c.text).join('')}</h4>;
    }
    if (node.type === 'bulleted-list') {
      return (
        <ul key={index} className="mb-8 space-y-3 pl-0">
          {node.children.map((item: any, i: number) => (
            <li key={i} className="flex items-start gap-3 text-text-secondary">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
              <span>{item.children?.map((c: any) => c.children?.map((t: any) => t.text).join('') || c.text).join('')}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (node.type === 'numbered-list') {
      return (
        <ol key={index} className="mb-8 space-y-3 pl-0">
          {node.children.map((item: any, i: number) => (
            <li key={i} className="flex items-start gap-3 text-text-secondary">
              <span className="font-mono text-orange text-sm font-semibold flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}.</span>
              <span>{item.children?.map((c: any) => c.children?.map((t: any) => t.text).join('') || c.text).join('')}</span>
            </li>
          ))}
        </ol>
      );
    }
    if (node.type === 'block-quote') {
      return (
        <blockquote key={index} className="mb-8 pl-5 border-l-2 border-orange">
          <p className="text-text-secondary italic leading-[1.8]">{node.children.map((c: any) => c.text || c.children?.map((t: any) => t.text).join('')).join('')}</p>
        </blockquote>
      );
    }
    if (node.type === 'code-block') {
      return (
        <pre key={index} className="mb-8 p-5 bg-surface border border-border rounded-xl overflow-x-auto">
          <code className="font-mono text-sm text-text-secondary">{node.children.map((c: any) => c.text).join('')}</code>
        </pre>
      );
    }
    return null;
  });
}

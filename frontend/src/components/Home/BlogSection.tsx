import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const BLOG_POSTS = [
  { id: 1, title: 'Seasonal Tips & Expert Advice To Keep Your Outdoors Perfect', author: 'Katie Sims', avatar: '/images/sophia_portrait.jpg', image: '/images/blog_lawn_care.jpg' },
  { id: 2, title: 'Landscaping Insights & Winter Care For Every Home & Business', author: 'Lori Ward', avatar: '/images/about_gardener.jpg', image: '/images/blog_trimmer.jpg' },
];

export function BlogSection() {
  return (
    <section id="blog" className="py-20 md:py-28 max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Our Blog</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Transform Your Outdoors: <br className="hidden sm:block" /> Tips, Tricks & Inspiration
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="bg-white rounded-[2rem] p-5 border border-zinc-200/60 shadow-xl shadow-zinc-200/30 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center group">
            <div className="relative w-full sm:w-48 h-56 sm:h-40 rounded-2xl overflow-hidden flex-shrink-0">
              <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col justify-center flex-1 py-2">
              <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image src={post.avatar} alt={post.author} fill className="object-cover" />
                </div>
                <span className="font-medium text-zinc-800">{post.author}</span>
              </div>
              <h3 className="font-bold text-lg text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors mb-4">
                {post.title}
              </h3>
              <a href="#blog" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                Read Article <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

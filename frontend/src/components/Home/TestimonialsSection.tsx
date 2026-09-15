import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'They did amazing job removing a huge tree from my backyard. The team was professional, quick, and cleaned everything perfectly.',
    author: 'Kenneth Allen',
    role: 'Homeowner',
    avatar: '/images/worker_lead_portrait.jpg',
    rating: 5,
  },
  {
    id: 2,
    quote: 'After a storm knocked down a tree near our driveway, they responded quickly and had it cleared within hours.',
    author: 'Stephanie Nicol',
    role: 'Business Owner',
    avatar: '/images/sophia_portrait.jpg',
    rating: 5,
  },
  {
    id: 3,
    quote: 'The crew was polite, efficient, and made sure everything was done safely. I’ll definitely use them again.',
    author: 'Corina McCoy',
    role: 'Property Manager',
    avatar: '/images/about_gardener.jpg',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">
              Our Customers Love the <br className="hidden sm:block" /> Results We Deliver
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
              className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-all shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((offset) => {
            const item = TESTIMONIALS[(index + offset) % TESTIMONIALS.length];
            return (
              <div key={item.id} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-zinc-200/20 border border-zinc-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-emerald-500 font-serif text-5xl leading-none">“</span>
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-600 text-base leading-relaxed mb-8">{item.quote}</p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={item.avatar} alt={item.author} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">{item.author}</h4>
                    <p className="text-xs text-zinc-500">{item.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

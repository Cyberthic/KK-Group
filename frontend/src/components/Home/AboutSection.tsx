import React from 'react';
import Image from 'next/image';
import { Sparkles, Sprout, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about-us" className="py-16 md:py-24 max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: About Us Tag & Portrait Image */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>About Us</span>
          </div>

          <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/5 group">
            <Image
              src="/images/about_gardener.jpg"
              alt="Smiling woman landscaper with shears in lush greenhouse nursery"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Right Column: Headline, Copy & 2-Col Feature Highlights */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Building, maintaining, and <br className="hidden lg:block"/> transforming your spaces.
          </h2>

          <p className="mt-6 text-zinc-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            At KK Group, we believe every property deserves expert care and quality craftsmanship. Our mission is to deliver comprehensive,
            professional solutions—from construction and electrical to landscaping and real estate—so your projects are handled with excellence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 w-full">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-base">Complete Solutions</h4>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                  Whether you need a minor repair or a full-scale construction project, our experts are here to help.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-base">Trusted Experts</h4>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                  We&apos;ve built our reputation on trust, quality, and attention to detail.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="#services"
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Learn More About Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ArrowUpRight, Phone, CheckCircle2, ChevronDown } from 'lucide-react';

export function HeroSection() {
  // Consultation Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Lawn Mowing & Maintenance',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Lawn Mowing & Maintenance',
        message: '',
      });
    }, 4000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0d2315] border-b border-emerald-900/20 pt-32 pb-16 sm:pb-24 lg:pb-32">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_gardener.jpg"
          alt="Professional Friendly Landscaper and Lawn Care Specialist"
          fill
          priority
          className="object-cover object-center scale-[1.02] filter brightness-[0.88] contrast-[1.05]"
        />
        {/* Emerald Forest Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07190d]/95 via-[#0c2414]/75 to-[#0b2213]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091a0f] via-transparent to-[#07190d]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* ----------------- HERO MAIN GRID ----------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start pt-2 sm:pt-6">
            {/* Review Stars Pill */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                5.0 <span className="text-white/70 font-normal">(500+ reviews)</span>
              </span>
            </div>

            {/* Big Bold Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-white tracking-tight leading-[1.08] drop-shadow-md">
              Professional <br />
              Lawn Care for <br />
              Every Season
            </h1>

            {/* Subtitle */}
            <p className="mt-5 sm:mt-6 text-zinc-200 text-sm sm:text-base max-w-xl leading-relaxed">
              Tired of brown patches and weeds? We specialize in transforming lawns into vibrant,
              picture-perfect landscapes that you&apos;ll love.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-200 shadow-[0_4px_20px_rgba(22,163,74,0.4)] hover:scale-105 active:scale-95 group"
              >
                <div className="w-6 h-6 rounded-full bg-white text-[#16a34a] flex items-center justify-center font-bold shadow-sm group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <span>Explore Our Services</span>
              </a>

              <a
                href="tel:+17857126532"
                className="inline-flex items-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center shadow-sm">
                  <Phone className="w-3.5 h-3.5 fill-white" />
                </div>
                <span>Call Us Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Floating Consultation Form Card */}
          <div className="lg:col-span-5 relative w-full lg:-mb-40 lg:translate-y-4 z-20">
            <div className="bg-white dark:bg-zinc-900 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-zinc-100 dark:border-zinc-800">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-5">
                Book a Free Consultation
              </h3>

              {formSubmitted ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                    Consultation Booked!
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                    Our landscaping lead will reach out to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConsultationSubmit} className="space-y-4">
                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Your name*
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Johan Smit"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#f4f7f5] dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Email address*
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="info@Snowly.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#f4f7f5] dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone and Service Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Phone number*
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="775-329-1531"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#f4f7f5] dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Select a services*
                      </label>
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full appearance-none bg-[#f4f7f5] dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all pr-8"
                        >
                          <option value="Lawn Mowing & Maintenance">Lawn Mowing & Maintenance</option>
                          <option value="Coconut Harvesting & Tree Care">
                            Coconut Harvesting & Tree Care
                          </option>
                          <option value="Electrical & Equipment Service">
                            Electrical & Equipment Service
                          </option>
                          <option value="Plumbing & Irrigation Solutions">
                            Plumbing & Irrigation Solutions
                          </option>
                          <option value="Seasonal Cleanup & Weed Control">
                            Seasonal Cleanup & Weed Control
                          </option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Message*
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe your project"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#f4f7f5] dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] group mt-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-white text-[#16a34a] flex items-center justify-center shadow-sm group-hover:rotate-45 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                    <span>Send Now</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

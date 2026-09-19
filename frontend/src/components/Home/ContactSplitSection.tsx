'use client';

import React, { useState } from 'react';
import { EnquiryService } from '@/services';
import { Phone, ArrowRight, CheckCircle2, Loader2, MessageSquare, Sparkles } from 'lucide-react';

export function ContactSplitSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Cococare - Tree Services',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await EnquiryService.createEnquiry({
        serviceName: formData.service,
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email || undefined,
        message: formData.message,
      });

      setTrackingNumber(res.enquiry.trackingNumber);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setTrackingNumber(null);
    setError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Cococare - Tree Services',
      message: '',
    });
  };

  return (
    <section id="contact" className="relative w-full bg-[#07190f] text-white py-16 sm:py-20 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Card Split Container (Matches the Reference Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Card: White Contact Form Container */}
          <div className="lg:col-span-7 bg-white text-zinc-900 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-black text-2xl tracking-wider uppercase text-[#07190f]">
                    CONTACT
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Direct enquiry to KK Group operations desk
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#00754a]/10 text-[#00754a] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center my-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-lg text-zinc-900 uppercase">
                    Enquiry Received!
                  </h4>
                  <p className="text-xs text-zinc-600 mt-2 mb-4 leading-relaxed">
                    Our team has recorded your enquiry for <strong className="text-emerald-700">{formData.service}</strong>. A field coordinator will reach out to you within minutes.
                  </p>
                  {trackingNumber && (
                    <div className="bg-white border border-emerald-300 rounded-2xl p-4 mb-4">
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Tracking Reference</p>
                      <p className="text-lg font-mono font-black text-emerald-600">{trackingNumber}</p>
                    </div>
                  )}
                  <button
                    onClick={handleReset}
                    className="text-xs font-bold text-emerald-700 hover:underline uppercase tracking-wider"
                  >
                    Submit another request &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">
                      Name*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#f4f7f5] border border-zinc-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00754a] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#f4f7f5] border border-zinc-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00754a] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#f4f7f5] border border-zinc-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00754a] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">
                      Select Service*
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#f4f7f5] border border-zinc-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#00754a] transition-all"
                    >
                      <option value="Cococare - Tree Services">Cococare - Tree Services</option>
                      <option value="Electrical Services">Electrical Services</option>
                      <option value="Plumbing Services">Plumbing Services</option>
                      <option value="Construction Services">Construction Services</option>
                      <option value="Gardening & Landscaping">Gardening & Landscaping</option>
                      <option value="Welding Services">Welding Services</option>
                      <option value="JCB & Excavation">JCB & Excavation</option>
                      <option value="Borewell Services">Borewell Services</option>
                      <option value="Construction Materials">Construction Materials</option>
                      <option value="Real Estate Services">Real Estate Services</option>
                      <option value="Engineering Consulting">Engineering Consulting</option>
                      <option value="Hotel Services">Hotel Services</option>
                      <option value="Chicken & Egg Farming">Chicken & Egg Farming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">
                      Project Details / Requirements*
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Briefly describe what work you need done..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#f4f7f5] border border-zinc-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00754a] transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-full bg-[#00754a] hover:bg-[#00875a] disabled:opacity-50 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Card: Rich Emerald "THANK YOU!" Container */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#00754a] to-[#044a2e] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl flex flex-col justify-between border border-emerald-400/40 relative overflow-hidden group">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rapid Response Guaranteed</span>
              </div>

              <h3 className="font-black text-3xl sm:text-4xl tracking-tight uppercase leading-tight text-white mb-4">
                THANK YOU!
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-8">
                Hang tight! We&apos;re reviewing your requirements &amp; our certified field coordinators are connecting with your project immediately.
              </p>

              {/* Direct Hotline Box */}
              <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-5 mb-8">
                <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider mb-1">
                  Immediate Emergency Hotline
                </p>
                <a
                  href="tel:+17857126532"
                  className="text-xl sm:text-2xl font-mono font-black text-white hover:text-emerald-200 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-emerald-300" />
                  <span>(785) 712-6532</span>
                </a>
              </div>
            </div>

            {/* Bottom Circular Arrow Button (Matches circular arrow in reference) */}
            <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/20">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                Call Direct Now
              </span>
              <a
                href="tel:+17857126532"
                className="w-14 h-14 rounded-full bg-white text-[#00754a] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group-hover:bg-emerald-100"
                aria-label="Call directly"
              >
                <ArrowRight className="w-6 h-6" />
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

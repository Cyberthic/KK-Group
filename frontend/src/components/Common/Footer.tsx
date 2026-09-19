'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative w-full bg-[#05140c] text-white pt-20 pb-12 overflow-hidden border-t border-emerald-950 select-none">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Top Grid: Brand Seal, Blurb, Subscribe & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-emerald-900/30">
          
          {/* Col 1: Circular Brand Seal & Blurb */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full bg-[#00754a] border-2 border-emerald-400/40 p-1 flex items-center justify-center shadow-lg shadow-emerald-950 overflow-hidden">
                <Image
                  src="/logos/logo-bg.png"
                  alt="KK Group Circular Seal"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h4 className="font-black text-xl tracking-wider uppercase">KK GROUP</h4>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  Excellence Across Every Field
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/70 leading-relaxed max-w-sm mb-6">
              From precision palm tree climbing and certified electrical installations to heavy earthmoving and turnkey structural engineering. KK Group delivers trusted mastery under one unified roof.
            </p>

            <div className="space-y-2 text-xs text-emerald-200/80 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 (785) 712-6532 / 24/7 Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>dispatch@kkgroup.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Central HQ: Coimbatore, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h5 className="font-black text-xs uppercase tracking-widest text-emerald-400 mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-xs text-emerald-100/80 font-semibold">
              <li>
                <a href="#services" className="hover:text-emerald-300 transition-colors">
                  All 13 Services
                </a>
              </li>
              <li>
                <a href="#popular" className="hover:text-emerald-300 transition-colors">
                  Popular Offerings
                </a>
              </li>
              <li>
                <a href="#branches" className="hover:text-emerald-300 transition-colors">
                  Our Regional Branches
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-300 transition-colors">
                  Enterprise Portal Login
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-300 transition-colors">
                  Direct Enquiry Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Subscribe Form (Matches Reference Layout) */}
          <div className="md:col-span-4">
            <h5 className="font-black text-xs uppercase tracking-widest text-emerald-400 mb-2">
              SUBSCRIBE
            </h5>
            <p className="text-[11px] text-emerald-200/70 mb-4">
              Join our VIP list to receive seasonal tree care reminders, maintenance tips, and exclusive rates.
            </p>

            {subscribed ? (
              <div className="bg-[#0b291a] border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-2.5 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you for subscribing to KK Group updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0c2b1c] border border-emerald-700/50 rounded-full px-5 py-3 text-xs text-white placeholder:text-emerald-500/60 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-12 font-mono"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 w-9 h-9 rounded-full bg-[#00754a] hover:bg-[#00875a] text-white flex items-center justify-center transition-all shadow-md active:scale-95"
                    aria-label="Submit newsletter subscription"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-emerald-500/80 pl-2">
                  No spam. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-400/60 gap-4">
          <p>&copy; {new Date().getFullYear()} KK Group Enterprises. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-emerald-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-emerald-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-emerald-300 cursor-pointer">Safety Guidelines</span>
          </div>
        </div>

      </div>

      {/* Massive Faint Watermark at the Very Bottom (Matches "CONTACT" in reference design) */}
      <div className="relative w-full overflow-hidden pointer-events-none mt-8 -mb-6 flex justify-center">
        <span className="text-[64px] sm:text-[110px] md:text-[140px] lg:text-[180px] font-black tracking-[0.15em] uppercase text-emerald-950/40 select-none whitespace-nowrap font-sans leading-none">
          KK GROUP
        </span>
      </div>

    </footer>
  );
}

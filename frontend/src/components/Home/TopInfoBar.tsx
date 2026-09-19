'use client';

import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

export function TopInfoBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-zinc-900 border-b border-white/10 h-9 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">

          {/* Left — contact info */}
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <a
              href="tel:+17857126532"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors duration-150"
            >
              <Phone className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span className="hidden sm:inline">(785) 712-6532</span>
            </a>
            <a
              href="mailto:info@kkgroup.com"
              className="hidden md:flex items-center gap-1.5 hover:text-emerald-400 transition-colors duration-150"
            >
              <Mail className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span>info@kkgroup.com</span>
            </a>
            <span className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
            </span>
          </div>

          {/* Center — announcement */}
          <p className="hidden md:block text-[11px] text-zinc-400 font-medium tracking-wide">
            ✦ &nbsp;Professional Home &amp; Commercial Services &nbsp;✦
          </p>

          {/* Right — socials */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="text-zinc-500 hover:text-emerald-400 transition-colors duration-150"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-zinc-500 hover:text-emerald-400 transition-colors duration-150"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              className="text-zinc-500 hover:text-emerald-400 transition-colors duration-150"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

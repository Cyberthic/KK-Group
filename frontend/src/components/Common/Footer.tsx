import React from 'react';
import { Phone, MapPin, Mail, Globe, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-50 text-zinc-600 pt-20 pb-12 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-200">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-zinc-900 tracking-tight">KK Group</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-8">
              Professional multi-service solutions including construction, electrical, plumbing, real estate, and landscaping. Quality and reliability under one roof.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-emerald-600 hover:border-emerald-300 hover:shadow-md transition-all">
                  <Globe className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-zinc-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              {['Home', 'About Us', 'Services', 'Blog', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-emerald-600 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold text-zinc-900 mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="text-zinc-700">123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-zinc-700">421 Allen, Mexico 4233</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="text-zinc-700">snowly@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold text-zinc-900 mb-6">Working Hours</h4>
            <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-xl shadow-zinc-200/40 space-y-4 text-sm font-medium">
              <div className="flex justify-between pb-3 border-b border-zinc-50">
                <span className="text-zinc-900">Mon-Fri:</span>
                <span className="text-zinc-500">6:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-zinc-50">
                <span className="text-zinc-900">Saturday:</span>
                <span className="text-zinc-500">2:00 PM - 9:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-900">Sunday:</span>
                <span className="text-emerald-600 font-bold">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center text-sm font-medium text-zinc-400">
          <p>© {new Date().getFullYear()} KK Group. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

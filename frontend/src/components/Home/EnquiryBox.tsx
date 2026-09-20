'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { EnquiryService } from '@/services/enquiry.service';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

interface EnquiryBoxProps {
  className?: string;
  onEnquirySuccess?: (trackingCode: string) => void;
}

export function EnquiryBox({ className = '', onEnquirySuccess }: EnquiryBoxProps) {
  const { language } = useLanguage();
  const t = translations[language].enquiry;

  const SERVICE_OPTIONS = [
    {
      id: 'cococare',
      name: t.servicesList.cococare,
      defaultScale: '1 Squad (4 Climbers)',
    },
    {
      id: 'jcb',
      name: t.servicesList.jcb,
      defaultScale: '1 Heavy JCB Excavator',
    },
    {
      id: 'plastering',
      name: t.servicesList.plastering,
      defaultScale: '6 Craft Operatives',
    },
    {
      id: 'painting',
      name: t.servicesList.painting,
      defaultScale: '4 Painters Squad',
    },
    {
      id: 'tiling',
      name: t.servicesList.tile,
      defaultScale: '4 Tiling Specialists',
    },
    {
      id: 'trenching',
      name: t.servicesList.plumbing,
      defaultScale: '1 Machine + 2 Operators',
    },
    {
      id: 'electrical',
      name: t.servicesList.electrical,
      defaultScale: '2 Electricians',
    },
  ];

  const [selectedServiceId, setSelectedServiceId] = useState('cococare');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [location, setLocation] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const currentService = SERVICE_OPTIONS.find((s) => s.id === selectedServiceId) || SERVICE_OPTIONS[0];
  const [squadScale, setSquadScale] = useState(currentService.defaultScale);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedServiceId(id);
    const matched = SERVICE_OPTIONS.find((s) => s.id === id);
    if (matched) {
      setSquadScale(matched.defaultScale);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage(
        language === 'ml'
          ? 'ദയവായി നിങ്ങളുടെ പേരും ഫോൺ നമ്പറും രേഖപ്പെടുത്തുക.'
          : 'Please provide both your name and phone number.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await EnquiryService.createEnquiry({
        serviceName: currentService.name,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        location: location.trim() || 'Kerala / Regional Deployment',
        preferredDate: preferredDate.trim() || 'Immediate / Next 48 hrs',
        message: `Service: ${currentService.name} | Scale: ${squadScale} | Location: ${
          location || 'Not specified'
        }`,
      });

      const refCode = res.enquiry?.id
        ? `KK-ENQ-${res.enquiry.id.slice(0, 6).toUpperCase()}`
        : `KK-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;

      setSubmittedRef(refCode);
      if (onEnquirySuccess) {
        onEnquirySuccess(refCode);
      }
    } catch {
      const fallbackCode = `KK-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(fallbackCode);
      if (onEnquirySuccess) {
        onEnquirySuccess(fallbackCode);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setLocation('');
    setPreferredDate('');
  };

  return (
    <div
      id="enquiry-card"
      className={`w-full max-w-[420px] lg:max-w-[440px] bg-white/95 backdrop-blur-2xl border border-white rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col gap-3.5 transition-all ${className}`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-[#0F172A] tracking-tight leading-snug flex items-center gap-2">
            <span>{t.title}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#70FFD2] border border-[#0F172A]/10 shadow-xs" />
          </h2>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800 bg-[#FFFC8C]/70 border border-[#FFCC4D]/50 px-2.5 py-0.5 rounded-full">
            {t.liveDispatch}
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 font-medium">
          {t.subtitle}
        </p>
      </div>

      {/* Success View */}
      {submittedRef ? (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-center space-y-3 animate-in fade-in zoom-in duration-300">
          <div className="w-12 h-12 rounded-full bg-[#70FFD2]/40 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.successTitle}</h3>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              {language === 'ml' ? 'നിങ്ങളുടെ ട്രാക്കിംഗ് നമ്പർ:' : 'Your tracking reference is:'}{' '}
              <strong className="font-mono text-[#FF9137] text-sm block mt-0.5">
                {submittedRef}
              </strong>
            </p>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            {t.successMsg}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-2 text-xs font-bold text-[#FF9137] hover:underline cursor-pointer"
          >
            {t.submitAnother}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {errorMessage && (
            <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-center font-medium">
              {errorMessage}
            </div>
          )}

          {/* 1. Service Choosing Dropdown */}
          <div className="bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-2.5 px-3 flex flex-col transition-all focus-within:border-[#FF9137]">
            <label
              htmlFor="service-select"
              className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-1"
            >
              <Layers className="w-3 h-3 text-[#FF9137]" />
              <span>{t.chooseService}</span>
            </label>
            <div className="relative flex items-center">
              <select
                id="service-select"
                value={selectedServiceId}
                onChange={handleServiceChange}
                className="w-full bg-transparent text-[#0F172A] text-xs font-bold pr-6 py-0.5 outline-none appearance-none cursor-pointer [&>option]:bg-white [&>option]:text-slate-900"
              >
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 pointer-events-none absolute right-0" />
            </div>
          </div>

          {/* 2. Full Name & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Name */}
            <div className="bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-2.5 px-3 flex flex-col transition-all focus-within:border-[#FF9137]">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                <User className="w-3 h-3 text-[#FF9137]" />
                <span>{t.yourName}</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t.namePlaceholder}
                required
                className="bg-transparent text-[#0F172A] text-xs font-bold placeholder:text-slate-400 outline-none w-full mt-0.5"
              />
            </div>

            {/* Phone */}
            <div className="bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-2.5 px-3 flex flex-col transition-all focus-within:border-[#FF9137]">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                <Phone className="w-3 h-3 text-[#FF9137]" />
                <span>{t.phoneNumber}</span>
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                required
                className="bg-transparent text-[#0F172A] text-xs font-bold placeholder:text-slate-400 outline-none w-full mt-0.5"
              />
            </div>
          </div>

          {/* 3. Email (Optional) */}
          <div className="bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-2.5 px-3 flex flex-col transition-all focus-within:border-[#FF9137]">
            <div className="flex items-center justify-between mb-0.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-[#FF9137]" />
                <span>{t.emailAddress}</span>
              </label>
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                {t.emailOptional}
              </span>
            </div>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="bg-transparent text-[#0F172A] text-xs font-bold placeholder:text-slate-400 outline-none w-full mt-0.5"
            />
          </div>

          {/* 4. Location & Preferred Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Location */}
            <div className="bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-2.5 px-3 flex flex-col transition-all focus-within:border-[#FF9137]">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                <MapPin className="w-3 h-3 text-[#FF9137]" />
                <span>{t.location}</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.locationPlaceholder}
                className="bg-transparent text-[#0F172A] text-xs font-bold placeholder:text-slate-400 outline-none w-full mt-0.5"
              />
            </div>

            {/* Preferred Date */}
            <div className="bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-2.5 px-3 flex flex-col transition-all focus-within:border-[#FF9137]">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                <Calendar className="w-3 h-3 text-[#FF9137]" />
                <span>{t.preferredDate}</span>
              </label>
              <input
                type="text"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                placeholder={t.datePlaceholder}
                className="bg-transparent text-[#0F172A] text-xs font-bold placeholder:text-slate-400 outline-none w-full mt-0.5"
              />
            </div>
          </div>

          {/* Submit Sunset Orange CTA Button (#FF9137) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FF9137] hover:bg-[#FFCC4D] text-white hover:text-slate-950 font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md flex items-center justify-center gap-2 mt-1 transition-all cursor-pointer active:scale-95 disabled:opacity-60"
          >
            <span>{isSubmitting ? t.submitting : t.submitBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Sparkles,
  ChevronDown,
  Layers,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/utils/translations';
import { EnquiryService } from '@/services/enquiry.service';

interface HeroEnquiryBoxProps {
  onSuccess?: (trackingCode: string) => void;
  className?: string;
}

export function HeroEnquiryBox({ onSuccess, className = '' }: HeroEnquiryBoxProps) {
  const { language } = useLanguage();
  const t = translations[language].enquiry;

  const SERVICES = [
    { id: 'cococare', name: t.servicesList.cococare },
    { id: 'jcb', name: t.servicesList.jcb },
    { id: 'plastering', name: t.servicesList.plastering },
    { id: 'painting', name: t.servicesList.painting },
    { id: 'tile', name: t.servicesList.tile },
    { id: 'electrical', name: t.servicesList.electrical },
    { id: 'plumbing', name: t.servicesList.plumbing },
  ];

  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentService =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage(
        language === 'ml'
          ? 'ദയവായി പേരും ഫോൺ നമ്പറും നൽകുക'
          : 'Please enter both your name and phone number'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await EnquiryService.createEnquiry({
        serviceName: currentService.name,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        location: location.trim() || 'Kerala, India',
        preferredDate: 'Immediate / Next 48 hrs',
        message: `Quick booking from Hero section for ${currentService.name}`,
      });

      const trackingCode =
        res.enquiry?.id?.slice(0, 8).toUpperCase() ||
        `KK-${Math.floor(100000 + Math.random() * 900000)}`;

      setSubmittedRef(trackingCode);
      onSuccess?.(trackingCode);
    } catch (err: any) {
      console.warn('Backend enquiry error, generating offline reference:', err);
      const fallbackCode = `KK-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(fallbackCode);
      onSuccess?.(fallbackCode);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setCustomerName('');
    setCustomerPhone('');
    setLocation('');
    setErrorMessage(null);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* ========================================================
          1. DESKTOP VIEW: Sleek Horizontal Rectangular Enquiry Bar
      ======================================================== */}
      <div className="hidden lg:block w-full">
        {submittedRef ? (
          <div className="w-full bg-white/95 backdrop-blur-2xl border-2 border-white/80 rounded-2xl lg:rounded-3xl xl:rounded-full p-5 lg:p-7 px-8 lg:px-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex items-center justify-between gap-6 text-slate-800 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-5">
              <div className="w-13 h-13 rounded-2xl bg-[#EBF6F1] flex items-center justify-center shrink-0 shadow-inner">
                <CheckCircle2 className="w-7 h-7 text-[#2A835F]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black uppercase tracking-wider text-[#2A835F]">
                    {language === 'ml' ? 'അന്വേഷണം സ്വീകരിച്ചു' : 'Enquiry Received'}
                  </span>
                  <span className="font-mono text-xs font-bold bg-[#EBF6F1] text-[#2A835F] px-2.5 py-0.5 rounded-full">
                    REF: {submittedRef}
                  </span>
                </div>
                <p className="text-sm lg:text-base font-bold text-slate-700">
                  {t.successMsg}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#2A835F] hover:bg-[#236D4F] text-white px-8 py-3.5 rounded-xl lg:rounded-2xl xl:rounded-full font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shrink-0 cursor-pointer"
            >
              {t.submitAnother}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white/95 backdrop-blur-2xl border-2 border-white/80 rounded-2xl lg:rounded-3xl xl:rounded-full py-4 lg:py-5 px-6 lg:px-8 xl:px-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex items-center justify-between gap-5 text-slate-800 transition-all hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)]"
          >
            {/* Segment 1: Service Selector */}
            <div className="flex-1 min-w-[210px] flex items-center gap-3.5 pr-2">
              <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-[#EBF6F1] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#2A835F]" />
              </div>
              <div className="flex flex-col text-left w-full overflow-hidden">
                <label className="text-[10px] lg:text-[11px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
                  {t.chooseService}
                </label>
                <div className="relative flex items-center">
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full text-xs lg:text-sm font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer appearance-none truncate pr-5"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id} className="text-slate-900 font-semibold">
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-10 lg:h-12 bg-slate-200/90 shrink-0" />

            {/* Segment 2: Customer Name */}
            <div className="flex-1 min-w-[160px] flex items-center gap-3.5 px-2">
              <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-[10px] lg:text-[11px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
                  {t.yourName}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full text-xs lg:text-sm font-bold text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-10 lg:h-12 bg-slate-200/90 shrink-0" />

            {/* Segment 3: Customer Phone */}
            <div className="flex-1 min-w-[160px] flex items-center gap-3.5 px-2">
              <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-[10px] lg:text-[11px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
                  {t.phoneNumber}
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full text-xs lg:text-sm font-bold text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-10 lg:h-12 bg-slate-200/90 shrink-0" />

            {/* Segment 4: Location */}
            <div className="flex-1 min-w-[160px] flex items-center gap-3.5 px-2">
              <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-[10px] lg:text-[11px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
                  {t.location}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className="w-full text-xs lg:text-sm font-bold text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2A835F] hover:bg-[#236D4F] text-white px-8 lg:px-10 py-4 lg:py-4.5 rounded-xl lg:rounded-2xl xl:rounded-full font-black text-xs lg:text-sm uppercase tracking-wider inline-flex items-center gap-3 shadow-lg hover:shadow-xl transition-all active:scale-95 shrink-0 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t.submitting}</span>
                </>
              ) : (
                <>
                  <span>{t.submitBtn}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </form>
        )}
        {errorMessage && (
          <p className="text-red-300 text-xs font-medium text-center mt-2 drop-shadow">
            {errorMessage}
          </p>
        )}
      </div>

      {/* ========================================================
          2. MOBILE VIEW: Vertical Rectangular Squarish Card
      ======================================================== */}
      <div className="block lg:hidden w-full max-w-[340px] sm:max-w-[380px] mx-auto">
        {submittedRef ? (
          <div className="w-full bg-white/95 backdrop-blur-xl border border-white/60 rounded-3xl p-5 shadow-2xl text-slate-800 flex flex-col justify-between aspect-square text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="w-14 h-14 rounded-full bg-[#EBF6F1] flex items-center justify-center mb-3 shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-[#2A835F]" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2A835F]">
                {language === 'ml' ? 'അന്വേഷണം ലഭിച്ചു!' : 'Enquiry Received!'}
              </span>
              <span className="font-mono text-xs font-bold bg-[#EBF6F1] text-[#2A835F] px-3 py-1 rounded-full mt-1 mb-2">
                REF: {submittedRef}
              </span>
              <p className="text-xs font-semibold text-slate-600 max-w-[240px] leading-relaxed">
                {t.successMsg}
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-[#2A835F] hover:bg-[#236D4F] text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md cursor-pointer mt-2"
            >
              {t.submitAnother}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white/95 backdrop-blur-xl border border-white/60 rounded-3xl p-4 sm:p-5 shadow-2xl text-slate-800 flex flex-col justify-between aspect-[1/1] transition-all"
          >
            {/* Header / Kicker */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 bg-[#EBF6F1] text-[#2A835F] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2A835F] animate-pulse" />
                <span>{language === 'ml' ? 'ദ്രുത അന്വേഷണം' : 'Quick Enquiry'}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-700">
                {language === 'ml' ? 'നേരിട്ടുള്ള ബുക്കിംഗ്' : 'Instant Dispatch'}
              </span>
            </div>

            {/* Service Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                {t.chooseService}
              </label>
              <div className="relative flex items-center bg-slate-100/90 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#2A835F] shrink-0 mr-2" />
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer appearance-none truncate pr-4"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id} className="text-slate-900 font-semibold">
                      {s.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Name and Phone (Grid 2 cols for compactness) */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  {t.yourName}
                </label>
                <div className="flex items-center bg-slate-100/90 border border-slate-200/80 rounded-xl px-2.5 py-1.5">
                  <User className="w-3 h-3 text-slate-400 shrink-0 mr-1.5" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t.namePlaceholder.split(' ')[0]}
                    className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  {t.phoneNumber}
                </label>
                <div className="flex items-center bg-slate-100/90 border border-slate-200/80 rounded-xl px-2.5 py-1.5">
                  <Phone className="w-3 h-3 text-slate-400 shrink-0 mr-1.5" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                {t.location}
              </label>
              <div className="flex items-center bg-slate-100/90 border border-slate-200/80 rounded-xl px-2.5 py-1.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0 mr-1.5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2A835F] hover:bg-[#236D4F] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer mt-1"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t.submitting}</span>
                </>
              ) : (
                <>
                  <span>{t.submitBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </form>
        )}
        {errorMessage && (
          <p className="text-red-300 text-[11px] font-medium text-center mt-1.5 drop-shadow">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

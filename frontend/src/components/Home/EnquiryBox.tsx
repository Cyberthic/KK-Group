'use client';

import React, { useState, useEffect } from 'react';
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
  X,
} from 'lucide-react';
import { EnquiryService } from '@/services/enquiry.service';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/utils/translations';
import { StylishDropdown } from '@/components/Common/StylishDropdown';
import { validateMobileNumber, sanitizePhoneInput } from '@/validations';
import { useToast } from '@/context/toast-context';

interface EnquiryBoxProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialService?: string;
  className?: string;
  onEnquirySuccess?: (trackingCode: string) => void;
}

export function EnquiryBox({
  isOpen,
  onClose,
  initialService,
  className = '',
  onEnquirySuccess,
}: EnquiryBoxProps) {
  const { language } = useLanguage();
  const toast = useToast();
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

  // Pre-select service if passed from hero card or other triggers
  useEffect(() => {
    if (initialService) {
      const lower = initialService.toLowerCase();
      const matched = SERVICE_OPTIONS.find(
        (s) =>
          s.id.toLowerCase().includes(lower) ||
          s.name.toLowerCase().includes(lower) ||
          lower.includes(s.id.toLowerCase())
      );
      if (matched) {
        setSelectedServiceId(matched.id);
      }
    }
  }, [initialService]);

  const currentService =
    SERVICE_OPTIONS.find((s) => s.id === selectedServiceId) || SERVICE_OPTIONS[0];
  const [squadScale, setSquadScale] = useState(currentService.defaultScale);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

    if (!customerName.trim()) {
      const title =
        language === 'ml' ? 'നിങ്ങളുടെ പേര് നൽകുക' : 'Customer Name Required';
      const msg =
        language === 'ml'
          ? 'സേവനം ബുക്ക് ചെയ്യുന്നതിനായി നിങ്ങളുടെ പേര് രേഖപ്പെടുത്തുക.'
          : 'Please provide your name to continue.';
      setErrorMessage(msg);
      toast.warning(title, msg);
      return;
    }

    const phoneValidation = validateMobileNumber(customerPhone, language);
    if (!phoneValidation.isValid) {
      const title =
        phoneValidation.title ||
        (language === 'ml'
          ? 'മൊബൈൽ നമ്പർ പരിശോധിക്കുക'
          : 'Invalid Mobile Number');
      const msg =
        phoneValidation.error ||
        (language === 'ml'
          ? 'ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.'
          : 'Please provide a valid 10-digit mobile number.');
      setErrorMessage(msg);
      toast.warning(title, msg);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await EnquiryService.createEnquiry({
        serviceName: currentService.name,
        customerName: customerName.trim(),
        customerPhone: phoneValidation.cleanPhone,
        customerEmail: customerEmail.trim() || undefined,
        location: location.trim() || undefined,
        message: `Service: ${currentService.name} | Scale: ${squadScale} | Location: ${
          location.trim() || 'Kerala'
        }${preferredDate.trim() ? ` | Preferred: ${preferredDate.trim()}` : ''}`,
      });

      const refCode =
        res.enquiry?.trackingNumber ||
        (res.enquiry?.id ? `ENQ-${res.enquiry.id.slice(0, 8).toUpperCase()}` : null) ||
        `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;

      setSubmittedRef(refCode);
      if (onEnquirySuccess) {
        onEnquirySuccess(refCode);
      }

      toast.success(
        language === 'ml'
          ? 'അന്വേഷണം വിജയകരമായി അയച്ചു!'
          : 'Enquiry Dispatched Successfully!',
        language === 'ml'
          ? `റഫറൻസ് നമ്പർ: ${refCode}. ഞങ്ങളുടെ ടീം ഉടൻ നിങ്ങളെ വിളിക്കുന്നതാണ്.`
          : `Reference ID: ${refCode}. Operations team will contact you shortly.`
      );
    } catch (err: any) {
      console.error('Failed to submit enquiry:', err);
      const title =
        language === 'ml'
          ? 'സമർപ്പണത്തിൽ തടസ്സം നേരിട്ടു'
          : 'Enquiry Submission Failed';
      const msg =
        err?.message ||
        (language === 'ml'
          ? 'അന്വേഷണം സമർപ്പിക്കുന്നതിൽ പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.'
          : 'Failed to submit enquiry. Please check your connection and try again.');
      setErrorMessage(msg);
      toast.error(title, msg);
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

  if (isOpen === false) return null;

  const cardContent = (
    <div
      id="enquiry-card"
      className={`w-full max-w-[460px] bg-white rounded-[32px] p-6 sm:p-7 shadow-[0_25px_60px_rgba(42,131,95,0.16)] border border-emerald-100 flex flex-col gap-4 text-[#0F172A] relative ${className}`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight leading-snug">
              {t.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2A835F] bg-[#EBF6F1] border border-[#C3E6D5] px-2.5 py-0.5 rounded-full">
              {t.liveDispatch}
            </span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          {t.subtitle}
        </p>
      </div>

      {/* Success View */}
      {submittedRef ? (
        <div className="bg-[#F2F9F5] border border-[#C3E6D5] rounded-2xl p-6 text-center space-y-3.5 animate-in fade-in zoom-in duration-300">
          <div className="w-12 h-12 rounded-full bg-[#2A835F]/10 text-[#2A835F] flex items-center justify-center mx-auto border border-[#C3E6D5]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.successTitle}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {language === 'ml' ? 'നിങ്ങളുടെ ട്രാക്കിംഗ് നമ്പർ:' : 'Your tracking reference is:'}{' '}
              <strong className="font-mono text-[#2A835F] text-sm block mt-1 tracking-wider">
                {submittedRef}
              </strong>
            </p>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            {t.successMsg}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-[#2A835F] hover:text-[#236D4F] underline cursor-pointer"
            >
              {t.submitAnother}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="bg-[#0F172A] hover:bg-black text-white text-xs font-bold py-1.5 px-4 rounded-full transition-all cursor-pointer"
              >
                {language === 'ml' ? 'അടയ്ക്കുക' : 'Close'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {errorMessage && (
            <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-center font-medium">
              {errorMessage}
            </div>
          )}

          {/* 1. Service Choosing Dropdown with StylishDropdown */}
          <div className="flex flex-col w-full">
            <StylishDropdown
              options={SERVICE_OPTIONS.map((s) => ({
                id: s.id,
                label: s.name,
                subtitle: s.defaultScale,
              }))}
              value={selectedServiceId}
              onChange={(id) => {
                setSelectedServiceId(id);
                const matched = SERVICE_OPTIONS.find((s) => s.id === id);
                if (matched) setSquadScale(matched.defaultScale);
              }}
              label={t.chooseService}
              variant="boxed"
            />
          </div>

          {/* 2. Full Name & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Name */}
            <div className="bg-[#F7FCF9] hover:bg-[#EBF6F1]/80 border border-[#C3E6D5] focus-within:border-[#2A835F] focus-within:ring-2 focus-within:ring-[#2A835F]/20 rounded-2xl p-2.5 px-3.5 flex flex-col transition-all">
              <label className="text-[10px] font-bold text-[#2A835F] uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                <User className="w-3.5 h-3.5 text-[#2A835F]" />
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
            <div className="bg-[#F7FCF9] hover:bg-[#EBF6F1]/80 border border-[#C3E6D5] focus-within:border-[#2A835F] focus-within:ring-2 focus-within:ring-[#2A835F]/20 rounded-2xl p-2.5 px-3.5 flex flex-col transition-all">
              <div className="flex items-center justify-between mb-0.5">
                <label className="text-[10px] font-bold text-[#2A835F] uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#2A835F]" />
                  <span>{t.phoneNumber}</span>
                </label>
                <span className="text-[9px] font-bold text-slate-400">
                  {customerPhone.length > 0 ? `${customerPhone.length}/10` : '10 Digits'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-bold text-[#2A835F] select-none shrink-0">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(sanitizePhoneInput(e.target.value))}
                  placeholder="9876543210"
                  required
                  className="bg-transparent text-[#0F172A] text-xs font-bold placeholder:text-slate-400 outline-none w-full tracking-wider"
                />
              </div>
            </div>
          </div>

          {/* 3. Email (Optional) */}
          <div className="bg-[#F7FCF9] hover:bg-[#EBF6F1]/80 border border-[#C3E6D5] focus-within:border-[#2A835F] focus-within:ring-2 focus-within:ring-[#2A835F]/20 rounded-2xl p-2.5 px-3.5 flex flex-col transition-all">
            <div className="flex items-center justify-between mb-0.5">
              <label className="text-[10px] font-bold text-[#2A835F] uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#2A835F]" />
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
            <div className="bg-[#F7FCF9] hover:bg-[#EBF6F1]/80 border border-[#C3E6D5] focus-within:border-[#2A835F] focus-within:ring-2 focus-within:ring-[#2A835F]/20 rounded-2xl p-2.5 px-3.5 flex flex-col transition-all">
              <label className="text-[10px] font-bold text-[#2A835F] uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#2A835F]" />
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
            <div className="bg-[#F7FCF9] hover:bg-[#EBF6F1]/80 border border-[#C3E6D5] focus-within:border-[#2A835F] focus-within:ring-2 focus-within:ring-[#2A835F]/20 rounded-2xl p-2.5 px-3.5 flex flex-col transition-all">
              <label className="text-[10px] font-bold text-[#2A835F] uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#2A835F]" />
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

          {/* Submit Button in KK Green (#2A835F) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2A835F] hover:bg-[#236D4F] text-white font-bold text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 mt-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-60"
          >
            <span>{isSubmitting ? t.submitting : t.submitBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );

  // If used as modal (isOpen === true)
  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
        <div
          className="fixed inset-0"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="relative z-10 my-auto">
          {cardContent}
        </div>
      </div>
    );
  }

  return cardContent;
}

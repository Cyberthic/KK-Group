'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  FileText,
  Zap,
  Calendar as CalendarIcon,
  ShoppingBag,
  ArrowLeftRight,
  Bell,
  Settings,
  ArrowLeft,
  SlidersHorizontal,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Search,
  ChevronDown,
  MoreHorizontal,
  LayoutGrid,
  Link2,
  Clock,
  X,
  DollarSign,
  Sparkles,
} from 'lucide-react';

// Interfaces for our state
interface InvoiceItem {
  id: string;
  name: string;
  amount: number;
}

interface Invoice {
  id: string;
  code: string;
  customerName: string;
  customerRole: string;
  customerAvatar: string;
  companyName: string;
  companyLogo: string;
  dueInDays: number;
  status: 'Unsent' | 'Viewed' | 'Draft' | 'Paid';
  items: InvoiceItem[];
}

const INITIAL_INVOICES: Invoice[] = [
  {
    id: '1',
    code: '# INV-1001',
    customerName: 'Sarah Jenkins',
    customerRole: 'VP of Product',
    customerAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    companyName: 'Apex Logistics',
    companyLogo: '▲',
    dueInDays: 2,
    status: 'Unsent',
    items: [
      { id: 'i1', name: 'Cloud Architecture Setup', amount: 32500 },
      { id: 'i2', name: 'Database Migration & Tuning', amount: 24250 },
      { id: 'i3', name: 'Security Compliance Audit', amount: 12000 },
    ],
  },
  {
    id: '2',
    code: '# INV-1002',
    customerName: 'David Chen',
    customerRole: 'Technical Director',
    customerAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    companyName: 'Nexis Media',
    companyLogo: '❖',
    dueInDays: 4,
    status: 'Viewed',
    items: [
      { id: 'i1', name: 'Design System & Tokens', amount: 9500 },
      { id: 'i2', name: 'Component Library Dev', amount: 11980 },
    ],
  },
  {
    id: '3',
    code: '# INV-1003',
    customerName: 'James Carter',
    customerRole: 'Marketing Director',
    customerAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    companyName: 'BrightWave',
    companyLogo: '≈',
    dueInDays: 5,
    status: 'Unsent',
    items: [
      { id: 'i1', name: 'UI/UX Design', amount: 15990 },
      { id: 'i2', name: 'Development', amount: 21250 },
      { id: 'i3', name: 'QA & Testing', amount: 10740 },
    ],
  },
  {
    id: '4',
    code: '# INV-1004',
    customerName: 'Elena Rostova',
    customerRole: 'Operations Lead',
    customerAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    companyName: 'Vanguard Labs',
    companyLogo: '◈',
    dueInDays: 16,
    status: 'Viewed',
    items: [
      { id: 'i1', name: 'Infrastructure Automation', amount: 28430 },
      { id: 'i2', name: 'CI/CD Pipeline Engineering', amount: 16800 },
      { id: 'i3', name: 'Production Telemetry', amount: 10000 },
    ],
  },
  {
    id: '5',
    code: '# INV-1005',
    customerName: 'Marcus Wright',
    customerRole: 'Managing Partner',
    customerAvatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    companyName: 'Solaria Capital',
    companyLogo: '◉',
    dueInDays: 19,
    status: 'Viewed',
    items: [{ id: 'i1', name: 'Financial Model Integration', amount: 6880 }],
  },
];

export default function OfficeStaffDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Navigation State
  const [activeNav, setActiveNav] = useState('Invoices');

  // Invoices & Selection State
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('3'); // Default to # INV-1003
  const [activeTab, setActiveTab] = useState<'ALL' | 'DRAFT' | 'UNPAID'>('UNPAID');
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'stripe' | 'paypal'>('stripe');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [customerFilter, setCustomerFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

  // New Invoice Form
  const [newInvoiceCode, setNewInvoiceCode] = useState('# INV-1006');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerRole, setNewCustomerRole] = useState('Product Lead');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');

  // Selected Invoice Object
  const selectedInvoice = useMemo(() => {
    return (
      invoices.find((inv) => inv.id === selectedInvoiceId) ||
      invoices[0] ||
      INITIAL_INVOICES[2]
    );
  }, [invoices, selectedInvoiceId]);

  // Invoice calculations
  const invoiceTotal = useMemo(() => {
    return selectedInvoice.items.reduce((acc, curr) => acc + curr.amount, 0);
  }, [selectedInvoice]);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (activeTab === 'DRAFT' && inv.status !== 'Draft') return false;
      if (activeTab === 'UNPAID' && inv.status !== 'Unsent' && inv.status !== 'Viewed')
        return false;
      if (statusFilter !== 'ALL' && inv.status !== statusFilter) return false;
      if (customerFilter !== 'ALL' && inv.customerName !== customerFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          inv.code.toLowerCase().includes(q) ||
          inv.customerName.toLowerCase().includes(q) ||
          inv.companyName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [invoices, activeTab, statusFilter, customerFilter, searchQuery]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName || !newCompanyName) return;

    const newInv: Invoice = {
      id: String(Date.now()),
      code: newInvoiceCode,
      customerName: newCustomerName,
      customerRole: newCustomerRole || 'Client',
      customerAvatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      companyName: newCompanyName,
      companyLogo: '❖',
      dueInDays: 7,
      status: 'Unsent',
      items: [
        {
          id: 'item-init',
          name: 'Professional Services Onboarding',
          amount: 14500,
        },
      ],
    };

    setInvoices([newInv, ...invoices]);
    setSelectedInvoiceId(newInv.id);
    setIsCreateModalOpen(false);
    setNewCustomerName('');
    setNewCompanyName('');
    showToast(`Invoice ${newInvoiceCode} created successfully!`);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemAmount) return;

    const amount = parseFloat(newItemAmount);
    if (isNaN(amount) || amount <= 0) return;

    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === selectedInvoice.id) {
          return {
            ...inv,
            items: [
              ...inv.items,
              { id: String(Date.now()), name: newItemName, amount },
            ],
          };
        }
        return inv;
      })
    );

    setIsAddItemModalOpen(false);
    setNewItemName('');
    setNewItemAmount('');
    showToast(`Item added to ${selectedInvoice.code}`);
  };

  const handlePayout = () => {
    setIsPayoutModalOpen(false);
    showToast(
      `Instant payout of $${invoiceTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
      })} initiated via ${paymentMethod.toUpperCase()}!`
    );
  };

  return (
    <div className="min-h-screen bg-[#ECEEF2] text-slate-800 antialiased p-3 sm:p-5 lg:p-7 font-sans selection:bg-[#5851F8] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-[#7C78FB]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Canvas Frame */}
      <div className="max-w-[1480px] mx-auto flex flex-col gap-6">
        {/* ========================================================
            TOP HEADER NAVIGATION BAR
        ======================================================== */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Brand & Pill Badge */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5 group cursor-pointer">
              {/* Finnova Geometric Folded Ribbon Icon */}
              <div className="w-10 h-10 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9 drop-shadow-sm"
                >
                  <path
                    d="M10 8L20 4L18 20L10 8Z"
                    fill="#7C78FB"
                    fillOpacity="0.9"
                  />
                  <path
                    d="M20 4L30 14L22 28L18 20L20 4Z"
                    fill="#5851F8"
                  />
                  <path
                    d="M30 14L32 32L22 28L30 14Z"
                    fill="#4338CA"
                  />
                  <path
                    d="M10 8L22 28L14 36L10 8Z"
                    fill="#6366F1"
                    fillOpacity="0.85"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                  FINNOVA
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight mt-0.5">
                  Smart Finances, Better Business
                </span>
              </div>
            </div>

            {/* Pill Counter Badge */}
            <div className="bg-white/80 border border-slate-200/90 text-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              80
            </div>
          </div>

          {/* Center: Floating Dark Pill Navigation */}
          <nav className="bg-[#13141F] p-1.5 rounded-full flex items-center gap-1 shadow-xl border border-slate-800/80 overflow-x-auto max-w-full">
            {[
              { id: 'Overview', label: '+ Overview' },
              { id: 'Estimates', label: 'Estimates' },
              { id: 'Invoices', label: '+ Invoices' },
              { id: 'Payments', label: 'Payments' },
              { id: 'Recurring', label: 'Recurring' },
              { id: 'Checkouts', label: 'Checkouts' },
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#5851F8] text-white shadow-[0_2px_14px_rgba(88,81,248,0.5)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Quick Action Utility Buttons */}
          <div className="flex items-center gap-2">
            {[
              { icon: FileText, title: 'Documents' },
              { icon: Zap, title: 'Quick Action' },
              { icon: CalendarIcon, title: 'Calendar' },
              { icon: ShoppingBag, title: 'Purchases' },
              { icon: ArrowLeftRight, title: 'Transactions' },
            ].map((btn, idx) => (
              <button
                key={idx}
                title={btn.title}
                onClick={() => showToast(`${btn.title} window opened`)}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center shadow-xs transition-all"
              >
                <btn.icon className="w-4 h-4" />
              </button>
            ))}

            {/* Notification Bell with red dot */}
            <button
              onClick={() => showToast('You have 2 unread notifications')}
              title="Notifications"
              className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center shadow-xs relative transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white" />
            </button>

            {/* Settings Gear */}
            <button
              onClick={() => showToast('Settings opened')}
              title="Settings"
              className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center shadow-xs transition-all"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Profile Avatar */}
            <div
              className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200/90 shadow-xs cursor-pointer ml-1"
              title={user?.name || user?.username || 'Office Staff Desk'}
            >
              <img
                src={
                  (user as any)?.profileImage ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* ========================================================
            PAGE TITLE BAR: Invoices + Actions
        ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          {/* Left: Back button + Title & Subtitle */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => router.push('/')}
              title="Back"
              className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-xs transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Invoices
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Manage and track all your invoices in one place.
              </p>
            </div>
          </div>

          {/* Right: Sliders + Create an invoice Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => showToast('Display filters toggled')}
              title="Preferences"
              className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-xs transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#5851F8] hover:bg-[#4a42ec] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(88,81,248,0.35)] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create an invoice</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            METRICS / STATS OVERVIEW CARDS (4-Column Grid)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Overdue */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden relative min-h-[220px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Overdue</span>
                <span className="w-5 h-5 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center text-[10px] font-bold">
                  !
                </span>
              </div>
              <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mt-2">
                $ 24,850.00
              </div>
              <div className="text-xs font-semibold text-rose-500 flex items-center gap-1 mt-1">
                <span>↑ 12.5%</span>
                <span className="text-slate-400 font-normal">from last month</span>
              </div>
            </div>

            {/* High-End Minimalist Desk Illustration matching screenshot */}
            <div className="mt-3 -mx-5 -mb-5 relative h-28 overflow-hidden rounded-b-[24px]">
              <Image
                src="/images/finnova_desk.jpg"
                alt="Modern workspace desk"
                fill
                className="object-cover object-center"
                sizes="(max-w-768px) 100vw, 25vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/40" />
            </div>
          </div>

          {/* Card 2: Due within next month */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden relative min-h-[220px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Due within next month
                </span>
                <span className="w-5 h-5 rounded-full border border-purple-200 bg-purple-50 text-[#5851F8] flex items-center justify-center">
                  <CalendarIcon className="w-3 h-3" />
                </span>
              </div>
              <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mt-2">
                $ 142,560.00
              </div>
              <div className="text-xs font-semibold text-[#5851F8] flex items-center gap-1 mt-1">
                <span>↑ 8.2%</span>
                <span className="text-slate-400 font-normal">from last month</span>
              </div>
            </div>

            {/* 7-Month Rounded Bar Chart */}
            <div className="mt-4 pt-2">
              <div className="flex items-end justify-between gap-2 h-20 px-1">
                {[
                  { month: 'Jul', height: 26, val: '$ 42k' },
                  { month: 'Aug', height: 38, val: '$ 68k' },
                  { month: 'Sep', height: 48, val: '$ 84k' },
                  { month: 'Sep', height: 62, val: '$ 95k' },
                  { month: 'Oct', height: 75, val: '$ 115k' },
                  { month: 'Nov', height: 86, val: '$ 130k' },
                  { month: 'Dec', height: 100, val: '$ 142k' },
                ].map((col, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
                    title={`${col.month}: ${col.val}`}
                  >
                    <div className="w-full max-w-[14px] bg-slate-100 rounded-full h-full flex items-end">
                      <div
                        style={{ height: `${col.height}%` }}
                        className="w-full bg-gradient-to-t from-[#5851F8] to-[#7C78FB] rounded-full group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium group-hover:text-slate-700">
                      {col.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Average time to get paid */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden relative min-h-[220px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Average time to get paid
                </span>
                <span className="w-5 h-5 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Clock className="w-3 h-3" />
                </span>
              </div>
              <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mt-2 flex items-baseline gap-1.5">
                <span>16</span>
                <span className="text-sm font-semibold text-slate-500">days</span>
              </div>
              <div className="text-xs font-semibold text-teal-600 flex items-center gap-1 mt-1">
                <span>↓ 2 days</span>
                <span className="text-slate-400 font-normal">from last month</span>
              </div>
            </div>

            {/* Spline Area Chart with glowing purple data points */}
            <div className="mt-4 pt-1">
              <div className="w-full h-20 relative">
                <svg
                  viewBox="0 0 240 80"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="splineGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#5851F8" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#5851F8" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Gradient Area Fill */}
                  <path
                    d="M 0 70 Q 30 65, 60 50 T 120 40 T 180 25 T 240 10 L 240 80 L 0 80 Z"
                    fill="url(#splineGrad)"
                  />

                  {/* Spline Line */}
                  <path
                    d="M 0 70 Q 30 65, 60 50 T 120 40 T 180 25 T 240 10"
                    fill="none"
                    stroke="#5851F8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Data Node Markers */}
                  {[
                    { cx: 30, cy: 65 },
                    { cx: 60, cy: 50 },
                    { cx: 90, cy: 45 },
                    { cx: 120, cy: 40 },
                    { cx: 150, cy: 32 },
                    { cx: 180, cy: 25 },
                    { cx: 210, cy: 18 },
                    { cx: 240, cy: 10 },
                  ].map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.cx}
                      cy={pt.cy}
                      r="3.5"
                      fill="#FFFFFF"
                      stroke="#5851F8"
                      strokeWidth="2"
                      className="cursor-pointer hover:scale-125 transition-transform"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Card 4: Available for Instant Payout */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden relative min-h-[220px]">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-500">
                    Available for Instant Payout
                  </span>
                  <span className="w-5 h-5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                </div>
                <button
                  onClick={() => setIsPayoutModalOpen(true)}
                  className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
                  title="Instant payout"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
                  $ 186,540.00
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Expects
                </span>
              </div>
            </div>

            {/* Payment Selector Cards */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-1.5">
                {/* Visa */}
                <button
                  onClick={() => setPaymentMethod('visa')}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                    paymentMethod === 'visa'
                      ? 'bg-[#5851F8] text-white shadow-md'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[10px] opacity-75 font-mono">•••• 4242</span>
                  <span className="text-[11px] font-bold">Visa</span>
                </button>

                {/* Stripe */}
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                    paymentMethod === 'stripe'
                      ? 'bg-[#5851F8] text-white shadow-md'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[10px] opacity-75 font-mono">•••• 6789</span>
                  <span className="text-[11px] font-bold">Stripe</span>
                </button>

                {/* PayPal */}
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#5851F8] text-white shadow-md'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[10px] opacity-75 font-mono">•••• 1234</span>
                  <span className="text-[11px] font-bold">PayPal</span>
                </button>
              </div>

              {/* Dark Payout Now Button */}
              <button
                onClick={() => setIsPayoutModalOpen(true)}
                className="w-full bg-[#13141F] hover:bg-black text-white text-xs font-semibold py-2 rounded-full transition-all shadow-xs active:scale-98 cursor-pointer mt-1"
              >
                Payout now
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            FILTER & SEARCH BAR
        ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Active filters + Dropdowns + Date Pickers */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Active Filters Pill */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Active filters</span>
              <span className="w-5 h-5 rounded-full bg-[#13141F] text-white text-[11px] font-bold flex items-center justify-center">
                2
              </span>
            </div>

            {/* Customer Dropdown */}
            <div className="relative">
              <select
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
                className="appearance-none bg-white border border-slate-200/90 rounded-full pl-4 pr-8 py-2 text-xs font-medium text-slate-700 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#5851F8] cursor-pointer"
              >
                <option value="ALL">All customers</option>
                <option value="Sarah Jenkins">Sarah Jenkins</option>
                <option value="David Chen">David Chen</option>
                <option value="James Carter">James Carter</option>
                <option value="Elena Rostova">Elena Rostova</option>
                <option value="Marcus Wright">Marcus Wright</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-slate-200/90 rounded-full pl-4 pr-8 py-2 text-xs font-medium text-slate-700 shadow-xs hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#5851F8] cursor-pointer"
              >
                <option value="ALL">All statuses</option>
                <option value="Unsent">Unsent</option>
                <option value="Viewed">Viewed</option>
                <option value="Draft">Draft</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Date Picker Pills */}
            <button
              onClick={() => showToast('Selected range: November 2023')}
              className="bg-white border border-slate-200/90 rounded-full px-4 py-2 text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:border-slate-300 transition-all cursor-pointer"
            >
              <span>November 2023</span>
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => showToast('Selected range: December 2023')}
              className="bg-white border border-slate-200/90 rounded-full px-4 py-2 text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:border-slate-300 transition-all cursor-pointer"
            >
              <span>December 2023</span>
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Right: Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Enter invoice #"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200/90 rounded-full pl-4 pr-9 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5851F8] shadow-xs transition-all"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* ========================================================
            BOTTOM SIGNATURE MASTER-DETAIL DARK CONTAINER
        ======================================================== */}
        <div className="bg-[#12131D] rounded-[32px] p-5 sm:p-7 text-white shadow-2xl border border-slate-800/80 relative overflow-hidden">
          {/* Header Row: Title + Filter Tabs + Views */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
            {/* Title */}
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Unpaid Invoices
            </h2>

            {/* Center Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-full border border-slate-800">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all ${
                  activeTab === 'ALL'
                    ? 'bg-[#5851F8] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Invoices
              </button>

              <button
                onClick={() => setActiveTab('DRAFT')}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  activeTab === 'DRAFT'
                    ? 'bg-[#5851F8] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Draft</span>
                <span className="text-[10px] opacity-75">3</span>
              </button>

              <button
                onClick={() => setActiveTab('UNPAID')}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  activeTab === 'UNPAID'
                    ? 'bg-[#5851F8] text-white shadow-[0_2px_12px_rgba(88,81,248,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Unpaid</span>
                <span className="w-4 h-4 rounded-full bg-white/20 text-white text-[10px] font-bold flex items-center justify-center">
                  5
                </span>
              </button>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('List layout view active')}
                title="View mode"
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Invoice options menu')}
                title="Options"
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Split Content: Invoices List (Left) + Detailed Invoice Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            {/* ----------------------------------------------------
                LEFT COLUMN: Invoices List (~40% width)
            ---------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              {filteredInvoices.map((inv) => {
                const isSelected = inv.id === selectedInvoice.id;
                const total = inv.items.reduce((s, i) => s + i.amount, 0);

                return (
                  <div
                    key={inv.id}
                    onClick={() => setSelectedInvoiceId(inv.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#4E44E5] to-[#5851F8] shadow-lg border border-indigo-400/40'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {/* Avatar + Code + Due */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={inv.customerAvatar}
                          alt={inv.customerName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div
                          className={`text-xs font-bold leading-tight ${
                            isSelected ? 'text-white' : 'text-slate-200'
                          }`}
                        >
                          {inv.code}
                        </div>
                        <div
                          className={`text-[11px] ${
                            isSelected ? 'text-indigo-200' : 'text-slate-400'
                          }`}
                        >
                          In {inv.dueInDays} days
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <span
                        className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                          isSelected
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>

                    {/* Amount */}
                    <div
                      className={`text-xs sm:text-sm font-bold tracking-tight ${
                        isSelected ? 'text-white' : 'text-slate-100'
                      }`}
                    >
                      $
                      {total.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ----------------------------------------------------
                RIGHT COLUMN: Detailed Invoice Card (~60% width)
            ---------------------------------------------------- */}
            <div className="lg:col-span-7">
              <div className="bg-gradient-to-br from-[#4F46E5] via-[#544EF3] to-[#5851F8] rounded-[28px] p-6 sm:p-7 shadow-2xl border border-indigo-400/30 relative flex flex-col justify-between min-h-[380px]">
                {/* Header Information: Details + Company + Customer */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-white/15">
                  {/* Invoice Details */}
                  <div>
                    <span className="text-[11px] font-medium text-indigo-200 uppercase tracking-wide">
                      Invoice details
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {selectedInvoice.code}
                      </span>
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/20">
                        {selectedInvoice.status}
                      </span>
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <span className="text-[11px] font-medium text-indigo-200 uppercase tracking-wide">
                      Company
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {selectedInvoice.companyName}
                      </span>
                      <span className="text-white text-lg font-bold">
                        {selectedInvoice.companyLogo}
                      </span>
                    </div>
                  </div>

                  {/* Customer */}
                  <div>
                    <span className="text-[11px] font-medium text-indigo-200 uppercase tracking-wide">
                      Customer
                    </span>
                    <div className="flex items-center gap-2.5 mt-1">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 shrink-0">
                        <img
                          src={selectedInvoice.customerAvatar}
                          alt={selectedInvoice.customerName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">
                          {selectedInvoice.customerName}
                        </div>
                        <div className="text-[11px] text-indigo-200">
                          {selectedInvoice.customerRole}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Breakdown Items (4-Tiles Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-6">
                  {selectedInvoice.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15 transition-all flex flex-col justify-between group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-white tracking-tight">
                          $
                          {item.amount.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-indigo-200 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-xs text-indigo-100 font-medium mt-3 leading-snug">
                        {item.name}
                      </span>
                    </div>
                  ))}

                  {/* Add Item Tile */}
                  <button
                    onClick={() => setIsAddItemModalOpen(true)}
                    className="border-2 border-dashed border-white/30 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-all cursor-pointer group min-h-[90px]"
                  >
                    <Plus className="w-5 h-5 text-white/80 group-hover:text-white mb-1" />
                    <span className="text-xs text-white/80 group-hover:text-white font-medium">
                      Add item
                    </span>
                  </button>
                </div>

                {/* Bottom Row: Financial Totals + Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/15">
                  {/* Financial Totals */}
                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <div className="text-indigo-200 text-[11px]">Sub Total</div>
                      <div className="font-bold text-white text-sm">
                        $
                        {invoiceTotal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-indigo-200 text-[11px]">Total</div>
                      <div className="font-bold text-white text-sm">
                        $
                        {invoiceTotal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-indigo-200 text-[11px]">Balance Due</div>
                      <div className="font-bold text-white text-sm">
                        $
                        {invoiceTotal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Copy Link Button */}
                    <button
                      onClick={() =>
                        showToast(`Link for ${selectedInvoice.code} copied!`)
                      }
                      title="Copy Invoice Link"
                      className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>

                    {/* Calendar Schedule Button */}
                    <button
                      onClick={() =>
                        showToast(`Due reminder scheduled in calendar`)
                      }
                      title="Schedule Due Date"
                      className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <CalendarIcon className="w-4 h-4" />
                    </button>

                    {/* White Payout Now Pill Button */}
                    <button
                      onClick={() => setIsPayoutModalOpen(true)}
                      className="bg-white hover:bg-white/95 text-[#1E1B4B] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      Payout now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MODAL: CREATE AN INVOICE
      ======================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Create New Invoice
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Invoice Code
                </label>
                <input
                  type="text"
                  value={newInvoiceCode}
                  onChange={(e) => setNewInvoiceCode(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rachel Adams"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Designation
                </label>
                <input
                  type="text"
                  placeholder="e.g. VP Operations"
                  value={newCustomerRole}
                  onChange={(e) => setNewCustomerRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zenith Tech"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#5851F8] hover:bg-[#4942eb] text-white shadow-md cursor-pointer"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD LINE ITEM
      ======================================================== */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Add Item to {selectedInvoice.code}
              </h3>
              <button
                onClick={() => setIsAddItemModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Item Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cloud Infrastructure Setup"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount ($ USD)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 8500"
                  value={newItemAmount}
                  onChange={(e) => setNewItemAmount(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#5851F8] hover:bg-[#4942eb] text-white shadow-md cursor-pointer"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: PAYOUT CONFIRMATION
      ======================================================== */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-[#5851F8] flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Confirm Instant Payout
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Transfer funds for invoice{' '}
              <strong className="text-slate-800">{selectedInvoice.code}</strong>{' '}
              to <strong className="text-slate-800">{selectedInvoice.customerName}</strong>.
            </p>

            <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Destination</span>
                <span className="font-bold text-slate-800 uppercase">
                  {paymentMethod}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Total Payable</span>
                <span className="font-extrabold text-[#5851F8] text-sm">
                  $
                  {invoiceTotal.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPayoutModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePayout}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#5851F8] hover:bg-[#4942eb] text-white shadow-md cursor-pointer"
              >
                Authorize Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

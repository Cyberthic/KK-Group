'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
  IndianRupee,
  Sparkles,
  UserCheck,
  HardHat,
  MapPin,
  Phone,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import {
  EnquiryService,
  ServiceEnquiry,
  WorkerWithAvailability,
  ServiceStatus,
  WorkerStatus,
} from '@/services';

// Interfaces for our state
export interface InvoiceItem {
  id: string;
  name: string;
  amount: number;
}

export interface Invoice {
  id: string;
  code: string;
  customerName: string;
  customerRole: string;
  customerAvatar: string;
  customerPhone?: string;
  customerEmail?: string;
  location?: string;
  preferredDate?: string;
  message?: string;
  serviceName: string;
  companyName: string;
  companyLogo: string;
  dueInDays: number;
  status: 'Unsent' | 'Viewed' | 'Draft' | 'Paid';
  backendStatus: ServiceStatus;
  items: InvoiceItem[];
  worker?: {
    id: string;
    name?: string | null;
    username?: string | null;
    phone?: string | null;
    workerStatus: WorkerStatus;
  } | null;
  notes?: string | null;
  rawEnquiry?: ServiceEnquiry;
}

// Fallback seed data matching real KK Group services
const FALLBACK_INVOICES: Invoice[] = [
  {
    id: 'enq-1001',
    code: '# ENQ-2026-104820',
    customerName: 'Mathew Thomas',
    customerRole: 'Kottayam Rubber Estate, Zone 3',
    customerAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    customerPhone: '+91 98472 34567',
    customerEmail: 'mathew.estate@gmail.com',
    location: 'Kottayam Rubber Estate, Zone 3',
    preferredDate: 'Sep 24, 2026',
    message: 'Need 45 high coconut palms harvested and crowned. Safety harness equipment needed.',
    serviceName: 'Cococare - Palm Tree Harvesting & Maintenance',
    companyName: 'Cococare Division',
    companyLogo: '🌴',
    dueInDays: 2,
    status: 'Unsent',
    backendStatus: 'PENDING',
    items: [
      { id: 'i1', name: 'Palm Harvesting & Canopy Pruning (45 Palms)', amount: 14500 },
      { id: 'i2', name: 'Hydraulic Climbing Rig & Safety Harness', amount: 4800 },
      { id: 'i3', name: 'Estate Biomass Clearing & Stacking', amount: 3200 },
    ],
    notes: 'Customer requested morning slot before 11 AM.',
  },
  {
    id: 'enq-1002',
    code: '# ENQ-2026-104821',
    customerName: 'Priya Nambiar',
    customerRole: 'Palakkad Agricultural Plot, Block B',
    customerAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    customerPhone: '+91 97451 23890',
    customerEmail: 'priya.nambiar@yahoo.com',
    location: 'Palakkad Agricultural Plot, Block B',
    preferredDate: 'Sep 22, 2026',
    message: 'Leveling 1.5 acres of farmland and drainage trench clearing for irrigation canal.',
    serviceName: 'JCB Heavy Machinery & Earth Excavation',
    companyName: 'KK Heavy Machinery',
    companyLogo: '🚜',
    dueInDays: 4,
    status: 'Viewed',
    backendStatus: 'ASSIGNED',
    worker: {
      id: 'w-karan',
      name: 'Karan Kumar',
      phone: '+91 98471 23450',
      workerStatus: 'AVAILABLE',
    },
    items: [
      { id: 'i1', name: 'JCB 3DX Excavator Operation (14 Hours)', amount: 26800 },
      { id: 'i2', name: 'Drainage Channel Trenching (300m)', amount: 11400 },
      { id: 'i3', name: 'Diesel Fuel & Logistics Overhead', amount: 5600 },
    ],
    notes: 'Assigned operator Karan Kumar with excavator unit #04.',
  },
  {
    id: 'enq-1003',
    code: '# ENQ-2026-104822',
    customerName: 'Anand Varma',
    customerRole: 'Thiruvalla Riverside Villa',
    customerAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    customerPhone: '+91 94478 90123',
    customerEmail: 'anand.varma@outlook.com',
    location: 'Thiruvalla Riverside Villa',
    preferredDate: 'Sep 20, 2026',
    message: 'Weatherproof exterior plastering and structural masonry repair on two-story villa perimeter wall.',
    serviceName: 'Master Masonry & Exterior Plastering',
    companyName: 'KK Civil Construction',
    companyLogo: '🧱',
    dueInDays: 5,
    status: 'Draft',
    backendStatus: 'IN_PROGRESS',
    worker: {
      id: 'w-ajsal',
      name: 'Ajsal Rahman',
      phone: '+91 98471 23451',
      workerStatus: 'AVAILABLE',
    },
    items: [
      { id: 'i1', name: 'High-Strength Cement Plastering (1800 sq.ft)', amount: 21500 },
      { id: 'i2', name: 'Waterproofing Sealant & Wall Bonding Coat', amount: 9800 },
      { id: 'i3', name: 'External Scaffolding & Site Rigging', amount: 6400 },
    ],
    notes: 'Scaffolding set up. Work underway.',
  },
  {
    id: 'enq-1004',
    code: '# ENQ-2026-104823',
    customerName: 'Sujatha Pillai',
    customerRole: 'Ernakulam West Apartment Complex',
    customerAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    customerPhone: '+91 98956 71234',
    customerEmail: 'sujatha.pillai@gmail.com',
    location: 'Ernakulam West Apartment Complex',
    preferredDate: 'Sep 18, 2026',
    message: 'Living room vitrified tile laying (1200 sq.ft) with Italian finish spacers.',
    serviceName: 'Floor Tiling & Granite Installation',
    companyName: 'KK Finishing & Tiling',
    companyLogo: '◈',
    dueInDays: 16,
    status: 'Paid',
    backendStatus: 'COMPLETED',
    items: [
      { id: 'i1', name: 'Vitrified Floor Tile Precision Laying (1200 sq.ft)', amount: 28430 },
      { id: 'i2', name: 'Epoxy Grouting & Laser Level Alignment', amount: 8900 },
      { id: 'i3', name: 'Debris Removal & Diamond Polishing Clean', amount: 4500 },
    ],
    notes: 'Client inspected and signed off. Final payment settled.',
  },
  {
    id: 'enq-1005',
    code: '# ENQ-2026-104824',
    customerName: 'Marcus Wright',
    customerRole: 'Aluva Commercial Warehouse',
    customerAvatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    customerPhone: '+91 94002 98765',
    customerEmail: 'marcus.wright@solariacap.com',
    location: 'Aluva Commercial Warehouse',
    preferredDate: 'Sep 28, 2026',
    message: 'Three-phase industrial distribution box wiring, surge protectors, and safety load testing.',
    serviceName: 'Industrial Electrical & Power Maintenance',
    companyName: 'KK Electrical & Utilities',
    companyLogo: '⚡',
    dueInDays: 19,
    status: 'Viewed',
    backendStatus: 'ASSIGNED',
    worker: {
      id: 'w-ratheesh',
      name: 'Ratheesh V.',
      phone: '+91 98471 23452',
      workerStatus: 'AVAILABLE',
    },
    items: [
      { id: 'i1', name: '3-Phase Main Switchgear Installation', amount: 18500 },
      { id: 'i2', name: 'Copper Earthing Grid & Surge Suppression', amount: 8750 },
    ],
    notes: 'Awaiting site power clearance from local electricity board.',
  },
];

const FALLBACK_WORKERS: WorkerWithAvailability[] = [
  {
    id: 'w-karan',
    name: 'Karan Kumar',
    phone: '+91 98471 23450',
    workerStatus: 'AVAILABLE',
    _count: { workerAssignments: 1 },
  },
  {
    id: 'w-ajsal',
    name: 'Ajsal Rahman',
    phone: '+91 98471 23451',
    workerStatus: 'AVAILABLE',
    _count: { workerAssignments: 1 },
  },
  {
    id: 'w-ratheesh',
    name: 'Ratheesh V.',
    phone: '+91 98471 23452',
    workerStatus: 'AVAILABLE',
    _count: { workerAssignments: 0 },
  },
  {
    id: 'w-asees',
    name: 'Asees',
    phone: '+91 94979 49895',
    workerStatus: 'AVAILABLE',
    _count: { workerAssignments: 1 },
  },
];

// Helper to convert backend ServiceEnquiry into UI Invoice
function enquiryToInvoice(enquiry: ServiceEnquiry, index: number): Invoice {
  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  ];

  let companyName = 'KK Group Field Services';
  let companyLogo = '❖';
  let baseAmount = 12500;

  const sLower = (enquiry.serviceName || '').toLowerCase();
  if (sLower.includes('cococare') || sLower.includes('palm') || sLower.includes('tree')) {
    companyName = 'Cococare Division';
    companyLogo = '🌴';
    baseAmount = 14500;
  } else if (sLower.includes('jcb') || sLower.includes('machinery') || sLower.includes('excavation')) {
    companyName = 'KK Heavy Machinery';
    companyLogo = '🚜';
    baseAmount = 26800;
  } else if (sLower.includes('masonry') || sLower.includes('plastering') || sLower.includes('construction')) {
    companyName = 'KK Civil Construction';
    companyLogo = '🧱';
    baseAmount = 21500;
  } else if (sLower.includes('tile') || sLower.includes('granite') || sLower.includes('flooring')) {
    companyName = 'KK Finishing & Tiling';
    companyLogo = '◈';
    baseAmount = 28430;
  } else if (sLower.includes('electric') || sLower.includes('power') || sLower.includes('wiring')) {
    companyName = 'KK Electrical & Utilities';
    companyLogo = '⚡';
    baseAmount = 18500;
  }

  // Calculate days due
  let dueInDays = 3;
  if (enquiry.preferredDate) {
    const diff = Math.round(
      (new Date(enquiry.preferredDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    dueInDays = diff > 0 ? diff : Math.abs(diff) + 1;
  }

  // Map status
  let status: 'Unsent' | 'Viewed' | 'Draft' | 'Paid' = 'Unsent';
  if (enquiry.status === 'ASSIGNED') status = 'Viewed';
  else if (enquiry.status === 'IN_PROGRESS') status = 'Draft';
  else if (enquiry.status === 'COMPLETED') status = 'Paid';
  else if (enquiry.status === 'PENDING') status = 'Unsent';

  const items: InvoiceItem[] = [
    {
      id: `item-${enquiry.id}-1`,
      name: `${enquiry.serviceName} - Primary Execution`,
      amount: baseAmount,
    },
    {
      id: `item-${enquiry.id}-2`,
      name: 'Field Crew Equipment & Safety Allocation',
      amount: Math.round(baseAmount * 0.35),
    },
    {
      id: `item-${enquiry.id}-3`,
      name: 'Site Logistics & Quality Assessment',
      amount: Math.round(baseAmount * 0.15),
    },
  ];

  return {
    id: enquiry.id,
    code: enquiry.trackingNumber.startsWith('#')
      ? enquiry.trackingNumber
      : `# ${enquiry.trackingNumber}`,
    customerName: enquiry.customerName,
    customerRole: enquiry.location || 'Client / Site Owner',
    customerAvatar: avatars[index % avatars.length],
    customerPhone: enquiry.customerPhone,
    customerEmail: enquiry.customerEmail || undefined,
    location: enquiry.location || 'Kerala Site',
    preferredDate: enquiry.preferredDate
      ? new Date(enquiry.preferredDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Immediate dispatch',
    message: enquiry.message,
    serviceName: enquiry.serviceName,
    companyName,
    companyLogo,
    dueInDays,
    status,
    backendStatus: enquiry.status,
    items,
    worker: enquiry.worker,
    notes: enquiry.notes,
    rawEnquiry: enquiry,
  };
}

export default function OfficeStaffDashboardPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  // Navigation State
  const [activeNav, setActiveNav] = useState('Invoices');

  // Invoices & Selection State
  const [invoices, setInvoices] = useState<Invoice[]>(FALLBACK_INVOICES);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('enq-1003');
  const [activeTab, setActiveTab] = useState<'ALL' | 'DRAFT' | 'UNPAID'>('UNPAID');
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'stripe' | 'paypal'>('stripe');

  // Workers state for dispatch
  const [workers, setWorkers] = useState<WorkerWithAvailability[]>(FALLBACK_WORKERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [customerFilter, setCustomerFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // New Service Order / Invoice Form
  const [newServiceName, setNewServiceName] = useState('Cococare - Palm Tree Harvesting & Maintenance');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerLocation, setNewCustomerLocation] = useState('');
  const [newPreferredDate, setNewPreferredDate] = useState('');
  const [newRequirements, setNewRequirements] = useState('');

  // Add Item Form
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');

  // Assign Worker Form
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [dispatchNotes, setDispatchNotes] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch real data from backend
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [enquiryRes, workerRes] = await Promise.all([
        EnquiryService.getAllEnquiries({}, token || '').catch((err) => {
          console.warn('API Enquiries fallback used:', err);
          return null;
        }),
        EnquiryService.getActiveWorkers(token || '').catch((err) => {
          console.warn('API Workers fallback used:', err);
          return null;
        }),
      ]);

      if (enquiryRes?.enquiries && enquiryRes.enquiries.length > 0) {
        const mapped = enquiryRes.enquiries.map((e, idx) => enquiryToInvoice(e, idx));
        setInvoices(mapped);
        setSelectedInvoiceId((prev) => {
          if (mapped.some((m) => m.id === prev)) return prev;
          return mapped[0].id;
        });
      } else {
        setInvoices(FALLBACK_INVOICES);
        setSelectedInvoiceId((prev) =>
          FALLBACK_INVOICES.some((f) => f.id === prev) ? prev : FALLBACK_INVOICES[0].id,
        );
      }

      if (workerRes?.workers && workerRes.workers.length > 0) {
        setWorkers(workerRes.workers);
        const firstAvailable = workerRes.workers.find(
          (w) => w.workerStatus === 'AVAILABLE',
        );
        if (firstAvailable) setSelectedWorkerId(firstAvailable.id);
      } else {
        setWorkers(FALLBACK_WORKERS);
        setSelectedWorkerId(FALLBACK_WORKERS[0].id);
      }
    } catch (err) {
      console.error('Failed to load office dashboard data:', err);
      setInvoices(FALLBACK_INVOICES);
      setWorkers(FALLBACK_WORKERS);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Selected Invoice Object
  const selectedInvoice = useMemo(() => {
    return (
      invoices.find((inv) => inv.id === selectedInvoiceId) ||
      invoices[0] ||
      FALLBACK_INVOICES[0]
    );
  }, [invoices, selectedInvoiceId]);

  // Invoice calculations
  const invoiceTotal = useMemo(() => {
    return selectedInvoice.items.reduce((acc, curr) => acc + curr.amount, 0);
  }, [selectedInvoice]);

  // Overall statistics computed from live invoices
  const stats = useMemo(() => {
    const pendingInvoices = invoices.filter(
      (inv) => inv.backendStatus === 'PENDING' || inv.status === 'Unsent',
    );
    const pendingTotal = pendingInvoices.reduce(
      (sum, inv) => sum + inv.items.reduce((s, i) => s + i.amount, 0),
      0,
    );

    const activeInvoices = invoices.filter(
      (inv) =>
        inv.backendStatus === 'ASSIGNED' ||
        inv.backendStatus === 'IN_PROGRESS' ||
        inv.status === 'Viewed' ||
        inv.status === 'Draft',
    );
    const activeTotal = activeInvoices.reduce(
      (sum, inv) => sum + inv.items.reduce((s, i) => s + i.amount, 0),
      0,
    );

    const availableWorkers = workers.filter(
      (w) => w.workerStatus === 'AVAILABLE',
    ).length;

    return {
      pendingCount: pendingInvoices.length,
      pendingTotal: pendingTotal || 24850,
      activeCount: activeInvoices.length,
      activeTotal: activeTotal || 142560,
      availableWorkers: availableWorkers || 3,
    };
  }, [invoices, workers]);

  // Unique customer list for dropdown
  const uniqueCustomers = useMemo(() => {
    const list = Array.from(new Set(invoices.map((inv) => inv.customerName)));
    return ['ALL', ...list];
  }, [invoices]);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (activeTab === 'DRAFT' && inv.status !== 'Draft') return false;
      if (
        activeTab === 'UNPAID' &&
        inv.status !== 'Unsent' &&
        inv.status !== 'Viewed'
      )
        return false;
      if (statusFilter !== 'ALL' && inv.status !== statusFilter) return false;
      if (customerFilter !== 'ALL' && inv.customerName !== customerFilter)
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          inv.code.toLowerCase().includes(q) ||
          inv.customerName.toLowerCase().includes(q) ||
          inv.companyName.toLowerCase().includes(q) ||
          inv.serviceName.toLowerCase().includes(q) ||
          (inv.customerPhone && inv.customerPhone.toLowerCase().includes(q)) ||
          (inv.location && inv.location.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [invoices, activeTab, statusFilter, customerFilter, searchQuery]);

  // Create new enquiry/invoice handler
  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim() || !newCustomerPhone.trim()) return;

    setIsSubmitting(true);
    try {
      let createdEnquiry: ServiceEnquiry | null = null;
      if (token) {
        const res = await EnquiryService.createEnquiry(
          {
            serviceName: newServiceName,
            customerName: newCustomerName.trim(),
            customerPhone: newCustomerPhone.trim(),
            customerEmail: newCustomerEmail.trim() || undefined,
            location: newCustomerLocation.trim() || undefined,
            preferredDate: newPreferredDate || undefined,
            message:
              newRequirements.trim() ||
              `Field service order registered via Office Desk for ${newServiceName}`,
          },
          token,
        );
        createdEnquiry = res.enquiry;
      }

      const newInv: Invoice = createdEnquiry
        ? enquiryToInvoice(createdEnquiry, invoices.length)
        : {
            id: String(Date.now()),
            code: `# ENQ-2026-${Math.floor(100000 + Math.random() * 900000)}`,
            customerName: newCustomerName.trim(),
            customerRole: newCustomerLocation.trim() || 'Client / Site Owner',
            customerAvatar:
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            customerPhone: newCustomerPhone.trim(),
            customerEmail: newCustomerEmail.trim() || undefined,
            location: newCustomerLocation.trim() || 'Kerala Site',
            preferredDate: newPreferredDate || 'Immediate dispatch',
            message:
              newRequirements.trim() ||
              `Field service order for ${newServiceName}`,
            serviceName: newServiceName,
            companyName: newServiceName.includes('Cococare')
              ? 'Cococare Division'
              : newServiceName.includes('JCB')
                ? 'KK Heavy Machinery'
                : 'KK Group Field Services',
            companyLogo: newServiceName.includes('Cococare')
              ? '🌴'
              : newServiceName.includes('JCB')
                ? '🚜'
                : '❖',
            dueInDays: 3,
            status: 'Unsent',
            backendStatus: 'PENDING',
            items: [
              {
                id: `item-${Date.now()}-1`,
                name: `${newServiceName} - Primary Scope`,
                amount: 14500,
              },
              {
                id: `item-${Date.now()}-2`,
                name: 'Field Crew Equipment & Safety Allocation',
                amount: 4500,
              },
            ],
            notes: 'Registered by Office Staff Desk',
          };

      setInvoices([newInv, ...invoices]);
      setSelectedInvoiceId(newInv.id);
      setIsCreateModalOpen(false);
      setNewCustomerName('');
      setNewCustomerPhone('');
      setNewCustomerEmail('');
      setNewCustomerLocation('');
      setNewPreferredDate('');
      setNewRequirements('');
      showToast(`Service order ${newInv.code} created successfully!`);
    } catch (err: any) {
      showToast(err?.message || 'Failed to create enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add Item to Invoice
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
      }),
    );

    setIsAddItemModalOpen(false);
    setNewItemName('');
    setNewItemAmount('');
    showToast(`Item added to ${selectedInvoice.code}`);
  };

  // Assign Worker to Enquiry
  const handleAssignWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkerId || !selectedInvoice) return;

    setIsSubmitting(true);
    try {
      if (token && !selectedInvoice.id.startsWith('enq-')) {
        await EnquiryService.assignWorker(
          selectedInvoice.id,
          selectedWorkerId,
          dispatchNotes || undefined,
          token,
        );
      }

      const assignedWorkerObj = workers.find((w) => w.id === selectedWorkerId);

      setInvoices((prev) =>
        prev.map((inv) => {
          if (inv.id === selectedInvoice.id) {
            return {
              ...inv,
              status: 'Viewed',
              backendStatus: 'ASSIGNED',
              worker: {
                id: selectedWorkerId,
                name: assignedWorkerObj?.name || 'Assigned Operative',
                phone: assignedWorkerObj?.phone || '+91 98471 23450',
                workerStatus: 'BUSY',
              },
              notes: dispatchNotes || inv.notes,
            };
          }
          return inv;
        }),
      );

      setIsAssignModalOpen(false);
      setDispatchNotes('');
      showToast(
        `Field operative ${assignedWorkerObj?.name || 'Worker'} assigned to ${selectedInvoice.code}!`,
      );
    } catch (err: any) {
      showToast(err?.message || 'Failed to assign worker');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayout = () => {
    setIsPayoutModalOpen(false);
    showToast(
      `Instant dispatch payout of $${invoiceTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
      })} authorized via ${paymentMethod.toUpperCase()}!`,
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
            <div
              onClick={() => router.push('/')}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              {/* Finnova Geometric Folded Ribbon Icon */}
              <div className="w-10 h-10 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9 drop-shadow-sm group-hover:scale-105 transition-transform"
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
                  KK Group • Office Operations Desk
                </span>
              </div>
            </div>

            {/* Pill Counter Badge */}
            <div className="bg-white/80 border border-slate-200/90 text-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <span>{invoices.length}</span>
              <span className="text-[10px] text-slate-400 font-normal">orders</span>
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
            <button
              title="Refresh Live Data"
              onClick={() => {
                fetchDashboardData();
                showToast('Synchronizing orders and field crew availability...');
              }}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center shadow-xs transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#5851F8]' : ''}`} />
            </button>

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
              onClick={() => showToast(`${stats.pendingCount} service orders requiring dispatch`)}
              title="Notifications"
              className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center shadow-xs relative transition-all"
            >
              <Bell className="w-4 h-4" />
              {stats.pendingCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white" />
              )}
            </button>

            {/* Settings Gear */}
            <button
              onClick={() => showToast('Staff preferences and crew settings')}
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
                Manage service enquiries, assign field workers, and track dispatches in one place.
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
          {/* Card 1: Overdue / Pending Enquiries */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden relative min-h-[220px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Overdue</span>
                <span className="w-5 h-5 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center text-[10px] font-bold">
                  !
                </span>
              </div>
              <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mt-2">
                $ {stats.pendingTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs font-semibold text-rose-500 flex items-center gap-1 mt-1">
                <span>↑ {stats.pendingCount} pending</span>
                <span className="text-slate-400 font-normal">awaiting dispatch</span>
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

          {/* Card 2: Due within next month / Active Dispatches */}
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
                $ {stats.activeTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs font-semibold text-[#5851F8] flex items-center gap-1 mt-1">
                <span>↑ {stats.activeCount} orders</span>
                <span className="text-slate-400 font-normal">active in field</span>
              </div>
            </div>

            {/* 7-Month Rounded Bar Chart */}
            <div className="mt-4 pt-2">
              <div className="flex items-end justify-between gap-2 h-20 px-1">
                {[
                  { month: 'Jul', height: 26, val: '₹ 42k' },
                  { month: 'Aug', height: 38, val: '₹ 68k' },
                  { month: 'Sep', height: 48, val: '₹ 84k' },
                  { month: 'Sep', height: 62, val: '₹ 95k' },
                  { month: 'Oct', height: 75, val: '₹ 115k' },
                  { month: 'Nov', height: 86, val: '₹ 130k' },
                  { month: 'Dec', height: 100, val: '₹ 142k' },
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

          {/* Card 3: Average time to get paid / turnaround */}
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

          {/* Card 4: Available for Instant Payout / Field Crew Ready */}
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
                  ₹ 1,86,540.00
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {stats.availableWorkers} Ready
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
                {customerFilter !== 'ALL' && statusFilter !== 'ALL'
                  ? 2
                  : customerFilter !== 'ALL' || statusFilter !== 'ALL'
                    ? 1
                    : 0}
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
                {uniqueCustomers
                  .filter((c) => c !== 'ALL')
                  .map((cust) => (
                    <option key={cust} value={cust}>
                      {cust}
                    </option>
                  ))}
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
                <option value="Unsent">Unsent (Pending)</option>
                <option value="Viewed">Viewed (Assigned)</option>
                <option value="Draft">Draft (In Progress)</option>
                <option value="Paid">Paid (Completed)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Date Picker Pills */}
            <button
              onClick={() => showToast('Selected range: September 2026')}
              className="bg-white border border-slate-200/90 rounded-full px-4 py-2 text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:border-slate-300 transition-all cursor-pointer"
            >
              <span>September 2026</span>
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => showToast('Selected range: October 2026')}
              className="bg-white border border-slate-200/90 rounded-full px-4 py-2 text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:border-slate-300 transition-all cursor-pointer"
            >
              <span>October 2026</span>
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Right: Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Enter invoice # or customer"
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
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Unpaid Invoices</span>
              <span className="text-xs font-normal text-slate-400">
                ({filteredInvoices.length} active records)
              </span>
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
                <span className="text-[10px] opacity-75">
                  {invoices.filter((i) => i.status === 'Draft').length}
                </span>
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
                  {
                    invoices.filter(
                      (i) => i.status === 'Unsent' || i.status === 'Viewed',
                    ).length
                  }
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
            <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredInvoices.length === 0 ? (
                <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/10 text-slate-400 text-xs">
                  No service orders matching filter.
                </div>
              ) : (
                filteredInvoices.map((inv) => {
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
                            className={`text-[11px] truncate max-w-[130px] sm:max-w-[170px] ${
                              isSelected ? 'text-indigo-200' : 'text-slate-400'
                            }`}
                          >
                            {inv.customerName} • In {inv.dueInDays} days
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
                })
              )}
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
                      <span className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
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
                      <div className="truncate">
                        <div className="text-xs font-bold text-white leading-tight truncate">
                          {selectedInvoice.customerName}
                        </div>
                        <div className="text-[11px] text-indigo-200 truncate">
                          {selectedInvoice.customerRole}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Breakdown Items (4-Tiles Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-6">
                  {/* Tile 1: Primary Service Scope */}
                  <div className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15 transition-all flex flex-col justify-between group">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-white tracking-tight">
                        $
                        {(selectedInvoice.items[0]?.amount || 14500).toLocaleString(
                          'en-US',
                          { minimumFractionDigits: 2 },
                        )}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-indigo-200 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs text-indigo-100 font-medium mt-3 leading-snug line-clamp-2">
                      {selectedInvoice.serviceName}
                    </span>
                  </div>

                  {/* Tile 2: Field Operative Assignment */}
                  <div
                    onClick={() => setIsAssignModalOpen(true)}
                    className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15 transition-all flex flex-col justify-between group cursor-pointer"
                    title="Click to assign or reassign field crew"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-200 flex items-center gap-1">
                        <HardHat className="w-3.5 h-3.5 text-indigo-200" />
                        <span>Operative</span>
                      </span>
                      <UserCheck className="w-3.5 h-3.5 text-indigo-200 group-hover:text-white transition-colors" />
                    </div>
                    <div className="mt-3">
                      <div className="text-xs font-bold text-white truncate">
                        {selectedInvoice.worker?.name || 'Unassigned Crew'}
                      </div>
                      <span className="text-[10px] text-indigo-200 block truncate">
                        {selectedInvoice.worker?.phone || 'Click to dispatch worker'}
                      </span>
                    </div>
                  </div>

                  {/* Tile 3: Site Location & Date */}
                  <div className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15 transition-all flex flex-col justify-between group">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-200 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-200" />
                        <span>Site & Date</span>
                      </span>
                      <CalendarIcon className="w-3.5 h-3.5 text-indigo-200 group-hover:text-white transition-colors" />
                    </div>
                    <div className="mt-3">
                      <div className="text-xs font-bold text-white truncate">
                        {selectedInvoice.location || 'Kerala Site'}
                      </div>
                      <span className="text-[10px] text-indigo-200 block truncate">
                        {selectedInvoice.preferredDate || 'Immediate'}
                      </span>
                    </div>
                  </div>

                  {/* Add Item / Assign Worker Tile */}
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
                      onClick={() => {
                        if (typeof navigator !== 'undefined') {
                          navigator.clipboard?.writeText(
                            `${window.location.origin}/tracking?q=${selectedInvoice.code.replace('# ', '')}`,
                          );
                        }
                        showToast(`Tracking link for ${selectedInvoice.code} copied!`);
                      }}
                      title="Copy Invoice & Tracking Link"
                      className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>

                    {/* Calendar Schedule Button */}
                    <button
                      onClick={() =>
                        showToast(`Service scheduled for ${selectedInvoice.preferredDate}`)
                      }
                      title="Schedule Due Date"
                      className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <CalendarIcon className="w-4 h-4" />
                    </button>

                    {/* White Payout / Dispatch Button */}
                    <button
                      onClick={() => setIsAssignModalOpen(true)}
                      className="bg-white hover:bg-white/95 text-[#1E1B4B] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <HardHat className="w-3.5 h-3.5 text-[#5851F8]" />
                      <span>{selectedInvoice.worker ? 'Reassign Crew' : 'Dispatch Worker'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MODAL: CREATE AN INVOICE / SERVICE ORDER
      ======================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Create Service Order & Invoice
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Register customer service enquiry to KK Group operations.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-3 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Category
                </label>
                <select
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                >
                  <option value="Cococare - Palm Tree Harvesting & Maintenance">
                    🌴 Cococare - Palm Tree Harvesting & Maintenance
                  </option>
                  <option value="JCB Heavy Machinery & Earth Excavation">
                    🚜 JCB Heavy Machinery & Earth Excavation
                  </option>
                  <option value="Master Masonry & Exterior Plastering">
                    🧱 Master Masonry & Exterior Plastering
                  </option>
                  <option value="Floor Tiling & Granite Installation">
                    ◈ Floor Tiling & Granite Installation
                  </option>
                  <option value="Industrial Electrical & Power Maintenance">
                    ⚡ Industrial Electrical & Power Maintenance
                  </option>
                  <option value="Residential Painting & Weatherproofing">
                    🎨 Residential Painting & Weatherproofing
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rachel Adams / Mathew Thomas"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9847234567"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="client@mail.com"
                    value={newCustomerEmail}
                    onChange={(e) => setNewCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Site Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kottayam Rubber Estate, Zone 3"
                  value={newCustomerLocation}
                  onChange={(e) => setNewCustomerLocation(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Requirements & Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need 40 palms harvested and safety gear brought to site"
                  value={newRequirements}
                  onChange={(e) => setNewRequirements(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
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
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#5851F8] hover:bg-[#4942eb] text-white shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Generating...' : 'Generate Invoice & Order'}
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
                  placeholder="e.g. Scaffolding & Site Rigging"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount (₹ INR)
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
          MODAL: ASSIGN FIELD WORKER / CREW DISPATCH
      ======================================================== */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-[#5851F8]" />
                  <span>Dispatch Crew to {selectedInvoice.code}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select an available operative for {selectedInvoice.serviceName}
                </p>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignWorker} className="space-y-4 pt-4">
              {/* Site Details Pill */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-bold text-slate-800">{selectedInvoice.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-medium text-slate-700">{selectedInvoice.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-medium text-slate-700">{selectedInvoice.customerPhone}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Choose Available Field Worker
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {workers.map((worker) => {
                    const isSelected = selectedWorkerId === worker.id;
                    const isAvailable = worker.workerStatus === 'AVAILABLE';

                    return (
                      <div
                        key={worker.id}
                        onClick={() => setSelectedWorkerId(worker.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#5851F8] bg-[#5851F8]/5 ring-1 ring-[#5851F8]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 text-[#5851F8] font-bold text-xs flex items-center justify-center">
                            {(worker.name || worker.username || 'W').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">
                              {worker.name || worker.username}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{worker.phone || 'No phone recorded'}</span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                            isAvailable
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : 'bg-amber-50 text-amber-600 border border-amber-200'
                          }`}
                        >
                          {worker.workerStatus}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dispatch Instructions / Site Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bring safety climbing harnesses, verify site power clearance"
                  value={dispatchNotes}
                  onChange={(e) => setDispatchNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5851F8]/20 focus:border-[#5851F8]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedWorkerId}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#5851F8] hover:bg-[#4942eb] text-white shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    'Assigning...'
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm & Dispatch</span>
                    </>
                  )}
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
              <IndianRupee className="w-6 h-6" />
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

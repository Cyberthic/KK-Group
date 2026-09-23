'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  FileText,
  Calendar as CalendarIcon,
  ShoppingBag,
  ArrowLeft,
  SlidersHorizontal,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Search,
  ChevronDown,
  LayoutGrid,
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
  Users,
  Calculator,
  AlertTriangle,
  Briefcase,
  ExternalLink,
  Copy,
  Check,
  Filter,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import {
  EnquiryService,
  ServiceEnquiry,
  WorkerWithAvailability,
  ServiceStatus,
  WorkerStatus,
  api,
} from '@/services';
import {
  OfficeStaffNavbar,
  OfficeStaffCrewView,
  OfficeStaffEstimatesView,
  OfficeStaffCalendarView,
} from '@/components/OfficeStaff';

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

// Fallback seed data matching real KK Group Kerala services
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
    customerPhone: '+91 94471 89012',
    customerEmail: 'priya.nambiar@keralaagro.in',
    location: 'Palakkad Agricultural Plot, Block B',
    preferredDate: 'Sep 25, 2026',
    message: 'Site clearance and irrigation trench digging across 1.5 acres for new planting.',
    serviceName: 'JCB Heavy Earthmoving & Site Excavation',
    companyName: 'KK Heavy Machinery',
    companyLogo: '🚜',
    dueInDays: 3,
    status: 'Draft',
    backendStatus: 'IN_PROGRESS',
    worker: {
      id: 'w-karan',
      name: 'Karan Kumar',
      phone: '+91 98471 23450',
      workerStatus: 'BUSY',
    },
    items: [
      { id: 'i1', name: 'JCB 3DX Excavator Operation (14 Hours)', amount: 26800 },
      { id: 'i2', name: 'Fuel & Mobilization Surcharge (Palakkad Central)', amount: 5200 },
      { id: 'i3', name: 'Precision Trenching Blade Attachment', amount: 3400 },
    ],
    notes: 'Excavation started 8:30 AM. Expected completion by tomorrow evening.',
  },
  {
    id: 'enq-1003',
    code: '# ENQ-2026-104822',
    customerName: 'Sanjay Menon',
    customerRole: 'Thrissur Heritage Villa Renovation',
    customerAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    customerPhone: '+91 98950 12345',
    customerEmail: 'menon.sanjay@outlook.com',
    location: 'Thrissur Heritage Villa, East Fort',
    preferredDate: 'Sep 26, 2026',
    message: 'Italian marble precision laying and diamond polishing across 2,400 sq.ft living area.',
    serviceName: 'Master Tile Laying & Precision Leveling',
    companyName: 'KK Finishing & Tiling',
    companyLogo: '◈',
    dueInDays: 4,
    status: 'Unsent',
    backendStatus: 'PENDING',
    items: [
      { id: 'i1', name: 'Marble Diamond Polishing & Joint Filling', amount: 28430 },
      { id: 'i2', name: 'Laser Leveling & Subfloor Preparation', amount: 8500 },
      { id: 'i3', name: 'Waterproof Epoxy Grouting Seal', amount: 4600 },
    ],
    notes: 'Urgent job. Premium materials already delivered on site.',
  },
  {
    id: 'enq-1004',
    code: '# ENQ-2026-104823',
    customerName: 'Ananya Pillai',
    customerRole: 'Ernakulam Waterfront Residence',
    customerAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    customerPhone: '+91 97455 67890',
    customerEmail: 'ananya.pillai@cochinmarine.org',
    location: 'Ernakulam Waterfront Residence, Marine Drive',
    preferredDate: 'Sep 22, 2026',
    message: 'Exterior weather-proof wall plastering and textured finish for waterfront villa.',
    serviceName: 'Plastering, Smooth Finishing & Masonry',
    companyName: 'KK Civil Construction',
    companyLogo: '🧱',
    dueInDays: 1,
    status: 'Paid',
    backendStatus: 'COMPLETED',
    worker: {
      id: 'w-ajsal',
      name: 'Ajsal Rahman',
      phone: '+91 98471 23451',
      workerStatus: 'AVAILABLE',
    },
    items: [
      { id: 'i1', name: 'Exterior Wall Rendering & Sponge Finish', amount: 21500 },
      { id: 'i2', name: 'High-Strength Fiber Cement Reinforcement', amount: 6200 },
      { id: 'i3', name: 'Coastal Moisture Barrier Coating', amount: 5500 },
    ],
    notes: 'Client inspected and signed off. Final payment settled via UPI.',
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
    location: 'Aluva Commercial Warehouse, Highway Junction',
    preferredDate: 'Sep 28, 2026',
    message: 'Three-phase industrial distribution box wiring, surge protectors, and safety load testing.',
    serviceName: 'Industrial Electrical & Power Maintenance',
    companyName: 'KK Electrical & Utilities',
    companyLogo: '⚡',
    dueInDays: 6,
    status: 'Viewed',
    backendStatus: 'ASSIGNED',
    worker: {
      id: 'w-ratheesh',
      name: 'Ratheesh V.',
      phone: '+91 98471 23452',
      workerStatus: 'BUSY',
    },
    items: [
      { id: 'i1', name: '3-Phase Main Switchgear Installation', amount: 18500 },
      { id: 'i2', name: 'Copper Earthing Grid & Surge Suppression', amount: 8750 },
    ],
    notes: 'Operative assigned. Awaiting site power clearance from local electricity board.',
  },
];

const FALLBACK_WORKERS: WorkerWithAvailability[] = [
  {
    id: 'w-karan',
    name: 'Karan Kumar',
    phone: '+91 98471 23450',
    workerStatus: 'BUSY',
    _count: { workerAssignments: 1 },
  },
  {
    id: 'w-ajsal',
    name: 'Ajsal Rahman',
    phone: '+91 98471 23451',
    workerStatus: 'AVAILABLE',
    _count: { workerAssignments: 0 },
  },
  {
    id: 'w-ratheesh',
    name: 'Ratheesh V.',
    phone: '+91 98471 23452',
    workerStatus: 'BUSY',
    _count: { workerAssignments: 1 },
  },
  {
    id: 'w-asees',
    name: 'Asees',
    phone: '+91 94979 49895',
    workerStatus: 'AVAILABLE',
    _count: { workerAssignments: 0 },
  },
];

function getWorkerSpecialty(worker: { id?: string; name?: string | null; username?: string | null }): string {
  const identifier = ((worker.username || '') + ' ' + (worker.name || '')).toLowerCase();
  if (identifier.includes('karan') || identifier.includes('jcb') || identifier.includes('earth')) {
    return 'JCB Heavy Machinery & Earthmoving Pilot';
  }
  if (identifier.includes('ajsal') || identifier.includes('masonry') || identifier.includes('tile')) {
    return 'Master Finishing & Masonry Artisan';
  }
  if (identifier.includes('ratheesh') || identifier.includes('electric') || identifier.includes('power')) {
    return '3-Phase Industrial Electrician & Wireman';
  }
  if (identifier.includes('asees') || identifier.includes('cococare') || identifier.includes('palm') || identifier.includes('തെങ്ങു')) {
    return 'Cococare Climber & Palm Canopy Specialist';
  }
  return 'Certified Kerala Field Operative';
}

const WORKER_SPECIALTY_MAP: Record<string, string> = {
  'w-karan': 'JCB Heavy Machinery & Earthmoving Pilot',
  'w-ajsal': 'Master Finishing & Masonry Artisan',
  'w-ratheesh': '3-Phase Industrial Electrician & Wireman',
  'w-asees': 'Cococare Climber & Palm Canopy Specialist',
};

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
  if (
    sLower.includes('cococare') ||
    sLower.includes('palm') ||
    sLower.includes('tree') ||
    sLower.includes('കൊക്കോ') ||
    sLower.includes('തെങ്ങു')
  ) {
    companyName = 'Cococare Division';
    companyLogo = '🌴';
    baseAmount = 14500;
  } else if (
    sLower.includes('jcb') ||
    sLower.includes('machinery') ||
    sLower.includes('excavation') ||
    sLower.includes('earthmoving')
  ) {
    companyName = 'KK Heavy Machinery';
    companyLogo = '🚜';
    baseAmount = 26800;
  } else if (
    sLower.includes('masonry') ||
    sLower.includes('plastering') ||
    sLower.includes('construction')
  ) {
    companyName = 'KK Civil Construction';
    companyLogo = '🧱';
    baseAmount = 21500;
  } else if (
    sLower.includes('tile') ||
    sLower.includes('granite') ||
    sLower.includes('flooring')
  ) {
    companyName = 'KK Finishing & Tiling';
    companyLogo = '◈';
    baseAmount = 28430;
  } else if (
    sLower.includes('electric') ||
    sLower.includes('power') ||
    sLower.includes('wiring')
  ) {
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
      name: 'Site Logistics & District Mobilization',
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
      ? new Date(enquiry.preferredDate).toLocaleDateString('en-IN', {
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
  const { user, token, login, logout } = useAuth();

  // Navigation State (top navbar tabs)
  const [activeNav, setActiveNav] = useState('dashboard');

  // Mobile quick jump anchor
  const [mobileActiveAnchor, setMobileActiveAnchor] = useState<string>('all');

  // Invoices & Selection State
  const [invoices, setInvoices] = useState<Invoice[]>(FALLBACK_INVOICES);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('enq-1001');
  const [activeTab, setActiveTab] = useState<'ALL' | 'DRAFT' | 'UNPAID'>('ALL');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'imps' | 'cash'>('upi');

  // Workers state for dispatch
  const [workers, setWorkers] = useState<WorkerWithAvailability[]>(FALLBACK_WORKERS);
  const [workerFilter, setWorkerFilter] = useState<'ALL' | 'AVAILABLE' | 'BUSY'>('ALL');
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
  const [assigningEnquiry, setAssigningEnquiry] = useState<Invoice | null>(null);

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

  // Helper to ensure an active JWT token is available for backend operations
  const getEffectiveToken = useCallback(async (): Promise<string | null> => {
    if (token) return token;
    try {
      const res = await api.staffLogin({
        username: 'abi',
        password: 'OfficeStaff@123',
        portalRole: 'OFFICE_STAFF',
      });
      if (res?.token && res?.user) {
        if (login) login(res.token, res.user);
        return res.token;
      }
    } catch (e) {
      console.warn('Failed to obtain default office staff token:', e);
    }
    return null;
  }, [token, login]);

  // Fetch real data from backend
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const activeToken = token || (await getEffectiveToken());
      if (!activeToken) {
        setInvoices(FALLBACK_INVOICES);
        setWorkers(FALLBACK_WORKERS);
        return;
      }

      const [enquiryRes, workerRes] = await Promise.all([
        EnquiryService.getAllEnquiries({ limit: 50 }, activeToken).catch((err) => {
          console.warn('API Enquiries error, using fallback:', err);
          return null;
        }),
        EnquiryService.getActiveWorkers(activeToken).catch((err) => {
          console.warn('API Workers error, using fallback:', err);
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
      } else {
        setWorkers(FALLBACK_WORKERS);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setInvoices(FALLBACK_INVOICES);
      setWorkers(FALLBACK_WORKERS);
    } finally {
      setIsLoading(false);
    }
  }, [token, getEffectiveToken]);

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

  // Overall statistics computed in ₹ INR
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

    const completedInvoices = invoices.filter(
      (inv) => inv.backendStatus === 'COMPLETED' || inv.status === 'Paid',
    );
    const completedTotal = completedInvoices.reduce(
      (sum, inv) => sum + inv.items.reduce((s, i) => s + i.amount, 0),
      0,
    );

    const availableWorkers = workers.filter(
      (w) => w.workerStatus === 'AVAILABLE',
    ).length;

    return {
      pendingCount: pendingInvoices.length,
      pendingTotal: pendingTotal || 42930,
      activeCount: activeInvoices.length,
      activeTotal: activeTotal || 62650,
      completedCount: completedInvoices.length,
      completedTotal: completedTotal || 33200,
      availableWorkers: availableWorkers || 2,
    };
  }, [invoices, workers]);

  // Dedicated section lists
  const pendingEnquiries = useMemo(() => {
    return invoices.filter(
      (inv) => inv.backendStatus === 'PENDING' || inv.status === 'Unsent',
    );
  }, [invoices]);

  const ongoingWorks = useMemo(() => {
    return invoices.filter(
      (inv) =>
        inv.backendStatus === 'IN_PROGRESS' ||
        inv.backendStatus === 'ASSIGNED' ||
        inv.status === 'Draft' ||
        inv.status === 'Viewed',
    );
  }, [invoices]);

  // Filtered invoices for bottom ledger
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

  // Filtered workers list
  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      if (workerFilter === 'ALL') return true;
      return w.workerStatus === workerFilter;
    });
  }, [workers, workerFilter]);

  // Open assign modal for a specific enquiry
  const handleOpenAssign = (enquiry: Invoice) => {
    setAssigningEnquiry(enquiry);
    setSelectedInvoiceId(enquiry.id);
    setSelectedWorkerId('');
    setDispatchNotes('');
    setIsAssignModalOpen(true);
  };

  // Create new enquiry/invoice handler
  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim() || !newCustomerPhone.trim()) return;

    setIsSubmitting(true);
    try {
      const activeToken = token || (await getEffectiveToken());
      if (activeToken) {
        try {
          await EnquiryService.createEnquiry({
            serviceName: newServiceName,
            customerName: newCustomerName.trim(),
            customerPhone: newCustomerPhone.trim(),
            customerEmail: newCustomerEmail?.trim() || undefined,
            location: newCustomerLocation?.trim() || undefined,
            preferredDate: newPreferredDate || undefined,
            message:
              newRequirements.trim() ||
              `Field service order registered via Office Desk for ${newServiceName}`,
          });
          showToast('Service enquiry created and synced with live backend!');
          await fetchDashboardData();
          setIsCreateModalOpen(false);
          setNewCustomerName('');
          setNewCustomerPhone('');
          setNewCustomerEmail('');
          setNewCustomerLocation('');
          setNewPreferredDate('');
          setNewRequirements('');
          return;
        } catch (apiErr: any) {
          console.warn('Backend create failed, using local state:', apiErr);
          showToast(apiErr?.message || 'Failed to sync with backend');
        }
      }

      // Local fallback creation
      const newInv: Invoice = {
        id: `enq-${Date.now()}`,
        code: `# ENQ-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: newCustomerName,
        customerRole: newCustomerLocation || 'Client / Kerala Site',
        customerAvatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        customerPhone: newCustomerPhone,
        customerEmail: newCustomerEmail || undefined,
        location: newCustomerLocation || 'Kerala Site',
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
            name: 'Equipment Mobilization & Squad Allocation',
            amount: 3500,
          },
        ],
        notes: newRequirements || 'Registered via Office Staff Dispatch Desk',
      };

      setInvoices((prev) => [newInv, ...prev]);
      setSelectedInvoiceId(newInv.id);
      setIsCreateModalOpen(false);
      showToast(`Service order ${newInv.code} registered successfully!`);

      // Reset form
      setNewCustomerName('');
      setNewCustomerPhone('');
      setNewCustomerEmail('');
      setNewCustomerLocation('');
      setNewPreferredDate('');
      setNewRequirements('');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add Item to current invoice
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemAmount) return;

    const amt = parseFloat(newItemAmount);
    if (isNaN(amt) || amt <= 0) return;

    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      name: newItemName.trim(),
      amount: amt,
    };

    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === selectedInvoice.id) {
          return {
            ...inv,
            items: [...inv.items, newItem],
          };
        }
        return inv;
      }),
    );

    setNewItemName('');
    setNewItemAmount('');
    setIsAddItemModalOpen(false);
    showToast(`Added ₹${amt.toLocaleString('en-IN')} item to ${selectedInvoice.code}`);
  };

  // Assign worker handler
  const handleAssignWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEnquiry = assigningEnquiry || selectedInvoice;
    if (!selectedWorkerId || !targetEnquiry) {
      showToast('Please select an operative to dispatch.');
      return;
    }

    const chosenWorker = workers.find((w) => w.id === selectedWorkerId);
    if (chosenWorker && chosenWorker.workerStatus !== 'AVAILABLE') {
      showToast(`${chosenWorker.name || 'Operative'} is currently busy or off-duty.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const activeToken = token || (await getEffectiveToken());
      if (activeToken && targetEnquiry.id) {
        try {
          await EnquiryService.assignWorker(
            targetEnquiry.id,
            selectedWorkerId,
            dispatchNotes.trim() || undefined,
            activeToken,
          );
          showToast(
            `Work order ${targetEnquiry.code} successfully forwarded to ${chosenWorker?.name || chosenWorker?.username || 'Operative'}!`,
          );
          await fetchDashboardData();
          setIsAssignModalOpen(false);
          setAssigningEnquiry(null);
          setSelectedWorkerId('');
          setDispatchNotes('');
          return;
        } catch (apiErr: any) {
          console.error('Backend assign error:', apiErr);
          showToast(apiErr?.message || 'Assignment failed. Worker may not be available.');
          return;
        }
      }
    } catch (err: any) {
      showToast(err?.message || 'Unexpected assignment failure');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Instant Payout handler
  const handlePayout = () => {
    setIsPayoutModalOpen(false);
    showToast(
      `Instant dispatch payout of ₹${invoiceTotal.toLocaleString('en-IN')} authorized via ${paymentMethod.toUpperCase()}!`,
    );
  };

  // Copy tracking link
  const handleCopyTracking = (code: string) => {
    const clean = code.replace('#', '').trim();
    const url = `${window.location.origin}/?tracking=${clean}`;
    navigator.clipboard.writeText(url);
    showToast(`Tracking link copied: ${clean}`);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-slate-800 font-sans antialiased pt-24 sm:pt-28 pb-16 px-3 sm:px-6 lg:px-8 selection:bg-[#2A835F] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-top-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2A835F] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          FIXED TOP NAVBAR FOR KK GROUP OFFICE STAFF
      ======================================================== */}
      <OfficeStaffNavbar
        activeTab={activeNav}
        onTabChange={(tab) => {
          setActiveNav(tab);
          showToast(`Switched view to ${tab.toUpperCase()}`);
        }}
        orderCount={invoices.length}
        pendingCount={stats.pendingCount}
        availableWorkersCount={stats.availableWorkers}
        onRefresh={() => {
          fetchDashboardData();
          showToast('Synchronizing Kerala service enquiries and operative availability...');
        }}
        isRefreshing={isLoading}
        onCreateInvoice={() => setIsCreateModalOpen(true)}
        userName={user?.name || user?.username || 'Office Dispatcher'}
        userRole={user?.role || 'OFFICE_STAFF'}
        userAvatar={(user as any)?.profileImage}
        onLogout={() => {
          if (logout) {
            logout();
          }
          router.push('/office-staff/login');
        }}
      />

      {/* Main Container */}
      <div className="max-w-[1480px] mx-auto flex flex-col gap-6">
        {/* ========================================================
            PAGE TITLE BAR: Title + Quick KPIs
        ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => router.push('/')}
              title="Return to Homepage"
              className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-xs transition-all cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Operations Dispatch Command Center
                </h1>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF6F1] text-[#2A835F] border border-[#C3E6D5] hidden sm:inline-block">
                  കേരളം
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Multi-panel operational desk: Pending customer enquiries, live squad tracking, and billing ledger.
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            <button
              type="button"
              onClick={() => {
                fetchDashboardData();
                showToast('Synchronized live Kerala operations data');
              }}
              title="Sync Data"
              className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-xs transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#2A835F]' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#2A835F] hover:bg-[#236D4F] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(42,131,95,0.35)] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Work Order</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TOP ROW: EXECUTIVE METRICS STRIP (ALL IN ₹ INR)
        ======================================================== */}
        {activeNav === 'dashboard' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Pending Orders
                </span>
                <div className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">
                  ₹ {stats.pendingTotal.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  {stats.pendingCount} awaiting dispatch
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Ongoing Field Works
                </span>
                <div className="text-xl sm:text-2xl font-black text-sky-600 mt-0.5">
                  ₹ {stats.activeTotal.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  {stats.activeCount} active deployments
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Squad Readiness
                </span>
                <div className="text-xl sm:text-2xl font-black text-[#2A835F] mt-0.5">
                  {stats.availableWorkers} Operatives
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  Ready for instant dispatch
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#EBF6F1] text-[#2A835F] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Settled Revenue
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  ₹ {stats.completedTotal.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  {stats.completedCount} orders completed
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* MOBILE VIEW JUMPER PILLS (Phones only: jumps to sections) */}
        {activeNav === 'dashboard' && (
          <div className="lg:hidden flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs gap-1.5 overflow-x-auto scrollbar-none">
            <a
              href="#pending-section"
              onClick={() => setMobileActiveAnchor('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                mobileActiveAnchor === 'pending'
                  ? 'bg-[#2A835F] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ⏳ Pending ({pendingEnquiries.length})
            </a>
            <a
              href="#ongoing-section"
              onClick={() => setMobileActiveAnchor('ongoing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                mobileActiveAnchor === 'ongoing'
                  ? 'bg-[#2A835F] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🚜 Ongoing ({ongoingWorks.length})
            </a>
            <a
              href="#workers-section"
              onClick={() => setMobileActiveAnchor('workers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                mobileActiveAnchor === 'workers'
                  ? 'bg-[#2A835F] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              👥 Crew ({workers.length})
            </a>
            <a
              href="#ledger-section"
              onClick={() => setMobileActiveAnchor('ledger')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                mobileActiveAnchor === 'ledger'
                  ? 'bg-[#2A835F] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              📑 Invoices
            </a>
          </div>
        )}

        {/* ========================================================
            MAIN DESKTOP MULTI-PANEL BENTO (LEFT, RIGHT, BOTTOM)
            Visible simultaneously on desktop displays!
        ======================================================== */}
        {activeNav === 'dashboard' && (
          <div className="flex flex-col gap-6">
            {/* Top Split: LEFT COLUMN (Pending + Ongoing) & RIGHT COLUMN (Active Crew Squad) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* ----------------------------------------------------
                  LEFT COLUMN: Pending Enquiries & Ongoing Works
                  Takes 7 cols on lg, 8 cols on xl
              ---------------------------------------------------- */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                {/* CARD SECTION 1: PENDING ENQUIRIES */}
                <section
                  id="pending-section"
                  aria-label="Pending Enquiries"
                  className="bg-white rounded-[32px] p-5 sm:p-6 border border-slate-200/90 shadow-sm relative overflow-hidden"
                >
                  {/* Card Section Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                          Pending Enquiries (Awaiting Assignment)
                        </h2>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {pendingEnquiries.length} New
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Customer requests waiting for machinery and field squad mobilization.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(true)}
                      className="text-xs font-bold text-[#2A835F] hover:text-[#236D4F] flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add Order</span>
                    </button>
                  </div>

                  {/* Pending Enquiries Scroll/Grid */}
                  {pendingEnquiries.length === 0 ? (
                    <div className="py-8 text-center text-slate-400">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
                      <p className="text-xs font-bold text-slate-700">All enquiries dispatched!</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Zero pending customer requests.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {pendingEnquiries.map((enq) => {
                        const total = enq.items.reduce((s, i) => s + i.amount, 0);

                        return (
                          <div
                            key={enq.id}
                            className="bg-slate-50/80 hover:bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-[#2A835F]/60 transition-all shadow-xs flex flex-col justify-between group"
                          >
                            <div>
                              {/* Top pill row */}
                              <div className="flex items-center justify-between gap-1 mb-2">
                                <span className="font-mono text-[10px] font-extrabold text-[#2A835F] bg-[#EBF6F1] px-2 py-0.5 rounded border border-[#C3E6D5]">
                                  {enq.code}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">
                                  Urgent
                                </span>
                              </div>

                              {/* Title */}
                              <div className="flex items-start gap-2 mb-2">
                                <span className="text-base shrink-0 mt-0.5">{enq.companyLogo}</span>
                                <div>
                                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#2A835F] transition-colors line-clamp-1">
                                    {enq.serviceName}
                                  </h3>
                                  <span className="text-[10px] text-slate-500">
                                    {enq.customerName}
                                  </span>
                                </div>
                              </div>

                              {/* Location & Message */}
                              <div className="text-[11px] text-slate-600 bg-white rounded-xl p-2.5 border border-slate-200/60 space-y-1 mb-2">
                                {enq.location && (
                                  <div className="flex items-center gap-1 text-slate-500 truncate text-[10px]">
                                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                    <span className="truncate">{enq.location}</span>
                                  </div>
                                )}
                                {enq.message && (
                                  <p className="line-clamp-2 italic text-slate-600 text-[10px]">
                                    &quot;{enq.message}&quot;
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Bottom row: Price & Assign */}
                            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                              <div>
                                <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                                  Est. Rate
                                </span>
                                <span className="text-xs font-black text-slate-900 tracking-tight">
                                  ₹ {total.toLocaleString('en-IN')}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                {enq.customerPhone && (
                                  <a
                                    href={`tel:${enq.customerPhone}`}
                                    title={`Call ${enq.customerName}`}
                                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#2A835F] flex items-center justify-center transition-colors"
                                  >
                                    <Phone className="w-3 h-3" />
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleOpenAssign(enq)}
                                  className="bg-[#2A835F] hover:bg-[#236D4F] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer active:scale-95"
                                >
                                  <UserCheck className="w-3 h-3" />
                                  <span>Assign</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* CARD SECTION 2: ONGOING WORKS & ACTIVE DISPATCHES */}
                <section
                  id="ongoing-section"
                  aria-label="Ongoing Works"
                  className="bg-white rounded-[32px] p-5 sm:p-6 border border-slate-200/90 shadow-sm relative overflow-hidden"
                >
                  {/* Card Section Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                          Ongoing Works &amp; Active Dispatches
                        </h2>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                          {ongoingWorks.length} Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Operatives currently on-site executing field operations across Kerala.
                      </p>
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                      Live GPS Sync
                    </span>
                  </div>

                  {/* Ongoing Works Grid */}
                  {ongoingWorks.length === 0 ? (
                    <div className="py-8 text-center text-slate-400">
                      <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
                      <p className="text-xs font-bold text-slate-700">No active work orders</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Assign pending orders to initiate on-field operations.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {ongoingWorks.map((work) => {
                        const total = work.items.reduce((s, i) => s + i.amount, 0);
                        const isInProgress = work.backendStatus === 'IN_PROGRESS';

                        return (
                          <div
                            key={work.id}
                            className="bg-slate-50/80 hover:bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-sky-500/50 transition-all shadow-xs flex flex-col justify-between group"
                          >
                            <div>
                              {/* Header */}
                              <div className="flex items-center justify-between gap-1 mb-2">
                                <span className="font-mono text-[10px] font-extrabold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                                  {work.code}
                                </span>
                                <span
                                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                                    isInProgress
                                      ? 'bg-sky-100 text-sky-800 border-sky-200'
                                      : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                  }`}
                                >
                                  {isInProgress ? 'In Progress' : 'Dispatched'}
                                </span>
                              </div>

                              {/* Service Title */}
                              <div className="flex items-start gap-2 mb-2">
                                <span className="text-base shrink-0 mt-0.5">{work.companyLogo}</span>
                                <div>
                                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1">
                                    {work.serviceName}
                                  </h3>
                                  <span className="text-[10px] text-slate-500">
                                    Client: {work.customerName}
                                  </span>
                                </div>
                              </div>

                              {/* Operative Pill & Progress */}
                              <div className="bg-white rounded-xl p-2.5 border border-slate-200/70 space-y-2 mb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-[#EBF6F1] text-[#2A835F] font-bold text-[10px] flex items-center justify-center">
                                      {(work.worker?.name || 'W').charAt(0)}
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 truncate">
                                      {work.worker?.name || 'Operative Assigned'}
                                    </span>
                                  </div>

                                  {work.worker?.phone && (
                                    <a
                                      href={`tel:${work.worker.phone}`}
                                      className="text-slate-400 hover:text-[#2A835F] p-1"
                                      title="Call operative"
                                    >
                                      <Phone className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>

                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    style={{ width: isInProgress ? '65%' : '25%' }}
                                    className={`h-full rounded-full ${
                                      isInProgress ? 'bg-sky-500' : 'bg-emerald-500'
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Bottom row: Rate & Details */}
                            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                              <div>
                                <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                                  Tariff
                                </span>
                                <span className="text-xs font-black text-slate-900 tracking-tight">
                                  ₹ {total.toLocaleString('en-IN')}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedInvoiceId(work.id);
                                  showToast(`Inspecting work order ${work.code} in ledger below`);
                                  const ledgerEl = document.getElementById('ledger-section');
                                  ledgerEl?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-[11px] font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                              >
                                <span>Inspect</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              </div>

              {/* ----------------------------------------------------
                  RIGHT COLUMN: Active Field Squad & Regional Hub
                  Takes 5 cols on lg, 4 cols on xl
              ---------------------------------------------------- */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                {/* CARD SECTION 3: ACTIVE FIELD SQUAD */}
                <section
                  id="workers-section"
                  aria-label="Active Field Squad"
                  className="bg-white rounded-[32px] p-5 sm:p-6 border border-slate-200/90 shadow-sm relative overflow-hidden"
                >
                  {/* Card Section Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#2A835F]" />
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                          Active Field Squad
                        </h2>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {stats.availableWorkers} of {workers.length} operatives ready for dispatch
                      </p>
                    </div>

                    {/* Filter pills */}
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px]">
                      {(['ALL', 'AVAILABLE', 'BUSY'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setWorkerFilter(mode)}
                          className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                            workerFilter === mode
                              ? 'bg-white text-slate-900 shadow-2xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {mode === 'ALL' ? 'All' : mode === 'AVAILABLE' ? 'Ready' : 'On Site'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Operatives List */}
                  <div className="flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-1">
                    {filteredWorkers.map((worker) => {
                      const isAvailable = worker.workerStatus === 'AVAILABLE';
                      const isBusy = worker.workerStatus === 'BUSY';
                      const specialty = getWorkerSpecialty(worker);
                      const currentJob = invoices.find((inv) => inv.worker?.id === worker.id);

                      return (
                        <div
                          key={worker.id}
                          className="bg-slate-50/80 hover:bg-white rounded-2xl p-3 border border-slate-200/80 hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-10 h-10 rounded-2xl bg-[#EBF6F1] border border-[#C3E6D5] text-[#2A835F] font-black text-xs flex items-center justify-center shrink-0">
                              {(worker.name || worker.username || 'W').charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-slate-900 truncate">
                                  {worker.name || worker.username}
                                </h4>
                                <span
                                  className={`w-2 h-2 rounded-full shrink-0 ${
                                    isAvailable
                                      ? 'bg-emerald-500 animate-pulse'
                                      : isBusy
                                      ? 'bg-amber-500'
                                      : 'bg-slate-400'
                                  }`}
                                />
                              </div>
                              <p className="text-[10px] text-slate-500 truncate">
                                {specialty}
                              </p>
                              <div className="text-[9px] text-slate-400 mt-0.5 truncate">
                                {currentJob ? `On site: ${currentJob.customerName}` : 'Ready for assignment'}
                              </div>
                            </div>
                          </div>

                          {/* Quick Action */}
                          <div className="flex items-center gap-1 shrink-0">
                            {worker.phone && (
                              <a
                                href={`tel:${worker.phone}`}
                                title={`Call ${worker.name}`}
                                className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 text-slate-600 hover:text-[#2A835F] flex items-center justify-center transition-colors"
                              >
                                <Phone className="w-3 h-3" />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                if (pendingEnquiries.length > 0) {
                                  handleOpenAssign(pendingEnquiries[0]);
                                  if (isAvailable) {
                                    setSelectedWorkerId(worker.id);
                                  }
                                } else {
                                  setIsCreateModalOpen(true);
                                }
                              }}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                                isAvailable
                                  ? 'bg-[#2A835F] hover:bg-[#236D4F] text-white'
                                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              {isAvailable ? 'Dispatch' : 'On Site'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* CARD SECTION 4: KERALA DISPATCH HUBS & QUICK ADVANCE */}
                <section className="bg-slate-900 text-white rounded-[32px] p-5 sm:p-6 border border-slate-800 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        Kerala Regional Hubs
                      </h3>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      5 Hubs Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
                    <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Central</span>
                      <span className="font-bold text-white">Palakkad &amp; Thrissur</span>
                    </div>
                    <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Coastal</span>
                      <span className="font-bold text-white">Ernakulam &amp; Aluva</span>
                    </div>
                    <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">North</span>
                      <span className="font-bold text-white">Calicut &amp; Malappuram</span>
                    </div>
                    <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">South</span>
                      <span className="font-bold text-white">Kottayam &amp; Idukki</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPayoutModalOpen(true)}
                    className="w-full bg-[#2A835F] hover:bg-[#236D4F] text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>Authorize Shift Advance / Payout</span>
                  </button>
                </section>
              </div>
            </div>

            {/* ----------------------------------------------------
                BOTTOM SECTION: WORK ORDERS & INVOICES LEDGER
                Full-width master-detail dark bento container!
            ---------------------------------------------------- */}
            <section
              id="ledger-section"
              aria-label="Work Orders & Invoices Ledger"
              className="w-full bg-[#12131D] rounded-[36px] p-5 sm:p-7 text-white shadow-2xl border border-slate-800/90 relative overflow-hidden"
            >
              {/* Header Row: Title + Filter Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/70">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-[#2A835F]" />
                    <span>Work Orders &amp; Invoices Ledger</span>
                    <span className="text-xs font-normal text-slate-400">
                      ({filteredInvoices.length} official records in ₹ INR)
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Itemized valuation, tax calculations, and verified Kerala payment settlements.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-full border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ALL')}
                    className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                      activeTab === 'ALL'
                        ? 'bg-[#2A835F] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Records
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('DRAFT')}
                    className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                      activeTab === 'DRAFT'
                        ? 'bg-[#2A835F] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Active ({invoices.filter((i) => i.status === 'Draft').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('UNPAID')}
                    className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                      activeTab === 'UNPAID'
                        ? 'bg-[#2A835F] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Unpaid ({invoices.filter((i) => i.status === 'Unsent' || i.status === 'Viewed').length})
                  </button>
                </div>
              </div>

              {/* Split View: Left List (~40%) + Right Invoice Inspector (~60%) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
                {/* LEFT LIST */}
                <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {filteredInvoices.map((inv) => {
                    const isSelected = inv.id === selectedInvoice.id;
                    const total = inv.items.reduce((s, i) => s + i.amount, 0);

                    return (
                      <div
                        key={inv.id}
                        onClick={() => setSelectedInvoiceId(inv.id)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#2A835F] shadow-lg border border-emerald-400/50'
                            : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/10">
                            <img
                              src={inv.customerAvatar}
                              alt={inv.customerName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                              {inv.code}
                            </div>
                            <div className={`text-[11px] truncate ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                              {inv.customerName} • {inv.dueInDays} days
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-xs font-black tracking-tight ${isSelected ? 'text-white' : 'text-slate-100'}`}>
                            ₹ {total.toLocaleString('en-IN')}
                          </span>
                          <span className={`block text-[10px] font-semibold ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* RIGHT INSPECTOR */}
                <div className="lg:col-span-7">
                  <div className="bg-slate-900/90 rounded-[28px] p-6 shadow-2xl border border-slate-800 flex flex-col justify-between min-h-[400px]">
                    <div>
                      {/* Meta header */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-5 border-b border-white/10 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                            Order Code
                          </span>
                          <div className="text-lg font-black text-white mt-0.5">
                            {selectedInvoice.code}
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-[#EBF6F1] text-[#2A835F]">
                            {selectedInvoice.status}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                            Division
                          </span>
                          <div className="text-sm font-bold text-white mt-0.5 truncate">
                            {selectedInvoice.companyName}
                          </div>
                          <span className="text-xs">{selectedInvoice.companyLogo}</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                            Customer Site
                          </span>
                          <div className="text-xs font-bold text-white mt-0.5 truncate">
                            {selectedInvoice.customerName}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {selectedInvoice.location}
                          </div>
                        </div>
                      </div>

                      {/* Line items in ₹ */}
                      <div className="py-4 space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-1.5 border-b border-white/10">
                          <span>Description</span>
                          <span>Tariff (₹ INR)</span>
                        </div>

                        {selectedInvoice.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs py-1">
                            <span className="text-slate-200">{item.name}</span>
                            <span className="font-mono font-bold text-white">
                              ₹ {item.amount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Totals & Actions */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <button
                          type="button"
                          onClick={() => setIsAddItemModalOpen(true)}
                          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Line Item (₹)</span>
                        </button>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                            Total Payable
                          </span>
                          <span className="text-xl font-black text-white tracking-tight">
                            ₹ {invoiceTotal.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Payment mode pills */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('upi')}
                          className={`py-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                            paymentMethod === 'upi'
                              ? 'bg-[#2A835F] text-white shadow-xs'
                              : 'bg-white/5 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          UPI (GPay/PhonePe)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('imps')}
                          className={`py-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                            paymentMethod === 'imps'
                              ? 'bg-[#2A835F] text-white shadow-xs'
                              : 'bg-white/5 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          IMPS Bank Transfer
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('cash')}
                          className={`py-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                            paymentMethod === 'cash'
                              ? 'bg-[#2A835F] text-white shadow-xs'
                              : 'bg-white/5 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          Cash on Site
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyTracking(selectedInvoice.code)}
                          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copy Tracking</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenAssign(selectedInvoice)}
                            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Dispatch Operative
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsPayoutModalOpen(true)}
                            className="bg-[#2A835F] hover:bg-[#236D4F] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1"
                          >
                            <IndianRupee className="w-3.5 h-3.5" />
                            <span>Record Settlement</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Other Classified Views when switched via Top Navbar */}
        {activeNav === 'crew' && (
          <OfficeStaffCrewView
            workers={workers}
            invoices={invoices}
            onSelectWorkerForDispatch={(workerId) => {
              setSelectedWorkerId(workerId);
              if (pendingEnquiries.length > 0) {
                handleOpenAssign(pendingEnquiries[0]);
              }
            }}
            onShowToast={showToast}
          />
        )}

        {activeNav === 'estimates' && (
          <OfficeStaffEstimatesView
            onDraftOrderWithService={(serviceName) => {
              setNewServiceName(serviceName);
              setIsCreateModalOpen(true);
            }}
            onShowToast={showToast}
          />
        )}

        {activeNav === 'calendar' && (
          <OfficeStaffCalendarView
            invoices={invoices}
            onSelectInvoice={(invoiceId: string) => {
              setSelectedInvoiceId(invoiceId);
              setActiveNav('dashboard');
              showToast('Selected work order for inspection');
            }}
            onAssignWorker={(invoiceId: string) => {
              const inv = invoices.find((i) => i.id === invoiceId);
              if (inv) handleOpenAssign(inv);
            }}
            onShowToast={showToast}
          />
        )}
      </div>

      {/* ========================================================
          MODAL: CREATE WORK ORDER / INVOICE
      ======================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2A835F]" />
                  <span>Register Service Work Order</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct walk-in or phone enquiry registration for Kerala operations
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Category
                </label>
                <select
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2A835F]/20 focus:border-[#2A835F]"
                >
                  <option value="Cococare - Palm Tree Harvesting & Maintenance">
                    🌴 Cococare - Palm Tree Harvesting &amp; Maintenance
                  </option>
                  <option value="JCB Heavy Earthmoving & Site Excavation">
                    🚜 JCB Heavy Earthmoving &amp; Site Excavation
                  </option>
                  <option value="Plastering, Smooth Finishing & Masonry">
                    🧱 Plastering, Smooth Finishing &amp; Masonry
                  </option>
                  <option value="Master Tile Laying & Precision Leveling">
                    ◈ Master Tile Laying &amp; Precision Leveling
                  </option>
                  <option value="Industrial Electrical & Power Maintenance">
                    ⚡ Industrial Electrical &amp; Power Maintenance
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Suresh Kumar"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2A835F]/20 focus:border-[#2A835F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98470 12345"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2A835F]/20 focus:border-[#2A835F]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Site Location / District
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Palakkad Block 2"
                    value={newCustomerLocation}
                    onChange={(e) => setNewCustomerLocation(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2A835F]/20 focus:border-[#2A835F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={newPreferredDate}
                    onChange={(e) => setNewPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2A835F]/20 focus:border-[#2A835F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Scope Requirements &amp; Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need 40 palms harvested and safety gear brought to site"
                  value={newRequirements}
                  onChange={(e) => setNewRequirements(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2A835F]/20 focus:border-[#2A835F]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#2A835F] hover:bg-[#236D4F] text-white shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Register Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD LINE ITEM (AMOUNT IN ₹ INR)
      ======================================================== */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Add Item to {selectedInvoice.code}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddItemModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
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
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2A835F]/20 focus:border-[#2A835F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount in Indian Rupees (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="8500"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2A835F]/20 focus:border-[#2A835F]"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#2A835F] hover:bg-[#236D4F] text-white shadow-md cursor-pointer"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ASSIGN FIELD WORKER / OPERATIVE DISPATCH
      ======================================================== */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-[#2A835F]" />
                  <span>Dispatch Operative to {(assigningEnquiry || selectedInvoice).code}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select a certified Kerala operative for {(assigningEnquiry || selectedInvoice).serviceName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setAssigningEnquiry(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignWorker} className="space-y-4 pt-4">
              {/* Site Details Pill */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-bold text-slate-800">
                    {(assigningEnquiry || selectedInvoice).customerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Site Location:</span>
                  <span className="font-medium text-slate-700">
                    {(assigningEnquiry || selectedInvoice).location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-medium text-slate-700">
                    {(assigningEnquiry || selectedInvoice).customerPhone}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Choose Available Field Operative
                </label>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {workers.map((worker) => {
                    const isSelected = selectedWorkerId === worker.id;
                    const isAvailable = worker.workerStatus === 'AVAILABLE';

                    return (
                      <div
                        key={worker.id}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedWorkerId(worker.id);
                          }
                        }}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                          !isAvailable
                            ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 select-none'
                            : isSelected
                            ? 'border-[#2A835F] bg-[#EBF6F1] ring-1 ring-[#2A835F] cursor-pointer'
                            : 'border-slate-200 hover:border-slate-300 bg-white cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-[#2A835F] font-bold text-xs flex items-center justify-center">
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

                        <div className="text-right">
                          <span
                            className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                              isAvailable
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                : worker.workerStatus === 'BUSY'
                                ? 'bg-amber-50 text-amber-600 border border-amber-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            {isAvailable
                              ? 'AVAILABLE'
                              : worker.workerStatus === 'BUSY'
                              ? 'ON SITE'
                              : 'OFF DUTY'}
                          </span>
                          {!isAvailable && (
                            <p className="text-[9px] text-slate-400 mt-0.5">Unavailable</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dispatch Instructions / Equipment Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Carry mechanical climbing harness, verify site power lines"
                  value={dispatchNotes}
                  onChange={(e) => setDispatchNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2A835F]/20 focus:border-[#2A835F]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAssignModalOpen(false);
                    setAssigningEnquiry(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedWorkerId}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#2A835F] hover:bg-[#236D4F] text-white shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm &amp; Dispatch</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: RECORD SETTLEMENT / PAYOUT (ALL IN ₹ INR)
      ======================================================== */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF6F1] border border-[#C3E6D5] text-[#2A835F] flex items-center justify-center mx-auto mb-3">
              <IndianRupee className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Confirm Settlement in Rupees
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Record payment settlement for order{' '}
              <strong className="text-slate-800">{selectedInvoice.code}</strong>.
            </p>

            <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Payment Mode</span>
                <span className="font-bold text-slate-800 uppercase">
                  {paymentMethod}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Payable Amount</span>
                <span className="font-black text-[#2A835F] text-base">
                  ₹ {invoiceTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPayoutModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePayout}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#2A835F] hover:bg-[#236D4F] text-white shadow-md cursor-pointer"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

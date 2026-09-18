'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { api, User as StaffUser } from '@/services';
import { PeopleTable } from '@/components/Admin/people-table';
import { CreatePersonModal } from '@/components/Admin/create-person-modal';
import { Users, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WorkersPage() {
  const { token, user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [meta, setMeta] = useState<{ total: number; page: number; limit: number; totalPages: number } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (token && user?.role === 'SUPER_ADMIN') {
        loadStaff(searchTerm, page);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm, page, token, user]);

  useEffect(() => {
    if (!authLoading) {
      if (!token || user?.role !== 'SUPER_ADMIN') {
        router.push('/admin/login');
      }
    }
  }, [authLoading, token, user, router]);

  const loadStaff = async (search: string, currentPage: number) => {
    if (!token) return;
    setIsLoading(true);
    try {
      const result = await api.listStaff(token, { role: 'WORKER', search, page: currentPage, limit });
      setStaff(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.error('Failed to load workers', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this worker?')) return;
    
    setIsDeleting(id);
    try {
      await api.deleteStaff(id, token);
      loadStaff(searchTerm, page);
    } catch (error) {
      console.error('Failed to delete worker', error);
      alert('Failed to delete worker');
    } finally {
      setIsDeleting(null);
    }
  };

  if (authLoading) {
    return <div className="p-8 text-gray-500">Loading workers...</div>;
  }

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-3">
             <div className="p-2 bg-[#1A1C23] border border-gray-800 rounded-xl">
               <Users className="w-6 h-6 text-[#7B4DFF]" />
             </div>
             Workers Management
           </h1>
           <p className="text-gray-500 text-sm mt-1">Manage worker accounts and access</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#7B4DFF] hover:bg-[#6A3DEE] px-4 py-2 rounded-xl text-sm font-medium text-white shadow-[0_0_15px_rgba(123,77,255,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Worker
        </button>
      </div>

      <div className="flex items-center gap-4 bg-[#14151A] p-4 rounded-2xl border border-gray-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-[#1A1C23] border border-gray-800 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#7B4DFF] transition-colors"
          />
        </div>
      </div>

      <PeopleTable 
        people={staff} 
        meta={meta}
        onPageChange={setPage}
        onDelete={handleDelete} 
        isDeleting={isDeleting} 
      />

      <CreatePersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role="WORKER"
        token={token!}
        onSuccess={() => loadStaff(searchTerm, page)}
      />
    </div>
  );
}

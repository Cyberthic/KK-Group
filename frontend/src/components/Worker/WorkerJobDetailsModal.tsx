'use client';

import React from 'react';
import {
  X,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  PlayCircle,
  Loader2,
  Calendar,
  AlertCircle,
  User,
} from 'lucide-react';
import { ServiceEnquiry } from '@/services';

interface WorkerJobDetailsModalProps {
  job: ServiceEnquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (jobId: string, status: 'IN_PROGRESS' | 'COMPLETED') => Promise<void>;
  isActing: boolean;
}

export function WorkerJobDetailsModal({
  job,
  isOpen,
  onClose,
  onUpdateStatus,
  isActing,
}: WorkerJobDetailsModalProps) {
  if (!isOpen || !job) return null;

  const isAssigned = job.status === 'ASSIGNED';
  const isInProgress = job.status === 'IN_PROGRESS';
  const isCompleted = job.status === 'COMPLETED';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in select-none">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-7 shadow-2xl border border-slate-100 flex flex-col gap-4 text-slate-800 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-[#5E42B4] bg-purple-50 px-2.5 py-0.5 rounded-full w-fit mb-1 border border-purple-100">
              {job.trackingNumber}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              {job.serviceName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Customer & Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#5E42B4]" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                Customer Name
              </span>
              <span className="font-bold text-slate-800 text-sm">
                {job.customerName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                Phone Number
              </span>
              <a
                href={`tel:${job.customerPhone}`}
                className="font-bold text-emerald-700 hover:underline text-sm"
              >
                +91 {job.customerPhone}
              </a>
            </div>
          </div>

          {job.location && (
            <div className="flex items-center gap-2 sm:col-span-2 pt-1 border-t border-slate-200/60">
              <MapPin className="w-4 h-4 text-[#5E42B4]" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Work Location
                </span>
                <span className="font-semibold text-slate-700">
                  {job.location}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Notes & Requirements */}
        <div className="space-y-2 text-xs">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Work Details / Client Requirements
          </label>
          <p className="bg-white border border-slate-200 p-3.5 rounded-2xl text-slate-700 font-medium leading-relaxed">
            {job.message}
          </p>

          {job.notes && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <strong className="font-bold">Office Dispatch Note:</strong> {job.notes}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isCompleted
                  ? 'bg-emerald-500'
                  : isInProgress
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-indigo-500'
              }`}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {job.status.replace('_', ' ')}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isAssigned && (
              <button
                type="button"
                onClick={() => onUpdateStatus(job.id, 'IN_PROGRESS')}
                disabled={isActing}
                className="bg-[#5E42B4] hover:bg-[#5239a0] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isActing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <PlayCircle className="w-4 h-4" />
                )}
                <span>Start Work</span>
              </button>
            )}

            {isInProgress && (
              <button
                type="button"
                onClick={() => onUpdateStatus(job.id, 'COMPLETED')}
                disabled={isActing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isActing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                <span>Mark Completed</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

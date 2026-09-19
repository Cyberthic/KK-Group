'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  UserCheck,
  Phone,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Send,
} from 'lucide-react';
import { EnquiryService, ServiceEnquiry, WorkerWithAvailability } from '@/services';

interface AssignWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry: ServiceEnquiry | null;
  token: string;
  onAssignedSuccess: () => void;
}

export function AssignWorkerModal({
  isOpen,
  onClose,
  enquiry,
  token,
  onAssignedSuccess,
}: AssignWorkerModalProps) {
  const [workers, setWorkers] = useState<WorkerWithAvailability[]>([]);
  const [loadingWorkers, setLoadingWorkers] = useState(true);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && token) {
      fetchWorkers();
      setSelectedWorkerId(null);
      setNotes('');
      setError(null);
    }
  }, [isOpen, token]);

  const fetchWorkers = async () => {
    setLoadingWorkers(true);
    setError(null);
    try {
      const res = await EnquiryService.getActiveWorkers(token);
      setWorkers(res.workers || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load workers list');
    } finally {
      setLoadingWorkers(false);
    }
  };

  if (!isOpen || !enquiry) return null;

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkerId) {
      setError('Please select an available worker to assign');
      return;
    }

    const worker = workers.find((w) => w.id === selectedWorkerId);
    if (!worker || worker.workerStatus !== 'AVAILABLE') {
      setError('Selected worker is not available. Please pick an available worker.');
      return;
    }

    setAssigning(true);
    setError(null);

    try {
      await EnquiryService.assignWorker(
        enquiry.id,
        selectedWorkerId,
        notes.trim() || undefined,
        token,
      );
      onAssignedSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to assign worker. Please try again.');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-white animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Assign Service Worker</h3>
            <p className="text-xs text-zinc-400">
              Only workers who are currently marked as <span className="text-emerald-400 font-semibold">Available</span> can be assigned.
            </p>
          </div>
        </div>

        {/* Enquiry Quick Info Banner */}
        <div className="bg-zinc-800/60 border border-zinc-700/60 rounded-2xl p-4 my-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-emerald-400">
              {enquiry.trackingNumber}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
              {enquiry.serviceName}
            </span>
          </div>
          <p className="text-xs text-zinc-300">
            <strong className="text-white">Customer:</strong> {enquiry.customerName} ({enquiry.customerPhone})
          </p>
          {enquiry.location && (
            <p className="text-xs text-zinc-400 mt-1">
              <strong className="text-zinc-300">Location:</strong> {enquiry.location}
            </p>
          )}
          <p className="text-xs text-zinc-400 mt-1.5 italic bg-zinc-900/60 p-2 rounded-lg border border-zinc-800">
            &ldquo;{enquiry.message}&rdquo;
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAssign} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Select Available Worker *
              </label>
              <button
                type="button"
                onClick={fetchWorkers}
                className="text-[11px] text-sky-400 hover:underline"
              >
                Refresh List
              </button>
            </div>

            {loadingWorkers ? (
              <div className="p-8 flex items-center justify-center gap-2 text-zinc-400 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                <span>Checking worker availability...</span>
              </div>
            ) : workers.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-zinc-800/40 border border-zinc-800 text-zinc-400 text-xs">
                <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                No active workers found in system.
              </div>
            ) : (
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {workers.map((worker) => {
                  const isAvailable = worker.workerStatus === 'AVAILABLE';
                  const isSelected = selectedWorkerId === worker.id;

                  return (
                    <div
                      key={worker.id}
                      onClick={() => {
                        if (isAvailable) {
                          setSelectedWorkerId(worker.id);
                          setError(null);
                        }
                      }}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                        !isAvailable
                          ? 'opacity-50 cursor-not-allowed bg-zinc-950/40 border-zinc-800/60'
                          : isSelected
                          ? 'bg-sky-500/15 border-sky-500 shadow-md ring-1 ring-sky-500 cursor-pointer'
                          : 'bg-zinc-800/40 border-zinc-700/60 hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isSelected
                              ? 'bg-sky-500 text-white'
                              : isAvailable
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-zinc-800 text-zinc-500'
                          }`}
                        >
                          {worker.name ? worker.name.charAt(0).toUpperCase() : 'W'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">
                              {worker.name || worker.username}
                            </h4>
                            <span className="text-[10px] text-zinc-400 font-mono">
                              @{worker.username}
                            </span>
                          </div>
                          {worker.phone && (
                            <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5">
                              <Phone className="w-3 h-3 text-zinc-500" />
                              <span>{worker.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Available
                          </span>
                        ) : worker.workerStatus === 'BUSY' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            <Clock className="w-3 h-3" />
                            Busy on Job
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-700/50 text-zinc-400 border border-zinc-700">
                            Off Duty
                          </span>
                        )}

                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-sky-400 ml-1" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Staff Dispatch Instructions / Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Priority customer, ensure all tools for tree trimming are packed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={assigning || !selectedWorkerId}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-sky-900/30"
            >
              {assigning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm &amp; Assign Worker</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
